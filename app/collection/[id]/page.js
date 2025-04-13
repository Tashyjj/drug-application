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

export default async function DrugDetailPage({ params }) {
    const drug = await getDrug(params.id);

    if (!drug) {
        return (
        <div style={{ padding: '2rem' }}>
            <h2>Error</h2>
            <p>No item with ID "{params.id}" exists.</p>
            <Link href="/collection">← Back</Link>
        </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <Link href="/collection">← Back</Link>
            <h1>Drug Details</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                    <tr><td><strong>ID:</strong></td><td>{drug.id}</td></tr>
                    <tr><td><strong>Name:</strong></td><td>{drug.drug_name}</td></tr>
                    <tr><td><strong>Dosage:</strong></td><td>{drug.drug_dosage} mg</td></tr>
                    <tr><td><strong>Company:</strong></td><td>{drug.drug_company}</td></tr>
                    <tr><td><strong>Shape:</strong></td><td>{drug.drug_shape}</td></tr>
                    <tr><td><strong>Color:</strong></td><td>{drug.drug_color}</td></tr>
                </tbody>
            </table>
        </div>
    );
}
