import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import MyImage from '../assets/cashzen-graphic.svg';
import './Components.css';

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", form);
            if (response.status === 200) {
                // Assuming the token and user ID are returned in the response
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user._id);
                alert("Login successful!");
                console.log(`User ${response.data.user.username} successfully logged in`);
                
                // Clear the form
                setForm({ username: "", password: "" });

                // Navigate to the user's transactions page
                navigate(`/transactions/${response.data.user._id}`);
            }
        } catch (err) {
            // Handle error based on response
            if (err.response && err.response.status === 401) {
                setError("Invalid username or password");
            } else {
                setError("Login failed. Please try again.");
            }
            console.error("Error logging in:", err);
        }
    };

    return (
        <MDBContainer fluid className="container">
            <MDBCard className="card text-black m-5">
                <MDBCardBody>
                    <MDBRow className="row">
                        {/* Form Section */}
                        <MDBCol md="10" lg="6" className="form-section">
                            <p className="form-title h1 fw-bold mx-1 mx-md-4 mt-4">Login</p>

                            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                            <div className="input-group">
                                <MDBIcon fas icon="user me-3" size="lg" />
                                <MDBInput label="Username" name="username" type="text" onChange={handleChange} required />
                            </div>

                            <div className="input-group">
                                <MDBIcon fas icon="lock me-3" size="lg" />
                                <MDBInput label="Password" name="password" type="password" onChange={handleChange} required />
                            </div>

                            <MDBBtn className="register-btn mb-4" size="lg" onClick={handleSubmit}>Login</MDBBtn>
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

export default Login;
