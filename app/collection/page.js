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
        <div style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
            }}>
            <h1 style={{ marginBottom: '1.5rem' }}>Drug Collection</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {drugs.map((drug) => (
                <li key={drug.id} style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <p><strong>ID:</strong> {drug.id}</p>
                    <p><strong>Name:</strong> {drug.drug_name}</p>
                    <Link href={`/collection/${drug.id}`}>More →</Link>
                </li>
                ))}
            </ul>
        </div>
    );


}
