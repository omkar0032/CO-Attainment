import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';
import { UseData } from "../NewContext";
import AddTargetsDropdown from './dropdown/AddTargetsDropdown';
import { toast } from 'react-toastify';
const TableWithInput = ({tableName}) => {
  // Separate useState for each input

  useEffect(()=>{
    fetchDataFortable();
  },[])
  const { valueforacadamicyearlabel, setValueForAcademicYearlabel } = UseData();
  const [responseData,setResponseData]=useState();
  const [data, setData] = useState([]);
  const fetchDataFortable = async () => {
    try {
      console.log("in func")
      const academicYear = valueforacadamicyearlabel;
      if (!academicYear) {
        console.error("Academic year is not defined");
        return;
      }

      // Split the academic year and validate
      const academicYearParts = academicYear.split("-");
      if (academicYearParts.length !== 2) {
        console.error("Invalid academic year format");
        return;
      }

      const startingYear = parseInt(academicYearParts[0], 10);
      console.log("in func")
      const response = await axios.get(`http://localhost:3000/average_attainment_pastYears/${tableName}/${startingYear}`);
      setResponseData(response.data);
      console.log("after link func")

      console.log(responseData)
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show toast, etc.
      toast.error("Failed to fetch data");
    }
  }

  useEffect(() => {
  if (responseData && responseData.length > 0) {
    setData([
      {
        year: `${responseData[0].Year}-${responseData[0].Year+1}`,
        staff: 'Target',
        ut1: `${responseData[0].UT_66}`,
        ua1: `${responseData[0].UA_66}`,
        ut2: `${responseData[0].UT_60}`,
        ua2: `${responseData[0].UA_60}`,
        ut3: `${responseData[0].UT_PASS}`,
        ua3: `${responseData[0].UA_PASS}`,
        coUt: `${responseData[0].CO_UT}`,
        coUa: `${responseData[0].CO_UA}`,
        coAt: `${responseData[0].CO_AT}`,
      },
    {
      year: '',
      staff: 'Achieved',
      ut1: '',
      ua1: '',
      ut2: '',
      ua2: '',
      ut3: '',
      ua3: '',
      coUt: '',
      coUa: '',
      coAt: '',
    },
    {
      year:`${responseData[1].Year}-${responseData[1].Year +1}` ,
      staff: 'Target',
      ut1: `${responseData[1].UT_66}`,
        ua1: `${responseData[1].UA_66}`,
        ut2: `${responseData[1].UT_60}`,
        ua2: `${responseData[1].UA_60}`,
        ut3: `${responseData[1].UT_PASS}`,
        ua3: `${responseData[1].UA_PASS}`,
        coUt: `${responseData[1].CO_UT}`,
        coUa: `${responseData[1].CO_UA}`,
        coAt: `${responseData[1].CO_AT}`,
    },
    {
      year: '',
      staff: 'Achieved',
      ut1: '',
      ua1: '',
      ut2: '',
      ua2: '',
      ut3: '',
      ua3: '',
      coUt: '',
      coUa: '',
      coAt: '',
    },
    {
      year: `${responseData[2].Year}-${responseData[2].Year+1}`,
      staff: 'Target',
      ut1: `${responseData[2].UT_66}`,
      ua1: `${responseData[2].UA_66}`,
      ut2: `${responseData[2].UT_60}`,
      ua2: `${responseData[2].UA_60}`,
      ut3: `${responseData[2].UT_PASS}`,
      ua3: `${responseData[2].UA_PASS}`,
      coUt: `${responseData[2].CO_UT}`,
      coUa: `${responseData[2].CO_UA}`,
      coAt: `${responseData[2].CO_AT}`,
    },
    {
      year: '',
      staff: 'Achieved',
      ut1: '',
      ua1: '',
      ut2: '',
      ua2: '',
      ut3: '',
      ua3: '',
      coUt: '',
      coUa: '',
      coAt: '',
    },
  ]);
}
}, [responseData]);
 const handleInputChange = (rowIndex, field, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][field] = value;
    setData(updatedData);
  };

  
  const saveDataToBackend = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/saveAverageTarget/${tableName}`, { data });
      if(response.status===200){toast.success('Data saved successfully!');}
      else{
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please check the console for more details.');
    }
  };
  

  return (
    <div>
      <Table border="1">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th colSpan="2">Above 66%</th>
            <th colSpan="2">Above 60%</th>
            <th colSpan="2">Pass Class</th>
            <th colSpan="3">Actual Attainment as per result</th>
          </tr>
          <tr>
            <th>Year</th>
            <th>Staff</th>
            <th>UT</th>
            <th>UA</th>
            <th>UT</th>
            <th>UA</th>
            <th>UT</th>
            <th>UA</th>
            <th>Co UT</th>
            <th>Co UA</th>
            <th>Co AT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {/* <input
                  type="text" */}
                  {row.year}
                {/* //   onChange={(e) => handleInputChange(rowIndex, 'year', e.target.value)}
                // /> */}
              </td>
              <td>
                {/* <input
                  type="text" */}
                  {row.staff}
                  {/* onChange={(e) => handleInputChange(rowIndex, 'staff', e.target.value)}
                /> */}
              </td>
              <td>
                <input
                  type="text"
                  value={row.ut1}
                  onChange={(e) => handleInputChange(rowIndex, 'ut1', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.ua1}
                  onChange={(e) => handleInputChange(rowIndex, 'ua1', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.ut2}
                  onChange={(e) => handleInputChange(rowIndex, 'ut2', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.ua2}
                  onChange={(e) => handleInputChange(rowIndex, 'ua2', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.ut3}
                  onChange={(e) => handleInputChange(rowIndex, 'ut3', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.ua3}
                  onChange={(e) => handleInputChange(rowIndex, 'ua3', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.coUt}
                  onChange={(e) => handleInputChange(rowIndex, 'coUt', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.coUa}
                  onChange={(e) => handleInputChange(rowIndex, 'coUa', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.coAt}
                  onChange={(e) => handleInputChange(rowIndex, 'coAt', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={saveDataToBackend}>Save Data</Button>
        
    </div>
  );
};

export default TableWithInput;

