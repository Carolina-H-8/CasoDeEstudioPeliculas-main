export default function ButtonAdd({onClick,label="Agregar"}){
    return(
        <button className="bg-Primari2 hover:bg-Primari h-8 w-56 px-6 py-2 rounded-lg flex items-center justify-between text-Neutral font-Inter font-semibold"
            type="button"
            onClick={onClick}
            aria-label={label}
        >
            <img src="src/assets/PlusIcons.svg" alt="add button" />
            <span>{label}</span>
        </button>
    )
}