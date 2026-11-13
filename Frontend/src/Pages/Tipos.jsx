
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
export default function Tipos() {
    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">

            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Catálogo'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />


            </main>
        </div>
    )
}