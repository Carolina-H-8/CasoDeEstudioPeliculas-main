
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import ButtonAdd from "../Components/ButtonAdd"
import DataTable from "../Components/DataTable"
import DirectorRow from "../Components/DirectorRow";
import CatalogModal from "../Components/CatalogModal";
export default function Directores() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        { key: "name", label: "Nombre " },
        { key: "status", label: "Estado" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" }
    ];


    // Abrir modal con los datos de la fila seleccionada
    const handleOpenEdit = (director) => {
        //setSelectedGenre(genre);
        //setIsModalOpen(true);
    };

  

    // Confirmar y eliminar
    const handleDelete = async (director) => {
        const confirmed = window.confirm(
            `¿Estás seguro de eliminar el género "${director.name}"?`
        );
        if (!confirmed) return;

    };


    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Directores'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search placeholder="Buscar género por nombre o descripción...">
                    <ButtonAdd onClick={""} label="Nuevo Director" />
                </Search>

                <DataTable
                    data={""}
                    columns={columns}
                    renderRow={(director) => (
                        <DirectorRow key={director.id || director._id} genre={director} onEdit={handleOpenEdit} onDelete={handleDelete} />
                    )}
                    label="géneros registrados"
                />



            </main>
            <CatalogModal
                            key={9}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={""}
                            item={""}
                            entityName="Directores"
                            showDescription={true}
                            placeholder="Ej. Thon"
                        />
        </div>
    )
}