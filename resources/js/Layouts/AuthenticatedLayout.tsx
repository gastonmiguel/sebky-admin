import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo y navegación */}
                        <div className="flex items-center space-x-8">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route('products.index')}
                                active={route().current('products.index')}
                            >
                                Products
                            </NavLink>
                        </div>

                        {/* Dropdown usuario */}
                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-700 transition duration-150 hover:text-fuchsia-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-fuchsia-400"
                                    >
                                        {user.name}
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Perfil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Salir
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Botón menú móvil */}
                        <div className="sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (prev) => !prev,
                                    )
                                }
                                className="p-2 text-gray-500 transition hover:text-fuchsia-600 dark:text-gray-400 dark:hover:text-fuchsia-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'block'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'block'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                {showingNavigationDropdown && (
                    <div className="bg-white shadow-md sm:hidden dark:bg-gray-800">
                        <div className="space-y-1 px-4 py-2">
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Inicio
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                href={route('products.index')}
                                active={route().current('products.index')}
                            >
                                Productos
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-600">
                            <div className="text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {user.email}
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Perfil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Salir
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Encabezado */}
            {header && (
                <header className="bg-white shadow-md dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 text-fuchsia-600 sm:px-6 lg:px-8 dark:text-fuchsia-400">
                        {header}
                    </div>
                </header>
            )}

            {/* Contenido */}
            <main className="p-6">{children}</main>
        </div>
    );
}
