import { ArrowBadgeDownIcon } from "./Icons"
export default function DropMenu({name}){
    return(
        <button
            type="button"
            className="bg-Neutral-50/20 flex items-center justify-between max-w-36  h-8 py-2 px-5 rounded-lg font-Inter text-[12px] text-Neutral-50"
        >
            <p>{name}<span>Todos</span></p>
            <ArrowBadgeDownIcon />
        </button>
        
    )
}