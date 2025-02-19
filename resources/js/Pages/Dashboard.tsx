import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Inicio
                </h2>
            }
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-center text-gray-900 dark:text-gray-100">
                            <h1 className="text-4xl text-fuchsia-600">
                                <ApplicationLogo />
                            </h1>
                            <a
                                href="/products"
                                className="mt-6 inline-block rounded-full bg-fuchsia-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-fuchsia-700"
                            >
                                Ver productos
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
