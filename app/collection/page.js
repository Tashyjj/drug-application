import Link from 'next/link';

export const dynamic = 'force-dynamic'; //fresh data

async function getDrugs() {
    const res = await fetch('http://localhost:4000/drugs');
    if (!res.ok) throw new Error('Failed to fetch drugs');
    return res.json();
}

export default async function CollectionPage() {
    const drugs = await getDrugs();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Drug Collection</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {drugs.map((drug) => (
                <li key={drug.id} style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <strong>ID:</strong> {drug.id}<br />
                    <strong>Name:</strong> {drug.drug_name}<br />
                    <Link href={`/collection/${drug.id}`}>more</Link>
                </li>
                ))}
            </ul>
        </div>
    );
}
