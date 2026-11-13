import { useState, useEffect, useMemo } from "react";
import { useEntityCrud } from "./useEntityCrud";
import { useCrudModal } from "./useCrudModal";
import { getAllMedia, createMedia, updateMedia, deleteMedia } from "../Services/mediaService";
import { getTypes } from "../Services/tipoService";
import { getGenres } from "../Services/generoService";
import { getDirectors } from "../Services/directorService";
import { getProducers } from "../Services/productoraService";

export function useMediaPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const [catalogs, setCatalogs] = useState({
        tipos: [],
        generos: [],
        directores: [],
        productoras: [],
    });

    // Carga de catálogos relacionales
    useEffect(() => {
        Promise.all([getTypes(), getGenres(), getDirectors(), getProducers()])
            .then(([resTipos, resGeneros, resDirectores, resProductoras]) => {
                const tipos = Array.isArray(resTipos) ? resTipos : resTipos?.data || [];
                const generos = Array.isArray(resGeneros) ? resGeneros : resGeneros?.data || [];
                const directores = Array.isArray(resDirectores) ? resDirectores : resDirectores?.data || [];
                const productoras = Array.isArray(resProductoras) ? resProductoras : resProductoras?.data || [];

                const isActive = (item) =>
                    item.status === undefined ||
                    item.status === true ||
                    String(item.status).toLowerCase() === "activo";

                setCatalogs({
                    tipos,
                    generos: generos.filter(isActive),
                    directores: directores.filter(isActive),
                    productoras: productoras.filter(isActive),
                });
            })
            .catch((err) => console.error("Error cargando catálogos:", err));
    }, []);

    // Gestión del CRUD
    const {
        items: media,
        loading,
        error,
        addItem,
        editItem,
        removeItem,
    } = useEntityCrud({
        getAll: getAllMedia,
        createItem: createMedia,
        updateItem: updateMedia,
        deleteItem: deleteMedia,
        entityName: "la producción",
        formatPayload: (data) => ({
            serial: data.serial.trim(),
            title: data.title.trim(),
            ...(data.synopsis?.trim() && { synopsis: data.synopsis.trim() }),
            url: data.url.trim(),
            ...(data.coverImage?.trim() && { coverImage: data.coverImage.trim() }),
            releaseYear: Number(data.releaseYear),
            type: data.type,
            director: data.director,
            productionCompany: data.productionCompany,
            genreNames: data.genreNames,
        }),
    });

    // Gestión del Modal
    const modal = useCrudModal({
        onAdd: addItem,
        onEdit: editItem,
        onRemove: removeItem,
        entityLabel: "la producción",
    });

    // Enriquecimiento + Filtrado memorizado
    const filteredMedia = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return (media || [])
            .map((item) => {
                const foundType = catalogs.tipos.find((t) => (t.id || t._id) === item.typeId);
                const foundDirector = catalogs.directores.find((d) => (d.id || d._id) === item.directorId);
                const foundCompany = catalogs.productoras.find((p) => (p.id || p._id) === item.productionCompanyId);

                return {
                    ...item,
                    type: item.type?.name ? item.type : foundType || item.type,
                    director:
                        item.director?.name || item.director?.names
                            ? item.director
                            : foundDirector || item.director,
                    productionCompany: item.productionCompany?.name
                        ? item.productionCompany
                        : foundCompany || item.productionCompany,
                };
            })
            .filter((item) => {
                const matchesText =
                    !term ||
                    item.title?.toLowerCase().includes(term) ||
                    item.serial?.toLowerCase().includes(term) ||
                    (item.director?.name || item.director?.names || "").toLowerCase().includes(term) ||
                    (item.productionCompany?.name || "").toLowerCase().includes(term);

                const itemType = item.type?.name || item.type || "";
                const matchesType = !selectedType || itemType === selectedType;

                const itemGenres = Array.isArray(item.genres)
                    ? item.genres.map((g) => g.genre?.name || g.name || g)
                    : Array.isArray(item.genreNames)
                        ? item.genreNames
                        : [];
                const matchesGenre = !selectedGenre || itemGenres.includes(selectedGenre);

                return matchesText && matchesType && matchesGenre;
            });
    }, [media, catalogs, searchTerm, selectedType, selectedGenre]);

    return {
        filteredMedia,
        loading,
        error,
        catalogs,
        filters: {
            searchTerm,
            setSearchTerm,
            selectedGenre,
            setSelectedGenre,
            selectedType,
            setSelectedType,
        },
        modal,
    };
}