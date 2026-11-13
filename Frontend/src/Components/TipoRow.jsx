import { EditIcon, TrashIcon } from "./Icons";

export default function TipoRow({ tipo, onEdit, onDelete }) {
    if (!tipo) return null;

    return (
        <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
            {/* Nombre */}
            <td className="py-4 px-4 font-medium text-white">
                {tipo.name}
            </td>

            {/* Descripción */}
            <td className="py-4 px-4 text-sm text-slate-400 max-w-md truncate">
                {tipo.description || "Sin descripción"}
            </td>

            {/* Fecha creación */}
            <td className="py-4 px-4 text-sm text-slate-400">
                {tipo.createdAt
                    ? new Date(tipo.createdAt).toLocaleDateString()
                    : "-"}
            </td>

            {/* Fecha actualización */}
            <td className="py-4 px-4 text-sm text-slate-400">
                {tipo.updatedAt
                    ? new Date(tipo.updatedAt).toLocaleDateString()
                    : "-"}
            </td>

            {/* Acciones */}
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onEdit(tipo)}
                        aria-label={`Editar ${tipo.name}`}
                        className="text-Neutral-50/40 hover:text-Primari transition-colors cursor-pointer"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(tipo)}
                        aria-label={`Eliminar ${tipo.name}`}
                        className="text-Neutral-50/40 hover:text-red-600 transition-colors cursor-pointer"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                </div>
            </td>
        </tr>
    );
}