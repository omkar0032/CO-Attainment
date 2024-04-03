// import { Table, Button } from "react-bootstrap";
// import React, { useContext, useState } from "react";
// import Select from 'react-select';
// import { ContextProvider, UseData } from "../../NewContext";
// import '../dropdown/Dropdown.css';
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import ParentComponent from "../ParentComponent";
// import Main_table from "../main_table";
// import ShyamImport from "./masterImport";
// import shyamDataTable from "./masterDataTable";
// import ShyamDataTable from "./masterDataTable";
// function MasterMain() {

//     // to select pattern
//     const [valueforpattern, setValueforpattern] = useState("");

//     // select Acadmic Year.
//     const [valueforacadamicyear, setValueForAcadamicYear] = useState("");

//     //to select year.
//     const [valueforyear, setValueforyear] = useState("");

//     // for department
//     const [valuefordepartment, setValuedepartment] = useState("");
//     // for departmentArray
//     const [valuefordepartmentArray, setValuedepartmentArray] = useState([]);


//     // useState for All divisions initial state is object
//     const [valuefordivisionArray, setValuefordivisionArray] = useState([]);
//     // this to use usestate for addition for subject selection
//     const [valuefordivision, setValuefordivision] = useState("");

//     // to select semester and initialsing it by array
//     const [valueforsemArray, setValueforsemArray] = useState([]);
//     // this useState for addition to find subject
//     const [valueforsem, setValueforsem] = useState("");

//     // useState for Subject contaning initial value as object. 
//     const [valueforsubjectArray, setValueforsubjectArray] = useState([]);
//     // to is actual setValue for subject selection
//     const [valueforsubject, setValueforsubject] = useState();

//     // // this hook for test selection like ut 1 ut2
//     const [valuefortest, setValuefortest] = useState();
//     const { valuefortest1, setValuefortest1 } = UseData();
//     const { valueforacadamicyearlabel, setValueForAcademicYearlabel } = UseData();
//     const { valuefordepartmentlabel, setvaluefordepartmentlabel } = UseData();
//     const { valueforyearlabel, setvalueforyearlabel } = UseData();
//     const { valueforsubjectlabel, setvalueforsubjectlabel } = UseData();
//     const { valueforsemlabel, setvalueforsemlabel } = UseData();

//     const [showbtn, setShowbtn] = useState(false);
//     const [tableName, setTableName] = useState();
//     const [showTable, setShowTable] = useState(false);
//     // passed in option={patternname}
//     const createAndLinkTable = async () => {
//         const tableName = `${valueforpattern?.value}_${valueforacadamicyear?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}`;

//         if (
//             valueforpattern &&
//             valueforacadamicyear &&
//             valueforyear &&
//             valuefordepartment &&
//             valueforsem
//         ) {
//             setShowbtn(true);
//             setTableName(tableName);
//             try {
//                 setShowbtn(true);
//                 console.log(tableName);
//                 const response = await axios.get(
//                     `http://localhost:3000/create_LinkTable/${tableName}`
//                 );
//                 if (response.data.length === 0) {
//                     // Display toast notification for empty table
//                     toast.warn("Table is empty. Upload to the database.");
//                 } else if (response.status === 200) {
//                     if (response.data === "Table created and linked successfully.") {
//                         // Table created successfully, show success notification
//                         toast.success("Table created and linked successfully. Enter Data.");
//                     } else {
//                         setShowTable(true);
//                     }
//                 } else {
//                     // Unexpected response, handle it
//                     console.error("Unexpected response:", response);
//                     // Handle unexpected response if needed
//                 }
//             } catch (error) {
//                 console.error("Error creating table:", error);
//                 // Handle error if needed
//             }
//         } else {
//             // Display toast notification for missing fields
//             toast.error("Please select all fields");
//         }
//     };


//     const patternname = [

//         { value: "p2019", label: "2019 pattern" }, // Corrected value

//     ];

//     // passed in option={acadamicYearname}
//     const acadamicyearname = [

//         { value: "y_2019_20", label: "2019-2020" },
//         { value: "y_2020_21", label: "2020-2021" },
//         { value: "y_2021_22", label: "2021-2022" },
//         { value: "y_2022_23", label: "2022-2023" },
//         { value: "y_2023_24", label: "2023-2024" },
//         { value: "y_2024_25", label: "2024-2025" },

//     ]
//     // passed in option={yearname}
//     const yearname = [
//         { value: "y1_d", label: "FE" },
//         { value: "y2_d", label: "SE" },
//         { value: "y3_d", label: "TE" },
//         { value: "y4_d", label: "BE" },
//     ]

