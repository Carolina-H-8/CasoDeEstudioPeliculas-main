
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import ButtonAdd from "../Components/ButtonAdd"
import DataTable from "../Components/DataTable"
import DirectorRow from "../Components/DirectorRow";
import CatalogModal from "../Components/CatalogModal";
import { getDirectors, createDirector, updateDirector, deleteDirector } from '../Services/directorService';
import { useEntityCrud } from "../Hooks/useEntityCrud";
import { useCrudModal } from "../Hooks/useCrudModal";
export default function Directores() {

    

    const columns = [
        { key: "name", label: "Nombre " },
        { key: "status", label: "Estado" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" }
    ];

   const { items: director,
           loading,
           error,
           addItem,
           editItem,
           removeItem, } = useEntityCrud({
               getAll: getDirectors,
               createItem: createDirector,
               updateItem: updateDirector,
               deleteItem: deleteDirector,
               entityName: "El Director",
           });

    const{
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
        entityLabel: "El Director",
        formatPayload: (data) => ({
            name: data.name.trim(),
            ...(data.status && { status: data.status }),
        }),
    })
   

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
                        data={director}
                        columns={columns}
                        renderRow={(director) => (
                            <DirectorRow key={director.id || director._id} director={director} onEdit={handleOpenEdit} onDelete={handleDelete} />
                        )}
                        label="géneros registrados"
                    />

                )}


            </main>
            <CatalogModal
                key={selectedItem?.id || selectedItem?._id || "new"}
                isOpen={isModalOpen}
                onClose={() => handleClose(false)}
                onSave={handleSave}
                item={selectedItem}
                entityName="Directores"
                showDescription={false}
                placeholder="Ej. Christopher Nolan"
            />
        </div>
    )
}