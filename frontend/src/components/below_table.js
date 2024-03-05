
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Level from './Level';
import {UseData} from "../NewContext";
function BelowTable({containerRef,tableName}) {

  // for NewContext.js to use in calcualation nad values are used not modified
  const {countLevelOneUT,setCountLevelOneUT}=UseData();
  const {countLevelOneUA,setCountLevelOneUA}=UseData();

  const {countLevelTwoUT,setCountLevelTwoUT}=UseData();
  const {countLevelTwoUA,setCountLevelTwoUA}=UseData();

  const {countLevelThreeUT,setCountLevelThreeUT}=UseData();
  const {countLevelThreeUA,setCountLevelThreeUA}=UseData();

  // this to hide beelow_table and dispaly below_table
  const{resultState,setResultState}=UseData();
  // FOR count presnt student
  const [presentStudent, setPresentStudent] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32:"0",
    sum_UA: "0"
  }]);
  
  // for count absent
  const [absentStudent, setAbsentStudent] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32:"0",
    sum_UA: "0"
  }]);

  // for percentage present
  const [percentageStudent, setPercentageStudent] = useState([{
    sum_q11: "0",
    sum_q12: "0",
    sum_q21: "0",
    sum_q22: "0",
    sum_q31: "0",
    sum_q32:"0",
    sum_UA: "0"
  }]);

// for level 1 count
const [countLevelOne, setCountLevelOne] = useState([{
  sum_q11: "0",
  sum_q12: "0",
  sum_q21: "0",
  sum_q22: "0",
  sum_q31: "0",
  sum_q32:"0",
  sum_UA: "0"
}]);

// level 2
const [countLevelTwo, setCountLevelTwo] = useState([{
  sum_q11: "0",
  sum_q12: "0",
  sum_q21: "0",
  sum_q22: "0",
  sum_q31: "0",
  sum_q32:"0",
  sum_UA: "0"
}]);

