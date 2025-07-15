import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
// import logo from '../assets/logo.png'; // Replace with your logo path
// import heroImage from '../assets/hero-animation.gif'; // Replace with your animation/image

function Welcome() {
    return (
        <div className="welcome-container">
            <nav className="navbar">
                <div className="logo-section">
                    <img src="/logo192.png" alt="Expenso Logo" className="logo-img" />
                    <span className="logo-text">Expenso</span>
                </div>
                <div className="nav-buttons">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/signup" className="signup-btn">Sign up for free</Link>
                </div>
            </nav>

            <div className="welcome-content">
                <div className="text-content">
                    <h1 className="animated-heading">Welcome to Our Expenso</h1>
                    <h2 className="main-heading">
                        Automatically track <span className="highlight">expenses & income.</span>
                    </h2>
                    <p className="description">
                        Join thousands of smart users in managing finances with ease. Expenso helps you spend smarter, save more, and achieve financial clarity.
                    </p>
                    <ul className="features">
                        <li>✅ Instant expense tracking</li>
                        <li>📈 Track Every Rupee, Effortlessly</li>
                        <li>💸 Know Where Your Money Goes</li>
                        <li>📥 Export Your Data Anytime</li>
                    </ul>
                    <Link to="/signup" className="cta-button">Get started for free</Link>
                </div>

                
            </div>
        </div>
    );
}

export default Welcome;
