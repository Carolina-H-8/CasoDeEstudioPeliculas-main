import { useState } from "react";

export default function ProductionTable(){
    const [currentPage, setCurrentPage] = useState(1);
    const productions = [
        {
            id: 1,
            title: "Interstellar",
            synopsis: "Exploración interestelar y supervivencia humana",
            serial: "IUD-MED-2024-0089",
            type: "Película",
            genre: "Ciencia Ficción",
            director: "Christopher Nolan",
            company: "Paramount Pictures",
            year: 2014,
            poster: "/images/interstellar.jpg",
        },
        {
            id: 2,
            title: "La Vendedora de Rosas",
            synopsis: "Realismo urbano colombiano y resistencia social",
            serial: "IUD-MED-2024-0012",
            type: "Película",
            genre: "Drama",
            director: "Victor Gaviria",
            company: "Señal Colombia / RTVC",
            year: 1998,
            poster: "/images/vendedora-rosas.jpg",
        },
        {
            id: 3,
            title: "Stranger Things",
            synopsis: "Misterios paranormales y experimentos en Hawkins",
            serial: "IUD-MED-2024-0045",
            type: "Serie",
            genre: "Ciencia Ficción",
            director: "Denis Villeneuve",
            company: "Warner Bros.",
            year: 2016,
            poster: "/images/stranger-things.jpg",
        },
        {
            id: 4,
            title: "El Laberinto del Fauno",
            synopsis: "Fantasía oscura de posguerra española",
            serial: "IUD-MED-2024-0077",
            type: "Película",
            genre: "Drama",
            director: "Guillermo del Toro",
            company: "A24",
            year: 2006,
            poster: "/images/laberinto-fauno.jpg",
        },
        {
            id: 5,
            title: "Barbie: Crónicas del Cine",
            synopsis: "Sátira contemporánea y producción audiovisual moderna",
            serial: "IUD-MED-2024-0091",
            type: "Película",
            genre: "Aventura",
            director: "Greta Gerwig",
            company: "Warner Bros.",
            year: 2023,
            poster: "/images/barbie.jpg",
        },
        {
            id: 6,
            title: "Inception",
            synopsis: "Un viaje a través del mundo de los sueños",
            serial: "IUD-MED-2024-0092",
            type: "Película",
            genre: "Ciencia Ficción",
            director: "Christopher Nolan",
            company: "Warner Bros.",
            year: 2010,
            poster: "/images/inception.jpg",
        },
        {
            id: 7,
            title: "Dark",
            synopsis: "Misterios y viajes a través del tiempo",
            serial: "IUD-MED-2024-0093",
            type: "Serie",
            genre: "Suspenso",
            director: "Baran bo Odar",
            company: "Netflix",
            year: 2017,
            poster: "/images/dark.jpg",
        },
        {
            id: 8,
            title: "Coco",
            synopsis: "Una aventura familiar en el mundo de los muertos",
            serial: "IUD-MED-2024-0094",
            type: "Película",
            genre: "Animación",
            director: "Lee Unkrich",
            company: "Pixar",
            year: 2017,
            poster: "/images/coco.jpg",
        },
    ];
    const itemsPerPage = 5;

    const totalPages = Math.ceil(productions.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProductions = productions.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const initials = (name) =>
        name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();


    return (
        <div className="w-full overflow-hidden rounded-xl border border-Neutral-50/10 bg-background font-Inter">

            {/* Tabla */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-275 border-collapse text-left">

                    {/* Encabezado */}
                    <thead className="bg-Neutral-2 text-[11px] uppercase tracking-wide text-Neutral-50">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Póster & Título</th>
                            <th className="px-4 py-4 font-semibold">Serial único</th>
                            <th className="px-4 py-4 font-semibold">Tipo</th>
                            <th className="px-4 py-4 font-semibold">Género</th>
                            <th className="px-4 py-4 font-semibold">Director principal</th>
                            <th className="px-4 py-4 font-semibold">Productora</th>
                            <th className="px-4 py-4 font-semibold">Año</th>
                        </tr>
                    </thead>

                    {/* Cuerpo */}
                    <tbody className="divide-y divide-Neutral-50/10 ">

                        {currentProductions.map((production) => (
                            <tr
                                key={production.id}
                                className="transition-colors hover:bg-Neutral-2/20"
                            >

                                {/* Póster y título */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4 min-w-102.5">

                                        <img
                                            src={production.poster}
                                            alt={production.title}
                                            className="h-16 w-12 rounded-md object-cover border border-Neutral-50/10"
                                        />

                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[16px] font-medium text-slate-200">
                                                {production.title}
                                            </span>

                                            <span className="text-xs text-slate-500">
                                                {production.synopsis}
                                            </span>
                                        </div>

                                    </div>
                                </td>

                                {/* Serial */}
                                <td className="px-4 py-4">
                                    <span className="rounded-md bg-emerald-400/10 px-2 py-1 font-mono text-xs text-emerald-400 whitespace-nowrap">
                                        {production.serial}
                                    </span>
                                </td>

                                {/* Tipo */}
                                <td className="px-4 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${production.type === "Película"
                                                ? "bg-cyan-400/10 text-cyan-400"
                                                : "bg-orange-400/10 text-orange-400"
                                            }`}
                                    >
                                        {production.type === "Película" ? "▣" : "▢"}
                                        {production.type}
                                    </span>
                                </td>

                                {/* Género */}
                                <td className="px-4 py-4 text-xs font-medium text-slate-300 whitespace-nowrap">
                                    {production.genre}
                                </td>

                                {/* Director */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-semibold text-emerald-400">
                                            {initials(production.director)}
                                        </span>

                                        <span className="text-sm text-slate-300">
                                            {production.director}
                                        </span>
                                    </div>
                                </td>

                                {/* Productora */}
                                <td className="px-4 py-4 text-xs text-slate-400 whitespace-nowrap">
                                    {production.company}
                                </td>

                                {/* Año */}
                                <td className="px-4 py-4 text-xs text-slate-400">
                                    {production.year}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between gap-4 bg-Neutral px-4 py-3">

                <span className="text-xs text-Neutral-50">
                    Mostrando {currentProductions.length} de {productions.length} producciones indexadas
                </span>

                <div className="flex items-center gap-1">

                    <button
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        disabled={currentPage === 1}
                        className="rounded-md px-3 py-1.5 text-xs text-Neutral-50 transition hover:bg-Neutral-50/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
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
                        )
                    )}

                    <button
                        onClick={() =>
                            setCurrentPage((page) => Math.min(totalPages, page + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-md px-3 py-1.5 text-xs text-Neutral-50 transition hover:bg-Neutral-50/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Siguiente
                    </button>

                </div>
            </div>

        </div>
    );
}