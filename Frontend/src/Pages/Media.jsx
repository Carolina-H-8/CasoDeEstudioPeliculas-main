import Header from "../Components/Header"
import PageInfo from "../Components/PageInfo"
import Search from "../Components/Search"
export default function Media(){
    return(
        <div className="w-full max-w-7xl flex flex-col  ">
            <Header />
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Media'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />


            </main>

        </div>

    )
}