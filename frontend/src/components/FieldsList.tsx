import { useEffect, useState } from "react";
import FieldItem from "./FieldItem";

type Field = {
    field_id: number;
    complex_id?: number;
    name: string;
    sports: string[];
    football_types: string[];
    start_rounding: string;
    floor_type: string;
    attributes: string[];
};

const SPORTS_OPTIONS = ["Fútbol", "Pádel", "Tenis", "Basquetbol", "Vóley", "Hockey"];
const FOOTBALL_TYPES = ["5", "7", "11"];

export default function FieldsList() {
    const [fields, setFields] = useState<Field[]>([]);
    const [loading, setLoading] = useState(true);

    // Agregar
    const [showAddForm, setShowAddForm] = useState(false);
    const [newField, setNewField] = useState({
        name: "",
        sports: [] as string[],
        football_types: [] as string[],
        start_rounding: "none",
        floor_type: "synthetic",
        attributes: [] as string[]
    });
    const [selectedSport, setSelectedSport] = useState("Fútbol");

    // Editar
    const [editing, setEditing] = useState(false);
    const [editFieldData, setEditFieldData] = useState<Field | null>(null);
    const [editSelectedSport, setEditSelectedSport] = useState("Fútbol");

    // Eliminar
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fieldToDelete, setFieldToDelete] = useState<Field | null>(null);

    // --- Fetch inicial ---
    async function fetchFields() {
        try {
            const res = await fetch("http://localhost:5000/fields");
            const data = await res.json();
            setFields(data);
        } catch (err) {
            console.error("Error al cargar canchas:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFields();
    }, []);

    // --- Eliminar ---
    function askDeleteField(field: Field) {
        setFieldToDelete(field);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        if (!fieldToDelete) return;

        try {
            await fetch(`http://localhost:5000/fields/${fieldToDelete.field_id}`, {
                method: "DELETE",
            });

            setFields(fields.filter((f) => f.field_id !== fieldToDelete.field_id));
            setShowDeleteModal(false);
            setFieldToDelete(null);
        } catch (err) {
            console.error("Error al eliminar:", err);
            alert("Error al eliminar la cancha");
        }
    }

    // --- Editar ---
    function editField(field: Field) {
        setEditing(true);
        setShowAddForm(false);
        setEditFieldData(field);
        setEditSelectedSport("Fútbol");
    }

    async function updateField(e: React.FormEvent) {
        e.preventDefault();
        if (!editFieldData) return;

        try {
            const res = await fetch(
                `http://localhost:5000/fields/${editFieldData.field_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        complex_id: editFieldData.complex_id || null,
                        name: editFieldData.name,
                        sports: editFieldData.sports,
                        football_types: editFieldData.football_types,
                        start_rounding: editFieldData.start_rounding,
                        floor_type: editFieldData.floor_type,
                        attributes: editFieldData.attributes
                    }),
                }
            );

            const updated = await res.json();

            setFields(
                fields.map((f) =>
                    f.field_id === updated.field_id ? updated : f
                )
            );

            setEditing(false);
            setEditFieldData(null);
        } catch (err) {
            console.error("Error al actualizar:", err);
            alert("Error al actualizar la cancha");
        }
    }

    // --- Agregar ---
    async function addField(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/fields", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    complex_id: null, // Por ahora null, después podés agregar selector de complejo
                    ...newField
                }),
            });

            const created = await res.json();
            setFields([...fields, created]);

            // Reset form
            setNewField({
                name: "",
                sports: [],
                football_types: [],
                start_rounding: "none",
                floor_type: "synthetic",
                attributes: []
            });
            setShowAddForm(false);
        } catch (err) {
            console.error("Error al crear:", err);
            alert("Error al crear la cancha");
        }
    }

    // --- Agregar deporte ---
    function addSport(isEditing = false) {
        const sport = isEditing ? editSelectedSport : selectedSport;
        
        if (isEditing && editFieldData) {
            // Si ya está agregado, no hacer nada
            if (editFieldData.sports.includes(sport)) {
                alert(`${sport} ya está agregado`);
                return;
            }
            
            setEditFieldData({
                ...editFieldData,
                sports: [...editFieldData.sports, sport]
            });
        } else {
            // Si ya está agregado, no hacer nada
            if (newField.sports.includes(sport)) {
                alert(`${sport} ya está agregado`);
                return;
            }
            
            setNewField({
                ...newField,
                sports: [...newField.sports, sport]
            });
        }
    }

    // --- Quitar deporte ---
    function removeSport(sport: string, isEditing = false) {
        if (isEditing && editFieldData) {
            const sports = editFieldData.sports.filter(s => s !== sport);
            // Si se quita "Fútbol", limpiar tipos de fútbol
            const football_types = sport === "Fútbol" ? [] : editFieldData.football_types;
            setEditFieldData({ ...editFieldData, sports, football_types });
        } else {
            const sports = newField.sports.filter(s => s !== sport);
            // Si se quita "Fútbol", limpiar tipos de fútbol
            const football_types = sport === "Fútbol" ? [] : newField.football_types;
            setNewField({ ...newField, sports, football_types });
        }
    }

    // --- Manejo de tipos de fútbol ---
    function toggleFootballType(type: string, isEditing = false) {
        if (isEditing && editFieldData) {
            const football_types = editFieldData.football_types.includes(type)
                ? editFieldData.football_types.filter(t => t !== type)
                : [...editFieldData.football_types, type];
            setEditFieldData({ ...editFieldData, football_types });
        } else {
            const football_types = newField.football_types.includes(type)
                ? newField.football_types.filter(t => t !== type)
                : [...newField.football_types, type];
            setNewField({ ...newField, football_types });
        }
    }

    // --- Manejo de atributos ---
    function toggleAttribute(attr: string, isEditing = false) {
        if (isEditing && editFieldData) {
            const attributes = editFieldData.attributes.includes(attr)
                ? editFieldData.attributes.filter(a => a !== attr)
                : [...editFieldData.attributes, attr];
            setEditFieldData({ ...editFieldData, attributes });
        } else {
            const attributes = newField.attributes.includes(attr)
                ? newField.attributes.filter(a => a !== attr)
                : [...newField.attributes, attr];
            setNewField({ ...newField, attributes });
        }
    }

    // --- Validación agregar ---
    const hasFootballWithoutTypes = newField.sports.includes("Fútbol") && newField.football_types.length === 0;
    
    const isAddDisabled =
        newField.name.trim().length < 1 ||
        newField.sports.length === 0 ||
        hasFootballWithoutTypes;

    // ---------------------------
    // COMPONENTE REUTILIZABLE
    // ---------------------------
    const SportsSelector = ({ 
        selectedSports, 
        selectedFootballTypes,
        currentSelection,
        onSelectionChange,
        onAdd,
        onRemove,
        isEditing = false 
    }: { 
        selectedSports: string[], 
        selectedFootballTypes: string[],
        currentSelection: string,
        onSelectionChange: (value: string) => void,
        onAdd: () => void,
        onRemove: (sport: string) => void,
        isEditing?: boolean 
    }) => (
        <div>
            <label className="block text-gray-700 font-medium mb-2">
                Deportes
            </label>
            
            {/* Selector + Botón Agregar */}
            <div className="flex gap-2 mb-3">
                <select
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-green-500 flex-1"
                    value={currentSelection}
                    onChange={(e) => onSelectionChange(e.target.value)}
                >
                    {SPORTS_OPTIONS.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                    ))}
                </select>
                
                <button
                    type="button"
                    onClick={onAdd}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                    + Agregar
                </button>
            </div>

            {/* Lista de deportes agregados */}
            {selectedSports.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs text-gray-600 font-medium">Deportes seleccionados:</p>
                    <div className="space-y-2">
                        {selectedSports.map(sport => (
                            <div key={sport} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800">{sport}</span>
                                    <button
                                        type="button"
                                        onClick={() => onRemove(sport)}
                                        className="text-red-600 hover:text-red-800 font-bold text-lg"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Subcategorías de Fútbol */}
                                {sport === "Fútbol" && (
                                    <div className="ml-2 space-y-2 pt-2 border-t border-gray-300">
                                        <p className="text-xs text-gray-600 font-medium mb-2">
                                            Tipo de cancha:
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {FOOTBALL_TYPES.map(type => (
                                                <label key={type} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFootballTypes.includes(type)}
                                                        onChange={() => toggleFootballType(type, isEditing)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm">Fútbol {type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // ---------------------------
    // RENDER PRINCIPAL
    // ---------------------------

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-gray-600">Cargando canchas...</div>
            </div>
        );
    }

    return (
        <div className="mt-4">

            {/* MODAL ELIMINAR */}
            {showDeleteModal && fieldToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-3 text-red-600">
                            Eliminar Cancha
                        </h2>

                        <p className="mb-4">
                            ¿Seguro que querés eliminar <b>{fieldToDelete.name}</b>? 
                            Esta acción no se puede deshacer.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setFieldToDelete(null);
                                }}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* BOTÓN AGREGAR */}
            {!editing && !showAddForm && (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6 font-medium"
                >
                    + Nueva Cancha
                </button>
            )}

            {/* FORM AGREGAR */}
            {!editing && showAddForm && (
                <form
                    onSubmit={addField}
                    className="p-6 rounded-xl mb-6 bg-white shadow border border-gray-200"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Agregar Cancha
                    </h2>

                    <div className="grid gap-4">
                        {/* Nombre */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Nombre
                            </label>
                            <input
                                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-green-500"
                                type="text"
                                placeholder="Ej: Cancha Principal"
                                value={newField.name}
                                onChange={(e) =>
                                    setNewField({ ...newField, name: e.target.value })
                                }
                            />
                        </div>

                        {/* Deportes con dropdown */}
                        <SportsSelector 
                            selectedSports={newField.sports}
                            selectedFootballTypes={newField.football_types}
                            currentSelection={selectedSport}
                            onSelectionChange={setSelectedSport}
                            onAdd={() => addSport(false)}
                            onRemove={(sport) => removeSport(sport, false)}
                            isEditing={false}
                        />

                        {/* Forzar Inicio (Radio) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Forzar Inicio
                            </label>
                            <div className="flex flex-col gap-2">
                                {[
                                    { value: "none", label: "No redondear" },
                                    { value: "on_hour", label: "En punto (XX:00)" },
                                    { value: "half_hour", label: "Y media (XX:30)" }
                                ].map(option => (
                                    <label key={option.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="start_rounding"
                                            value={option.value}
                                            checked={newField.start_rounding === option.value}
                                            onChange={(e) =>
                                                setNewField({ ...newField, start_rounding: e.target.value })
                                            }
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Piso (Select) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Tipo de Piso
                            </label>
                            <select
                                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-green-500"
                                value={newField.floor_type}
                                onChange={(e) =>
                                    setNewField({ ...newField, floor_type: e.target.value })
                                }
                            >
                                <option value="parquet">Parquet</option>
                                <option value="synthetic">Sintético</option>
                                <option value="blindex">Blindex</option>
                                <option value="cement">Cemento</option>
                            </select>
                        </div>

                        {/* Atributos (Checkbox) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Atributos
                            </label>
                            <div className="flex gap-4">
                                {["Techada", "Iluminación"].map(attr => (
                                    <label key={attr} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={newField.attributes.includes(attr)}
                                            onChange={() => toggleAttribute(attr)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">{attr}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={isAddDisabled}
                            className={`px-5 py-2 rounded-lg text-white font-medium transition-colors
                ${isAddDisabled
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }
            `}
                        >
                            Agregar
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

            )}

            {/* FORM EDITAR */}
            {editing && editFieldData && (
                <form
                    onSubmit={updateField}
                    className="p-6 rounded-xl mb-6 bg-white shadow border border-gray-200"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Editar Cancha
                    </h2>

                    <div className="grid gap-4">
                        {/* Nombre */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Nombre
                            </label>
                            <input
                                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={editFieldData.name}
                                onChange={(e) =>
                                    setEditFieldData({
                                        ...editFieldData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Deportes con dropdown */}
                        <SportsSelector 
                            selectedSports={editFieldData.sports || []}
                            selectedFootballTypes={editFieldData.football_types || []}
                            currentSelection={editSelectedSport}
                            onSelectionChange={setEditSelectedSport}
                            onAdd={() => addSport(true)}
                            onRemove={(sport) => removeSport(sport, true)}
                            isEditing={true}
                        />

                        {/* Forzar Inicio (Radio) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Forzar Inicio
                            </label>
                            <div className="flex flex-col gap-2">
                                {[
                                    { value: "none", label: "No redondear" },
                                    { value: "on_hour", label: "En punto (XX:00)" },
                                    { value: "half_hour", label: "Y media (XX:30)" }
                                ].map(option => (
                                    <label key={option.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="edit_start_rounding"
                                            value={option.value}
                                            checked={editFieldData.start_rounding === option.value}
                                            onChange={(e) =>
                                                setEditFieldData({ ...editFieldData, start_rounding: e.target.value })
                                            }
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Piso (Select) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Tipo de Piso
                            </label>
                            <select
                                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-blue-500"
                                value={editFieldData.floor_type}
                                onChange={(e) =>
                                    setEditFieldData({ ...editFieldData, floor_type: e.target.value })
                                }
                            >
                                <option value="parquet">Parquet</option>
                                <option value="synthetic">Sintético</option>
                                <option value="blindex">Blindex</option>
                                <option value="cement">Cemento</option>
                            </select>
                        </div>

                        {/* Atributos (Checkbox) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Atributos
                            </label>
                            <div className="flex gap-4">
                                {["Techada", "Iluminación"].map(attr => (
                                    <label key={attr} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={editFieldData.attributes?.includes(attr) || false}
                                            onChange={() => toggleAttribute(attr, true)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">{attr}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
                        >
                            Guardar cambios
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setEditFieldData(null);
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

            )}

            {/* LISTA */}
            {fields.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No hay canchas registradas.</p>
                    <p className="text-sm text-gray-500">Hacé clic en "+ Nueva Cancha" para agregar una.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {fields.map((field) => (
                        <FieldItem
                            key={field.field_id}
                            field={field}
                            onDelete={() => askDeleteField(field)}
                            onEdit={editField}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}