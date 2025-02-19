import ButtonsForm from '@/Components/Forms/ButtonsForm';
import ErrorInput from '@/Components/Forms/ErrorInput';
import LabelInput from '@/Components/Forms/LabelInput';
import SelectInput from '@/Components/Forms/SelectInput';
import TextAreaInput from '@/Components/Forms/TextAreaInput';
import TextInput from '@/Components/Forms/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, Product } from '@/lib/ProductsTypes';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    product?: Product;
    categories: Category[];
}

export default function Edit({ product, categories }: Props) {
    const { data, setData, post, errors } = useForm({
        category_id: product?.category_id || '',
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || '',
        images: product?.images_new || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category_id', String(data.category_id));
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        formData.append('price', String(data.price));
        formData.append('stock', String(data.stock));

        if (selectedImages.length > 0) {
            data.images = [];
            for (const image of selectedImages) {
                data.images.push(image as never);
            }
        }

        product
            ? post(route('products.update', product.id))
            : post(route('products.store'));
    };

    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedImages(Array.from(e.target.files));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
            }
        >
            <Head title="Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <LabelInput
                                    htmlFor="category_id"
                                    value="Category"
                                />
                                <SelectInput
                                    id="category_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                    options={categories.map((category) => ({
                                        value: String(category.id),
                                        label: category.name,
                                    }))}
                                    value={data.category_id}
                                    required
                                    autoComplete="category_id"
                                />

                                <ErrorInput
                                    className="mt-2"
                                    message={errors.category_id}
                                />
                            </div>

                            <div className="mb-4">
                                <LabelInput htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    autoComplete="name"
                                />

                                <ErrorInput
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="mb-4">
                                <LabelInput htmlFor="price" value="Precio" />

                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData('price', e.target.value)
                                    }
                                    required
                                    autoComplete="price"
                                />

                                <ErrorInput
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            <div className="mb-4">
                                <LabelInput htmlFor="stock" value="Stock" />

                                <TextInput
                                    id="stock"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData('stock', e.target.value)
                                    }
                                    required
                                    autoComplete="stock"
                                />

                                <ErrorInput
                                    className="mt-2"
                                    message={errors.stock}
                                />
                            </div>

                            <div className="mb-4">
                                <LabelInput
                                    htmlFor="description"
                                    value="Description"
                                />

                                <TextAreaInput
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    required
                                    autoComplete="description"
                                />

                                <ErrorInput
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>

                            <div className="mb-4">
                                <LabelInput htmlFor="images" value="Imágenes" />
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-md border p-2"
                                />
                                {selectedImages.length > 0 && (
                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                        {selectedImages.map((file, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                alt="Preview"
                                                className="h-20 w-full rounded-md object-cover"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <ButtonsForm edit={!!product} />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
