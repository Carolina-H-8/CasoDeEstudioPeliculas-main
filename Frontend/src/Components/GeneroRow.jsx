import { EditIcon, TrashIcon } from "./Icons";
export default function GenreRow({ genre }) {
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
            <td className="px-4 py-4">
                <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${genre.status === "Activo"
                            ? "bg-emerald-100 text-Primari"
                            : "bg-Neutral-50 text-Neutral-2"
                        }`}
                >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {genre.status}
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
                {genre.createdAt}
            </td>

            {/* Fecha actualización */}
            <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-Neutral-50/40">
                {genre.updatedAt}
            </td>

            {/* Acciones */}
            <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-4">
                    <button
                        type="button"
                        aria-label={`Editar ${genre.name}`}
                        className="text-Neutral-50/40 hover:text-Primari"
                    >
                        <EditIcon className="w-6 h-6" />
                    </button>
                    <button
                        type="button"
                        aria-label={`Editar ${genre.name}`}
                        className="text-Neutral-50/40 hover:text-red-600"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>

                    
                </div>
            </td>

        </tr>
    );
}
