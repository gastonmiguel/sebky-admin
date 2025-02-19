import {
    forwardRef,
    SelectHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    isFocused?: boolean;
    options: { value: string; label: string }[];
}

export default forwardRef(function SelectInput(
    { isFocused = false, options, className = '', ...props }: SelectInputProps,
    ref,
) {
    const localRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-fuchsia-600 dark:focus:ring-fuchsia-600 ' +
                className
            }
            ref={localRef}
        >
            <option key="0" value="">
                Seleccione...
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});
