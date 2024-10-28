import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyImage from '../assets/cashzen-graphic.svg';
import './Components.css';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to <br /> CASHZEN</h1>

            <div className="welcome-content">
                <img src={MyImage} alt="Cashzen Graphic" />
                <p>
                    Cashzen is a web application designed to empower small business owners in managing their finances effectively.
                    <br />
                    It analyzes your income and expenses, helping you create strategies and detailed financial reports to support informed decision-making and sustainable growth.
                </p>
            </div>

            <button className='get-started-btn' type="button" onClick={handleSubmit}>Get Started</button>
        </div>
    );
};

export default WelcomePage;
