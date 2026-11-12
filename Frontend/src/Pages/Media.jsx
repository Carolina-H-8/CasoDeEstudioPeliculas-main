import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
import DataTable from "../Components/DataTable"
import { productions } from "../Data/MediaData"
import MediaRow from "../Components/MediaRow"
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
    return(
        <div className="w-full max-w-7xl flex flex-col  ">
           
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Media'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />
                <DataTable
                    data={productions}
                    columns={columns}
                    renderRow={(item) => (
                        <MediaRow key={item.id} media={item} />
                    )}
                    label="producciones registradas"
                />
              

            </main>

        </div>

    )
}