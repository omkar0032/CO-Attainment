// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { UseData } from '../NewContext';

const LoginForm = () => {
  const { email, setEmail } = UseData();
  const { name, setName } = UseData();
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // useNavigate hook

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      }, {
        validateStatus: (status) => status >= 200 && status < 500, // Allow only 2xx status codes
      });

      if (response.status === 200) {
        setName(response.data);
        toast.success("Login Successful.");
        navigate('/home');
      } else {
        if (response.status === 401) {
          toast.warning("Invalid Credentials!");
        } else {
          toast.error("An error occurred during login.");
        }
      }

    } catch (error) {
      console.error('Error during login:', error.response); // Log the error response

    }



  };

  return (<>

    <div
      style={{
        maxWidth: '300px',
        margin: '76px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <label style={{ display: 'block', marginBottom: '8px' }}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
      />

      <label style={{ display: 'block', marginBottom: '8px' }}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
      />
      <div><Link to="/forgot-password">Forgot Password</Link>
      </div>


      <button
        onClick={handleLogin}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          marginTop: '10px',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      <ToastContainer />
    </div>
  </>
  );
};

export default LoginForm;