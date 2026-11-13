
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import ButtonAdd from "../Components/ButtonAdd"
import CatalogModal from "../Components/CatalogModal";
import DataTable from "../Components/DataTable";
import ProductoraRow from "../Components/ProductoraRow"
import { useProductora } from "../Hooks/useProductora"
import { useCrudModal } from "../Hooks/useCrudModal";
export default function Productora() {
    const columns = [
        { key: "name", label: "Nombre" },
        { key: "status", label: "Estado" },
        { key: "slogan", label: "Slogan" },
        { key: "description", label: "Descripción" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" },
    ];


    const { productoras, loading, error, addProducer, editProducer, removeProducer, } = useProductora();

    const { isModalOpen,
        selectedItem,
        handleOpenCreate,
        handleOpenEdit,
        handleClose,
        handleSave,
        handleDelete,
    } = useCrudModal({
        onAdd: addProducer,
        onEdit: editProducer,
        onRemove: removeProducer,
        entityLabel: "La Productora",
    });


    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Productoras'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search placeholder="Buscar Productora por nombre o descripción...">
                    <ButtonAdd onClick={handleOpenCreate} label="Nueva Productra" />
                </Search>
                {loading && (<p className="text-Neutral-50 text-center">Cargando Productoras.....</p>)}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}

                {!loading && !error && (
                    <DataTable
                        data={productoras}
                        columns={columns}
                        renderRow={(productora) => (
                            <ProductoraRow key={productora.id || productora._id} productora={productora} onEdit={handleOpenEdit} onDelete={handleDelete} />
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
                entityName="Productora"
                showDescription={true}
                placeholder="Ej. Warner Bross"
            />
        </div>
    )
}