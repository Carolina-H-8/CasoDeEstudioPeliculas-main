import { useState } from "react";

export default function GeneroModal({ isOpen, onClose, onSave, genre = null }) {
    const [name, setName] = useState(genre?.name || "");
    const [description, setDescription] = useState(genre?.description || "");
    const [saving, setSaving] = useState(false);

    if (!isOpen) return null;

    const isEditing = Boolean(genre);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || saving) return;

        setSaving(true);
        const success = await onSave({
            name: name.trim(),
            description: description.trim(),
        });
        setSaving(false);

        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-md rounded-2xl bg-Neutral-2 border border-Neutral-50/40 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-Neutral-50 mb-4">
                    {isEditing ? "Editar Género" : "Nuevo Género"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">
                            Nombre del género
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Ciencia Ficción"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-Neutral-50 focus:outline-none focus:border-Primari"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-Neutral-50 mb-1">
                            Descripción narrativa
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Describe brevemente este género..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl bg-Neutral/90 border border-Neutral-50/40 px-3 py-2 text-sm text-Neutral-50 focus:outline-none focus:border-Primari"
                        />
                    </div>

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
                            className="px-4 py-2 rounded-xl text-sm font-medium bg-Primari text-white hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            {saving
                                ? "Guardando..."
                                : isEditing
                                    ? "Guardar cambios"
                                    : "Crear género"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}