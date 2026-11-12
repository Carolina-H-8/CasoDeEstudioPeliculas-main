export default function DropMenu({name}){
    return(
        <button
            type="button"
            className="bg-Neutral-50/20 flex items-center justify-between max-w-36  h-8 py-2 px-5 rounded-lg font-Inter text-[12px] text-Neutral-50"
        >
            <p>{name}<span>Todos</span></p>

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