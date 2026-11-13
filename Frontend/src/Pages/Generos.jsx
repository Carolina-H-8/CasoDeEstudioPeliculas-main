
import PageInfo from "../Components/PageInfo"
import DataTable from "../Components/DataTable";
import GenreRow from "../Components/GeneroRow";
import Search from "../Components/Search";
import {useGenero} from "../Hooks/useGenero";
import { useState } from "react";
import CatalogModal from "../Components/CatalogModal";
import ButtonAdd from "../Components/ButtonAdd"
export default function Generos() {

    const columns = [
        { key: "name", label: "Nombre & Código" },
        { key: "status", label: "Estado" },
        { key: "description", label: "Descripción narrativa" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" }
    ];
    const { generos, loading, error, editGenre, removeGenre,addGenre } = useGenero();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);


    const handleOpenCreate = () => {
        setSelectedGenre(null);
        setIsModalOpen(true);
    };

    // Abrir modal con los datos de la fila seleccionada
    const handleOpenEdit = (genre) => {
        setSelectedGenre(genre);
        setIsModalOpen(true);
    };

    // Guardar cambios de edición
    const handleSave = async (data) => {
        if (selectedGenre) {
            const id = selectedGenre.id || selectedGenre._id;
            return await editGenre(id, data);
        }
        return await addGenre(data);
    };

    // Confirmar y eliminar
    const handleDelete = async (genre) => {
        const confirmed = window.confirm(
            `¿Estás seguro de eliminar el género "${genre.name}"?`
        );
        if (!confirmed) return;

        const id = genre.id;
        await removeGenre(id);
    };


    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Generos'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search placeholder="Buscar género por nombre o descripción...">
                    <ButtonAdd onClick={handleOpenCreate} label="Nuevo Género" />
                </Search>
                {loading && (<p className="text-Neutral-50 text-center">Cargando Generos.....</p>)}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}
                {!loading && !error &&(
                    <DataTable
                        data={generos}
                        columns={columns}
                        renderRow={(genre) => (
                            <GenreRow
                                key={genre.id || genre._id} genre={genre} onEdit={handleOpenEdit} onDelete={handleDelete}
                            />
                        )}
                        label="géneros registrados"
                    />
                )}

            </main>
            <CatalogModal
                key={selectedGenre?.id || selectedGenre?._id || "new"}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                item={selectedGenre}
                entityName="Género"
                showDescription={true}
                placeholder="Ej. Ciencia Ficción"
            />
        </div>
            
    )
}