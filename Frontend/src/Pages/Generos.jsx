import Header from "../Components/Header"
import PageInfo from "../Components/PageInfo"
import ProductionTable from "../Components/ProductionTable"
import Search from "../Components/Search"
export default function Generos() {
    return (
        <div className="w-full h-32 max-w-7xl flex flex-col ">
            <Header />
            <main className="w-full flex flex-col gap-8" >
                <PageInfo title={"REPOSITORIO DIGITAL INSTITUCIONAL"} name={'Gestión de Generos'} text={"Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."} />
                <Search />
                <ProductionTable/>


            </main>
        </div>
    )
}