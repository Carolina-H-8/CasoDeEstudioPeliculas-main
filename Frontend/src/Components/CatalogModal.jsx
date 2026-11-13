import { useState } from "react";

export default function CatalogModal({
    isOpen,
    onClose,
    onSave,
    item = null,
    entityName = "Registro", // Ej: "Género", "Director", "Tipo"
    showDescription = false,
    showSlogan = false,
    placeholder = "Escribe el nombre...",
}) {
    // Soporta tanto item.name (Géneros) como item.names (si tu modelo Director usa 'names')
    const [name, setName] = useState(item?.name || item?.names || "");
    const [slogan, setSlogan] = useState(item?.slogan || "");
    const [description, setDescription] = useState(item?.description || "");
    const [saving, setSaving] = useState(false);

    if (!isOpen) return null;

    const isEditing = Boolean(item);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || saving) return;

        setSaving(true);
        try {
            const payload = {
                name: name.trim(),
                ...(showSlogan && { slogan: slogan.trim() }),
                ...(showDescription && { description: description.trim() }),
            };

            const success = await onSave(payload);
            if (success) {
                onClose();
            }
        } catch (err) {
            console.error("Error al guardar:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-md rounded-2xl bg-Neutral-2 border border-Neutral-50/40 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-Neutral-50 mb-4">
                    {isEditing ? `Editar ${entityName}` : `Nuevo ${entityName}`}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">
                            Nombre del {entityName.toLowerCase()}
                        </label>
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            required
                        />
                    </div>
                    {showSlogan &&(
                        <div>
                            <label className="block text-xs text-Neutral-50 mb-1">
                                Slogan
                            </label>
                            <input
                                type="text"
                                placeholder="Ej: Donde nacen las grandes historias..."
                                value={slogan}
                                onChange={(e) => setSlogan(e.target.value)}
                                className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            />
                        </div>

                    )}

                    {showDescription && (
                        <div>
                            <label className="block text-xs text-Neutral-50 mb-1">
                                Descripción 
                            </label>
                            <textarea
                                rows="3"
                                placeholder={`Describe brevemente este ${entityName.toLowerCase()}...`}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-Primari"
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-2">
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
                            {saving
                                ? "Guardando..."
                                : isEditing
                                    ? "Guardar cambios"
                                    : `Crear ${entityName.toLowerCase()}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}