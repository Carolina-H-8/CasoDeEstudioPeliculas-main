import InfoCard from "./InfoCard.jsx"
import { SerieIcon, MovieIcon } from "./Icons";
export default function PageInfo({
    badge,
    title,
    description,
    peliculasCount,
    seriesCount,
 }){
    return(
        <section className="bg-background w-full h-31 p-6 rounded-xl flex justify-between items-center ">
            <div className="w-fit h-20 text-Neutral-50">
                <p className="text-Primari font-Inter font-semibold text-[11px]">{badge}</p>
                <h2 className="text-3xl font-Jakarta font-semibold">{title}</h2>
                <p className="font-Inter text-sm text-Neutral-50/80">{description}</p>

            </div>
            {(peliculasCount !== undefined || seriesCount !== undefined) &&(
                <div className="flex gap-4">
                    <InfoCard name={"Peliculas"} amount={peliculasCount} children={<MovieIcon className="text-Tertiary w-7 h-7" />} />
                    <InfoCard name={"Series"} amount={seriesCount} children={<SerieIcon className="text-red-600 w-7 h-7" />} />
                </div>
            )}

        </section>
    )
}