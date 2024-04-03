import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, Table } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { UseData } from '../NewContext';


const EditSubject = () => {
    // State variables for dropdown values
    const [data, setData] = useState([]);
    const [valuefordepartmentArray, setValuedepartmentArray] = useState([]);
    const { valueforyearlabel, setvalueforyearlabel } = UseData();
    const { valuefordepartmentlabel, setvaluefordepartmentlabel } = UseData();
    const { valueforsemlabel, setvalueforsemlabel } = UseData();
    const [valueforsemArray, setValueforsemArray] = useState([]);
    const [valuefordepartment, setValuedepartment] = useState("");
    const [valueforsem, setValueforsem] = useState("");
    const [valueforyear, setValueforyear] = useState("");
    const [valueforpattern, setValueforpattern] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    let patternnames = [];
    const [transformedPattern, setTransformedPattern] = useState([]);
    let departmentnames = [];
    const [transformedDepartment, setTransformedDepartment] = useState([]);

    useEffect(() => {
        transformPattern();
        transformDepartment();
    }, []);


    const transformPattern = async () => {
        await handleGetPattern();
        let transformedPatterns = patternnames.map(patternname => ({
            value: convertPattern(patternname),
            label: String(patternname.Pattern),
        }));
        // console.log(transformedPatterns);
        setTransformedPattern(transformedPatterns);
    }
    const convertPattern = (pattern) => {
        // console.log(String(pattern.Pattern));
        return "p" + String(pattern.Pattern);
    }


    const transformDepartment = async () => {
        await handleGetDeparment();
        // console.log(departmentnames);
        const transformedDepartments = departmentnames.map(departmentname => ({
            value: departmentname.Department.toLowerCase(),
            label: departmentname.Department

        }));
        setTransformedDepartment(transformedDepartments);
        // console.log(transformedDepartments);
    }

    // get pattern from backend
    const handleGetPattern = async () => {
        try {
            const result = await axios.get("http://localhost:3000/pattern");

            if (result.status === 200) {
                patternnames = result.data;
                // console.log(acadamicyearnames);
            } else {
                console.error(`Error: Received unexpected status code ${result.status}`);
            }
        } catch (error) {
            console.log("Error while fetching data")
        }
    }



    // get pattern from backend
    const handleGetDeparment = async () => {
        try {
            const result = await axios.get("http://localhost:3000/department");

            if (result.status === 200) {
                departmentnames = result.data;
                // console.log(departmentnames);
            } else {
                console.error(`Error: Received unexpected status code ${result.status}`);
            }
        } catch (error) {
            console.log("Error while fetching data")
        }
    }





    // passed in option={yearname}

    const yearname = [
        { value: "y1_d", label: "FE" },
        { value: "y2_d", label: "SE" },
        { value: "y3_d", label: "TE" },
        { value: "y4_d", label: "BE" },
    ]

    // One of these Array of objects is passed when user hits YEAR section because sem depends on YEAR
    const fe = [
        { value: "sem1", label: "Sem_1" },
        { value: "sem2", label: "Sem_2" },
    ]

    const se = [
        { value: "sem3", label: "Sem_3" },
        { value: "sem4", label: "Sem_4" },

    ]

    const te = [
        { value: "sem5", label: "Sem_5" },
        { value: "sem6", label: "Sem_6" },

    ]

    const be = [
        { value: "sem7", label: "Sem_7" },
        { value: "sem8", label: "Sem_8" },

    ]

    // this Object of Above Array.
    const semname = { fe, se, te, be };

    useEffect(() => {
        handleFetch();
    }, []);


    const tableName = `${valueforpattern?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}`;

    const handleFetch = async (req, res) => {
        if (
            valueforpattern &&
            valueforyear &&
            valuefordepartment &&
            valueforsem
        ) {
            try {
                const response = await axios.get(`http://localhost:3000/fetch_subject/${tableName}`);
                if (response.status === 200) {
                    toast.success("Subject fetched successfully.");
                    setSubjects(response.data);

                }
                else {
                    toast.warn("Error in fetching data");
                }

            } catch (error) {
                console.error('Error removing subject:', error);
            }
        }
        else {
            toast.error("Please select all fields!")
        }
    }

    const handleRemove = async (subject) => {
        try {
            const response = await axios.post(`http://localhost:3000/delete_subject/${tableName}/${subject}`);
            // Remove the deleted subject from the state
            if (response.status === 200) {
                console.log("object")
                toast.success("Subject deleted successfully.");
                await handleFetch();
            }
            else if (response.data === 500 && response.status === "Error in deleting subject") {
                toast.warn("Error in deleting subject");
            }

        } catch (error) {
            console.error('Error removing subject:', error);
        }
    };

    const handleAdd = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleSave = async () => {
        if (valueforpattern &&
            valueforyear &&
            valuefordepartment &&
            valueforsem) {


            try {
                const response = await axios.post(`http://localhost:3000/add_subject/${tableName}/${inputValue}`);

                if (response.status === 200) {

                    toast.success("Subject Added Successfully!")
                    // Reset states
                    setInputValue('');
                    setShowInput(false);
                    await handleFetch();
                }
                else if (response.status === 500 && response.data === "Internal Server Error") {
                    toast.warn("Internal Server Error");
                }
            }
            catch (error) {
                console.log('Error occured: ', error)
            }
        }
        else {

            toast.warn("Select all fields!")
        }


    };



    return (
        <>

            <div
                style={{
                    maxWidth: '600px',
                    margin: '76px auto',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                }}
            >
                <h2>Edit Subject</h2>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <label style={{ marginBottom: '20px' }}>
                        Pattern:
                        <Select
                            options={transformedPattern}
                            value={valueforpattern}
                            onChange={(selectedOption) => {
                                setValueforpattern(selectedOption);

                            }}
                            isSearchable
                            placeholder="Select Pattern"
                            required

                        />
                    </label>
                    <br />
                    <label style={{ marginBottom: '20px' }}>
                        Degree Year:
                        <Select
                            options={yearname}
                            value={valueforyear}
                            onChange={(selectedOption) => {
                                setValueforyear(selectedOption);
                                setvalueforyearlabel(selectedOption.label);
                                setValueforsemArray(semname[selectedOption.label.toLowerCase()]);
                            }}
                            isSearchable
                            placeholder="Select Year"
                            required
                        />
                    </label>
                    <br />
                    <label style={{ marginBottom: '20px' }}>
                        Department:
                        <Select
                            options={transformedDepartment}
                            value={valuefordepartment}
                            onChange={(selectedOption) => {
                                setValuedepartment(selectedOption)
                                setvaluefordepartmentlabel(selectedOption.label);
                            }
                            }
                            isSearchable
                            placeholder="department"
                            required
                        />
                    </label>
                    <br />
                    <label style={{ marginBottom: '20px' }}>
                        Semester:
                        <Select
                            options={valueforsemArray}
                            value={valueforsem}
                            onChange={(selectedOption) => {
                                setvalueforsemlabel(selectedOption.label)
                                setValueforsem(selectedOption);

                            }}
                            isSearchable
                            placeholder="Select Semester"
                            required
                        />
                    </label>


                    <div>
                        <button
                            onClick={handleFetch}

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
                            Fetch
                        </button>

                    </div>
                </div>
                <ToastContainer />
            </div>
            <h1 style={{ textAlign: 'center' }}>Subjects</h1>
            <div className="container">

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Subjects</th>
                            <th style={{ textAlign: 'center' }}>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{item}</td>
                                <td style={{
                                    textAlign: 'center',
                                    cursor: 'pointer', // Add pointer cursor for better UX
                                }}
                                    onClick={() => handleRemove(item)}>
                                    <span style={{
                                        display: 'inline-block',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        lineHeight: '40px', // Vertically center the X
                                    }}>X</span></td>

                            </tr>

                        ))}
                        <tr>
                            <td style={{
                                textAlign: 'center',
                                cursor: 'pointer', // Add pointer cursor for better UX
                            }}
                                onClick={handleAdd}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    lineHeight: '35px', // Vertically center the +
                                    fontSize: '30px'
                                }}>+</span>
                            </td>
                        </tr>
                        {showInput && (
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter value"
                                        style={{
                                            textAlign: 'center',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </td>
                                <td style={{
                                    textAlign: 'center',
                                    cursor: 'pointer', // Add pointer cursor for better UX
                                }}
                                    onClick={handleSave}
                                >
                                    <span style={{
                                        display: 'inline-block',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        lineHeight: '40px', // Vertically center the ✓
                                        fontSize: '30px'
                                    }}>✓</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div >
        </>
    );
};

export default EditSubject;
