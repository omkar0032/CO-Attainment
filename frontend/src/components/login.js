import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { UseData } from '../NewContext';

const LoginForm = () => {
  const { email, setEmail } = UseData();
  const [password, setPassword] = useState('');
  const { loggedInUserName, setLoggedInUserName } = UseData();
  const [showPassword, setShowPassword] = useState(false);
  const { valueForRole, setValueForRole } = UseData();
  
  useEffect(() => {
    handelLoggedINOrNot();
  }, []);

  const handelLoggedINOrNot = () => {
    const loggedInUserNameFromStorage = localStorage.getItem('Userdata');
    const loggedInUserNameFromStorage1 = JSON.parse(loggedInUserNameFromStorage)
    if (loggedInUserNameFromStorage) {
      setLoggedInUserName(loggedInUserNameFromStorage1.name);
      setValueForRole(loggedInUserNameFromStorage1.role);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate(); // useNavigate hook
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      }, {
        validateStatus: (status) => status >= 200 && status < 500,
      });
  
      if (response.status === 200) {
        const userdata = response.data;
        localStorage.setItem('Userdata', JSON.stringify(userdata)); // Store user's details
        handelLoggedINOrNot();
        toast.success("Login Successful.");
        navigate('/Home');
      } else {
        if (response.status === 401) {
          toast.warning("Invalid Credentials!");
        } else {
          toast.error("An error occurred during login.");
        }
      }
    } catch (error) {
      console.error('Error during login:', error.response);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images.jpg')", // Specify the path to your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '300px',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white color
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>LOGIN</h2>
        <label style={{ display: 'block', marginBottom: '8px' }}>Email:</label>
        <div style={{ position: 'relative' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
          />
        </div>

        <label style={{ display: 'block', marginBottom: '8px' }}>Password:</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div style={{ marginBottom: '10px' }}><Link to="/forgot-password">Forgot Password</Link></div>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '12px 30px', // Adjusted padding for larger button
            border: 'none',
            borderRadius: '13px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
