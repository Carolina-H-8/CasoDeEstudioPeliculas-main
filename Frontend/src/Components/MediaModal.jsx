import { useState } from "react";

export default function MediaModal({
    isOpen,
    onClose,
    onSave,
    item = null,
    tipos = [],
    generos = [],
    directores = [],
    productoras = [],
}) {
    const initialGenreNames =
        item?.genres?.map((g) => g.genre?.name || g.name || g).filter(Boolean) ||
        item?.genreNames ||
        [];

    const [formData, setFormData] = useState({
        serial: item?.serial || "",
        title: item?.title || "",
        synopsis: item?.synopsis || "",
        url: item?.url || "",
        coverImage: item?.coverImage || "",
        releaseYear: item?.releaseYear || new Date().getFullYear(),
        type: item?.type?.name || item?.type || "",
        director: item?.director?.name || item?.director?.names || item?.director || "",
        productionCompany:
            item?.productionCompany?.name || item?.productionCompany || "",
        genreNames: initialGenreNames,
    });
    const [saving, setSaving] = useState(false);

    if (!isOpen) return null;

    const isEditing = Boolean(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Toggle para seleccionar/deseleccionar múltiples géneros
    const handleGenreToggle = (genreName) => {
        setFormData((prev) => {
            const current = prev.genreNames || [];
            const exists = prev.genreNames.includes(genreName);
            return {
                ...prev,
                genreNames: exists
                    ? current.filter((name) => name !== genreName)
                    : [...current, genreName],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.serial.trim() || saving) return;

        setSaving(true);
        try {
            const success = await onSave(formData);
            if (success) onClose();
        } catch (err) {
            console.error("Error al guardar media:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="w-full max-w-2xl rounded-2xl bg-Neutral-2 border border-Neutral-50/40 p-6 shadow-xl my-8">
                <h3 className="text-lg font-semibold text-Neutral-50 mb-4">
                    {isEditing ? "Editar Producción" : "Nueva Producción Audiovisual"}
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Serial */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">Serial único *</label>
                        <input
                            type="text"
                            name="serial"
                            placeholder="Ej: MOV-2026-001"
                            value={formData.serial}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        />
                    </div>

                    {/* Título */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">Título *</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Ej: Origen"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        />
                    </div>

                    {/* Año de estreno */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">Año de estreno *</label>
                        <input
                            type="number"
                            name="releaseYear"
                            min="1888"
                            max="2100"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        />
                    </div>

                    {/* Tipo */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">Tipo *</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        >
                            <option value="">Selecciona un tipo...</option>
                            {tipos.map((t) => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Director */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">Director Principal *</label>
                        <select
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        >
                            <option value="">Selecciona un director...</option>
                            {directores.map((d) => {
                                const directorName = d.name || d.names;
                                return (
                                    <option key={d.id} value={directorName} className="bg-Neutral-2 text-white">
                                        {directorName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {/* Productora */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">Productora *</label>
                        <select
                            name="productionCompany"
                            value={formData.productionCompany}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        >
                            <option value="">Selecciona una productora...</option>
                            {productoras.map((p) => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Géneros (Selección múltiple con chips) */}
                    <div className="md:col-span-2">
                        <label className="block text-xs text-Neutral-50 mb-2">
                            Géneros asociados *
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {generos.map((g) => {
                                const selected = (formData.genreNames || []).includes(g.name);
                                return (
                                    <button
                                        key={g.id}
                                        type="button"
                                        onClick={() => handleGenreToggle(g.name)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${selected
                                                ? "bg-Primari border-Primari text-white"
                                                : "bg-Neutral/90 border-Neutral-50/40 text-Neutral-50 hover:border-Primari"
                                            }`}
                                    >
                                        {g.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    
                    {/* URL del video */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">URL de reproducción *</label>
                        <input
                            type="url"
                            name="url"
                            placeholder="https://..."
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        />
                    </div>

                    {/* URL de portada */}
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">URL de portada (Cover Image)</label>
                        <input
                            type="url"
                            name="coverImage"
                            placeholder="https://..."
                            value={formData.coverImage}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                        />
                    </div>

                    {/* Sinopsis */}
                    <div className="md:col-span-2">
                        <label className="block text-xs text-Neutral-50 mb-1">Sinopsis</label>
                        <textarea
                            name="synopsis"
                            rows="3"
                            placeholder="Resumen de la producción..."
                            value={formData.synopsis}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                        />
                    </div>

                    {/* Botones */}
                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="px-4 py-2 rounded-xl text-sm text-Neutral-50 hover:bg-Neutral/40 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 rounded-xl text-sm font-medium bg-Primari text-white hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear producción"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}