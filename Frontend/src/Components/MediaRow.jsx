export default function MediaRow({ media }) {
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
            <td className="py-4 px-4">
                <span className="px-2.5 py-1 rounded-full text-xs  bg-Primari/20 text-Primari">
                    {media.genre?.name || media.genre || "Sin género"}
                </span>
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
        </tr>
    );
}