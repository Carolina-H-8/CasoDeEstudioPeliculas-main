
import { useState } from "react";

export default function DataTable({
    data = [],
    columns = [],
    renderRow,
    itemsPerPage = 5,
    label = "registros"
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(data.length / itemsPerPage)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentData = data.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="w-full overflow-hidden rounded-xl border border-Neutral-50/10 bg-background font-Inter">

            {/* Tabla */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-275 border-collapse text-left">

                    {/* Encabezados */}
                    <thead className="bg-Neutral-2 text-[11px] uppercase tracking-wide text-Neutral-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-4 py-4 font-semibold ${column.className || ""}`}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Filas */}
                    <tbody className="divide-y divide-Neutral-50/10">

                        {currentData.length > 0 ? (
                            currentData.map((item) => renderRow(item))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-8 text-center text-sm text-Neutral-50"
                                >
                                    No hay {label} registrados.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between gap-4 bg-Neutral px-4 py-3">

                <span className="text-xs text-Neutral-50">
                    Mostrando {currentData.length} de {data.length} {label}
                </span>

                <div className="flex items-center gap-1">

                    <button
                        onClick={() =>
                            setCurrentPage((page) => Math.max(1, page - 1))
                        }
                        disabled={currentPage === 1}
                        className="rounded-md px-3 py-1.5 text-xs text-Neutral-50 transition hover:bg-Neutral-50/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Anterior
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`h-6 min-w-6 rounded-md px-2 text-xs transition ${currentPage === page
                                    ? "bg-Primari font-semibold text-Neutral"
                                    : "text-Neutral-50 hover:bg-Neutral-50/20"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setCurrentPage((page) =>
                                Math.min(totalPages, page + 1)
                            )
                        }
                        disabled={currentPage === totalPages || data.length === 0}
                        className="rounded-md px-3 py-1.5 text-xs text-Neutral-50 transition hover:bg-Neutral-50/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Siguiente
                    </button>

                </div>
            </div>

        </div>
    );
}
