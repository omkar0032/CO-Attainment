import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import VerifyOTP from './VerifyOTP';
import { useNavigate } from 'react-router-dom';
import { UseData } from '../NewContext';

function ForgotPassword() {
    const { email, setEmail } = UseData();


    const navigate = useNavigate(); // useNavigate hook

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/forgot_password',
                { email },
                {
                    validateStatus: (status) => status >= 200 && status < 500, // Allow only 2xx status codes
                }
            );

            if (response.status === 200) {
                toast.success('OTP sent!');
                navigate('/verify-otp');
            } else if (!email) {
                toast.warn('Enter valid Email ID!');
            } else if (
                response.status === 400 &&
                response.data === "Email doesn't exists!"
            ) {
                toast.warning("Email doesn't exist!");
            }
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };

    return (

        <>
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
                <h2>Forgot Password</h2>
                <label style={{ display: 'block', marginBottom: '8px' }}>Email:</label>
                <input
                    type="email"
                    placeholder="Enter your registered Email ID"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '16px',
                        border: '1px solid #ccc',
                    }}
                />

                <button
                    onClick={handleSubmit}
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
                    Send
                </button>
                <ToastContainer />
            </div>

        </>
    );
}

export default ForgotPassword;
