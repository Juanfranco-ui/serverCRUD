import { Link } from "react-router-dom";
import { Building2, LandPlot, Settings2, TrendingUp } from "lucide-react";

export default function DashboardHome() {
    // Mock data - in production this would come from API/state
    const stats = {
        totalFields: 8,
        activeServices: 7,
        complexStatus: "active",
        nextReservations: 12
    };

    const quickActions = [
        {
            title: "Gestionar Canchas",
            description: "Ver y administrar todas las canchas",
            icon: LandPlot,
            href: "/canchas",
            color: "indigo"
        },
        {
            title: "Configurar Complejo",
            description: "Editar información y servicios",
            icon: Building2,
            href: "/complejo",
            color: "blue"
        },
        {
            title: "Ver Servicios",
            description: "Servicios disponibles",
            icon: Settings2,
            href: "/servicios",
            color: "purple"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-2">
                        Bienvenido al Panel de Administración
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {new Date().toLocaleDateString('es-AR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Canchas */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Canchas
                                </p>
                                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                                    {stats.totalFields}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                                <LandPlot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                    </div>

                    {/* Servicios Activos */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Servicios Activos
                                </p>
                                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                                    {stats.activeServices}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Settings2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Estado del Complejo */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Estado del Complejo
                                </p>
                                <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-2">
                                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                                    {stats.complexStatus === 'active' ? 'En Línea' : 'Fuera de Línea'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    {/* Próximas Reservas */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Próximas Reservas
                                </p>
                                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                                    {stats.nextReservations}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Acciones Rápidas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            const colorClasses = {
                                indigo: "bg-indigo-600 hover:bg-indigo-700",
                                blue: "bg-blue-600 hover:bg-blue-700",
                                purple: "bg-purple-600 hover:bg-purple-700"
                            };

                            return (
                                <Link
                                    key={action.href}
                                    to={action.href}
                                    className={`${colorClasses[action.color as keyof typeof colorClasses]} text-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-105`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm opacity-90">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
