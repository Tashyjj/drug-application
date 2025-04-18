'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditForm({ drug, action }) {

    const [form, setForm] = useState({
        ...drug,
        drug_dosage: drug.drug_dosage.toString(), //dosage has to be string for input
    });

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

        const validationErrors = validate();
        if (validationErrors.length > 0) {
            e.preventDefault(); //dont submit
            setErrors(validationErrors);
        }
    };

    const labels = {
        id: 'Drug ID',
        drug_name: 'Name',
        drug_dosage: 'Dosage',
        drug_unit: 'Dosage Unit',
        drug_company: 'Company',
        drug_shape: 'Shape',
        drug_color: 'Color'
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Edit Drug</h1>

            {errors.length > 0 && (
                <ul style={{ color: 'red', marginBottom: '1rem' }}>
                    {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                </ul>
            )}

            <form action={action} onSubmit={handleSubmit}>

                <div style={{ marginBottom: '1rem' }}>
                    <label>{labels.id}:</label><br />
                    <input
                        type="text"
                        name="id"
                        value={form.id}
                        readOnly //not gonna allow the user to change the id in edit form, only create
                        style={{
                            width: '100%',
                            backgroundColor: '#eee',
                            color: '#333',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                </div>


                {['drug_name', 'drug_company'].map((field) => (
                    <div key={field} style={{ marginBottom: '1rem' }}>
                        <label>{labels[field]}:</label><br />
                        <input
                            type="text"
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                                color: '#333',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                ))}


                <div style={{ marginBottom: '1rem' }}>
                    <label>{labels.drug_dosage}:</label><br />
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
                    <label>{labels.drug_shape}:</label><br />
                    <select
                        name="drug_shape"
                        value={form.drug_shape}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
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
                    <label>{labels.drug_color}:</label><br />
                    <select
                        name="drug_color"
                        value={form.drug_color}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
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

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
