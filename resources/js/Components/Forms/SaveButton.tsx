import { ButtonHTMLAttributes } from 'react';

export default function ButtonInput({
    value,
}: ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }) {
    return (
        <button
            type="submit"
            className="col-span-4 rounded-md bg-fuchsia-600 px-4 py-2 text-white hover:bg-fuchsia-700"
        >
            {value}
        </button>
    );
}
