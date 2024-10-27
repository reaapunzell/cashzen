
import React, { useState } from 'react';
import api from '../api';

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', form);
            if (response.status === 200) {
                alert('Registration successful!' + response.data);
            } else {
                alert('Registration failed: ' + response.data.message);
            }
        } catch (err) {
            console.error('Error registering user:', err);
            const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
            alert('Error: ' + errorMessage);
            setError(errorMessage)
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