//     const d = [
//         { value: "fe", label: "FE" },
//         { value: "cs", label: "CS" },
//         { value: "entc", label: "ENTC" },
//         { value: "it", label: "IT" },
//     ]
//     // array for department
//     const departmentname = { d };



//     // it for cs
//     const cs = [
//         { value: "cs1", label: "1" },
//         { value: "cs2", label: "2" },
//         { value: "cs3", label: "3" },
//         { value: "cs4", label: "4" },
//     ]

//     // it for entc
//     const entc = [

//         { value: "entc5", label: "5" },
//         { value: "entc6", label: "6" },
//         { value: "entc7", label: "7" },
//         { value: "entc8", label: "8" },

//     ]

//     // it for IT
//     const it = [
//         { value: "it9", label: "9" },
//         { value: "it10", label: "10" },
//         { value: "it11", label: "11" },
//     ]

//     // object of array for division
//     const divisionname = { cs, entc, it };

//     // One of these Array of objects is passed when user hits YEAR section because sem depends on YEAR
//     const fe = [
//         { value: "sem1", label: "Sem_1" },
//         { value: "sem2", label: "Sem_2" },
//     ]

//     const se = [
//         { value: "sem3", label: "Sem_3" },
//         { value: "sem4", label: "Sem_4" },

//     ]

//     const te = [
//         { value: "sem5", label: "Sem_5" },
//         { value: "sem6", label: "Sem_6" },

//     ]

//     const be = [
//         { value: "sem7", label: "Sem_7" },
//         { value: "sem8", label: "Sem_8" },

//     ]
//     // this Object of Above Array.
//     const semname = { fe, se, te, be };


//     //    this Array for test pattern 
//     const testname = [
//         { value: "t1", label: "UT-1" },
//         { value: "t2", label: "UT-2" },
//         { value: "t3", label: "UT-3" },
//         { value: "t4", label: "UA" },
//     ]

//     // this hook for test selection like ut 1 ut2
//     const handleOnChange = (selectedOption) => {
//         setValuefortest(selectedOption);
//         setValuefortest1(selectedOption.label);
//         // console.log(valuefortest1);
//     }


//     return (
//         <>
//             <div style={{ margin: '3% 0 3% 0' }}>
//                 < ShyamDataTable />

//             </div>
//             <h1 style={{ textAlign: "center", margin: '9% 0 0 0' }}>Allocate Subject Data</h1>
//             <div className="boxComponent">


//                 <div className="buttonbox" >
//                     <label>Pattern:</label>
//                     <Select
//                         options={patternname} value={valueforpattern}
//                         onChange={(selectedOption) => {
//                             setValueforpattern(selectedOption);
//                             var additionString;
//                             additionString = selectedOption.value + valueforyear.value + valuefordepartment.value + valueforsem.value;
//                             // setValueforsubjectArray(subjectname[additionString]);
//                         }}
//                         isSearchable
//                         placeholder="Select Pattern"
//                         required
//                     />
//                 </div>
//                 {/* <div style={{margin:20, width:165}}></div> */}
//                 <div className="buttonbox" >
//                     <label>Acadamic Year:</label>
//                     <Select
//                         options={acadamicyearname} value={valueforacadamicyear}
//                         onChange={(selectedOption) => {
//                             setValueForAcadamicYear(selectedOption)
//                             setValueForAcademicYearlabel(selectedOption.label)

//                         }
//                         }
//                         isSearchable
//                         placeholder="Acadamic Year"
//                         required
//                     />
//                 </div>
//                 <div className="buttonbox">
//                     <label>Engineering Year:</label>
//                     <Select
//                         options={yearname}
//                         value={valueforyear}
//                         onChange={(selectedOption) => {
//                             setValueforyear(selectedOption);
//                             // setvalueforyearlabel(selectedOption.label);
//                             setValueforsemArray(semname[selectedOption.label.toLowerCase()]);
//                             setValuedepartmentArray(departmentname[selectedOption.value.split('')[3]]);// bug handeling to trigger subject value
//                             // // var additionString;
//                             // // additionString=valueforpattern.value+selectedOption.value+valuefordepartment.value+valueforsem.value;
//                             // setValueforsubjectArray(subjectname[additionString]);


//                         }}
//                         isSearchable
//                         placeholder="Select Year"
//                         required

//                     />

