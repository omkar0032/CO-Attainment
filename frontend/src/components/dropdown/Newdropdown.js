import { Table, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { ContextProvider, UseData } from "../../NewContext";
import "./Dropdown.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ParentComponent from "../ParentComponent";
import Main_table from "../main_table";

function Dropdown(teachers_table) {
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
    const {valuefordivisionlabel,setValuefordivisionlabel}=UseData();
    const {data, setData} = UseData();
    const {createTable}=UseData();

  const [showbtn, setShowbtn] = useState(false);
  const [tableName, setTableName] = useState();
  const [showTable, setShowTable] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [transformedSubjects, setTransformedSubjects] = useState([]);
  const [transformedDivisions, setTransformedDivisions] = useState([]);

    let patternnames =[];
    const [transformedPattern,setTransformedPattern]=useState([]);
    let acadamicyearnames = [];
    const [transformedAcadamicYear,setTransformedAcadamicYear]=useState([]);
    let departmentnames = [];
    const [transformedDepartment,setTransformedDepartment]=useState([]);
    let divisionnames = [];   
    const [transformedDivision,setTransformedDivision]=useState([]);
    let subjectnames = [];   
    const [transformedSubject,setTransformedSubject]=useState([]);

    const [divisionAndSubject,setDivisionAndSubject]=useState();
    
    const [role,setRole]=useState("");
    useEffect(() => {
        transformPattern();
        transformDepartment();
        
    }, []);

    // let subjectAndDivisions;
    const fetchSubjectsAndDivisions = async (selectedOption) => {
        try {
            const dataTableName = `${valueforpattern?.value}_${valueforacadamicyear?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${selectedOption?.value}`;
            const loggedInUserNameFromStorage = localStorage.getItem('Userdata');
            const loggedInUserNameFromStorage1=JSON.parse(loggedInUserNameFromStorage)
            setRole(loggedInUserNameFromStorage1.role);
            console.log(role);
            // console.log("Data: ",dataTableName);
            const subjectAndDivisions = await axios.get(`http://localhost:3000/getSubjectsAndDivisions/${loggedInUserNameFromStorage1.email}/${dataTableName}`);
            console.log(subjectAndDivisions);
            setDivisionAndSubject(subjectAndDivisions)
        } catch (error) {
            console.error('Error fetching subjects and divisions:', error.message);
        }
    };

    const checkSubject = async(selectedOption)=>{
        try{

        // Check if the selected subject exists in the response data
        // console.log(divisionAndSubject);
        const selectedSubject = selectedOption.label;
        // console.log(selectedSubject);
        // console.log(divisionAndSubject.data);
        
        let flag=0;
        if(role==='HOD'){
            flag=1; 
        }
        else{
            for(let i=0;i<divisionAndSubject.data.length;i++){
                if(selectedSubject===divisionAndSubject.data[i].Subject){
                    flag=1;
                    break;
                }
            }
        }
        
        if(flag==1){
            setValueforsubject(selectedOption);
        }else{
            toast.warn("You have chosen the wrong option");
            // alert("You are chossing wrong option.Select Once again");
            setValueforsubject(null);
        }

        }
        catch(error){
            console.log("Error occured: ", error);
        }
    }

    const checkDivision = async(selectedOption)=>{
        try{
        const selectedDivision = selectedOption.label;
        // console.log(typeof(selectedDivision));
        let flag1=0;
        if(role=='HOD'){
            flag1=1;
        }else{
            for(let i=0;i<divisionAndSubject.data.length;i++){
                if((valueforsubject.label===divisionAndSubject.data[i].Subject && Number(selectedDivision)===divisionAndSubject.data[i].Division ) || (valueforsubject.label===divisionAndSubject.data[i].Coordinator)){
                    flag1=1;
                    break;
                }
            }
        }
        
        if(flag1==1){
            setValuefordivision(selectedOption);
        }else{
           toast.warn("You have chosen the wrong option");
            setValuefordivision(null);
        }

        }
        catch(error){
            console.log("Error occured: ", error);
        }
    }

  const transformPattern = async () => {
    await handleGetPattern();
    let transformedPatterns = patternnames.map((patternname) => ({
      value: convertPattern(patternname),
      label: String(patternname.Pattern),
    }));
    setTransformedPattern(transformedPatterns);
  };
  const convertPattern = (pattern) => {
    return "p" + String(pattern.Pattern);
  };

  const transformAcadamicYear = async (selectedOption) => {
    await handleGetAcadamicYear(selectedOption);
    const transformedAcadamicYears = acadamicyearnames.map(
      (acadamicyearname) => ({
        value: convertAcadamicYear(acadamicyearname),
        label: acadamicyearname.Academic_Year,
      })
    );
    setTransformedAcadamicYear(transformedAcadamicYears);
  };

  const convertAcadamicYear = (acadamicYear) => {
    const [startYear, endYear] = acadamicYear.Academic_Year.split("-");
    return "y_" + startYear + "_" + endYear;
  };

  const transformDepartment = async () => {
    await handleGetDeparment();
    const transformedDepartments = departmentnames.map((departmentname) => ({
      value: departmentname.Department.toLowerCase(),
      label: departmentname.Department,
    }));
    setTransformedDepartment(transformedDepartments);
  };

    const transformdivision=async()=>{
        await handleGetDivision();
        let transformedDivision1=divisionnames.map(division=>({
            value:String(division.Division),
            label:String(division.Division)
        }));

        transformedDivision1.push({value:'all',label:"All"});
        setTransformedDivision(transformedDivision1);
    }

  const transformSubject = async (selectedOption) => {
    await handleGetSubject(selectedOption);
    const transformedSubject1 = subjectnames.map((subjectname) => ({
      value: subjectname.Subject_Name.toLowerCase(),
      label: subjectname.Subject_Name,
    }));
    setTransformedSubject(transformedSubject1);
  };

  const createTables = async () => {
       
    const tableName = `${valueforpattern?.value}_${valueforacadamicyear?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}_${valueforsubject?.value}`;
    if (
        valueforpattern &&
        valueforacadamicyear&&  
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
                `http://localhost:3000/createTable/${tableName}/${valueforyearlabel}/${valuefordepartmentlabel}/${valuefordivisionlabel}
            `);
           
            if (response.data.length === 0) {
                
                // Display toast notification for empty table
                toast.warn("Table is empty. Upload to the database.");
            } else if (response.status === 200) {
                console.log(response.data);
                if (response.data === "Table created successfully.") {
                    console.log("creattt2");
                    // Table created successfully, show success notification
                    toast.success("Table Created Successfully. Enter Data.");
                    // await createTable(tableName);
                } else {
                    console.log("creattt1");
                    setShowTable(true);
                    await createTable(tableName);
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
      } else {
        console.error(
          `Error: Received unexpected status code ${result.status}`
        );
      }
    } catch (error) {
      console.log("Error while fetching data");
    }
  };

  // get acadamic year from backend

  const handleGetAcadamicYear = async (selectedOption) => {
    try {
      const name = selectedOption?.label;
      const response = await axios.get(
        `http://localhost:3000/pattrenname/${name}`
      );

      if (response.status === 200) {
        acadamicyearnames = response.data;
      } else {
        console.error(
          `Error: Received unexpected status code ${response.status}`
        );
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
      } else {
        console.error(
          `Error: Received unexpected status code ${result.status}`
        );
      }
    } catch (error) {
      console.log("Error while fetching data");
    }
  };

  const handleGetDivision = async () => {
    try {
      const name = valuefordepartment.label + "_" + valueforyear.label;
      const response = await axios.get(
        `http://localhost:3000/division/${name}`
      );

      if (response.status === 200) {
        divisionnames = response.data;
      } else {
        console.error(
          `Error: Received unexpected status code ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error while fetching data:", error.message);
    }
  };

  const handleGetSubject = async (selectedOption) => {
    try {
      const name = `${valueforpattern?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${selectedOption?.value}`;
      const response = await axios.get(`http://localhost:3000/subject/${name}`);

      if (response.status === 200) {
        subjectnames = response.data;
      } else {
        console.error(
          `Error: Received unexpected status code ${response.status}`
        );
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
  ];

  // One of these Array of objects is passed when user hits YEAR section because sem depends on YEAR
  const fe = [
    { value: "sem1", label: "Sem_1" },
    { value: "sem2", label: "Sem_2" },
  ];

  const se = [
    { value: "sem3", label: "Sem_3" },
    { value: "sem4", label: "Sem_4" },
  ];

  const te = [
    { value: "sem5", label: "Sem_5" },
    { value: "sem6", label: "Sem_6" },
  ];

  const be = [
    { value: "sem7", label: "Sem_7" },
    { value: "sem8", label: "Sem_8" },
  ];
  // this Object of Above Array.
  const semname = { fe, se, te, be };

  //    this Array for test pattern
  const testname = [
    { value: "t1", label: "UT-1" },
    { value: "t2", label: "UT-2" },
    { value: "t3", label: "UT-3" },
    { value: "t4", label: "UA" },
  ];

  // this hook for test selection like ut 1 ut2
  const handleOnChange = (selectedOption) => {
    setValuefortest(selectedOption);
    setValuefortest1(selectedOption.label);
  };

    return (
        <>
            <div className="boxComponent">

                <div className="buttonbox" >
                    <label>Pattern:</label>
                    <Select
                        options={transformedPattern} 
                        value={valueforpattern}
                        onChange={(selectedOption) => {
                            setValueforpattern(selectedOption);
                            transformAcadamicYear(selectedOption);
                            setValuefordivision(null);
                            setValueforsubject(null);
                            setValueforsem(null);
                            setValuedepartment(null);
                            setValueforyear(null);
                            setValueForAcadamicYear(null);
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
                            setValueForAcadamicYear(selectedOption);
                            setValueForAcademicYearlabel(selectedOption.label);
                            setValuefordivision(null);
                            setValueforsubject(null);
                            setValueforsem(null);
                            setValuedepartment(null);
                            setValueforyear(null);

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
                            setValuefordivision(null);
                            setValueforsubject(null);
                            setValueforsem(null);
                            setValuedepartment(null);
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
                            setValuefordivision(null);
                            setValueforsubject(null);
                            setValueforsem(null);
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
                            fetchSubjectsAndDivisions(selectedOption);
                            setValuefordivision(null);
                            setValueforsubject(null);
                        }}
                        isSearchable
                        placeholder="Select Sem"
                        required
                    />
                </div>

                <div className="buttonbox">
                    <label>Subject:</label>
                    <Select
                        options={transformedSubject}
                        value={valueforsubject}
                        onChange={(selectedOption) => {
                            
                            setvalueforsubjectlabel(selectedOption.label);
                            checkSubject(selectedOption);
                            setValuefordivision(null);
                        }}
                        isSearchable
                        placeholder="Select Subject"
                        required
                    />

                </div>

                <div className="buttonbox">
                    <label>Test:</label>
                    <Select
                        options={testname}
                        value={valuefortest}
                        onChange={(selectedOption) => {
                            handleOnChange(selectedOption);
                        }}
                        isSearchable
                        placeholder="Select Test"
                        required
                    />
                </div>
                <div className="buttonbox">
                    <label>Division:</label>
                    <Select
                        options={transformedDivision}
                        value={valuefordivision}
                        onChange={(selectedOption) => {
                            checkDivision(selectedOption);
                            setValuefordivisionlabel(selectedOption.label);
                            // setValuefordivision(selectedOption);
                            
                        }}

                        isSearchable
                        placeholder="Select Division"
                        required
                    >
                    </Select>
                </div>
            </div>
            <div className="create-table">
                <Button onClick={createTables}>Show Records</Button>
            </div>
            <ToastContainer />
            {showbtn    && (<ParentComponent tableName={tableName} />)}
            {showTable  && (<Main_table tableName={tableName} />)     }
        </>
    );
}

export default Dropdown;