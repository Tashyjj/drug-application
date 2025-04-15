import CreateForm from './CreateForm';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function addDrugToDatabase(formData) {
    'use server';

  const newDrug = {
    id: formData.get('id'),
    drug_name: formData.get('drug_name'),
    drug_dosage: parseInt(formData.get('drug_dosage')),
    drug_company: formData.get('drug_company'),
    drug_shape: formData.get('drug_shape'),
    drug_color: formData.get('drug_color'),
    drug_unit: formData.get('drug_unit')
};

    await fetch('http://localhost:4000/drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDrug)
    });

    //on demand revalidation
    revalidatePath('/admin');
    revalidatePath('/collection');
}

export default function CreatePage() {
    return <CreateForm action={addDrugToDatabase} />;
}


