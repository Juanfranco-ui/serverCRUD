import { useState, useEffect } from "react";
import { COMPLEXES_BA } from "../constants/complexes";
import { SERVICE_ICONS } from "../constants/serviceIcons";
import { MapPin, Phone } from "lucide-react";
import { MercadoPagoIcon, BeelupIcon } from "../components/IntegrationIcons";

type Complex = {
	complex_id?: number;
	name: string;
	address: string;
	coordinates: string;
	phone: string;
	status: string;
	mercado_pago: boolean;
	beelup: boolean;
	hours: Record<string, { open: boolean; start: string; end: string }>;
	services: string[];
	logo_url: string;
	cover_url: string;
};

const DAYS_OF_WEEK = [
	"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
];

const SERVICES_OPTIONS = [
	"Wi-Fi", "Vestuario", "Gimnasio", "Estacionamiento", "Ayuda Médica",
	"Torneos", "Cumpleaños", "Parrilla", "Escuelita deportiva",
	"Colegios", "Bar / Restaurante", "Quincho"
];

const DEFAULT_HOURS = DAYS_OF_WEEK.reduce((acc, day) => ({
	...acc,
	[day]: { open: true, start: "09:00", end: "23:00" }
}), {});

export default function ComplexPage() {
	const [complex, setComplex] = useState<Complex>({
		name: "",
		address: "",
		coordinates: "",
		phone: "",
		status: "active",
		mercado_pago: false,
		beelup: false,
		hours: DEFAULT_HOURS,
		services: [],
		logo_url: "",
		cover_url: ""
	});

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [sameScheduleForAll, setSameScheduleForAll] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, []);

	const handleChange = (field: keyof Complex, value: any) => {
		setComplex(prev => ({ ...prev, [field]: value }));
	};

	const toggleStatus = () => {
		setComplex(prev => ({
			...prev,
			status: prev.status === 'active' ? 'inactive' : 'active'
		}));
	};

	const handleHourChange = (day: string, field: "open" | "start" | "end", value: any) => {
		if (sameScheduleForAll && field !== "open") {
			// Apply to all days
			const updatedHours = { ...complex.hours };
			DAYS_OF_WEEK.forEach(d => {
				if (updatedHours[d].open) {
					updatedHours[d] = { ...updatedHours[d], [field]: value };
				}
			});
			setComplex(prev => ({ ...prev, hours: updatedHours }));
		} else {
			setComplex(prev => ({
				...prev,
				hours: {
					...prev.hours,
					[day]: { ...prev.hours[day], [field]: value }
				}
			}));
		}
	};

	const toggleService = (service: string) => {
		setComplex(prev => {
			const services = prev.services.includes(service)
				? prev.services.filter(s => s !== service)
				: [...prev.services, service];
			return { ...prev, services };
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		try {
			console.log("Saving complex:", complex);
			await new Promise(resolve => setTimeout(resolve, 1000));
			alert("Cambios guardados correctamente");
		} catch (error) {
			console.error(error);
			alert("Error al guardar");
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <div className="text-gray-900 dark:text-white">Cargando...</div>;

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

				{/* Modern Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
								Configuración del Complejo
							</h1>
							<button
								onClick={toggleStatus}
								className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${complex.status === 'active'
									? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
									}`}
							>
								<span className={`w-2 h-2 rounded-full ${complex.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'
									}`} />
								{complex.status === 'active' ? 'En Línea' : 'Fuera de Línea'}
							</button>
						</div>
						<div className="flex gap-3">
							<button
								type="button"
								className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
							>
								Cancelar
							</button>
							<button
								onClick={handleSubmit}
								disabled={saving}
								className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{saving ? 'Guardando...' : 'Guardar Cambios'}
							</button>
						</div>
					</div>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Gestioná la identidad y disponibilidad de tu complejo
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					{/* Main Content - 2 Column Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

						{/* Left Column - 65% - Primary Information */}
						<div className="lg:col-span-2 space-y-8">

							{/* Información Principal */}
							<section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
									Información Principal
								</h2>

								<div className="space-y-5">
									{/* Complex Selector */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Complejo <span className="text-xs text-gray-500">(Seleccioná de la lista)</span>
										</label>
										<select
											className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
											value={complex.name}
											onChange={e => handleChange("name", e.target.value)}
											required
										>
											<option value="">-- Seleccionar Complejo --</option>
											{COMPLEXES_BA.map((complexName) => (
												<option key={complexName} value={complexName}>
													{complexName}
												</option>
											))}
										</select>
										<p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
											Solo podés elegir complejos registrados de Buenos Aires
										</p>
									</div>

									{/* Address */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Dirección y Ubicación
										</label>
										<div className="relative">
											<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="text"
												className="w-full h-12 pl-12 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
												placeholder="Av. Corrientes 1234, CABA"
												value={complex.address}
												onChange={e => handleChange("address", e.target.value)}
											/>
										</div>
									</div>

									{/* Phone */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Teléfono / WhatsApp
										</label>
										<div className="relative">
											<Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="text"
												className="w-full h-12 pl-12 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
												placeholder="+54 9 11 1234-5678"
												value={complex.phone}
												onChange={e => handleChange("phone", e.target.value)}
											/>
										</div>
									</div>
								</div>
							</section>

							{/* Disponibilidad Semanal - Compact Table */}
							<section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
										Disponibilidad Semanal
									</h2>
									<label className="flex items-center gap-2 cursor-pointer">
										<input
											type="checkbox"
											checked={sameScheduleForAll}
											onChange={e => setSameScheduleForAll(e.target.checked)}
											className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
										/>
										<span className="text-sm text-gray-600 dark:text-gray-400">
											Aplicar mismo horario a todos
										</span>
									</label>
								</div>

								{/* Compact Table */}
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-gray-200 dark:border-gray-700">
												<th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
													Día
												</th>
												<th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
													Estado
												</th>
												<th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
													Apertura
												</th>
												<th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
													Cierre
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100 dark:divide-gray-700">
											{DAYS_OF_WEEK.map(day => (
												<tr key={day} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
													<td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
														{day}
													</td>
													<td className="py-3 px-4 text-center">
														<label className="relative inline-flex items-center cursor-pointer">
															<input
																type="checkbox"
																checked={complex.hours[day]?.open}
																onChange={e => handleHourChange(day, "open", e.target.checked)}
																className="sr-only peer"
															/>
															<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
														</label>
													</td>
													<td className="py-3 px-4 text-center">
														{complex.hours[day]?.open ? (
															<input
																type="time"
																className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
																value={complex.hours[day]?.start}
																onChange={e => handleHourChange(day, "start", e.target.value)}
															/>
														) : (
															<span className="text-sm text-gray-400">-</span>
														)}
													</td>
													<td className="py-3 px-4 text-center">
														{complex.hours[day]?.open ? (
															<input
																type="time"
																className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
																value={complex.hours[day]?.end}
																onChange={e => handleHourChange(day, "end", e.target.value)}
															/>
														) : (
															<span className="text-sm text-gray-400">-</span>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</section>
						</div>

						{/* Right Column - 35% - Quick Actions */}
						<div className="space-y-8">

							{/* Servicios - Chip Grid */}
							<section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
									Servicios
								</h2>

								<div className="grid grid-cols-2 gap-3">
									{SERVICES_OPTIONS.map(service => {
										const IconComponent = SERVICE_ICONS[service];
										const isActive = complex.services.includes(service);

										return (
											<button
												key={service}
												type="button"
												onClick={() => toggleService(service)}
												className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${isActive
													? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400'
													: 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
													}`}
											>
												{IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
												<span className="text-xs leading-tight">{service}</span>
											</button>
										);
									})}
								</div>
							</section>

							{/* Integraciones - Cards with Switches */}
							<section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
									Integraciones
								</h2>

								<div className="space-y-4">
									{/* MercadoPago */}
									<div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-[#009EE3] rounded-lg flex items-center justify-center p-1.5">
												<MercadoPagoIcon />
											</div>
											<span className="font-medium text-gray-900 dark:text-white">MercadoPago</span>
										</div>
										<label className="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												checked={complex.mercado_pago}
												onChange={e => handleChange("mercado_pago", e.target.checked)}
												className="sr-only peer"
											/>
											<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
										</label>
									</div>

									{/* Beelup */}
									<div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center p-2">
												<BeelupIcon />
											</div>
											<span className="font-medium text-gray-900 dark:text-white">Beelup</span>
										</div>
										<label className="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												checked={complex.beelup}
												onChange={e => handleChange("beelup", e.target.checked)}
												className="sr-only peer"
											/>
											<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
										</label>
									</div>
								</div>
							</section>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
