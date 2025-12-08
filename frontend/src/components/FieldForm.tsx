import { useState, useEffect } from "react";

export type Field = {
    field_id?: number;
    complex_id?: number | null;
    name: string;
    sports: string[];
    football_types: string[]; // Mantengo esto por compatibilidad, aunque ahora los tipos de fútbol están en la lista principal
    start_rounding: string;
    floor_type: string;
    attributes: string[];
};

interface FieldFormProps {
    initialData?: Field | null;
    onSubmit: (data: Omit<Field, "field_id">) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

const SPORTS_OPTIONS = [
    "Básquet 3vs3", "Básquet 5vs5", "Beach Tenis", "Beach Volley", "Frontón",
    "Fútbol 4", "Fútbol 5", "Fútbol 6", "Fútbol 7", "Fútbol 8", "Fútbol 9", "Fútbol 10", "Fútbol 11",
    "Fútgolf", "Futvóley", "Golf Virtual", "Handball", "Hockey", "Natación",
    "Padbol", "Pádel", "Padel Single", "Pickleball", "Ping Pong", "Squash", "Surf", "Tenis", "Vóley"
];

const FLOOR_OPTIONS = [
    "Parquet", "Flotante", "Sintético", "Cemento", "Cesped Natural", "Muro",
    "Sintético y Blindex", "Sintético y Muro", "Cemento y Blindex",
    "Polvo de Ladrillo", "Court-Flex", "Agua", "Arena"
];

const ROUNDING_OPTIONS = [
    { value: "No redondear", label: "No redondear" },
    { value: "En punto (XX:00)", label: "En punto (XX:00)" },
    { value: "Y media (XX:30)", label: "Y media (XX:30)" }
];

const ATTRIBUTE_OPTIONS = ["Techada", "Iluminación"];

export default function FieldForm({ initialData, onSubmit, onCancel, isEditing = false }: FieldFormProps) {
    const [formData, setFormData] = useState<Omit<Field, "field_id">>({
        name: "",
        sports: [],
        football_types: [],
        start_rounding: "No redondear",
        floor_type: "Sintético",
        attributes: [],
        complex_id: null
    });

    const [selectedSport, setSelectedSport] = useState(SPORTS_OPTIONS[0]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                sports: initialData.sports || [],
                football_types: initialData.football_types || [],
                start_rounding: initialData.start_rounding || "No redondear",
                floor_type: initialData.floor_type || "Sintético",
                attributes: initialData.attributes || [],
                complex_id: initialData.complex_id || null
            });
        }
    }, [initialData]);

    // --- Agregar deporte ---
    function addSport() {
        if (formData.sports.includes(selectedSport)) {
            alert(`${selectedSport} ya está agregado`);
            return;
        }

        setFormData({
            ...formData,
            sports: [...formData.sports, selectedSport]
        });
    }

    // --- Quitar deporte ---
    function removeSport(sport: string) {
        const sports = formData.sports.filter(s => s !== sport);
        setFormData({ ...formData, sports });
    }

    // --- Manejo de atributos ---
    function toggleAttribute(attr: string) {
        const attributes = formData.attributes.includes(attr)
            ? formData.attributes.filter(a => a !== attr)
            : [...formData.attributes, attr];
        setFormData({ ...formData, attributes });
    }

    // --- Validación ---
    const isSubmitDisabled =
        formData.name.trim().length < 1 ||
        formData.sports.length === 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Nombre
                </label>
                <input
                    className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    placeholder="Ej: Cancha Principal"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">En este campo pueden escribir libre lo que quieran</p>
            </div>

            {/* Deportes */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Deportes
                </label>

                {/* Selector + Botón Agregar */}
                <div className="flex gap-3 mb-3">
                    <select
                        className="flex-1 border-2 border-gray-300 dark:border-gray-600 px-3 py-2.5 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                    >
                        {SPORTS_OPTIONS.map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={addSport}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar
                    </button>
                </div>

                {/* Lista de deportes agregados */}
                {formData.sports.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Deportes seleccionados:</p>
                        <div className="flex flex-wrap gap-2">
                            {formData.sports.map(sport => (
                                <span key={sport} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
                                    <span className="font-medium">{sport}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSport(sport)}
                                        className="text-blue-400 hover:text-blue-600 font-bold"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Configuración Técnica (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Forzar Inicio (Radio) */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Forzar Inicio
                    </label>
                    <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
                        {ROUNDING_OPTIONS.map(option => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="start_rounding"
                                    value={option.value}
                                    checked={formData.start_rounding === option.value}
                                    onChange={(e) =>
                                        setFormData({ ...formData, start_rounding: e.target.value })
                                    }
                                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Piso (Select) */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Tipo de Piso
                    </label>
                    <select
                        className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.floor_type}
                        onChange={(e) =>
                            setFormData({ ...formData, floor_type: e.target.value })
                        }
                    >
                        {FLOOR_OPTIONS.map(floor => (
                            <option key={floor} value={floor}>{floor}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Atributos (Checkbox) */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Atributos
                </label>
                <div className="flex gap-4">
                    {ATTRIBUTE_OPTIONS.map(attr => (
                        <label key={attr} className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={formData.attributes.includes(attr)}
                                onChange={() => toggleAttribute(attr)}
                                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{attr}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 mt-8 justify-end pt-4 border-t dark:border-gray-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-5 py-2 rounded-lg font-medium transition-colors"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`px-5 py-2 rounded-lg text-white font-medium transition-colors shadow-sm
                        ${isSubmitDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                        }
                    `}
                >
                    {isEditing ? "Guardar Cambios" : "Agregar Cancha"}
                </button>
            </div>
        </form>
    );
}
