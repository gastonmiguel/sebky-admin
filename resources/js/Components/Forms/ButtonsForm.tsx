import CancelButton from '@/Components/Forms/CancelButton';
import SaveButton from '@/Components/Forms/SaveButton';

export default function ButtonsForm({ edit }: { edit?: boolean }) {
    return (
        <div className="grid grid-cols-6 gap-4">
            <CancelButton />
            <SaveButton value={edit ? 'Actualizar' : 'Crear'} />
        </div>
    );
}