//                 </div>
//                 <div className="buttonbox" >
//                     <label>Department:</label>
//                     <Select
//                         options={valuefordepartmentArray} value={valuefordepartment}
//                         onChange={(selectedOption) => {
//                             setValuedepartment(selectedOption)
//                             setvaluefordepartmentlabel(selectedOption.label);
//                             setValuefordivisionArray(divisionname[selectedOption.value]);
//                             var additionString;
//                             additionString = valueforpattern.value + valueforyear.value + selectedOption.value + valueforsem.value;
//                             // setValueforsubjectArray(subjectname[additionString]);
//                         }
//                         }
//                         isSearchable
//                         placeholder="department"
//                         required
//                     />
//                 </div>
//             </div>
//             <div className="boxComponent">
//                 <div className="buttonbox">
//                     <label>Semester:</label>
//                     <Select
//                         // array from year
//                         options={valueforsemArray}
//                         value={valueforsem}
//                         onChange={(selectedOption) => {
//                             // console.log(selectedOption.value)
//                             setvalueforsemlabel(selectedOption.label)
//                             setValueforsem(selectedOption);
//                             var additionString;
//                             additionString = valueforpattern.value + valueforyear.value + valuefordepartment.value + selectedOption.value;
//                             // setValueforsubjectArray(subjectname[additionString]);
//                         }}
//                         isSearchable
//                         placeholder="Select Sem"
//                         required
//                     />
//                 </div>
//             </div>
//             <div className="create-table">
//                 <Button onClick={createAndLinkTable}>Create Table</Button>
//             </div >
//             <ToastContainer />
//             {showbtn && <ShyamImport tableName={tableName} />}

//         </>
//     );
// }

