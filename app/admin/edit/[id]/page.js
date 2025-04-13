import EditForm from './editForm';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function getDrug(id) {

    const res = await fetch(`http://localhost:4000/drugs/${id}`);
    if (!res.ok) return null;
    return res.json();
    
}


export default async function EditDrugPage({ params }) {

    const drug = await getDrug(params.id);
    if (!drug) return notFound();


    return <EditForm drug={drug} />;

}
