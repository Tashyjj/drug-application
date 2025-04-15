'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function CreateForm({ action }) {
    const [form, setForm] = useState({
        id: '',
        drug_name: '',
        drug_dosage: '',
        drug_company: '',
        drug_shape: '',
        drug_color: '',
        drug_unit: 'mg'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const labels = {
        id: 'Drug ID',
        drug_name: 'Name',
        drug_company: 'Company',
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Create New Drug</h1>

            <form action={action}>
                {['id', 'drug_name', 'drug_company'].map((field) => (
                <div key={field} style={{ marginBottom: '1rem' }}>
                    <label>{labels[field] || field}:</label>

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
                            width: '100%'
                        }}
                    />
                </div>
                ))}

                <div style={{ marginBottom: '1rem' }}>
                    <label>Dosage:</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="number"
                            name="drug_dosage"
                            value={form.drug_dosage}
                            onChange={handleChange}
                            required
                            style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', color: '#333' }}
                        />
                        <select name="drug_unit" value={form.drug_unit} onChange={handleChange} 
                            style={{ 
                                height: '40px',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                color: '#333',
                             }}>
                            <option value="mg">mg</option>
                            <option value="g">g</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Shape:</label><br />
                    <select name="drug_shape" value={form.drug_shape} onChange={handleChange} required
                        style={{ 
                            height: '40px',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            color: '#333',
                         }}>
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
                    <select name="drug_color" value={form.drug_color} onChange={handleChange} required
                        style={{ 
                            height: '40px',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            color: '#333',
                         }}>
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
