import { EditIcon, TrashIcon } from "./Icons";
export default function GenreRow({ genre, onEdit, onDelete }) {

    const formatDate=(dateString)=>{
        if (!dateString) return "-";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-";

        return date.toLocaleString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        
        });
    }

    const isActivo =
        genre.status === true || String(genre.status).toLowerCase() === "activo";

    return (
        <tr className="transition-colors hover:bg-Neutral-2/20">

            {/* Nombre y código */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3 min-w-60">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-Primari">
                        <span className="text-lg">✦</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-base font-medium text-Neutral-50">
                            {genre.name}
                        </span>

                        <span className="font-mono text-xs text-Primari">
                            {genre.code}
                        </span>
                    </div>

                </div>
            </td>

            {/* Estado */}
            <td className="px-4 py-4 whitespace-nowrap">
                <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${isActivo
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-red-500/15 text-red-400 border-red-500/30"
                        }`}
                >
                    {isActivo ? "Activo" : "Inactivo"}
                </span>
            </td>

            {/* Descripción */}
            <td className="px-4 py-4 max-w-120">
                <p className="text-sm text-Neutral-50/40 line-clamp-2">
                    {genre.description}
                </p>
            </td>

            {/* Fecha creación */}
            <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-Neutral-50/40">
                {formatDate(genre.createdAt)}
            </td>

            {/* Fecha actualización */}
            <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-Neutral-50/40">
                {formatDate(genre.updatedAt)}
            </td>

            {/* Acciones */}
            <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={()=>onEdit(genre)}
                        aria-label={`Editar ${genre.name}`}
                        className="text-Neutral-50/40 hover:text-Primari hover:cursor-pointer"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>
                    <button
                        type="button"
                        onClick={()=>onDelete(genre)}
                        aria-label={`Borrar ${genre    }`}
                        className="text-Neutral-50/40 hover:text-red-600 hover:cursor-pointer"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>

                    
                </div>
            </td>

        </tr>
    );
}
