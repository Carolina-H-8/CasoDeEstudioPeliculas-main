import InfoCard from "./InfoCard.jsx"
export default function PageInfo(){
    return(
        <section className="bg-background w-full h-31 p-6 rounded-xl flex justify-between items-center ">
            <div className="w-fit h-20 text-Neutral-50">
                <p className="text-Primari font-Inter font-semibold text-[11px]">REPOSITORIO DIGITAL INSTITUCIONAL</p>
                <h2 className="text-3xl font-Jakarta font-semibold">Gestión de Media</h2>
                <p className="font-Inter text-sm text-Neutral-50/80">Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia.</p>

            </div>
            <div className="flex gap-4">
                <InfoCard name={"Peliculas"} amount={"6"} imgUrl={"src/assets/Background.svg"} />
                <InfoCard name={"Peliculas"} amount={"6"} imgUrl={"src/assets/Background.svg"} />
            </div>

        </section>
    )
}