
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import ButtonAdd from "../Components/ButtonAdd"
import DataTable from "../Components/DataTable"
import DirectorRow from "../Components/DirectorRow";
import CatalogModal from "../Components/CatalogModal";
import { useDirector } from "../Hooks/useDirector";
import { useState } from "react";
export default function Directores() {

    

    const columns = [
        { key: "name", label: "Nombre " },
        { key: "status", label: "Estado" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" }
    ];

    const { directores, loading, error, addDirector, removeDirector, editDirector } = useDirector()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDirector, setSelectedDirector] = useState(null);

    const handleOpenCreate = () => {
        setSelectedDirector(null);
        setIsModalOpen(true);
    };


    // Abrir modal con los datos de la fila seleccionada
    const handleOpenEdit = (director) => {
        setSelectedDirector(director);
        setIsModalOpen(true);
    };

    // Guardar cambios de edición
    const handleSave = async (data) => {
        if (selectedDirector) {
            const id = selectedDirector.id || selectedDirector._id;
            return await editDirector(id, data);
        }
        return await addDirector(data);
    };

  

    // Confirmar y eliminar
    const handleDelete = async (director) => {
        const id = director?.id
        if (!id) return;

        const directorName = director.names || director.name;
        const confirmed = window.confirm(
            `¿Estás seguro de eliminar el director "${directorName}"?`
        );
        if (!confirmed) return;
        await removeDirector(id);
    };


    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Directores'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search placeholder="Buscar género por nombre o descripción...">
                    <ButtonAdd onClick={handleOpenCreate} label="Nuevo Director" />
                </Search>

                {loading && (
                    <p className="text-slate-400 text-center py-8">
                        Cargando Directores...
                    </p>
                )}

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}

                {!loading && !error &&(
                    <DataTable
                        data={directores}
                        columns={columns}
                        renderRow={(director) => (
                            <DirectorRow key={director.id || director._id} director={director} onEdit={handleOpenEdit} onDelete={handleDelete} />
                        )}
                        label="géneros registrados"
                    />

                )}


            </main>
            <CatalogModal
                            key={selectedDirector?.id || selectedDirector?._id || "new"}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSave}
                            item={selectedDirector}
                            entityName="Directores"
                            showDescription={false}
                            placeholder="Ej. Christopher Nolan"
                        />
        </div>
    )
}