import React from 'react'
import { useContext, useState } from "react";
import axios from 'axios';
import { UseData } from '../NewContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function ResendOTP() {
    const { email } = UseData();
    const navigate = useNavigate();

    const handleResendOTP = async (e) => {
        try {
            const response = await axios.post('http://localhost:3000/resend_otp', { email }, {
                validateStatus: (status) => status >= 200 && status <= 500, // Allow only 2xx status codes
            });
            if (response.status === 200) {
                toast.success("OTP sent successfully!")
                navigate('/verify-otp');
            }
            else if (response.status === 429 && response.data === "Exceeded maximum resend attempts for the day.") {
                toast.warning("Exceeded maximum resend attempts for the day.");
            }
        }
        catch (error) {
            console.log("error occured:", error);
        }

    }

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
                <h2>Resend OTP</h2>



                <button
                    onClick={handleResendOTP}
                    style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '8px',
                    }}
                >
                    Resend OTP
                </button>

                <ToastContainer />

            </div>
        </>
    )
}

export default ResendOTP;