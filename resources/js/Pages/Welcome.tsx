import { Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenido" />
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
                    <h1 className="text-4xl text-fuchsia-600">
                        <ApplicationLogo />
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Accede al panel de administración.
                    </p>

                    <a
                        href="/dashboard"
                        className="mt-6 inline-block rounded-full bg-fuchsia-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-fuchsia-700"
                    >
                        Ingresar
                    </a>
                </div>
            </div>
        </>
    );
}
