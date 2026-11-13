
import DropMenu from "./DropMenu";
import { SearchIcon } from "./Icons";

export default function Search({ placeholder = "Buscar...", value, onChange, children }){
    return(
        <section className="bg-background w-full h-16 p-6 rounded-xl flex justify-between items-center gap-4 ">
            <section className="flex items-center gap-4">
                <div className="w-96 h-8 flex items-center relative bg-Neutral-50/20 rounded-lg font-Inter">
                    <SearchIcon className="text-Neutral-50/40 h-6 w-6 pl-2 absolute" />
                    <input className="w-full pl-10 text-Neutral-50 rounded-lg text-md border-2 border-transparent focus:border-Primari focus:outline-none placeholder:text-[12px] placeholder:text-Neutral-50/80 placeholder:opacity-70 placeholder:leading-35"
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        
                    />
                    
                </div>
                <div className="flex  gap-3">
                    <DropMenu name={"Genero: "} />
                    <DropMenu name={"Tipo: "} />
                </div>
           </section>
            <div className="flex items-center gap-3">
                {children}
            </div>
        </section>
    )
}