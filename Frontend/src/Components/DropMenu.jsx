
export default function DropMenu({ name, options = [], value = "", onChange }){
    return(
        <div className="flex items-center bg-Neutral-50/20 rounded-lg px-3 h-8 text-xs text-Neutral-50">
            <span className="opacity-70 mr-1">{name}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
                <option value="" className="bg-Neutral-2 text-white">
                    Todos
                </option>
                {options.map((opt) => {
                    const label = typeof opt === "string" ? opt : opt.name;
                    const key = typeof opt === "string" ? opt : opt.id || opt._id || opt.name;
                    return (
                        <option key={key} value={label} className="bg-Neutral-2 text-white">
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
        
    )
}