import { Link } from '@inertiajs/react';

export default function EditButton({ page, id }: { page: string; id: number }) {
    return (
        <Link
            href={route(page, id)}
            className="rounded-md bg-fuchsia-600 px-4 py-2 text-sm text-white hover:bg-fuchsia-700"
        >
            Editar
        </Link>
    );
}
