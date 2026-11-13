import { EditIcon, TrashIcon } from "./Icons";

export default function ProductoraRow({ productora, onEdit, onDelete }) {
    const isActive = productora.status === "Activo" || productora.status === true;

    return (
        <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
            {/* Nombre */}
            <td className="py-4 px-4 font-medium text-white">
                {productora.name}
            </td>

            {/* Estado */}
            <td className="py-4 px-4">
                <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                >
                    {isActive ? "Activo" : "Inactivo"}
                </span>
            </td>

            {/* Slogan */}
            <td className="py-4 px-4 text-sm text-slate-300">
                {productora.slogan || "Sin slogan"}
            </td>

            {/* Descripción */}
            <td className="py-4 px-4 text-sm text-slate-400 max-w-xs truncate">
                {productora.description || "Sin descripción"}
            </td>

            {/* Fecha creación */}
            <td className="py-4 px-4 text-sm text-slate-400">
                {productora.createdAt
                    ? new Date(productora.createdAt).toLocaleDateString()
                    : "-"}
            </td>

            {/* Fecha actualización */}
            <td className="py-4 px-4 text-sm text-slate-400">
                {productora.updatedAt
                    ? new Date(productora.updatedAt).toLocaleDateString()
                    : "-"}
            </td>

            {/* Acciones */}
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onEdit(productora)}
                        aria-label={`Editar ${productora.name}`}
                        className="text-Neutral-50/40 hover:text-Primari transition-colors cursor-pointer"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(productora)}
                        aria-label={`Eliminar ${productora.name}`}
                        className="text-Neutral-50/40 hover:text-red-600 transition-colors cursor-pointer"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                </div>
            </td>
        </tr>
    );
}