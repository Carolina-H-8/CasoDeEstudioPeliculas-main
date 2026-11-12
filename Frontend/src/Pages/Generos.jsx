
import PageInfo from "../Components/PageInfo"
import DataTable from "../Components/DataTable";
import GenreRow from "../Components/GeneroRow";
import Search from "../Components/Search";
import {useGenero} from "../Hooks/useGenero";
export default function Generos() {

    const columns = [
        { key: "name", label: "Nombre & Código" },
        { key: "status", label: "Estado" },
        { key: "description", label: "Descripción narrativa" },
        { key: "createdAt", label: "Fecha creación" },
        { key: "updatedAt", label: "Fecha actualización" },
        { key: "actions", label: "Acciones" }
    ];
    const { generos, loading, error} = useGenero();


    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Generos'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />
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
                                key={genre.id || genre._id} genre={genre}
                            />
                        )}
                        label="géneros registrados"
                    />
                )}

            </main>
        </div>
    )
}