import EditButton from '@/Components/EditButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Filters, PaginatedData, Product } from '@/lib/ProductsTypes';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    products: PaginatedData<Product>;
    filters: Filters;
}

export default function Index({ products, filters }: Props) {
    const { data, setData, get } = useForm({ search: filters.search || '' });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('search', e.target.value);
        get(route('products.index'), { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Productos
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-fuchsia-600">
                                    Productos
                                </h1>
                                <Link
                                    href={route('products.create')}
                                    className="rounded-md bg-fuchsia-600 px-4 py-2 text-white hover:bg-fuchsia-700"
                                >
                                    Nuevo Producto
                                </Link>
                            </div>

                            {/* Input de búsqueda */}
                            <input
                                type="text"
                                value={data.search}
                                onChange={handleSearch}
                                placeholder="Buscar productos..."
                                className="mb-4 w-full rounded-md border p-2"
                            />

                            {/* Grid de productos */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="rounded-lg bg-white p-4 shadow"
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            {product.images[0] ? (
                                                <img
                                                    src={`/storage/${product.images[0].image_path}`}
                                                    alt={product.name}
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                                                    Sin imagen
                                                </div>
                                            )}
                                        </div>
                                        <h2 className="mt-2 font-semibold">
                                            {product.name}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            ${product.price}
                                        </p>
                                        <div className="mt-2 flex justify-between">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    confirm(
                                                        '¿Eliminar producto?',
                                                    ) &&
                                                    route(
                                                        'products.destroy',
                                                        product.id,
                                                    )
                                                }
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                            <EditButton
                                                page={'products.edit'}
                                                id={product.id}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Paginación */}
                            <div className="mt-6 flex justify-center">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`mx-1 rounded-md border px-3 py-2 ${
                                            link.active
                                                ? 'bg-fuchsia-600 text-white'
                                                : 'bg-white'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
