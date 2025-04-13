import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function getDrugs() {
    const res = await fetch('http://localhost:4000/drugs');
    if (!res.ok) throw new Error('Failed to fetch drugs');
    return res.json();
}

//deleting a drug
async function deleteDrug(id) {
    "use server";
    await fetch(`http://localhost:4000/drugs/${id}`, {
        method: 'DELETE',
    });
    revalidatePath('/admin');
    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
}

export default async function AdminPage() {
    const drugs = await getDrugs();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Admin Panel</h1>
            <Link href="/admin/create" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                ➕ Create New
            </Link>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Dosage</th>
                    <th>Company</th>
                    <th>Shape</th>
                    <th>Color</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {drugs.map((drug) => (
                    <tr key={drug.id}>
                    <td>{drug.id}</td>
                    <td>{drug.drug_name}</td>
                    <td>{drug.drug_dosage}</td>
                    <td>{drug.drug_company}</td>
                    <td>{drug.drug_shape}</td>
                    <td>{drug.drug_color}</td>
                    <td>
                        <form action={deleteDrug.bind(null, drug.id)}>
                        <button type="submit">D</button>
                        </form>
                    </td>
                    <td>
                        <Link href={`/admin/edit/${drug.id}`}>E</Link>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
