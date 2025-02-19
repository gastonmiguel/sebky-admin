export interface ProductImage {
    id: number;
    product_id: number;
    image_path: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    user_id: number;
    updated_by?: number;
    created_at: string;
    updated_at: string;
    images_new?: [];
    images: ProductImage[];
}

export interface ProductImage {
    id: number;
    product_id: number;
    image_path: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    links: PaginationLinks[];
}

export interface Filters {
    search?: string;
}
