type Props = {
    field: {
        field_id: number;
        name: string;
        sports: string[];
        football_types: string[];
        start_rounding: string;
        floor_type: string;
        attributes: string[];
    };
    onDelete: () => void;
    onEdit: (field: any) => void;
};

export default function FieldItem({ field, onDelete, onEdit }: Props) {
    // Traducciones para mostrar bonito
    const roundingLabels: Record<string, string> = {
        none: "No redondear",
        on_hour: "En punto (XX:00)",
        half_hour: "Y media (XX:30)"
    };

    const floorLabels: Record<string, string> = {
        parquet: "Parquet",
        synthetic: "Sintético",
        blindex: "Blindex",
        cement: "Cemento"
    };

    return (
        <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {/* Nombre */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {field.name}
                    </h3>

                    {/* Deportes */}
                    {field.sports && field.sports.length > 0 && (
                        <div className="mb-3">
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                Deportes:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {field.sports.map(sport => {
                                    // Si es fútbol, mostrar con los tipos
                                    if (sport === "Fútbol" && field.football_types && field.football_types.length > 0) {
                                        return field.football_types.map(type => (
                                            <span
                                                key={`${sport}-${type}`}
                                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                                            >
                                                ⚽ Fútbol {type}
                                            </span>
                                        ));
                                    }
                                    
                                    // Otros deportes normales
                                    const sportEmoji: Record<string, string> = {
                                        "Pádel": "🎾",
                                        "Tenis": "🎾",
                                        "Basquetbol": "🏀",
                                        "Vóley": "🏐",
                                        "Hockey": "🏑"
                                    };

                                    return (
                                        <span
                                            key={sport}
                                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                                        >
                                            {sportEmoji[sport] || "⚽"} {sport}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Información técnica */}
                    <div className="space-y-2 text-sm text-gray-600">
                        {/* Tipo de Piso */}
                        {field.floor_type && (
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">Piso:</span>
                                <span>{floorLabels[field.floor_type] || field.floor_type}</span>
                            </div>
                        )}

                        {/* Forzar Inicio */}
                        {field.start_rounding && (
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">Inicio:</span>
                                <span>{roundingLabels[field.start_rounding] || field.start_rounding}</span>
                            </div>
                        )}
                    </div>

                    {/* Atributos */}
                    {field.attributes && field.attributes.length > 0 && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                {field.attributes.map(attr => {
                                    const attrIcon: Record<string, string> = {
                                        "Techada": "🏠",
                                        "Iluminación": "💡"
                                    };

                                    return (
                                        <span
                                            key={attr}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium"
                                        >
                                            <span>{attrIcon[attr] || "✓"}</span>
                                            <span>{attr}</span>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-2 ml-6">
                    <button
                        onClick={() => onEdit(field)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                    >
                        Editar
                    </button>

                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}