// export default MasterMain;
// import { Table, Button } from "react-bootstrap";
// import React, { useContext, useState } from "react";
// import Select from 'react-select';
// import { ContextProvider, UseData } from "../../NewContext";
// import '../dropdown/Dropdown.css';
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import ParentComponent from "../ParentComponent";
// import Main_table from "../main_table";
import ShyamImport from "./masterImport";
import shyamDataTable from "./masterDataTable";
import ShyamDataTable from "./masterDataTable";
import { Table, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import Select from 'react-select';
import { ContextProvider, UseData } from "../../NewContext";
import '../dropdown/Dropdown.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ParentComponent from "../ParentComponent";
import Main_table from "../main_table";
function MasterMain(teachers_table) {
    const { email } = UseData();

    // to select pattern
    const [valueforpattern, setValueforpattern] = useState("");

    // select Acadmic Year.
    const [valueforacadamicyear, setValueForAcadamicYear] = useState("");

    //to select year.
    const [valueforyear, setValueforyear] = useState("");

    // for department
    const [valuefordepartment, setValuedepartment] = useState("");



    // useState for All divisions initial state is object
    // const [valuefordivisionArray, setValuefordivisionArray] = useState([]);
    // this to use usestate for addition for subject selection
    const [valuefordivision, setValuefordivision] = useState("");

    // to select semester and initialsing it by array
    const [valueforsemArray, setValueforsemArray] = useState([]);
    // this useState for addition to find subject
    const [valueforsem, setValueforsem] = useState("");

    // useState for Subject contaning initial value as object. 
    // const [valueforsubjectArray, setValueforsubjectArray] = useState([]);
    // to is actual setValue for subject selection
    const [valueforsubject, setValueforsubject] = useState();

    // // this hook for test selection like ut 1 ut2
    const [valuefortest, setValuefortest] = useState();
    const { valuefortest1, setValuefortest1 } = UseData();
    const { valueforacadamicyearlabel, setValueForAcademicYearlabel } = UseData();
    const { valuefordepartmentlabel, setvaluefordepartmentlabel } = UseData();
    const { valueforyearlabel, setvalueforyearlabel } = UseData();
    const { valueforsubjectlabel, setvalueforsubjectlabel } = UseData();
    const { valueforsemlabel, setvalueforsemlabel } = UseData();

    const [showbtn, setShowbtn] = useState(false);
    const [tableName, setTableName] = useState();
    const [showTable, setShowTable] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [transformedSubjects, setTransformedSubjects] = useState([]);
    const [transformedDivisions, setTransformedDivisions] = useState([]);
    const createAndLinkTable = async () => {
                const tableName = `${valueforpattern?.value}_${valueforacadamicyear?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}`;
        
                if (
                    valueforpattern &&
                    valueforacadamicyear &&
                    valueforyear &&
                    valuefordepartment &&
                    valueforsem
                ) {
                    setShowbtn(true);
                    setTableName(tableName);
                    try {
                        setShowbtn(true);
                        console.log(tableName);
                        const response = await axios.get(
                            `http://localhost:3000/create_LinkTable/${tableName}`
                        );
                        if (response.data.length === 0) {
                            // Display toast notification for empty table
                            toast.warn("Table is empty. Upload to the database.");
                        } else if (response.status === 200) {
                            if (response.data === "Table created and linked successfully.") {
                                // Table created successfully, show success notification
                                toast.success("Table created and linked successfully. Enter Data.");
                            } else {
                                setShowTable(true);
                            }
                        } else {
                            // Unexpected response, handle it
                            console.error("Unexpected response:", response);
                            // Handle unexpected response if needed
                        }
                    } catch (error) {
                        console.error("Error creating table:", error);
                        // Handle error if needed
                    }
                } else {
                    // Display toast notification for missing fields
                    toast.error("Please select all fields");
                }
            };
    let patternnames = [];
    const [transformedPattern, setTransformedPattern] = useState([]);
    let acadamicyearnames = [];
    const [transformedAcadamicYear, setTransformedAcadamicYear] = useState([]);
    let departmentnames = [];
    const [transformedDepartment, setTransformedDepartment] = useState([]);
    let divisionnames = [];
    const [transformedDivision, setTransformedDivision] = useState([]);
    let subjectnames = [];
    const [transformedSubject, setTransformedSubject] = useState([]);

    // passed in option={patternname}

    useEffect(() => {
        transformPattern();
        transformDepartment();

        // const fetchSubjectsAndDivisions = async () => {
        //     try {
        //         const dataTableName = `${valueforpattern?.value}_${valueforacadamicyear?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}`;
        //         console.log(dataTableName);
        //         const response = await axios.get(`http://localhost:3000/getSubjectsAndDivisions/${email}/${dataTableName}`);
        //         const { subjects, divisions } = response.data;
        //         setSubjects(subjects);
        //         setDivisions(divisions);

        //         const transformedSubjects = subjects.map(subject => ({
        //             value: subject,
        //             label: subject,
        //         }));
        //         setTransformedSubjects(transformedSubjects);
        //         // Function to map division numbers to prefixes
        //         const mapDivisionToPrefix = (division) => {
        //             if (divisions >= 1 && divisions <= 4) {
        //                 return `cs${divisions}`;
        //             } else if (divisions >= 5 && divisions <= 8) {
        //                 return `entc${divisions}`;
        //             } else if (divisions >= 9 && divisions <= 11) {
        //                 return `it${divisions}`;
        //             } else {
        //                 // Handle other cases if needed
        //                 return `unknown${divisions}`;
        //             }
        //         };

        //         // Transform the array of divisions into the desired format
        //         const transformedDivisions = divisions.map((division) => ({
        //             value: mapDivisionToPrefix(division),
        //             label: division,
        //         }));
        //         setTransformedDivisions(transformedDivisions);
        //     } catch (error) {
        //         console.error('Error fetching subjects and divisions:', error.message);
        //     }
        // };
        // if (valueforsemlabel) {
        //     fetchSubjectsAndDivisions();
        // }
    }, []);//[valueforsemlabel]);

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

    const transformAcadamicYear = async (selectedOption) => {
        await handleGetAcadamicYear(selectedOption);
        // console.log(acadamicyearnames);
        // console.log(acadamicYears);
        const transformedAcadamicYears = acadamicyearnames.map(acadamicyearname => ({
            value: convertAcadamicYear(acadamicyearname),
            label: acadamicyearname.Acadamic_Year,
        }))
        setTransformedAcadamicYear(transformedAcadamicYears);

    }

    const convertAcadamicYear = (acadamicYear) => {
        const [startYear, endYear] = acadamicYear.Acadamic_Year.split('-');
        return "y_" + startYear + "_" + endYear;
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

    const transformdivision = async () => {
        await handleGetDivision();
        const transformedDivision1 = divisionnames.map(division => ({
            value: String(division.Division),
            label: String(division.Division)
        }));
        setTransformedDivision(transformedDivision1);
    }

    const transformSubject = async (selectedOption) => {
        await handleGetSubject(selectedOption);
        // console.log(subjectnames);
        const transformedSubject1 = subjectnames.map(subjectname => ({
            value: subjectname.Subject_Name,
            label: subjectname.Subject_Name
        }));
        setTransformedSubject(transformedSubject1);
        console.log(transformedSubject1);
    }

    const createTable = async () => {
        const tableName = `${valueforpattern?.value}_${valueforacadamicyear?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}_${valueforsubject?.value}`;

        if (
            valueforpattern &&
            valueforacadamicyear &&
            valueforyear &&
            valuefordepartment &&
            valuefordivision &&
            valueforsem &&
            valueforsubject &&
            valuefortest
        ) {
            setShowbtn(true);
            setTableName(tableName);
            try {
                setShowbtn(true);
                console.log(tableName);
                const response = await axios.get(
                    `http://localhost:3000/createTable/${tableName}`
                );
                if (response.data.length === 0) {
                    // Display toast notification for empty table
                    toast.warn("Table is empty. Upload to the database.");
                } else if (response.status === 200) {
                    if (response.data === "Table created successfully.") {
                        // Table created successfully, show success notification
                        toast.success("Table Created Successfully. Enter Data.");
                    } else {
                        setShowTable(true);
                    }
                } else {
                    // Unexpected response, handle it
                    console.error("Unexpected response:", response);
                    // Handle unexpected response if needed
                }
            } catch (error) {
                console.error("Error creating table:", error);
                // Handle error if needed
            }
        } else {
            // Display toast notification for missing fields
            toast.error("Please select all fields");
        }
    };

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

    // get acadamic year from backend

    const handleGetAcadamicYear = async (selectedOption) => {
        try {
            const name = selectedOption?.label;
            const response = await axios.get(`http://localhost:3000/pattrenname/${name}`);

            if (response.status === 200) {
                acadamicyearnames = response.data;
                // console.log(acadamicyearnames);
            } else {
                console.error(`Error: Received unexpected status code ${response.status}`);
            }
        } catch (error) {
            console.error("Error while fetching data:", error.message);
        }
    };

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

    const handleGetDivision = async () => {
        try {
            const name = valuefordepartment.label + "_" + valueforyear.label;
            console.log(name)
            const response = await axios.get(`http://localhost:3000/division/${name}`);

            if (response.status === 200) {
                divisionnames = response.data;
                // console.log(acadamicyearnames);
            } else {
                console.error(`Error: Received unexpected status code ${response.status}`);
            }
        } catch (error) {
            console.error("Error while fetching data:", error.message);
        }
    };

    const handleGetSubject = async (selectedOption) => {
        try {
            const name = `${valueforpattern?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${selectedOption?.value}`;
            console.log(name)
            const response = await axios.get(`http://localhost:3000/subject/${name}`);

            if (response.status === 200) {
                subjectnames = response.data;
                // console.log(subjectnames);
            } else {
                console.error(`Error: Received unexpected status code ${response.status}`);
            }
        } catch (error) {
            console.error("Error while fetching data:", error.message);
        }

    };


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



    //    this Array for test pattern 
    const testname = [
        { value: "t1", label: "UT-1" },
        { value: "t2", label: "UT-2" },
        { value: "t3", label: "UT-3" },
        { value: "t4", label: "UA" },
    ]

    // this hook for test selection like ut 1 ut2
    const handleOnChange = (selectedOption) => {
        setValuefortest(selectedOption);
        setValuefortest1(selectedOption.label);
        // console.log(valuefortest1);
    }

    return (
        <>
            <div style={{ margin: '3% 0 3% 0' }}>
                < ShyamDataTable />

            </div>            <h1 style={{ textAlign: "center", margin: '9% 0 0 0' }}>Allocate Subject Data</h1>
            <div className="boxComponent">
                <div className="buttonbox" >
                    <label>Pattern:</label>
                    <Select
                        options={transformedPattern}
                        value={valueforpattern}
                        onChange={(selectedOption) => {
                            setValueforpattern(selectedOption);
                            transformAcadamicYear(selectedOption);
                        }}
                        isSearchable
                        placeholder="Select Pattern"
                        required
                    />
                </div>
                <div className="buttonbox" >
                    <label>Acadamic Year:</label>
                    <Select
                        options={transformedAcadamicYear}
                        value={valueforacadamicyear}
                        onChange={(selectedOption) => {
                            setValueForAcadamicYear(selectedOption)
                            setValueForAcademicYearlabel(selectedOption.label)

                        }
                        }
                        isSearchable
                        placeholder="Acadamic Year"
                        required
                    />
                </div>
                <div className="buttonbox">
                    <label>Engineering Year:</label>
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

                </div>
                <div className="buttonbox" >
                    <label>Department:</label>
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
                </div>
            </div>
            <div className="boxComponent">
                <div className="buttonbox">
                    <label>Semester:</label>
                    <Select
                        options={valueforsemArray}
                        value={valueforsem}
                        onChange={(selectedOption) => {
                            setvalueforsemlabel(selectedOption.label)
                            setValueforsem(selectedOption);
                            transformdivision();
                            transformSubject(selectedOption);
                        }}
                        isSearchable
                        placeholder="Select Sem"
                        required
                    />
                </div>

            </div>
            <div className="create-table">
              <Button onClick={createAndLinkTable}>Create Table</Button>
             </div >
             <ToastContainer />
             {showbtn && <ShyamImport tableName={tableName} />}

        </>
    );
}

export default MasterMain;



