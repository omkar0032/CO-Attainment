import React, { useState, useEffect, useContext } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import {ContextProvider,UseData} from '../NewContext';

const DB_fetch = () => {

    // value form context
    const{valuefortest1,setValuefortest1}=UseData();
    // this for store  display result in handeler
    const{resultState,setResultState}=useState(false);

    const [data, setData] = useState([]);
    // const [qMarks,setQmarks]=useState()

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/students');
            const updatedData = response.data.map((row) => {
                const newTotalUT1 = row['UT1-Q1'] + row['UT1-Q2'];
                const newTotalUT2 = row['UT2-Q1'] + row['UT2-Q2'];
                const newTotalUT3 = row['UT3-Q1'] + row['UT3-Q2'];
    
                return {
                    ...row,
                    ['Total-UT1']: newTotalUT1,
                    ['Total-UT2']: newTotalUT2,
                    ['Total-UT3']: newTotalUT3,
                };
            });
    
            setData(updatedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    


    const handleMarksChange = (index, question, value, e) => {
        const updatedData = [...data];
        const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

        if (numericValue > 15) {
            e.target.value = 15;
            return;
        }

        updatedData[index] ??= {};
        updatedData[index][question] = numericValue;
        updatedData[index]['Total-UT1'] = (updatedData[index]['UT1-Q1'] || 0) + (updatedData[index]['UT1-Q2'] || 0);
        updatedData[index]['Total-UT2'] = (updatedData[index]['UT2-Q1'] || 0) + (updatedData[index]['UT2-Q2'] || 0);
        updatedData[index]['Total-UT3'] = (updatedData[index]['UT3-Q1'] || 0) + (updatedData[index]['UT3-Q2'] || 0);

        setData(updatedData);
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

    const handleDownload = (format) => {
        if (format === 'csv') {
        }
    };
    const insertData = async () => {
        try {
            console.log("Data to insert:", data);
            const response = await axios.post('http://localhost:3000/updateDatabase', { dataToInsert: data });
            console.log(response.data);
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    // it is to toggle button hide and show
    const displayResult = () => {
        setResultState((prevState) => !prevState); // Toggle the display state
    };
    
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Roll no</th>
                        <th>Seat no</th>
                        <th>Name</th>
                        {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-1</th>}
                        {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-2</th>}
                        {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-3</th>}
                        {(valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-4</th>}
                        {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-5</th>}
                        {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-6</th>}
                        {( valuefortest1==="UA")&&<th>UA</th>}
                        {(valuefortest1==="UT-1"  || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>UT-1</th>}
                        {(valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>UT-2</th>}
                        {( valuefortest1==="UT-3"|| valuefortest1==="UA" )&&<th>UT-3</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return <tr key={index}>

                            <td>{index + 1}</td>
                            <td>{row['Roll No']}</td>
                            <td>{row['Seat No']}</td>
                            <td>{row['Name']}</td>
                            {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={q1-input-${index}}
                                    defaultValue={row['UT1-Q1'] === null ? -1 : row['UT1-Q1']}
                                    onChange={(e) => {
                                        setData({...data,['UT1-Q1']:e.target.value})
                                        handleMarksChange(index, 'UT1-Q1', (parseInt(e.target.value, 10) || 0), e)}}
                                />
                            </td>}
                            {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={q2-input-${index}}
                                    defaultValue={row['UT1-Q2'] === null ? -1 : row['UT1-Q2']}
                                    onChange={(e) => {
                                        setData({...data,['UT1-Q2']:e.target.value})
                                        handleMarksChange(index, 'UT1-Q2', (parseInt(e.target.value, 10) || 0), e)}}
                                    
                                />
                            </td>}
                            {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={q1-input-${index}}
                                    defaultValue={row['UT2-Q1']=== null ? -1 : row['UT2-Q1']}
                                    onChange={(e) => {
                                        setData({...data,['UT2-Q1']:e.target.value})
                                        handleMarksChange(index, 'UT2-Q1', (parseInt(e.target.value, 10) || 0), e)}}
                                />
                            </td>}
                            {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={q2-input-${index}}
                                    defaultValue={row['UT2-Q2'] === null ? -1 : row['UT2-Q2']}
                                    onChange={(e) => {
                                        setData({...data,['UT2-Q2']:e.target.value})
                                        handleMarksChange(index, 'UT2-Q2', (parseInt(e.target.value, 10) || 0), e)
                                    }
                                    }
                                />
                            </td>}
                            {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={`q1-input-${index}`}
                                    defaultValue={row['UT3-Q1'] === null ? -1 : row['UT3-Q1']}
                                    onChange={(e) => {
                                        setData({...data,['UT3-Q1']:e.target.value})
                                        handleMarksChange(index, 'UT3-Q1', (parseInt(e.target.value, 10) || 0), e);
                                    }}
                                />
                            </td>}
                            {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={`q2-input-${index}`}
                                    defaultValue={row['UT3-Q2'] === null ? -1 : row['UT3-Q2']}
                                    onChange={(e) => {
                                        setData({...data,['UT3-Q2']:e.target.value})
                                        handleMarksChange(index, 'UT3-Q2', (parseInt(e.target.value, 10) || 0), e)
                                    }
                                    }
                                />
                            </td>}
                            {( valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={UA-input-${index}}
                                    defaultValue={row['UA'] === null ? -1 : row['UA']}
                                    onChange={(e) => {
                                        setData({...data,['UA']:e.target.value})
                                        handleMarksChangeUA(index, 'UA', (parseInt(e.target.value, 10) || 0), e)}}
                                />
                            </td>}

                            {(valuefortest1==="UT-1"  || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>{row['Total-UT1'] === null ? -1 : row['Total-UT1']}</td>}
                            {(valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>{row['Total-UT2'] === null ? -1 : row['Total-UT2']}</td>}
                            {( valuefortest1==="UT-3"|| valuefortest1==="UA" )&&<td>{row['Total-UT3'] === null ? -1 : row['Total-UT3']}</td>}
                        </tr>
                    })}
                </tbody>
            </Table>
            <div className='omkar'>
                <Button className='p-[20px] font-bol' onClick={displayResult}>
                    {resultState ? 'Hide Result' : 'Show Result'}
                </Button>
            </div>
        </>
    );
};

export default DB_fetch;
