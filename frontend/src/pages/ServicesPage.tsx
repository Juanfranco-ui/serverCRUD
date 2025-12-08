import { SERVICE_ICONS } from "../constants/serviceIcons";

const ALL_SERVICES = [
	"Wi-Fi",
	"Vestuario",
	"Gimnasio",
	"Estacionamiento",
	"Ayuda Médica",
	"Torneos",
	"Cumpleaños",
	"Parrilla",
	"Escuelita deportiva",
	"Colegios",
	"Bar / Restaurante",
	"Quincho"
];

export default function ServicesPage() {
	// TODO: Replace this with actual complex data from API/Context
	// For now, simulating no complex created
	const hasComplex = false; // Set to true when a complex is created
	const complexServices: string[] = []; // Services from the complex

	// Show active services if complex exists, otherwise show all as inactive
	const servicesToShow = hasComplex ? complexServices : ALL_SERVICES;
	const allServicesActive = hasComplex && complexServices.length > 0;

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
						Servicios del Complejo
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Servicios y amenities disponibles en tu complejo
					</p>
				</div>

				{/* Warning if no complex */}
				{!hasComplex && (
					<div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
						<div className="flex gap-3">
							<div className="flex-shrink-0">
								<svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
							</div>
							<div>
								<h3 className="text-sm font-medium text-amber-900 dark:text-amber-200">
									No hay complejo configurado
								</h3>
								<p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
									Primero debés crear y configurar tu complejo en la{" "}
									<a href="/complejo" className="font-semibold underline hover:text-amber-800 dark:hover:text-amber-200">
										sección de Configuración
									</a>
									{" "}para activar servicios.
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Services Grid */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
						{hasComplex ? 'Servicios Activos' : 'Servicios Disponibles'}
					</h2>

					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
						{servicesToShow.map(service => {
							const IconComponent = SERVICE_ICONS[service];
							const isActive = hasComplex && complexServices.includes(service);

							return (
								<div
									key={service}
									className={`flex items-center gap-3 px-4 py-4 rounded-lg border-2 ${isActive
											? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
											: 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'
										}`}
								>
									{IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
									<span className="text-sm font-medium">{service}</span>
								</div>
							);
						})}
					</div>

					{hasComplex && complexServices.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500 dark:text-gray-400">
								No hay servicios activados. Configurá los servicios en la página de Complejo.
							</p>
						</div>
					)}
				</div>

				{/* Info Card */}
				{hasComplex && (
					<div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
						<div className="flex gap-3">
							<div className="flex-shrink-0">
								<svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div>
								<h3 className="text-sm font-medium text-blue-900 dark:text-blue-200">
									Administrar Servicios
								</h3>
								<p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
									Para agregar o quitar servicios, andá a la sección de{" "}
									<a href="/complejo" className="font-semibold underline hover:text-blue-800 dark:hover:text-blue-200">
										Configuración del Complejo
									</a>
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
