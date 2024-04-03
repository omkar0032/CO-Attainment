import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditPattern = () => {
    const [year, setYear] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/fetch_pattern_and_year');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleYearChange = (e) => {
        const { value } = e.target;
        // Allow only four digits
        if (/^\d{0,4}$/.test(value)) {
            setYear(value);
        }
    };

    const handleAcademicYearChange = (e) => {
        const { value } = e.target;
        // Allow only nine digits with hyphen added automatically after fourth digit
        if (/^\d{0,4}-?\d{0,4}$/.test(value)) {
            // Automatically add hyphen after fourth digit if not present
            if (value.length === 4 && academicYear.length < 5) {
                setAcademicYear(value + '-');
            } else if (value.length === 5 && value.charAt(4) !== '-') {
                setAcademicYear(value.slice(0, 4) + '-' + value.slice(4));
            } else {
                setAcademicYear(value);
            }
        }
    };

    const handleSave = async () => {
        if (!academicYear) {
            toast.warn("Invalid Academic Year.");
        }
        else if (!year) {
            toast.warn("Invalid Year.");
        }
        else {
            try {
                const response = await axios.post('http://localhost:3000/insert_pattern', {
                    PYear: year,
                    AYear: academicYear
                });
                if (response.status === 200) {
                    toast.success('Pattern saved successfully!');
                    fetchData(); // Fetch updated data after saving
                    setYear(''); // Clear input fields after saving
                    setAcademicYear('');
                }
                else {
                    toast.warn('Failed to save pattern.');
                }
            } catch (error) {
                console.error('Error saving pattern:', error);
                toast.error('An error occurred while saving pattern.');
            }

        }

    };

    const handleRemove = async (PYear, AYear) => {
        try {
            // Make an API call to delete the pattern and academic year
            const response = await axios.post(`http://localhost:3000/delete_pattern_and_year/${PYear}/${AYear}`);
            if (response.status === 200) {
                toast.success(`${AYear} deleted successfully!`);
                fetchData();
            } else if (response.status === 500 && response.data === "Internal Server Error") {
                toast.warn("Internal Server Error");
            }
        } catch (error) {
            console.error('Error deleting data:', error);
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
                <h2>Edit Pattern</h2>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="2015"
                        value={year}
                        onChange={handleYearChange}
                        style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
                        required // Add the required attribute
                    />
                </div>

                <label style={{ display: 'block', marginBottom: '8px' }}>Academic Year:</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="2016-2017"
                        value={academicYear}
                        onChange={handleAcademicYearChange}
                        style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc' }}
                        required // Add the required attribute
                    />
                </div>

                <button
                    onClick={handleSave}
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
                    Add
                </button>
                <ToastContainer />
            </div>
            <h1 style={{ textAlign: 'center' }}>Pattern And Academic Year</h1>
            <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Pattern</th>
                            <th style={{ textAlign: 'center' }}>Academic Year</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{item.Pattern}</td>
                                <td style={{ textAlign: 'center' }}>{item.Academic_Year}</td>
                                <td
                                    onClick={() => handleRemove(item.Pattern, item.Academic_Year)}
                                    style={{
                                        textAlign: 'center',
                                        cursor: 'pointer', // Add pointer cursor for better UX
                                    }}
                                >
                                    <span style={{
                                        display: 'inline-block',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        lineHeight: '40px', // Vertically center the X
                                    }}>X</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default EditPattern;
