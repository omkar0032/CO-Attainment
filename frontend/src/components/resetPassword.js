import React from 'react'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { UseData } from '../NewContext';



function ResetPassword() {
    const navigate = useNavigate()
    const { email } = UseData();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = (value) => {
        // Password must contain at least one digit and one alphabet
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(value);
    };

    const validateConfirmPassword = (value) => {
        // Confirm password must match the password
        return value === password;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword) ? '' : newPassword.length < 6 ? 'Password must contain at least 6 characters.' : 'Password must contain at least one digit and one alphabet.');
        setConfirmPasswordError(validateConfirmPassword(confirmPassword) ? '' : 'Passwords must match.');
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setConfirmPasswordError(validateConfirmPassword(newConfirmPassword) ? '' : 'Passwords must match.');
    };
    const isButtonDisabled = !password || !confirmPassword || (password !== confirmPassword) || !/\d/.test(password);





    // const handleResetPassword = async (e) => {
    //     try {
    //         console.log("first")
    //         const response = await axios.post('http://localhost:3000/reset_password', { email, password }, {
    //             validateStatus: (status) => status >= 200 && status <= 500, // Allow only 2xx status codes
    //         });
    //         console.log(response.status)
    //         if (response.status === 200) {
    //             toast.success("Password Reset Successfully!")
    //             navigate('/Login');
    //         }
    //         else if (!password) {
    //             toast.warn("Enter valid Password!")
    //         }
    //         else if (!confirmPassword) {
    //             toast.warning("Enter Confirm Password!");
    //         }
    //         else if (response.status === 500 && response.data === "An error occurred while resetting the password.") {
    //             toast.warn("An error occurred while resetting the password.");
    //         }
    //     }
    //     catch (error) {
    //         console.log("error", error);
    //     }

    // }

    const handleResetPassword = async (e) => {
        try {
            console.log("first")
            const response = await axios.post('http://localhost:3000/reset_password', { email, password }, {
                validateStatus: (status) => status >= 200 && status <= 500, // Allow only 2xx status codes
            });
            console.log(response.status)
            if (response.status === 200) {
                toast.success("Password Reset Successfully!")
                navigate('/');
            }
            else if (!password) {
                toast.warn("Enter valid Password!")
            }
            else if (!confirmPassword) {
                toast.warning("Enter Confirm Password!");
            }
            else if (response.status === 500 && response.data === "An error occurred while resetting the password.") {
                toast.warn("An error occurred while resetting the password.");
            }
        }
        catch (error) {
            console.log("error", error);
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
                <h2>Reset Password</h2>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Enter Password:</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
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
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                    <label style={{ display: 'block', marginBottom: '8px' }}>Confirm Password:</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
                        />
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        >
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                </div>
                {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}


                <button
                    onClick={handleResetPassword}
                    style={{
                        backgroundColor: isButtonDisabled ? '#ccc' : '#4caf50',
                        color: 'white',
                        marginTop: '10px',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    disabled={isButtonDisabled}
                >
                    Reset Password
                </button>
                <ToastContainer />
            </div>
        </>
    )
}

export default ResetPassword;