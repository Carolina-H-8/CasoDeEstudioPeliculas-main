export default function DropMenu({name}){
    return(
        <button
            type="button"
            className="bg-Neutral-50/20 flex items-center justify-between w-38 h-8 py-2 pl-4 pr-8 rounded-lg font-Inter text-[12px] text-Neutral-50"
        >
            <span>Género: Todos</span>

            <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        
    )
}