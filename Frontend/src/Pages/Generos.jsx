
import PageInfo from "../Components/PageInfo"
import DataTable from "../Components/DataTable";
import GenreRow from "../Components/GeneroRow";
import Search from "../Components/Search"
import { genres } from "../Data/GenerosData";
export default function Generos() {

    const columns = [
        { key: "name", label: "Nombre & Código" },
        { key: "status", label: "Estado" },
        { key: "description", label: "Descripción narrativa" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" }
    ];

    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Generos'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />
                <DataTable
                    data={genres}
                    columns={columns}
                    renderRow={(genre) => (
                        <GenreRow
                            key={genre.id}
                            genre={genre}
                        />
                    )}
                    label="géneros registrados"
                />

            </main>
        </div>
    )
}