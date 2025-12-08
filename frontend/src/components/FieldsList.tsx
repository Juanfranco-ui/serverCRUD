import { type Field } from "./FieldForm";

type Props = {
    fields: Field[];
    onEdit: (field: Field) => void;
    onDelete: (id: number) => void;
};

export default function FieldsList({ fields, onEdit, onDelete }: Props) {
    if (fields.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                    No hay canchas registradas. Creá una nueva para comenzar.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Deportes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Piso
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Inicio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Atributos
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {fields.map((field) => (
                            <tr
                                key={field.field_id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                {/* Nombre */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {field.name}
                                    </div>
                                </td>

                                {/* Deportes */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {field.sports.slice(0, 2).map((sport, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                            >
                                                {sport}
                                            </span>
                                        ))}
                                        {field.sports.length > 2 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                +{field.sports.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Piso */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {field.floor_type || '-'}
                                    </div>
                                </td>

                                {/* Inicio */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {field.start_rounding || '-'}
                                    </div>
                                </td>

                                {/* Atributos */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {field.attributes && field.attributes.length > 0 ? (
                                            <>
                                                {field.attributes.slice(0, 2).map((attr, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                    >
                                                        {attr}
                                                    </span>
                                                ))}
                                                {field.attributes.length > 2 && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                        +{field.attributes.length - 2}
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                                        )}
                                    </div>
                                </td>

                                {/* Acciones */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(field)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                            title="Editar"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => field.field_id && onDelete(field.field_id)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                            title="Eliminar"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer con contador */}
            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 border-t dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Mostrando <span className="font-medium text-gray-900 dark:text-white">{fields.length}</span> cancha{fields.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    );
}