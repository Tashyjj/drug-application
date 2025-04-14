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
            <Link href="/admin/create" className="button-link" style={{ marginBottom: '1rem' }}>
                ➕ Create New
            </Link>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white',
                    color: '#333',
                    tableLayout: 'fixed'
                }}
            >
                <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Dosage</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Company</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Shape</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Color</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Delete</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Edit</th>
                </tr>
                </thead>
                <tbody>
                {drugs.map((drug) => (
                    <tr key={drug.id}>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>{drug.id}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap', maxWidth: '120px' }}>{drug.drug_name}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>{drug.drug_dosage}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>{drug.drug_company}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>{drug.drug_shape}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>{drug.drug_color}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>
                        <form action={deleteDrug.bind(null, drug.id)}>
                        <button type="submit">Delete</button>
                        </form>
                    </td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>
                        <Link href={`/admin/edit/${drug.id}`} className="button-link">Edit</Link>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
