import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getDrug(id) {
    const res = await fetch(`http://localhost:4000/drugs/${id}`);
    if (!res.ok) return null;
    return res.json();
}

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/drugs');
    const drugs = await res.json();

    //limit to 10 items for static generation
    return drugs.slice(0, 10).map((drug) => ({
        id: drug.id,
    }));
}


export const dynamic = 'force-dynamic'; //fresh data

export default async function DrugDetailPage({ params }) {
    const drug = await getDrug(params.id);

    if (!drug) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Error</h2>
                <p>No drug with ID "{params.id}" exists.</p>
                <Link href="/collection">← Back</Link>
            </div>
        );
    }

    const fields = [
        { label: 'Drug ID', value: drug.id },
        { label: 'Name', value: drug.drug_name },
        { label: 'Dosage', value: `${drug.drug_dosage} ${drug.drug_unit}` },
        { label: 'Company', value: drug.drug_company },
        { label: 'Shape', value: drug.drug_shape },
        { label: 'Color', value: drug.drug_color },
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <Link href="/collection">← Back</Link>
            <h1 style={{ textAlign: 'center', margin: '1.5rem 0' }}>Drug Details</h1>
        
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <tbody>
                {fields.map((field) => (
                    <tr key={field.label}>
                        <td style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #eee', width: '40%' }}>
                            {field.label}
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                            {field.value}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
