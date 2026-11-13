import { TrashIcon,EditIcon } from "./Icons";

export default function MediaRow({ media,onEdit,onDelete }) {

    const genreList = Array.isArray(media.genres)
        ? media.genres
            .map((g) => g.genre?.name || g.name || (typeof g === "string" ? g : null))
            .filter(Boolean)
        : Array.isArray(media.genreNames)
            ? media.genreNames
            : media.genre?.name
                ? [media.genre.name]
                : [];

    return (
        <tr className="border-b border-Neutral-2/40 hover:bg-Neutral-2/20 transition-colors text-Neutral-50/70 text-sm">
            {/* Póster & Título */}
            <td className="py-4 px-4 flex items-center gap-3">
                <img
                    src={media.poster || media.coverImage || "/images/placeholder.jpg"}
                    alt={media.title}
                    className="w-10 h-14 object-cover rounded-lg bg-Neutral-2"
                />
                <div>
                    <p className="font-semibold text-Neutral-50">{media.title}</p>
                    <p className="text-xs text-Neutral-50/40 line-clamp-1">{media.synopsis}</p>
                </div>
            </td>

            {/* Serial */}
            <td className="py-4 px-4 font-mono text-xs text-Neutral-50/40">
                {media.serial}
            </td>

            {/* Tipo */}
            <td className="py-4 px-4">{media.type?.name || media.type || "Sin tipo"}</td>

            {/* Género */}
            <td className="px-4 py-3 text-sm">
                {genreList.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {genreList.map((genreName, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            >
                                {genreName}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400">
                        Sin género
                    </span>
                )}
            </td>

            {/* Director */}
            <td className="py-4 px-4">{media.director?.name || media.director || "Sin director"}</td>

            {/* Productora */}
            <td className="py-4 px-4">{media.productionCompany?.name ||
                media.company?.name ||
                media.company ||
                "Sin productora"}</td>

            {/* Año */}
            <td className="py-4 px-4">{media.releaseYear || media.year}</td>
            {/* Acciones */}
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => onEdit(media)}
                                    aria-label={`Editar ${media.name}`}
                                    className="text-Neutral-50/40 hover:text-Primari transition-colors cursor-pointer"
                                >
                                    <EditIcon className="w-6 h-6" />
                                </button>
            
                                <button
                                    type="button"
                                    onClick={() => onDelete(media)}
                                    aria-label={`Eliminar ${media.name}`}
                                    className="text-Neutral-50/40 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    <TrashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
        </tr>
    );
}