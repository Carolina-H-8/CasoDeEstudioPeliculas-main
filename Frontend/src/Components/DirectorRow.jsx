import { EditIcon, TrashIcon } from "./Icons";

export default function DirectorRow({ director, onEdit, onDelete }) {

    return (
        <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
            {/* Nombre */}
            <td className="py-4 px-4 font-medium text-white">
                {director.name}
            </td>

            {/* Estado */}
            <td className="py-4 px-4">
                <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${director.status === "Activo" || director.status === true
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                >
                    {director.status ? "Activo" : "Inactivo"}
                </span>
            </td>

            {/* Fechas */}
            <td className="py-4 px-4 text-sm text-slate-400">
                {new Date(director.createdAt).toLocaleDateString()}
            </td>
            <td className="py-4 px-4 text-sm text-slate-400">
                {new Date(director.updatedAt).toLocaleDateString()}
            </td>

            {/* Acciones */}
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onEdit(director)}
                        aria-label={`Editar ${director.name}`}
                        className="text-Neutral-50/40 hover:text-Primari transition-colors cursor-pointer"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(director)}
                        aria-label={`Eliminar ${director.name}`}
                        className="text-Neutral-50/40 hover:text-red-600 transition-colors cursor-pointer"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                </div>
            </td>
        </tr>
    );
}