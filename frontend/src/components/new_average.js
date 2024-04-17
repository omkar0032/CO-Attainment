import React, { useState } from 'react';
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';
import AddTargetsDropdown from './dropdown/AddTargetsDropdown';
import { toast } from 'react-toastify';
const TableWithInput = ({tableName}) => {
  // Separate useState for each input
  const [data, setData] = useState([
    {
      year: '2017-18',
      staff: 'Target',
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
      year: '2018-19',
      staff: 'Target',
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
      year: '2019-20',
      staff: 'Target',
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
                <input
                  type="text"
                  value={row.year}
                  onChange={(e) => handleInputChange(rowIndex, 'year', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.staff}
                  onChange={(e) => handleInputChange(rowIndex, 'staff', e.target.value)}
                />
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

