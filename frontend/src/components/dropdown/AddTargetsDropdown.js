import { Table, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { ContextProvider, UseData } from "../../NewContext";
import "./Dropdown.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ParentComponent from "../ParentComponent";
import Main_table from "../main_table";
import TableWithInput from "../new_average";
function AddTargetsDropdown(teachers_table) {
  const { email } = UseData();
  const [valueforpattern, setValueforpattern] = useState("");
  const [valueforacadamicyear, setValueForAcadamicYear] = useState("");
  const [valueforyear, setValueforyear] = useState("");
  const [valuefordepartment, setValuedepartment] = useState("");
  const [valuefordivision, setValuefordivision] = useState("");
  const [valueforsemArray, setValueforsemArray] = useState([]);
  const [valueforsem, setValueforsem] = useState("");
  const [valueforsubject, setValueforsubject] = useState();
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
  useEffect(() => {
    transformPattern();
    transformDepartment();
  }, []); //[valueforsemlabel]);

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

  const transformdivision = async () => {
    await handleGetDivision();
    const transformedDivision1 = divisionnames.map((division) => ({
      value: String(division.Division),
      label: String(division.Division),
    }));
    setTransformedDivision(transformedDivision1);
  };

  const transformSubject = async (selectedOption) => {
    await handleGetSubject(selectedOption);
    const transformedSubject1 = subjectnames.map((subjectname) => ({
      value: subjectname.Subject_Name.toLowerCase(),
      label: subjectname.Subject_Name,
    }));
    setTransformedSubject(transformedSubject1);
    console.log(transformedSubject1);
  };

  const createTable = async () => {
    const tableName = `${valueforpattern?.value}_${valueforyear?.value}_${valuefordepartment?.value}_${valueforsem?.value}_${valueforsubject?.value}`;
    if (
      valueforpattern &&
      valueforacadamicyear &&
      valueforyear &&
      valuefordepartment &&
      valueforsem &&
      valueforsubject
    ) {
      setShowbtn(true);
      setTableName(tableName);
      
      try {
        setShowbtn(true);
        const response = await axios.get(
        //   `http://localhost:3000/students/average_attainment/${tableName}${startingYear}`
        );
        console.log(response);
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
        // console.log(acadamicyearnames);
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
        // console.log(departmentnames);
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
      console.log(name);
      const response = await axios.get(
        `http://localhost:3000/division/${name}`
      );

      if (response.status === 200) {
        divisionnames = response.data;
        // console.log(acadamicyearnames);
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
      console.log(name);
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

  const yearname = [
    { value: "y1_d", label: "FE" },
    { value: "y2_d", label: "SE" },
    { value: "y3_d", label: "TE" },
    { value: "y4_d", label: "BE" },
  ];

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
  const semname = { fe, se, te, be };
  const testname = [
    { value: "t1", label: "UT-1" },
    { value: "t2", label: "UT-2" },
    { value: "t3", label: "UT-3" },
    { value: "t4", label: "UA" },
  ];

  const handleOnChange = (selectedOption) => {
    setValuefortest(selectedOption);
    setValuefortest1(selectedOption.label);
  };

  return (
    <>
      <div className="boxComponent">
        <div className="buttonbox">
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
        <div className="buttonbox">
          <label>Acadamic Year:</label>
          <Select
            options={transformedAcadamicYear}
            value={valueforacadamicyear}
            onChange={(selectedOption) => {
              setValueForAcadamicYear(selectedOption);
              setValueForAcademicYearlabel(selectedOption.label);
            }}
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
        <div className="buttonbox">
          <label>Department:</label>
          <Select
            options={transformedDepartment}
            value={valuefordepartment}
            onChange={(selectedOption) => {
              setValuedepartment(selectedOption);
              setvaluefordepartmentlabel(selectedOption.label);
            }}
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
              setvalueforsemlabel(selectedOption.label);
              setValueforsem(selectedOption);
              transformdivision();
              transformSubject(selectedOption);
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
              setValueforsubject(selectedOption);
              setvalueforsubjectlabel(selectedOption.label);
            }}
            isSearchable
            placeholder="Select Subject"
            required
          />
        </div>
      </div>
      <div className="create-table">
        <Button onClick={createTable}>Add Attainments</Button>

        
      </div>
      {showbtn && <TableWithInput tableName={tableName} />}
      <ToastContainer />
    </>
  );
}

export default AddTargetsDropdown;
