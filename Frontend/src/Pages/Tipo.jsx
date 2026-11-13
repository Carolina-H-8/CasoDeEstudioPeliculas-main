
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import ButtonAdd from "../Components/ButtonAdd";
import DataTable from "../Components/DataTable";
import TipoRow from "../Components/TipoRow";
import CatalogModal from "../Components/CatalogModal";
import { getTypes, createType, updateType, deleteType } from '../Services/tipoService';
import { useEntityCrud } from '../Hooks/useEntityCrud';
import { useCrudModal } from "../Hooks/useCrudModal";

export default function Tipos() {
    const columns = [
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" },
    ];
    //Gestion del crud
    const { items: tipos,
        loading,
        error,
        addItem,
        editItem,
        removeItem, } = useEntityCrud({
            getAll: getTypes,
            createItem: createType,
            updateItem: updateType,
            deleteItem: deleteType,
            entityName: "El Tipo",
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
        entityLabel: "El tipo",
        formatPayload: (data) => ({
            name: data.name.trim(),
            ...(data.description?.trim() && { description: data.description.trim() }),
        }),
    });

    

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
                            key={selectedItem?.id || selectedItem?._id || "new"}
                            isOpen={isModalOpen}
                            onClose={() => handleClose(false)}
                            onSave={handleSave}
                            item={selectedItem}
                            entityName="Tipos"
                            showDescription={true}
                            placeholder="Ej. Documental"
                        />
        </div>
    )
}