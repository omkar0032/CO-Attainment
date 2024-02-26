import { Table, Button } from "react-bootstrap";
import React, { useState } from "react";
import Select from "react-select";
import "./Dropdown.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DataTable from "../DataTable";
import ParentComponent from "../ParentComponent";
// import TempTable from "../tempTable";
import TempTable from "../TempTable";
function Dropdown() {
  // to select pattern
  const [valueforpattern, setValueforpattern] = useState(0);

  //to select year.
  const [valueforyear, setValueforyear] = useState();

  // for department
  const [valuefordepartment, setValuedepartment] = useState();
  // for departmentArray
  const [valuefordepartmentArray, setValuedepartmentArray] = useState([]);

  // useState for All divisions initial state is object
  const [valuefordivisionArray, setValuefordivisionArray] = useState([]);
  // this to use usestate for addition for subject selection
  const [valuefordivision, setValuefordivision] = useState();

  // to select semester and initialsing it by array
  const [valueforsemArray, setValueforsemArray] = useState([]);
  // this useState for addition to find subject
  const [valueforsem, setValueforsem] = useState("");

  // useState for Subject contaning initial value as object.
  const [valueforsubjectArray, setValueforsubjectArray] = useState([]);
  // to is actual setValue for subject selection
  const [valueforsubject, setValueforsubject] = useState();

  // this hook for test selection like ut 1 ut2
  const [valuefortest, setValuefortest] = useState();

  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [showImportButton,setShowImportButton]=useState(false);
  const [tableName,setTableName]=useState();
  const createTable = async () => {
    const tableName = `${valueforpattern?.value}_${valueforyear?.value}_${valuefordepartment?.value}${valuefordivision?.value}_${valueforsem?.value}_${valueforsubject?.value}`;
    setIsShow(true);
    
    if (
      valueforpattern &&
      valueforyear &&
      valuefordepartment &&
      valuefordivision &&
      valueforsem &&
      valueforsubject &&
      valuefortest
    ) {
      setTableName(tableName);
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:3000/createTable/${tableName}`
    //     );
    //     if (response.data.length === 0) {
    //       // Display toast notification for empty table
    //       toast.warn("Table is empty. Upload to the database.");
    //     }
    //     else if (response.status === 200) {
    //       if (response.data === "Table created successfully.") {
    //         // Table created successfully, show success notification
    //         toast.success("Table Created Successfully. Enter Data.");
    //       } 
    //       else {
    //         // Table data fetched successfully, show success notification
    //         toast.success("Data Fetched Successfully.");
    //         // Handle table data if needed
    //         if (response.data.length === 0) {
    //           // Display toast notification for empty table
    //           toast.warning("Table is empty. Upload to the database.");
    //         } 
    //         else {

    //           const updatedData = response.data.map((row) => {
    //             const newTotalUT1 = row["UT1-Q1"] + row["UT1-Q2"];
    //             const newTotalUT2 = row["UT2-Q1"] + row["UT2-Q2"];
    //             const newTotalUT3 = row["UT3-Q1"] + row["UT3-Q2"];

    //             return {
    //               ...row,
    //               ["Total-UT1"]: newTotalUT1,
    //               ["Total-UT2"]: newTotalUT2,
    //               ["Total-UT3"]: newTotalUT3,
    //             };
    //           });

    //           setData(updatedData);
    //         }
    //       }
    //     } 
    //     else {
    //       // Unexpected response, handle it
    //       console.error("Unexpected response:", response);
    //       // Handle unexpected response if needed
    //     }
    //   } catch (error) {
    //     console.error("Error creating table:", error);
    //     // Handle error if needed
    //   }
    // } 
    }
    else {
      // Display toast notification for missing fields
      toast.error("Please select all fields");
    }
  };

  const handleMarksChange = (index, question, value, e) => {
    try {
      const updatedData = [...data];
      const numericValue = isNaN(value) ? 0 : parseInt(value, 10);
  
      // Limit marks to a maximum of 15
      const limitedMarks = Math.min(numericValue, 15);
  
      updatedData[index] ??= {};
      updatedData[index][question] = limitedMarks;
  
      // Recalculate total marks
      updatedData[index]["Total-UT1"] =
        (updatedData[index]["UT1-Q1"] || 0) + (updatedData[index]["UT1-Q2"] || 0);
      updatedData[index]["Total-UT2"] =
        (updatedData[index]["UT2-Q1"] || 0) + (updatedData[index]["UT2-Q2"] || 0);
      updatedData[index]["Total-UT3"] =
        (updatedData[index]["UT3-Q1"] || 0) + (updatedData[index]["UT3-Q2"] || 0);
  
      setData(updatedData);
    } catch (error) {
      console.error("Error occurred while handling marks change:", error);
      // Handle error here, such as displaying a message to the user
    }
  };
  

  const handleMarksChangeUA = (index, question, value, e) => {
    const updatedData = [...data];
    const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

    if (numericValue > 100) {
      e.target.value = 100;
      return;
    }

    updatedData[index] ??= {};
    updatedData[index][question] = numericValue;
    setData(updatedData);
  };

  const insertData = async () => {
    try {
      console.log("Data to insert:", data);
      const response = await axios.post(
        `http://localhost:3000/updateDatabase/${tableName}`,
        { dataToInsert: data }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  // passed in option={patternname}
  const patternname = [
    { value: "p2015", label: "2015 pattern" },
    { value: "p2019", label: "2019 pattern" }, // Corrected value
    { value: "p2024", label: "2024 pattern" },
  ];

  // passed in option={yearname}
  const yearname = [
    { value: "y1_q", label: "FE" },
    { value: "y2_d", label: "SE" },
    { value: "y3_d", label: "TE" },
    { value: "y4_d", label: "BE" },
  ];

  const q = [{ value: "fe", label: "FE" }];

  const d = [
    { value: "cs", label: "CS" },
    { value: "entc", label: "ENTC" },
    { value: "it", label: "IT" },
  ];
  // array for department
  const departmentname = { q, d };

  // it for cs
  const cs = [
    { value: "cs1", label: "1" },
    { value: "cs2", label: "2" },
    { value: "cs3", label: "3" },
    { value: "cs4", label: "4" },
  ];

  // it for cs
  const entc = [
    { value: "entc5", label: "5" },
    { value: "entc6", label: "6" },
    { value: "entc7", label: "7" },
    { value: "entc8", label: "8" },
  ];

  // it for cs
  const it = [
    { value: "it9", label: "9" },
    { value: "it10", label: "10" },
    { value: "it11", label: "11" },
  ];

  // object of array for division
  const divisionname = { cs, entc, it };

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

  // Values of Subject
  // For first year sem1
  const p2019y1type1sem1 = [
    { value: "PHYSICS", label: "PHYSICS" },
    { value: "EM-1", label: "EM-1" },
    { value: "SME", label: "SME" },
    { value: "BEE", label: "BEE" },
    { value: "EM", label: "EM" },
  ];

  const p2019y1type2sem1 = [
    { value: "CHEMISTRY", label: "CHEMISTRY" },
    { value: "EM-1", label: "EM-1" },
    { value: "SME", label: "SME" },
    { value: "BXE", label: "BXE" },
    { value: "PPS", label: "PPS" },
  ];

  // for fe sem2
  const p2019y1type1sem2 = [
    { value: "CHEMISTRY", label: "CHEMISTRY" },
    { value: "EM-2", label: "EM-2" },
    { value: "BXE", label: "BXE" },
    { value: "PPS", label: "PPS" },
    { value: "GRAPHICS", label: "GRAPHICS" },
  ];

  const p2019y1type2sem2 = [
    { value: "PHYSICS", label: "PHYSICS" },
    { value: "EM-2", label: "EM-2" },
    { value: "GRAPHICS", label: "GRAPHICS" },
    { value: "BEE", label: "BEE" },
    { value: "EM", label: "EM" },
  ];

  // subject for IT
  // for se it sem3
  const p2019y2_ditsem3 = [
    { value: "DM", label: "DM" },
    { value: "LDCO", label: "LDCO" },
    { value: "DSA", label: "DSA" },
    { value: "OOP", label: "OOP" },
    { value: "BCN", label: "BCN" },
  ];
  // for se it sem4
  const p2019y2_ditsem4 = [
    { value: "DMS", label: "DMS" },
    { value: "CG", label: "CG" },
    { value: "PA", label: "PA" },
    { value: "SE", label: "SE" },
    { value: "EM-3", label: "EM-3" },
  ];
  // for te it sem5
  const p2019y3_ditsem5 = [
    { value: "TOC", label: "TOC" },
    { value: "OS", label: "OS" },
    { value: "ML", label: "ML" },
    { value: "HCI", label: "HCI" },
    { value: "DAA", label: "DAA" },
    { value: "ADBMS", label: "ADBMS" },
  ];
  // for te it sem6
  const p2019y3_ditsem6 = [
    { value: "CN", label: "CN" },
    { value: "WAD", label: "WAD" },
    { value: "DSBDA", label: "DSBDA" },
    { value: "CC", label: "CC" },
    { value: "AI", label: "AI" },
  ];
  // for be it sem7
  const p2019y4_ditsem7 = [
    { value: "DS", label: "DS" },
    { value: "SC", label: "SC" },
    { value: "BCT", label: "BCT" },
    { value: "S7E", label: "S&E" },
  ];

  // for be it sem8
  const p2019y4_ditsem8 = [
    { value: "DS", label: "DS" },
    { value: "SC", label: "SC" },
    { value: "BCT", label: "BCT" },
    { value: "S7E", label: "S&E" },
  ];

  // This is Object of Above value.
  const subjectname = {
    p2019y1type1sem1,
    p2019y1type1sem2,
    p2019y1type2sem1,
    p2019y1type2sem2,
    p2019y2_ditsem3,
    p2019y2_ditsem4,
    p2019y3_ditsem5,
    p2019y3_ditsem6,
    p2019y4_ditsem7,
    p2019y4_ditsem8,
  };

  //this Array for test pattern
  const testname = [
    { value: "t1", label: "UT-1" },
    { value: "t2", label: "UT-2" },
    { value: "t3", label: "Other" },
  ];
  return (
    <div className="boxComponent">
      <div className="initial-content">
        <div className="Drop-downs">
        <div className="buttonbox">
          <label>Pattern:</label>
          <Select
            options={patternname}
            value={valueforpattern}
            onChange={(selectedOption) => {
              setValueforpattern(selectedOption);
            }}
            isSearchable
            placeholder="Select Pattern"
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
              // setValuefordivisionArray(divis[selectedOption.value]);
              setValueforsemArray(semname[selectedOption.label.toLowerCase()]);
              setValuedepartmentArray(
                departmentname[selectedOption.value.split("")[3]]
              );
            }}
            isSearchable
            placeholder="Select Year"
            required
          />
        </div>
        <div className="buttonbox">
          <label>Department:</label>
          <Select
            options={valuefordepartmentArray}
            value={valuefordepartment}
            onChange={(selectedOption) => {
              setValuedepartment(selectedOption);
              setValuefordivisionArray(divisionname[selectedOption.value]);
            }}
            isSearchable
            placeholder="department"
            required
          />
        </div>
        <div className="buttonbox">
          <label>Division:</label>
          <Select
            // this array from above
            options={valuefordivisionArray}
            value={valuefordivision}
            onChange={(selectedOption) => {
              setValuefordivision(selectedOption);
            }}
            isSearchable
            placeholder="Select Division"
            required
          />
        </div>
        <div className="buttonbox">
          <label>Semester:</label>
          <Select
            // array from year
            options={valueforsemArray}
            value={valueforsem}
            onChange={(selectedOption) => {
              // console.log(selectedOption.value)
              setValueforsem(selectedOption);
              var additionString;
              additionString =
                valueforpattern.value +
                valueforyear.value +
                valuefordepartment.value +
                selectedOption.value;
              setValueforsubjectArray(subjectname[additionString]);
            }}
            isSearchable
            placeholder="Select Semester"
            required
          />
        </div>
        <div className="buttonbox">
          <label>Subject:</label>
          <Select
            options={valueforsubjectArray}
            value={valueforsubject}
            onChange={(selectedOption) => {
              setValueforsubject(selectedOption);
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
              setValuefortest(selectedOption);
            }}
            isSearchable
            placeholder="Select Test"
            required
          />
        </div>
        </div>

        <div className="create-table">
          <Button onClick={createTable}>Create Table</Button>
        </div>
      </div>
      <ToastContainer />
      <div className="table-container">
        {/* {
        showImportButton && <DataTable/>
      } */}
        {isShow && (<TempTable tableName={tableName} data={data}/>)}
      </div>
    </div>
  );
}

export default Dropdown;
