import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import '../App.css';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `${APIUrl}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="login-wrapper">
    {/* Left Side – Illustration and Info */}
    <div className="left-panel">
      <img
        src="/fintechillustration.png"
        alt="Fintech Illustration"
        className="illustration"
      />
      <h2>Easy To Navigate </h2>
      <p>Track your money smarter and faster than ever.</p>
    </div>

    {/* Right Side – Login Form */}
    <div className="right-panel">
      <div className="form-box">
        <div className="logo">💰</div>
        <h1>Hello Again!</h1>
        <p>Welcome back, please login to your account</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginInfo.email}
          />

          <label>Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />

          <div className="actions">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            
          </div>

          <button type="submit">Login</button>
         
        </form>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
    <ToastContainer />
  </div>
        
    )
}

export default Login