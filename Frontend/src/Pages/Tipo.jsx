
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import ButtonAdd from "../Components/ButtonAdd";
import DataTable from "../Components/DataTable";
import TipoRow from "../Components/TipoRow";
import CatalogModal from "../Components/CatalogModal";
import {useTipo} from "../Hooks/useTipo"
import { useState } from "react";
export default function Tipos() {
    const columns = [
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" },
    ];

    const { tipos, loading, error, editType, removeType,addType } = useTipo();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState(null);

    const handleOpenCreate = () => {
        setSelectedTipo(null);
        setIsModalOpen(true);
    };

    // Abrir modal con los datos de la fila seleccionada
    const handleOpenEdit = (tipo) => {
        setSelectedTipo(tipo);
        setIsModalOpen(true);
    };

    // Guardar cambios de edición
    const handleSave = async (data) => {
        if (selectedTipo) {
            const id = selectedTipo.id || selectedTipo._id;
            return await editType(id, data);
        }
        return await addType(data);
    };

    // Confirmar y eliminar
    const handleDelete = async (tipo) => {
        const confirmed = window.confirm(
            `¿Estás seguro de eliminar el género "${tipo.name}"?`
        );
        if (!confirmed) return;

        const id = tipo.id;
        await removeType(id);
    };


    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">

            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Catálogo'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search placeholder="Buscar Tipo por nombre o descripción...">
                    <ButtonAdd onClick={handleOpenCreate} label="Nuevo Tipo" />
                </Search>
                {loading && (<p className="text-Neutral-50 text-center">Cargando Tipos.....</p>)}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}
                {!loading && !error &&(
                                    <DataTable
                                        data={tipos}
                                        columns={columns}
                                        renderRow={(tipo) => (
                                            <TipoRow
                                                key={tipo.id || tipo._id} tipo={tipo} onEdit={handleOpenEdit} onDelete={handleDelete}
                                            />
                                        )}
                                        label="Tipos registrados"
                                    />
                                )}
            </main>
            <CatalogModal
                            key={selectedTipo?.id || selectedTipo?._id || "new"}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSave}
                            item={selectedTipo}
                            entityName="Tipos"
                            showDescription={true}
                            placeholder="Ej. Documental"
                        />
        </div>
    )
}