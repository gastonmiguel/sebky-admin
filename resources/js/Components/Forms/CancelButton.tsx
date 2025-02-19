export default function CancelButton() {
    return (
        <a
            href="javascript:history.back()"
            className="col-span-2 rounded-md border border-fuchsia-600 bg-white px-4 py-2 text-center text-fuchsia-600 hover:bg-fuchsia-100"
        >
            Cancelar
        </a>
    );
}
