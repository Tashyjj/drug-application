'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditForm({ drug }) {
    const router = useRouter();
    const [form, setForm] = useState(drug);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errs = [];

        if (form.drug_name.length < 3 || form.drug_name.length > 30) {
        errs.push('Drug name must be between 3 and 30 characters');
        }
        const dosage = parseInt(form.drug_dosage);
        if (isNaN(dosage) || dosage < 10 || dosage > 1000) {
        errs.push('Drug dosage must be a number between 10 and 1000');
        }
        if (!/^[a-zA-Z\s]+$/.test(form.drug_company)) {
        errs.push('Drug company name must only contain letters and spaces');
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
        }

        await fetch(`http://localhost:4000/drugs/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, drug_dosage: parseInt(form.drug_dosage) }),
        });

        router.push('/admin');
    };

    return (
        <div style={{ padding: '2rem' }}>
        <h1>Edit Drug</h1>

        {errors.length > 0 && (
            <ul style={{ color: 'red' }}>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
        )}

        <form onSubmit={handleSubmit}>
            {['drug_name', 'drug_dosage', 'drug_company', 'drug_shape', 'drug_color'].map((field) => (
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
            <button type="submit">Save</button>
        </form>
        </div>
    );
}
