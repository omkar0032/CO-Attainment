import React from 'react'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { UseData } from '../NewContext';



function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()
    const { email } = UseData();
    console.log(email)


    const handleVerifyOtp = async (e) => {
        try {
            const response = await axios.post('http://localhost:3000/verify_otp', { email, otp }, {
                validateStatus: (status) => status >= 200 && status <= 500, // Allow only 2xx status codes
            });
            if (response.status === 200) {
                toast.success("OTP Verified!")
                navigate('/reset-password')
            }
            else if (!otp) {
                toast.warn("Enter valid OTP!")
            }
            else if (response.status === 401 && response.data === "Invalid OTP") {
                toast.warning("Tujhya aaicha dana");
            }
            else if (response.status === 500 && response.data === "OTP has expired") {
                toast.warn("OTP has expired");
            }
        }
        catch (error) { }

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
                <h2>Verify OTP</h2>
                <label style={{ display: 'block', marginBottom: '8px' }}>Enter OTP:</label>
                <input
                    type="number"  // Change the input type to 'number'
                    value={otp}
                    onChange={(e) => {
                        // Ensure the length of the entered OTP is restricted to 6 digits
                        const enteredOtp = e.target.value.slice(0, 6);
                        setOtp(enteredOtp);
                    }}
                    placeholder='Enter OTP '
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '16px',
                        border: '1px solid #ccc',
                    }}
                    maxLength={6}  // Limit the maximum length to 6 digits
                />
                <div>
                    <span>Check Spam folder as well.</span>
                </div>
                <div>
                    <Link to={'/resend-otp'} >Resend OTP</Link>

                </div>
                {/* <div>
                <span>{'Check spam as well.'}</span>
                </div> */}

                <button
                    onClick={handleVerifyOtp}
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
                    Verify OTP
                </button>

                <ToastContainer />

            </div>
        </>
    )
}

export default VerifyOTP;