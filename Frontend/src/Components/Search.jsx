import DropMenu from "./DropMenu";

export default function Search(){
    return(
        <section className="bg-background w-full h-16 p-6 rounded-xl flex justify-between items-center gap-4 ">
            <div className="w-full h-8 flex items-center relative bg-Neutral-50/20 rounded-lg font-Inter">
                <img className="absolute pl-3 "
                    src="./src/assets/search.png"
                    alt="icon-search" />
                <input className="w-full h-16.5 pl-10 text-Neutral-50 text-md placeholder:text-[12px] placeholder:text-Neutral-50/80 placeholder:opacity-70 placeholder:leading-35"
                    type="text"
                    placeholder="Buscar por título, director o serial..."
                />
            </div>
            <div>
                <DropMenu/>
            </div>
        </section>
    )
}