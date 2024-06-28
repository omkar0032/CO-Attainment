
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Level from './Level';
import { UseData } from "../NewContext";
import { toast } from 'react-toastify';
function BelowTable({ containerRef, tableName }) {

  // for NewContext.js to use in calcualation nad values are used not modified
  const { countLevelOneUT, setCountLevelOneUT } = UseData();
  const { countLevelOneUA, setCountLevelOneUA } = UseData();

  const { countLevelTwoUT, setCountLevelTwoUT } = UseData();
  const { countLevelTwoUA, setCountLevelTwoUA } = UseData();

  const { countLevelThreeUT, setCountLevelThreeUT } = UseData();
  const { countLevelThreeUA, setCountLevelThreeUA } = UseData();

  // this to hide beelow_table and dispaly below_table
  const { resultState, setResultState } = UseData();

  const [showAttainment,setShowAttainment]=useState(false);
  // FOR count presnt student
  const [presentStudent, setPresentStudent] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32: "0",
    // sum_insemq1:"0",
    // sum_insemq2:"0",
    sum_UA: "0"
  }]);

  // for count absent
  const [absentStudent, setAbsentStudent] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32: "0",
    // sum_insemq1:"0",
    // sum_insemq2:"0",
    sum_UA: "0"
  }]);

  // for percentage present
  const [percentageStudent, setPercentageStudent] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32: "0",
    // sum_insemq1:"0",
    // sum_insemq2:"0",
    sum_UA: "0"
  }]);

  // for level 1 count
  const [countLevelOne, setCountLevelOne] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32: "0",
    // sum_insemq1:"0",
    // sum_insemq2:"0",
    sum_UA: "0"
  }]);

  // level 2
  const [countLevelTwo, setCountLevelTwo] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32: "0",
    // sum_insemq1:"0",
    // sum_insemq2:"0",
    sum_UA: "0"
  }]);

  //level 3
  const [countLevelThree, setCountLevelThree] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32: "0",
    // sum_insemq1:"0",
    // sum_insemq2:"0",
    sum_UA: "0"
  }]);

  const [coValue,setCovalue]=useState({
    UA_CO_AT:0,
    UT_CO_attainment:0,
    Course_Outcome:0
  })
  useEffect(() => {
    // countPresent();
    countPresentStudent();
    countAbsentStudent();
    countPercentageStudent();
    countLevelOneStudent();
    countLevelTwoStudent();
    countLevelThreeStudent();

  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCovalue((prevState) => ({
        ...prevState,
        [name]: Number(value),
    }))
};
  const handleSetCO=async()=>{
    setShowAttainment(prevState => !prevState);

    setCovalue(prevState => {
      // Perform the calculations
      const UA_CO_AT = (((((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA) + (((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA) + (((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA)) / 6).toFixed(2);
      
      const UT_CO_attainment = (((((((((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT))) / 6)) +
                    (((((((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT))) / 6)) +
                    (((((((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 3 / countLevelThreeUT))) / 6)) +
                    (((((((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 3 / countLevelThreeUT))) / 6)) +
                    (((((((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 3 / countLevelThreeUT))) / 6)) +
                    (((((((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 3 / countLevelThreeUT))) / 6))) / 6).toFixed(2);
    
                        
      // Ensure that each value is not greater than 1
      const clampedUA_CO_AT = Math.min(UA_CO_AT, 1);
      const clampedUT_CO_attainment = Math.min(UT_CO_attainment, 1);
      
      // Update the state
      return {
        ...prevState,
        UA_CO_AT: clampedUA_CO_AT,
        UT_CO_attainment: clampedUT_CO_attainment,
        Course_Outcome: ((0.7*clampedUA_CO_AT)+(0.3*clampedUT_CO_attainment)).toFixed(2)
      };
    });
    
  }
  // to count present student
  const countPresentStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/insertCountsOfPresentStudent/${tableName}`);
      setPresentStudent(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch (error) {
      console.error('Error in getting data:', error);
    }
  };

  // to count  absent student
  const countAbsentStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/insertCountsOfAbsentStudent/${tableName}`);
      setAbsentStudent(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);


    }
    catch (error) {
      console.error('Error in getting data:', error);
    }
  };

  // to count percentsge og present student
  const countPercentageStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/insertCountsOfPresentStudentPercentage/${tableName}`);
      setPercentageStudent(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch (error) {
      console.error('Error in getting data:', error);
    }
  };

  // to count level 1 student 
  const countLevelOneStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/insertCountsOflevel1/${tableName}`);
      setCountLevelOne(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch (error) {
      console.error('Error in getting data:', error);
    }
  };

  //to count level 2
  const countLevelTwoStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/insertCountsOflevel2/${tableName}`);
      setCountLevelTwo(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch (error) {
      console.error('Error in getting data:', error);
    }
  };
  //to count level 2
  const countLevelThreeStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/insertCountsOflevel3/${tableName}`);
      setCountLevelThree(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch (error) {
      console.error('Error in getting data:', error);
    }

    console.log(countLevelTwoUT);
  };

  const handleCoPoAttainment=async()=>{
    try{
      const result=await axios.post(`http://localhost:3000/co_po/${tableName}`,coValue);
      if(result.status==200){
        toast.success("Saved!");
      }
    }catch(error){
      console.log("Error while posting",error);
    }
  }

  // <th>Ensem-Q1</th>
  //             <th>Ensem-Q2</th>
  //             <th>Endsem</th>

  //  table =>className="result-table-container"
  // border="1"
  return (
    <>
      <div id='below' ref={containerRef} >
        {resultState ? <table style={{width:"100vw"}} className="result-table" >
          <thead>
            <tr >
              {/* <th>Total No. Absent</th> */}
              <th style={{width:"15%"}}>Title</th>
              <th>UT1-Q1</th>
              <th>UT1-Q2</th>
              <th>UT2-Q1</th>
              <th>UT2-Q2</th>
              <th>UT3-Q1</th>
              <th>UT3-Q2</th>
              <th>Insem-Q1</th>
               <th>Insem-Q2</th>
               <th>Endsem</th>
              <th>UA</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <td>PRESENT STUDENT</td>
            <td>{presentStudent[0].sum_q11}</td>
            <td>{presentStudent[0].sum_q12}</td>
            <td>{presentStudent[0].sum_q21}</td>
            <td>{presentStudent[0].sum_q22}</td>
            <td>{presentStudent[0].sum_q31}</td>
            <td>{presentStudent[0].sum_q32}</td>
            <td>{presentStudent[0].sum_insemq1}</td>
            <td>{presentStudent[0].sum_insemq2}</td>
            <td>{presentStudent[0].sum_UA}</td>
            <td>{presentStudent[0].sum_UA}</td>


          </tbody>
          <tbody>
            <td>ABSENT STUDENT</td>
            <td>{absentStudent[0].sum_q11}</td>
            <td>{absentStudent[0].sum_q12}</td>
            <td>{absentStudent[0].sum_q21}</td>
            <td>{absentStudent[0].sum_q22}</td>
            <td>{absentStudent[0].sum_q31}</td>
            <td>{absentStudent[0].sum_q32}</td>
            <td>{absentStudent[0].sum_insemq1}</td>
            <td>{absentStudent[0].sum_insemq2}</td>
            <td>{absentStudent[0].sum_UA}</td>
            <td>{absentStudent[0].sum_UA}</td>
          </tbody>
          <tbody>
            <td>PRESENT PERCENTAGE</td>
            <td>{(Number(percentageStudent[0].sum_q11)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_q12)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_q21)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_q22)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_q31)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_q32)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_insemq1)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_insemq2)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_UA)).toFixed(2)}</td>
            <td>{(Number(percentageStudent[0].sum_UA)).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>Target no of students for level 1</td>
            <td>{countLevelOne[0].sum_q11}</td>
            <td>{countLevelOne[0].sum_q12}</td>
            <td>{countLevelOne[0].sum_q21}</td>
            <td>{countLevelOne[0].sum_q22}</td>
            <td>{countLevelOne[0].sum_q31}</td>
            <td>{countLevelOne[0].sum_q32}</td>
            <td>{countLevelOne[0].sum_insemq1}</td>
            <td>{countLevelOne[0].sum_insemq2}</td>
            <td>{countLevelOne[0].sum_UA}</td>
            <td>{countLevelOne[0].sum_UA}</td>
          </tbody>
          <tbody>
            <td>Target no of students for level 2</td>
            <td>{countLevelTwo[0].sum_q11}</td>
            <td>{countLevelTwo[0].sum_q12}</td>
            <td>{countLevelTwo[0].sum_q21}</td>
            <td>{countLevelTwo[0].sum_q22}</td>
            <td>{countLevelTwo[0].sum_q31}</td>
            <td>{countLevelTwo[0].sum_q32}</td>
            <td>{countLevelTwo[0].sum_insemq1}</td>
            <td>{countLevelTwo[0].sum_insemq2}</td>
            <td>{countLevelTwo[0].sum_UA}</td>
            <td>{countLevelTwo[0].sum_UA}</td>
          </tbody>
          <tbody>
            <td>Target no of students for level 3</td>
            <td>{countLevelThree[0].sum_q11}</td>
            <td>{countLevelThree[0].sum_q12}</td>
            <td>{countLevelThree[0].sum_q21}</td>
            <td>{countLevelThree[0].sum_q22}</td>
            <td>{countLevelThree[0].sum_q31}</td>
            <td>{countLevelThree[0].sum_q32}</td>
            <td>{countLevelThree[0].sum_insemq1}</td>
            <td>{countLevelThree[0].sum_insemq2}</td>
            <td>{countLevelThree[0].sum_UA}</td>
            <td>{countLevelThree[0].sum_UA}</td>

          </tbody>
          <tbody>
            <td>% of students for level 1 (40%)</td>
            <td>{((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA).toFixed(2)}</td>
            <td>{((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA).toFixed(2)}</td>
            <td>{((((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11)+((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12)+((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21)+((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22)+((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31)+((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32))/6).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>% of students for level 2(60%)</td>
            <td>{((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA).toFixed(2)}</td>
            <td>{((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA).toFixed(2)}</td>
            <td>{((((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11)+((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12)+((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21)+((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22)+((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31)+((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32))/6).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>% of students for level 3(66%)</td>
            <td>{((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q12).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA).toFixed(2)}</td>
            <td>{((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA).toFixed(2)}</td>
            <td>{((((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11)+((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q12)+((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21)+((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22)+((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31)+((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32))/6).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>Level 1 Att</td>
            <td>{(((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) / countLevelOneUA).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) / countLevelOneUA).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>Level 2 Att</td>
            <td>{(((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) * 2 / countLevelTwoUA).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) * 2 / countLevelTwoUA).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>Level 3 Att</td>
            <td>{(((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) * 3 / countLevelThreeUA).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) * 3 / countLevelThreeUA).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA).toFixed(2)}</td>
          </tbody>
          <tbody>
            <td>Level 1 Final Att</td>
            <td>{(((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32) / countLevelOneUT).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) / countLevelOneUA).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) / countLevelOneUA).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA).toFixed(2)}</td>
            <td>{(((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA).toFixed(2)}</td>
            {/* <td></td> */}
          </tbody>
          <tbody>
            <td>Level 2 Final Att</td>
            <td>{(((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 2 / countLevelTwoUT).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) * 2 / countLevelTwoUA).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) * 2 / countLevelTwoUA).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA).toFixed(2)}</td>
            <td>{(((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA).toFixed(2)}</td>
            {/* <td></td> */}
          </tbody>
          <tbody>
            <td>Level 3 Final Att</td>
            <td>{(((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 3 / countLevelThreeUT).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) * 3 / countLevelThreeUA).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) * 3 / countLevelThreeUA).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA).toFixed(2)}</td>
            <td>{(((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA).toFixed(2)}</td>
            {/* <td></td> */}
          </tbody>
          <tbody></tbody>
          <tbody>
            <td>UT_Asgnt attainment</td>
            <td>{(((((((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT))) / 6).toFixed(2))}</td>
            <td>{(((((((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT))) / 6).toFixed(2))}</td>
            <td>{(((((((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 3 / countLevelThreeUT))) / 6).toFixed(2))}</td>
            <td>{(((((((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 3 / countLevelThreeUT))) / 6).toFixed(2))}</td>
            <td>{(((((((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 3 / countLevelThreeUT))) / 6).toFixed(2))}</td>
            <td>{(((((((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 3 / countLevelThreeUT))) / 6).toFixed(2))}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tbody>
          <tbody>
            <td>UT_CO_attainment</td>
            <td colSpan="6" style={{ textAlign: 'center', verticalAlign: 'middle' }} >{Math.min((((((((((countLevelOne[0].sum_q11 * 100) / presentStudent[0].sum_q11) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q11 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT))) / 6)) +
              (((((((countLevelOne[0].sum_q12 * 100) / presentStudent[0].sum_q12) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q12 * 100) / presentStudent[0].sum_q12) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q12 * 100) / presentStudent[0].sum_q11) * 3 / countLevelThreeUT))) / 6)) +
              (((((((countLevelOne[0].sum_q21 * 100) / presentStudent[0].sum_q21) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q21 * 100) / presentStudent[0].sum_q21) * 3 / countLevelThreeUT))) / 6)) +
              (((((((countLevelOne[0].sum_q22 * 100) / presentStudent[0].sum_q22) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q22 * 100) / presentStudent[0].sum_q22) * 3 / countLevelThreeUT))) / 6)) +
              (((((((countLevelOne[0].sum_q31 * 100) / presentStudent[0].sum_q31) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q31 * 100) / presentStudent[0].sum_q31) * 3 / countLevelThreeUT))) / 6)) +
              (((((((countLevelOne[0].sum_q32 * 100) / presentStudent[0].sum_q32) / countLevelOneUT)) + ((((countLevelTwo[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 2 / countLevelTwoUT)) + ((((countLevelThree[0].sum_q32 * 100) / presentStudent[0].sum_q32) * 3 / countLevelThreeUT))) / 6))) / 6).toFixed(2),1)}</td>
             <td colSpan="2">{Math.min((((((((countLevelOne[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) / countLevelOneUA) + (((countLevelTwo[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) * 2 / countLevelTwoUA) + (((countLevelThree[0].sum_insemq1 * 100) / presentStudent[0].sum_insemq1) * 3 / countLevelThreeUA)) / 6)+
              (((((countLevelOne[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) / countLevelOneUA) + (((countLevelTwo[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) * 2 / countLevelTwoUA) + (((countLevelThree[0].sum_insemq2 * 100) / presentStudent[0].sum_insemq2) * 3 / countLevelThreeUA)) / 6))/2).toFixed(2),1)}</td>
            <td>{Math.min((((((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA) + (((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA) + (((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA)) / 6).toFixed(2),1)}</td>
            <td>{Math.min((((((countLevelOne[0].sum_UA * 100) / presentStudent[0].sum_UA) / countLevelOneUA) + (((countLevelTwo[0].sum_UA * 100) / presentStudent[0].sum_UA) * 2 / countLevelTwoUA) + (((countLevelThree[0].sum_UA * 100) / presentStudent[0].sum_UA) * 3 / countLevelThreeUA)) / 6).toFixed(2),1)}</td>
          </tbody>
        </table> : <div></div>}
      </div>
      <div style={{ marginLeft: "5%", marginBottom: "3%" }}>
  <button 
    onClick={handleSetCO} 
    className='bg-primary mt-5' 
    style={{ borderRadius: "5%", width: "200px", height: "50px" }} // Adjust width and height as needed
  >
    {showAttainment ? "Final Attainment" : "Calculate Final Attainment"}
  </button>
</div>


{
  showAttainment && (
    <>
      <h1 style={{ textAlign: 'center' }}>CO-PO ATTAINMENT</h1>
      <div id='below-attainment' className="container" style={{ marginTop: "0px" }}>
        <table style={{ margin: "25px" }}>
          <tbody>
            <tr>
              <td>Insem_CO_Ataniment</td>
              <td><input name='UA_CO_AT' defaultValue={coValue.UA_CO_AT}  onChange={(event)=>handleOnChange(event)}></input></td>
            </tr>
            <tr>
              <td>Endsem_CO_Attainment</td>
            </tr>
            <tr>
              <td>UT_CO_Attainment</td>
              <td><input  name='UT_CO_attainment' defaultValue={coValue.UT_CO_attainment} onChange={(event)=>handleOnChange(event)}></input></td>
            </tr>
            <tr>
              <td>Course Outcome</td>
              <td><input  name='Course_Outcome' defaultValue={coValue.Course_Outcome}  onChange={(event)=>handleOnChange(event)}></input></td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleCoPoAttainment} className='bg-primary'>Save Attainment</button>
      </div>
    </>
  ) 
}
 </>

  );
}

export default BelowTable;