//level 3
const [countLevelThree, setCountLevelThree] = useState([{
  sum_q11: "0",
  sum_q12: "0",
  sum_q21: "0",
  sum_q22: "0",
  sum_q31: "0",
  sum_q32:"0",
  sum_UA: "0"
}]);

  useEffect(() => {
    // countPresent();
    countPresentStudent();
    countAbsentStudent();
    countPercentageStudent();
    countLevelOneStudent();
    countLevelTwoStudent();
    countLevelThreeStudent();
    
  }, []);

  
  
  // to count present student
  const countPresentStudent = async() =>{
    try{
      const result=await axios.get(`http://localhost:3000/insertCountsOfPresentStudent/${tableName}`);
      setPresentStudent(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch(error){
      console.error('Error in getting data:', error);
    }
  };

  // to count  absent student
  const countAbsentStudent = async() =>{
    try{
      const result=await axios.get(`http://localhost:3000/insertCountsOfAbsentStudent/${tableName}`);
      setAbsentStudent(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
      

    }
    catch(error){
      console.error('Error in getting data:', error);
    }
  };

  // to count percentsge og present student
  const countPercentageStudent = async() =>{
    try{
      const result=await axios.get(`http://localhost:3000/insertCountsOfPresentStudentPercentage/${tableName}`);
      setPercentageStudent(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch(error){
      console.error('Error in getting data:', error);
    }
  };

  // to count level 1 student 
  const countLevelOneStudent = async() =>{
    try{
      const result=await axios.get(`http://localhost:3000/insertCountsOflevel1/${tableName}`);
      setCountLevelOne(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch(error){
      console.error('Error in getting data:', error);
    }
  };

  //to count level 2
  const countLevelTwoStudent = async() =>{
    try{
      const result=await axios.get(`http://localhost:3000/insertCountsOflevel2/${tableName}`);
      setCountLevelTwo(result.data);
      // console.log("hi this:",presentStudent[0].sum_UA)
      // console.log(result);
    }
    catch(error){
      console.error('Error in getting data:', error);
    }
  };
//to count level 2
const countLevelThreeStudent = async() =>{
  try{
    const result=await axios.get(`http://localhost:3000/insertCountsOflevel3/${tableName}`);
    setCountLevelThree(result.data);
    // console.log("hi this:",presentStudent[0].sum_UA)
    // console.log(result);
  }
  catch(error){
    console.error('Error in getting data:', error);
  }

 console.log(countLevelTwoUT);
};
  return (
    <div id='below' ref={containerRef}  className="result-table-container">
     { resultState ?     <table className="result-table" border="1">
        <thead>
          <tr style={{ backgroundColor: '#1976d2'}}>
            {/* <th>Total No. Absent</th> */}
            <th>Title</th>
            <th>UT1-Q1</th>
            <th>UT1-Q2</th>
            <th>UT2-Q1</th>
            <th>UT2-Q2</th>
            <th>UT3-Q1</th>
            <th>UT3-Q2</th>
            <th>UA</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <td>PRESENT STUDENT</td>
          <td>{presentStudent[0].sum_q11 }</td>
          <td>{presentStudent[0].sum_q12 }</td>
          <td>{presentStudent[0].sum_q22}</td>
          <td>{presentStudent[0].sum_q21}</td>
          <td>{presentStudent[0].sum_q31}</td>
          <td>{presentStudent[0].sum_q32}</td>
          <td>{presentStudent[0].sum_UA}</td>

          
        </tbody>
        <tbody>
          <td>ABSENT STUDENT</td>
          <td>{absentStudent[0].sum_q11 }</td>
          <td>{absentStudent[0].sum_q12 }</td>
          <td>{absentStudent[0].sum_q21}</td>
          <td>{absentStudent[0].sum_q22}</td>
          <td>{absentStudent[0].sum_q31}</td>
          <td>{absentStudent[0].sum_q32}</td>
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
          <td>{(Number(percentageStudent[0].sum_UA)).toFixed(2)}</td>
        </tbody>
        <tbody>
          <td>Target no of students for level 1</td>
          <td>{countLevelOne[0].sum_q11 }</td>
          <td>{countLevelOne[0].sum_q12 }</td>
          <td>{countLevelOne[0].sum_q21}</td>
          <td>{countLevelOne[0].sum_q22}</td>
          <td>{countLevelOne[0].sum_q31}</td>
          <td>{countLevelOne[0].sum_q32}</td>
          <td>{countLevelOne[0].sum_UA}</td>
        </tbody>
        <tbody>
          <td>Target no of students for level 2</td>
          <td>{countLevelTwo[0].sum_q11 }</td>
          <td>{countLevelTwo[0].sum_q12 }</td>
          <td>{countLevelTwo[0].sum_q21}</td>
          <td>{countLevelTwo[0].sum_q22}</td>
          <td>{countLevelTwo[0].sum_q31}</td>
          <td>{countLevelTwo[0].sum_q32}</td>
          <td>{countLevelTwo[0].sum_UA}</td>
        </tbody>
        <tbody>
          <td>Target no of students for level 3</td>
          <td>{countLevelThree[0].sum_q11 }</td>
          <td>{countLevelThree[0].sum_q12 }</td>
          <td>{countLevelThree[0].sum_q21}</td>
          <td>{countLevelThree[0].sum_q22}</td>
          <td>{countLevelThree[0].sum_q31}</td>
          <td>{countLevelThree[0].sum_q32}</td>
          <td>{countLevelThree[0].sum_UA}</td>
          
        </tbody>
        <tbody>
          <td>% of students for level 1 (40%)</td>
          <td>{((countLevelOne[0].sum_q11*100 )/presentStudent[0].sum_q11).toFixed(2)}</td>
          <td>{((countLevelOne[0].sum_q12*100 )/presentStudent[0].sum_q12).toFixed(2)}</td>
          <td>{((countLevelOne[0].sum_q21*100 )/presentStudent[0].sum_q21).toFixed(2)}</td>
          <td>{((countLevelOne[0].sum_q22*100 )/presentStudent[0].sum_q22).toFixed(2)}</td>
          <td>{((countLevelOne[0].sum_q31*100 )/presentStudent[0].sum_q31).toFixed(2)}</td>
          <td>{((countLevelOne[0].sum_q32*100 )/presentStudent[0].sum_q32).toFixed(2)}</td>
          <td>{((countLevelOne[0].sum_UA*100 )/presentStudent[0].sum_UA).toFixed(2)}</td>
          <td></td>
        </tbody>
        <tbody>
          <td>% of students for level 2(60%)</td>
         <td>{((countLevelTwo[0].sum_q11*100 )/presentStudent[0].sum_q11).toFixed(2)}</td>
          <td>{((countLevelTwo[0].sum_q12*100 )/presentStudent[0].sum_q12).toFixed(2)}</td>
          <td>{((countLevelTwo[0].sum_q21*100 )/presentStudent[0].sum_q21).toFixed(2)}</td>
          <td>{((countLevelTwo[0].sum_q22*100 )/presentStudent[0].sum_q22).toFixed(2)}</td>
          <td>{((countLevelTwo[0].sum_q31*100 )/presentStudent[0].sum_q31).toFixed(2)}</td>
          <td>{((countLevelTwo[0].sum_q32*100 )/presentStudent[0].sum_q32).toFixed(2)}</td>
          <td>{((countLevelTwo[0].sum_UA*100 )/presentStudent[0].sum_UA).toFixed(2)}</td>
          <td></td>
        </tbody>
        <tbody>
          <td>% of students for level 3(66%)</td>
          <td>{((countLevelThree[0].sum_q11*100 )/presentStudent[0].sum_q11).toFixed(2)}</td>
          <td>{((countLevelThree[0].sum_q12*100 )/presentStudent[0].sum_q12).toFixed(2)}</td>
          <td>{((countLevelThree[0].sum_q21*100 )/presentStudent[0].sum_q21).toFixed(2)}</td>
          <td>{((countLevelThree[0].sum_q22*100 )/presentStudent[0].sum_q22).toFixed(2)}</td>
          <td>{((countLevelThree[0].sum_q31*100 )/presentStudent[0].sum_q31).toFixed(2)}</td>
          <td>{((countLevelThree[0].sum_q32*100 )/presentStudent[0].sum_q32).toFixed(2)}</td>
          <td>{((countLevelThree[0].sum_UA*100 )/presentStudent[0].sum_UA).toFixed(2)}</td>
          <td></td>
        </tbody>
        <tbody>
          <td>Level 1 Att</td>
          <td>{(((countLevelOne[0].sum_q11*100 )/presentStudent[0].sum_q11)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q12*100 )/presentStudent[0].sum_q12)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q21*100 )/presentStudent[0].sum_q21)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q22*100 )/presentStudent[0].sum_q22)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q31*100 )/presentStudent[0].sum_q31)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q32*100 )/presentStudent[0].sum_q32)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_UA*100 )/presentStudent[0].sum_UA)/countLevelOneUA).toFixed(2)}</td>
        </tbody>
        <tbody>
          <td>Level 2 Att</td>
          <td>{(((countLevelTwo[0].sum_q11*100 )/presentStudent[0].sum_q11)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q12*100 )/presentStudent[0].sum_q12)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q21*100 )/presentStudent[0].sum_q21)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q22*100 )/presentStudent[0].sum_q22)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q31*100 )/presentStudent[0].sum_q31)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q32*100 )/presentStudent[0].sum_q32)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_UA*100 )/presentStudent[0].sum_UA)*2/countLevelTwoUA).toFixed(2)}</td>
        </tbody>
        <tbody>
          <td>Level 3 Att</td>
          <td>{(((countLevelThree[0].sum_q11*100 )/presentStudent[0].sum_q11)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q12*100 )/presentStudent[0].sum_q12)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q21*100 )/presentStudent[0].sum_q21)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q22*100 )/presentStudent[0].sum_q22)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q31*100 )/presentStudent[0].sum_q31)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q32*100 )/presentStudent[0].sum_q32)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_UA*100 )/presentStudent[0].sum_UA)*3/countLevelThreeUA).toFixed(2)}</td>
        </tbody>
        <tbody>
          <td>Level 1 Final Att</td>
          <td>{(((countLevelOne[0].sum_q11*100 )/presentStudent[0].sum_q11)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q12*100 )/presentStudent[0].sum_q12)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q21*100 )/presentStudent[0].sum_q21)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q22*100 )/presentStudent[0].sum_q22)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q31*100 )/presentStudent[0].sum_q31)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_q32*100 )/presentStudent[0].sum_q32)/countLevelOneUT).toFixed(2)}</td>
          <td>{(((countLevelOne[0].sum_UA*100 )/presentStudent[0].sum_UA)/countLevelOneUA).toFixed(2)}</td>
          {/* <td></td> */}
        </tbody>
        <tbody>
          <td>Level 2 Final Att</td>
          <td>{(((countLevelTwo[0].sum_q11*100 )/presentStudent[0].sum_q11)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q12*100 )/presentStudent[0].sum_q12)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q21*100 )/presentStudent[0].sum_q21)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q22*100 )/presentStudent[0].sum_q22)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q31*100 )/presentStudent[0].sum_q31)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_q32*100 )/presentStudent[0].sum_q32)*2/countLevelTwoUT).toFixed(2)}</td>
          <td>{(((countLevelTwo[0].sum_UA*100 )/presentStudent[0].sum_UA)*2/countLevelTwoUA).toFixed(2)}</td>
          {/* <td></td> */}
        </tbody>
        <tbody>
          <td>Level 3 Final Att</td>
          <td>{(((countLevelThree[0].sum_q11*100 )/presentStudent[0].sum_q11)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q12*100 )/presentStudent[0].sum_q12)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q21*100 )/presentStudent[0].sum_q21)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q22*100 )/presentStudent[0].sum_q22)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q31*100 )/presentStudent[0].sum_q31)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_q32*100 )/presentStudent[0].sum_q32)*3/countLevelThreeUT).toFixed(2)}</td>
          <td>{(((countLevelThree[0].sum_UA*100 )/presentStudent[0].sum_UA)*3/countLevelThreeUA).toFixed(2)}</td>
          {/* <td></td> */}
        </tbody>
        <tbody>
          <td>UT/Asgnt attainment</td>
          <td>{(((((((countLevelOne[0].sum_q11*100 )/presentStudent[0].sum_q11)/countLevelOneUT))+((((countLevelTwo[0].sum_q11*100 )/presentStudent[0].sum_q11)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q11*100 )/presentStudent[0].sum_q11)*3/countLevelThreeUT)))/6).toFixed(2))}</td>
          <td>{(((((((countLevelOne[0].sum_q12*100 )/presentStudent[0].sum_q12)/countLevelOneUT))+((((countLevelTwo[0].sum_q12*100 )/presentStudent[0].sum_q12)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q12*100 )/presentStudent[0].sum_q11)*3/countLevelThreeUT)))/6).toFixed(2))}</td>
          <td>{(((((((countLevelOne[0].sum_q21*100 )/presentStudent[0].sum_q21)/countLevelOneUT))+((((countLevelTwo[0].sum_q21*100 )/presentStudent[0].sum_q21)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q21*100 )/presentStudent[0].sum_q21)*3/countLevelThreeUT)))/6).toFixed(2))}</td>
          <td>{(((((((countLevelOne[0].sum_q22*100 )/presentStudent[0].sum_q22)/countLevelOneUT))+((((countLevelTwo[0].sum_q22*100 )/presentStudent[0].sum_q22)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q22*100 )/presentStudent[0].sum_q22)*3/countLevelThreeUT)))/6).toFixed(2))}</td>
          <td>{(((((((countLevelOne[0].sum_q31*100 )/presentStudent[0].sum_q31)/countLevelOneUT))+((((countLevelTwo[0].sum_q31*100 )/presentStudent[0].sum_q31)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q31*100 )/presentStudent[0].sum_q31)*3/countLevelThreeUT)))/6).toFixed(2))}</td>
          <td>{(((((((countLevelOne[0].sum_q32*100 )/presentStudent[0].sum_q32)/countLevelOneUT))+((((countLevelTwo[0].sum_q32*100 )/presentStudent[0].sum_q32)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q32*100 )/presentStudent[0].sum_q32)*3/countLevelThreeUT)))/6).toFixed(2))}</td>
          <td></td> 
        </tbody>
        
        <tbody>
          
          <td>UT_COi_attainment</td>
          <td colSpan="6"  style={{  textAlign: 'center', verticalAlign: 'middle' }} >{(((((((((countLevelOne[0].sum_q11*100 )/presentStudent[0].sum_q11)/countLevelOneUT))+((((countLevelTwo[0].sum_q11*100 )/presentStudent[0].sum_q11)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q11*100 )/presentStudent[0].sum_q11)*3/countLevelThreeUT)))/6))+
          (((((((countLevelOne[0].sum_q12*100 )/presentStudent[0].sum_q12)/countLevelOneUT))+((((countLevelTwo[0].sum_q12*100 )/presentStudent[0].sum_q12)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q12*100 )/presentStudent[0].sum_q11)*3/countLevelThreeUT)))/6))+
          (((((((countLevelOne[0].sum_q21*100 )/presentStudent[0].sum_q21)/countLevelOneUT))+((((countLevelTwo[0].sum_q21*100 )/presentStudent[0].sum_q21)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q21*100 )/presentStudent[0].sum_q21)*3/countLevelThreeUT)))/6))+
          (((((((countLevelOne[0].sum_q22*100 )/presentStudent[0].sum_q22)/countLevelOneUT))+((((countLevelTwo[0].sum_q22*100 )/presentStudent[0].sum_q22)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q22*100 )/presentStudent[0].sum_q22)*3/countLevelThreeUT)))/6))+
          (((((((countLevelOne[0].sum_q31*100 )/presentStudent[0].sum_q31)/countLevelOneUT))+((((countLevelTwo[0].sum_q31*100 )/presentStudent[0].sum_q31)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q31*100 )/presentStudent[0].sum_q31)*3/countLevelThreeUT)))/6))+
          (((((((countLevelOne[0].sum_q32*100 )/presentStudent[0].sum_q32)/countLevelOneUT))+((((countLevelTwo[0].sum_q32*100 )/presentStudent[0].sum_q32)*2/countLevelTwoUT))+((((countLevelThree[0].sum_q32*100 )/presentStudent[0].sum_q32)*3/countLevelThreeUT)))/6)))/6).toFixed(2)}</td>
          <td>{(((((countLevelOne[0].sum_UA*100 )/presentStudent[0].sum_UA)/countLevelOneUA)+(((countLevelTwo[0].sum_UA*100 )/presentStudent[0].sum_UA)*2/countLevelTwoUA)+(((countLevelThree[0].sum_UA*100 )/presentStudent[0].sum_UA)*3/countLevelThreeUA))/6).toFixed(2)}</td>
        </tbody>
      </table>   : <div></div>}
    </div>
  );
}

export default BelowTable;
