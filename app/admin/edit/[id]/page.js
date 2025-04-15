import EditForm from './editForm';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; //fresh dataa

async function getDrug(id) {

    const res = await fetch(`http://localhost:4000/drugs/${id}`);
    if (!res.ok) return null;
    return res.json();
    
}

//upadting a drug - server action
export async function updateDrug(id, formData) {
    'use server';
  
    const updatedDrug = {
        id,
        drug_name: formData.get('drug_name'),
        drug_dosage: parseInt(formData.get('drug_dosage')),
        drug_company: formData.get('drug_company'),
        drug_shape: formData.get('drug_shape'),
        drug_color: formData.get('drug_color'),
        drug_unit: formData.get('drug_unit'),
    };
  
    await fetch(`http://localhost:4000/drugs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDrug),
    });

    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');
    revalidatePath(`/admin/edit/${id}`);
  
    redirect('/admin');
}

export default async function EditDrugPage({ params }) {

    const drug = await getDrug(params.id);

    if (!drug) return notFound();

    return <EditForm drug={drug} action={updateDrug.bind(null, drug.id)} />;
}
