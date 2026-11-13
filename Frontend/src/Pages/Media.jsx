import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import DataTable from "../Components/DataTable"
import MediaRow from "../Components/MediaRow"
import { useState,useEffect } from "react"
import { useEntityCrud } from "../Hooks/useEntityCrud"
import MediaModal from "../Components/MediaModal"
import { useCrudModal } from "../Hooks/useCrudModal";
import { getAllMedia, createMedia, updateMedia, deleteMedia } from '../Services/mediaService';
import { getTypes } from "../Services/tipoService";
import { getGenres } from "../Services/generoService";
import { getDirectors } from "../Services/directorService";
import { getProducers } from "../Services/productoraService";
import ButtonAdd from "../Components/ButtonAdd"

export default function Media(){
    const [searchTerm, setSearchTerm] = useState("");
    const [catalogs, setCatalogs] = useState({
        tipos: [],
        generos: [],
        directores: [],
        productoras: [],
    });

    
    const columns = [
        { key: "title", label: "PÓSTER & TÍTULO" },
        { key: "serial", label: "SERIAL ÚNICO" },
        { key: "type", label: "TIPO" },
        { key: "genre", label: "GÉNERO" },
        { key: "director", label: "DIRECTOR PRINCIPAL" },
        { key: "company", label: "PRODUCTORA" },
        { key: "year", label: "AÑO" },
        { key: "actions", label: "Acciones" }
    ];

    useEffect(() => {
        Promise.all([getTypes(), getGenres(), getDirectors(), getProducers()])
            .then(([tipos, generos, directores, productoras]) => {
                setCatalogs({
                    tipos,
                    generos,
                    // Filtra solo activos si tu backend devuelve status
                    directores: directores.filter((d) => d.status === "Activo" || d.status === true),
                    productoras: productoras.filter((p) => p.status === "Activo" || p.status === true),
                });
            })
            .catch((err) => console.error("Error cargando catálogos:", err));
    }, []);

    //Gestion del crud
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
        //Gestion de modal y acciones
        const {
            isModalOpen,
            selectedItem,
            handleOpenCreate,
            handleOpenEdit,
            handleClose,
            handleSave,
            handleDelete,
        } = useCrudModal({
            onAdd: addItem,
            onEdit: editItem,
            onRemove: removeItem,
            entityLabel: "la producción",
        });
    const filteredMedia = media.filter(
        (item) =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.serial?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const enrichedMedia = filteredMedia.map((item) => {
        const foundType = catalogs.tipos.find(
            (t) => (t.id || t._id) === item.typeId
        );
        const foundDirector = catalogs.directores.find(
            (d) => (d.id || d._id) === item.directorId
        );
        const foundCompany = catalogs.productoras.find(
            (p) => (p.id || p._id) === item.productionCompanyId
        );

        return {
            ...item,
            // Si el backend ya trae el objeto poblado lo respeta; si solo trae el ID, usa el catálogo
            type: item.type?.name ? item.type : foundType || item.type,
            director:
                item.director?.name || item.director?.names
                    ? item.director
                    : foundDirector || item.director,
            productionCompany: item.productionCompany?.name
                ? item.productionCompany
                : foundCompany || item.productionCompany,
        };
    });
    
    return(
        <div className="w-full max-w-7xl flex flex-col  ">
           
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Media'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search placeholder="Buscar Productora por nombre o descripción...">
                    <ButtonAdd onClick={handleOpenCreate} label="Nueva Productra" />
                </Search>
               {loading &&(<p className="text-Neutral-50 text-center">Cargando producciones.....</p>)}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}
                {!loading && !error &&(
                    <DataTable
                        data={enrichedMedia}
                        columns={columns}
                        renderRow={(item) => (
                            <MediaRow key={item.id} media={item} onEdit={handleOpenEdit}
                                onDelete={handleDelete} />
                        )}
                        label="producciones registradas"
                    />

                )}

            </main>
            <MediaModal
                key={selectedItem?.id || "new"}
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                item={selectedItem}
                tipos={catalogs.tipos}
                generos={catalogs.generos}
                directores={catalogs.directores}
                productoras={catalogs.productoras}
            />

        </div>

    )
}

