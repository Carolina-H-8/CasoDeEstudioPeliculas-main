import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import DataTable from "../Components/DataTable"
//import { productions } from "../Data/MediaData"
import MediaRow from "../Components/MediaRow"
import { useMedia } from "../Hooks2/useMedia"
export default function Media(){
    const columns = [
        { key: "title", label: "PÓSTER & TÍTULO" },
        { key: "serial", label: "SERIAL ÚNICO" },
        { key: "type", label: "TIPO" },
        { key: "genre", label: "GÉNERO" },
        { key: "director", label: "DIRECTOR PRINCIPAL" },
        { key: "company", label: "PRODUCTORA" },
        { key: "year", label: "AÑO" },
    ];

    const {media,loading,error}= useMedia();
    
    return(
        <div className="w-full max-w-7xl flex flex-col  ">
           
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Media'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />
               {loading &&(<p className="text-Neutral-50 text-center">Cargando producciones.....</p>)}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}
                {!loading && !error &&(
                    <DataTable
                        data={media}
                        columns={columns}
                        renderRow={(item) => (
                            <MediaRow key={item.id} media={item} />
                        )}
                        label="producciones registradas"
                    />

                )}

            </main>

        </div>

    )
}

