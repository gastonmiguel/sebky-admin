import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-fuchsia-600 dark:text-fuchsia-400" />
                </Link>
            </div>

            <div className="mt-6 w-full max-w-md overflow-hidden rounded-2xl bg-white px-6 py-4 shadow-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
