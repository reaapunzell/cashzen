
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import MyImage from '../assets/cashzen-graphic.svg';
  import './Components.css'

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', form);
            if (response.status === 200) {
                alert('Registration successful! ' + response.data);
                navigate('/login');
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
        <MDBContainer fluid className="register-container">
        <MDBCard className="card text-black m-5">
            <MDBCardBody>
                <MDBRow className="row">
                    {/* Form Section */}
                    <MDBCol md="10" lg="6" className="form-section">
                        <p className="form-title h1 fw-bold mx-1 mx-md-4 mt-4">Sign up</p>

                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                        <div className="input-group">
                            <MDBIcon fas icon="user me-3" size="lg" />
                            <MDBInput label="Username" name="username" type="text" onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <MDBIcon fas icon="envelope me-3" size="lg" />
                            <MDBInput label="Your Email" name="email" type="email" onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <MDBIcon fas icon="lock me-3" size="lg" />
                            <MDBInput label="Password" name="password" type="password" onChange={handleChange} required />
                        </div>

                        <MDBBtn className="register-btn mb-4" size="lg" onClick={handleSubmit}>Register</MDBBtn>
                    </MDBCol>

                    {/* Image Section */}
                    <MDBCol md="10" lg="6" className="image-section">
                        <MDBCardImage src={MyImage} fluid />
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    );
}

export default Register;
