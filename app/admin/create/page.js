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
        drug_unit: 'mg',
    });


    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = async () => {
        const errs = [];
    
        //validating agasint existing
        const res = await fetch('http://localhost:4000/drugs');
        const existingDrugs = await res.json();

        //seeig if Id exists or no
        if (existingDrugs.some(drug => drug.id === form.id.trim())) {
            errs.push('Drug ID already exists. Please choose a unique ID.');
        }

        //drug name
        if (form.drug_name.length < 3 || form.drug_name.length > 30) {
            errs.push('Drug name must be between 3 and 30 characters in length');
        }
    
        //dosage
        const dosage = parseInt(form.drug_dosage);
        if (isNaN(dosage) || dosage < 10 || dosage > 1000) {
            errs.push('Drug dosage must be a number between 10 and 1000');
        }
    
        //company
        if (!/^[a-zA-Z\s]+$/.test(form.drug_company)) {
            errs.push('Drug company name must only contain letters and spaces');
        }
    
        return errs;
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const validationErrors = await validate();
            if (validationErrors.length > 0) {
                setErrors(validationErrors);
                return;
            }

        await fetch('http://localhost:4000/drugs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...form, 
                drug_dosage: parseInt(form.drug_dosage) 
            }),
        });

        router.push('/admin');
    };

    const labels = {
        id: 'Drug ID',
        drug_name: 'Name',
        drug_dosage: 'Dosage',
        drug_company: 'Company',
        drug_shape: 'Shape',
        drug_color: 'Color'
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Create New Drug</h1>

            {errors.length > 0 && (
                <ul style={{ color: 'red' }}>
                    {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
            
            {['id', 'drug_name', 'drug_company'].map((field) => (
                <div key={field} style={{ marginBottom: '1rem' }}>
                    <label>{labels[field]}:</label>
                    <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        style={{
                            backgroundColor: 'white',
                            color: '#333',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: '500px'
                        }}
                    />
                </div>
                ))}

                <div style={{ marginBottom: '1rem' }}>
                    <label>Dosage:</label><br />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                        type="number"
                        name="drug_dosage"
                        value={form.drug_dosage}
                        onChange={handleChange}
                        required
                        style={{
                            flex: 1,
                            backgroundColor: 'white',
                            color: '#333',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                        />
                        <select
                        name="drug_unit"
                        value={form.drug_unit}
                        onChange={handleChange}
                        style={{
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                        >
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        </select>
                    </div>
                </div>


                <div style={{ marginBottom: '1rem' }}>
                    <label>Shape:</label><br />
                    <select
                        name="drug_shape"
                        value={form.drug_shape}
                        onChange={handleChange}
                        required
                        style={{
                        width: '500px',
                        padding: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        color: '#333'
                        }}
                    >
                        <option value="">-- Select a shape --</option>
                        <option value="circular">Circular</option>
                        <option value="rectangular">Rectangular</option>
                        <option value="oval">Oval</option>
                        <option value="tab">Tab</option>
                        <option value="suppository">Suppository</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Color:</label><br />
                    <select
                        name="drug_color"
                        value={form.drug_color}
                        onChange={handleChange}
                        required
                        style={{
                        width: '500px',
                        padding: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        color: '#333'
                        }}
                    >
                        <option value="">-- Select a color --</option>
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                    </select>
                </div>

                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
