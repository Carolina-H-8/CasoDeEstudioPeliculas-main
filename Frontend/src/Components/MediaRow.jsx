export default function MediaRow({ media }) {
    return (
        <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors text-slate-300 text-sm">
            {/* Póster & Título */}
            <td className="py-4 px-4 flex items-center gap-3">
                <img
                    src={media.poster}
                    alt={media.title}
                    className="w-10 h-14 object-cover rounded-lg bg-slate-800"
                />
                <div>
                    <p className="font-semibold text-white">{media.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{media.synopsis}</p>
                </div>
            </td>

            {/* Serial */}
            <td className="py-4 px-4 font-mono text-xs text-slate-400">
                {media.serial}
            </td>

            {/* Tipo */}
            <td className="py-4 px-4">{media.type}</td>

            {/* Género */}
            <td className="py-4 px-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                    {media.genre}
                </span>
            </td>

            {/* Director */}
            <td className="py-4 px-4">{media.director}</td>

            {/* Productora */}
            <td className="py-4 px-4">{media.company}</td>

            {/* Año */}
            <td className="py-4 px-4">{media.year}</td>
        </tr>
    );
}