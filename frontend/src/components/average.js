// Import the necessary modules
import React, { useState, useEffect } from 'react';
import { UseData } from "../NewContext"; // Import the UseData context from the correct path
import axios from 'axios';
import {Button} from "react-bootstrap";
const Average = () => {
  const { countLevelOneUT, setCountLevelOneUT } = UseData();
  const { countLevelOneUA, setCountLevelOneUA } = UseData();
  const { countLevelTwoUT, setCountLevelTwoUT } = UseData();
  const { countLevelTwoUA, setCountLevelTwoUA } = UseData();
  const { countLevelThreeUT, setCountLevelThreeUT } = UseData();
  const { countLevelThreeUA, setCountLevelThreeUA } = UseData();

  // 
  const [valueState,setValueState]=useState(0);

  const [countLevelOne, setCountLevelOne] = useState({
    UT: 0,
    UA: 0
  });

  const [countLevelTwo, setCountLevelTwo] = useState({
    UT: 0,
    UA: 0
  });

  const [countLevelThree, setCountLevelThree] = useState({
    UT: 0,
    UA: 0
  });

  const [backendData, setBackendData] = useState({
    UT1: 0,
    SPPU1: 0,
    UT2: 0,
    SPPU2: 0,
    UT3: 0,
    SPPU3: 0,
  });
const handelOnclick=(e)=>{
  setValueState((prev)=>!prev);
  fetchData();
  
}
  const handleOnChange = (level, key, value) => {
    switch (level) {
      case 1:
        setCountLevelOne((prevState) => ({
          ...prevState,
          [key]: value
        }));
        if (key === "UT") {
          setCountLevelOneUT(value);
        } else {
          setCountLevelOneUA(value);
        }
        break;
      case 2:
        setCountLevelTwo((prevState) => ({
          ...prevState,
          [key]: value
        }));
        if (key === "UT") {
          setCountLevelTwoUT(value);
        } else {
          setCountLevelTwoUA(value);
        }
        break;
      case 3:
        setCountLevelThree((prevState) => ({
          ...prevState,
          [key]: value
        }));
        if (key === "UT") {
          setCountLevelThreeUT(value);
        } else {
          setCountLevelThreeUA(value);
        }
        break;
      default:
        break;
    }
  };

  const inputdata = (level, key) => {
    return (
      <input
        type="number"
        onChange={(e) => {
          handleOnChange(level, key, e.target.value);
        }}
      />
    );
  };

  const [data, setData] = useState([
    { year: 2019, ut1: 0, sppu1: 0, ut2: 0, sppu2: 0, ut3: 0, sppu3: 0 },
    { year: 2020, ut1: 0, sppu1: 0, ut2: 0, sppu2: 0, ut3: 0, sppu3: 0 },
    { year: 2021, ut1: 0, sppu1: 0, ut2: 0, sppu2: 0, ut3: 0, sppu3: 0 },
  ]);

  const handleInputChange = (year, column, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      const rowIndex = newData.findIndex((item) => item.year === year);
      newData[rowIndex][column] = parseFloat(value, 10);
      return newData;
    });
  };

  const calculateAverages = () => {
    const averages = {
      ut1: 0,
      sppu1: 0,
      ut2: 0,
      sppu2: 0,
      ut3: 0,
      sppu3: 0,
    };

    const rowsWithValues = data.filter(row => Object.values(row).some(value => value !== 0));

    rowsWithValues.forEach((row) => {
      Object.keys(averages).forEach((key) => {
        averages[key] += row[key];
      });
    });

    Object.keys(averages).forEach((key) => {
      averages[key] /= rowsWithValues.length || 1; // Handle division by zero
    });

    return averages;
  };

  const averages = calculateAverages();

  const saveDataToBackend = async () => {
    try {
      // const averages = calculateAverages();
      const postData = {
        data: data,
        // averages: averages,
      };

      // Make a POST request to store data in the backend
      const response = await axios.post('http://localhost:3000/saveData', postData);

      if (response.status === 200) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data to the backend');
      }
    } catch (error) {
      console.error('Error saving data to the backend', error);
    }
  };
  
  useEffect(() => {
    // saveDataToBackend();
  }, [data]); // Trigger the saveDataToBackend function when the 'data' state changes

  useEffect(() => {
  
    fetchData();
  }, []);
 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetchAverage');
      const backendData1 = response.data.lastRow; // Assuming the backend returns the required data structure
      setBackendData(backendData1);
      console.log("backenddata",backendData1);
    } catch (error) {
      console.error('Error fetching backend data', error);
    }
  };

  return (
    <>
      <div className="container">
        <table className='centered-table'>
          <thead>
            <tr>
              <th>Year</th>
              <th colSpan="2">Above 66%</th>
              <th colSpan="2">Above 60%</th>
              <th colSpan="2">Past Class</th>
            </tr>
            <tr>
              <td></td>
              <td>UT</td>
              <td>SPPU</td>
              <td>UT</td>
              <td>SPPU</td>
              <td>UT</td>
              <td>SPPU</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>
                  <input
                    type="number"
                    value={row.ut1}
                    onChange={(e) => handleInputChange(row.year, 'ut1', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.sppu1}
                    onChange={(e) => handleInputChange(row.year, 'sppu1', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.ut2}
                    onChange={(e) => handleInputChange(row.year, 'ut2', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.sppu2}
                    onChange={(e) => handleInputChange(row.year, 'sppu2', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.ut3}
                    onChange={(e) => handleInputChange(row.year, 'ut3', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.sppu3}
                    onChange={(e) => handleInputChange(row.year, 'sppu3', e.target.value)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td>Averages</td>
              <td>{((averages.ut1 * 0.02) + averages.ut1).toFixed(0)}</td>
              <td>{((averages.sppu1 * 0.02) + averages.sppu1).toFixed(0)}</td>
              <td>{((averages.ut2 * 0.02) + averages.ut2).toFixed(0)}</td>
              <td>{((averages.sppu2 * 0.02) + averages.sppu2).toFixed(0)}</td>
              <td>{((averages.ut3 * 0.02) + averages.ut3).toFixed(0)}</td>
              <td>{((averages.sppu3 * 0.02) + averages.sppu3).toFixed(0)}</td>
              {/* <td>{((averages.ut1*0.02)+averages.ut1).toFixed(2)}</td> */}
            </tr>
          </tbody>
        </table>
        {/* <button className="btn btn-primary" onClick={saveDataToBackend}>Save Data</button> */}
      </div>
      {/* <Button onClick={handelOnclick}>{ valueState ? "click" : "on"}</Button> */}
      <div className='container' style={{ textAlign: 'center'}}>
      <button className="btn btn-primary" onClick={saveDataToBackend}>
        Save Data
      </button>
  <Button className="btn btn-primary" onClick={handelOnclick} style={{marginLeft:'50px'}}>
    {valueState ? "click" : "on"}
  </Button>
</div>


      {valueState && <div className='container'>
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>UT</th>
              <th>SPPU</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Level 3</td>
              <td>{(backendData.UT1 )}</td>
              <td>{(backendData.SPPU1 )}</td>
            </tr>
            <tr>
              <td>Level 2</td>
              <td>{(backendData.UT2)}</td>
              <td>{(backendData.SPPU2 )}</td>
            </tr>
            <tr>
              <td>Level 1</td>
              <td>{(backendData.UT3)}</td>
              <td>{(backendData.SPPU3 )}</td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>}
    </>
  );
};

export default Average;
