'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function CreateDrugPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        id: '',
        drug_name: '',
        drug_dosage: '',
        drug_company: '',
        drug_shape: '',
        drug_color: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();

        await fetch('http://localhost:4000/drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, drug_dosage: parseInt(form.drug_dosage) }),
        });

        router.push('/admin');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Create New Drug</h1>
            <form onSubmit={handleSubmit}>
                {['id', 'drug_name', 'drug_dosage', 'drug_company', 'drug_shape', 'drug_color'].map((field) => (
                <div key={field} style={{ marginBottom: '1rem' }}>
                    <label>{field.replace('_', ' ')}: </label>
                    <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    />
                </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
