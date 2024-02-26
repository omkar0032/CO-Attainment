// // import React, { useState, useEffect, useRef } from "react";
// // import { Table, Modal, Button } from "react-bootstrap";
// // import { ToastContainer, toast } from "react-toastify";
// // import  jsPDF  from "jspdf";
// // import ReactDOMServer from 'react-dom/server';
// // import html2pdf from 'html2pdf.js';
// // import "react-toastify/dist/ReactToastify.css";
// // import "jspdf-autotable";
// // import { CSVLink } from "react-csv";
// // import axios from "axios";
// // import * as XLSX from "xlsx";
// // import { useReactToPrint } from "react-to-print";
// // import "./pdfHeader/header.css"
// // import DefaultHeader from "./pdfHeader/header";
// // const DB_fetch = () => {
// //   const [data, setData] = useState([]);
// //   const componentPdf = useRef();
// //   // const [qMarks,setQmarks]=useState()
// //   useEffect(() => {
// //     fetchData();
// //   }, []);


// //   const handleGeneratePdf = () => {
// //     const tableContainer = document.getElementById('table-container');
// //     const tempContainer = document.createElement('div');
// //     const instituteName = "Pune Institute of Computer Technology,Pune";
// //     const className = "TE";
// //     const division = "TE-11";
// //     const defaultInfo = "Additional default information";
// //     const logoUrl = './pict.jpg';

// //     // Create a new DefaultHeader component
// //     const headerComponent = (
// //         <DefaultHeader
// //             instituteName={instituteName}
// //             className={className}
// //             division={division}
// //             defaultInfo={defaultInfo}
// //             logoUrl={logoUrl}
// //         />
// //     );

// //     // Render the DefaultHeader component to HTML
// //     const headerHtml = ReactDOMServer.renderToString(headerComponent);
    
// //     // Append the HTML to the temporary container
// //     tempContainer.innerHTML = headerHtml;

// //     // Append the content of tableContainer to the temporary container
// //     tempContainer.appendChild(tableContainer.cloneNode(true));

// //     // Generate PDF with the temporary container
// //     html2pdf(tempContainer, {
// //         margin: 10,
// //         filename: "report.pdf",
// //         image: { type: 'jpeg', quality: 0.98 },
// //         html2canvas: { scale: 2 },
// //         jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
// //     });

// //     // Remove the temporary container after generating PDF
// //     tempContainer.remove();
// // };



// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:3000/students");

// //       if (response.data.length === 0) {
// //         // Display toast notification for empty table
// //         toast.warning("Table is empty. Upload to the database.");
// //       } else {
// //         const updatedData = response.data.map((row) => {
// //           const newTotalUT1 = row["UT1-Q1"] + row["UT1-Q2"];
// //           const newTotalUT2 = row["UT2-Q1"] + row["UT2-Q2"];
// //           const newTotalUT3 = row["UT3-Q1"] + row["UT3-Q2"];

// //           return {
// //             ...row,
// //             ["Total-UT1"]: newTotalUT1,
// //             ["Total-UT2"]: newTotalUT2,
// //             ["Total-UT3"]: newTotalUT3,
// //           };
// //         });

// //         setData(updatedData);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const handleMarksChange = (index, question, value, e) => {
// //     const updatedData = [...data];
// //     const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

// //     if (numericValue > 15) {
// //       e.target.value = 15;
// //       return;
// //     }

// //     updatedData[index] ??= {};
// //     updatedData[index][question] = numericValue;
// //     updatedData[index]["Total-UT1"] =
// //       (updatedData[index]["UT1-Q1"] || 0) + (updatedData[index]["UT1-Q2"] || 0);
// //     updatedData[index]["Total-UT2"] =
// //       (updatedData[index]["UT2-Q1"] || 0) + (updatedData[index]["UT2-Q2"] || 0);
// //     updatedData[index]["Total-UT3"] =
// //       (updatedData[index]["UT3-Q1"] || 0) + (updatedData[index]["UT3-Q2"] || 0);

// //     setData(updatedData);
// //   };

// //   const handleMarksChangeUA = (index, question, value, e) => {
// //     const updatedData = [...data];
// //     const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

// //     if (numericValue > 100) {
// //       e.target.value = 100;
// //       return;
// //     }

// //     updatedData[index] ??= {};
// //     updatedData[index][question] = numericValue;
// //     setData(updatedData);
// //   };

// //   const handleDownload = (format) => {
// //     if (format === "csv") {
// //     }
// //   };
// //   const insertData = async () => {
// //     try {
// //       console.log("Data to insert:", data);
// //       const response = await axios.post(
// //         "http://localhost:3000/updateDatabase",
// //         { dataToInsert: data }
// //       );
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error("Error inserting data:", error);
// //     }
// //   };
// //   const convertToExcel = async () => {
// //     const workbook = XLSX.utils.book_new();

// //     // Create a worksheet
// //     const worksheet = XLSX.utils.json_to_sheet(data);

// //     // Add the worksheet to the workbook
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");

// //     // Modify the worksheet to add default headings and selected class

// //     // Insert default headings and selected class as separate rows

// //     // Save the workbook as an Excel file
// //     XLSX.writeFile(workbook, "students_data.xlsx");
// //   };
// //   const convertToPdf = useReactToPrint({
// //     content: () => componentPdf.current,
// //     documentTitle: "UserData",
// //     onAfterPrint: () => alert("Data saved in PDF"),
// //   });
// //   return (
// //     <>
// //         {/* Additional headings visible only when printing */}
// //         {/* <h1>Hello</h1> */}
// //         <div id="table-container">
// //           <Table striped bordered hover>
// //             <thead>
// //               <tr>
// //                 <th>SR NO</th>
// //                 <th>Roll no</th>
// //                 <th>Seat no</th>
// //                 <th>Name</th>
// //                 <th>CO-1</th>
// //                 <th>CO-2</th>
// //                 <th>CO-3</th>
// //                 <th>CO-4</th>
// //                 <th>CO-5</th>
// //                 <th>CO-6</th>
// //                 <th>UA</th>
// //                 <th>UT-1</th>
// //                 <th>UT-2</th>
// //                 <th>UT-3</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {data.map((row, index) => {
// //                 return (
// //                   <tr key={index}>
// //                     <td>{index + 1}</td>
// //                     <td>{row["Roll No"]}</td>
// //                     <td>{row["Seat No"]}</td>
// //                     <td>{row["Name"]}</td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`q1-input-${index}`}
// //                         defaultValue={
// //                           row["UT1-Q1"] === null ? -1 : row["UT1-Q1"]
// //                         }
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UT1-Q1"]: e.target.value });
// //                           console.log("first");
// //                           // console.log(data['UT1-Q1']);
// //                           console.log(data[index]["UT1-Q1"]);
// //                           handleMarksChange(
// //                             index,
// //                             "UT1-Q1",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`q2-input-${index}`}
// //                         defaultValue={
// //                           row["UT1-Q2"] === null ? -1 : row["UT1-Q2"]
// //                         }
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UT1-Q2"]: e.target.value });
// //                           handleMarksChange(
// //                             index,
// //                             "UT1-Q2",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`q1-input-${index}`}
// //                         defaultValue={
// //                           row["UT2-Q1"] === null ? -1 : row["UT2-Q1"]
// //                         }
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UT2-Q1"]: e.target.value });
// //                           handleMarksChange(
// //                             index,
// //                             "UT2-Q1",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`q2-input-${index}`}
// //                         defaultValue={
// //                           row["UT2-Q2"] === null ? -1 : row["UT2-Q2"]
// //                         }
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UT2-Q2"]: e.target.value });
// //                           handleMarksChange(
// //                             index,
// //                             "UT2-Q2",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`q1-input-${index}`}
// //                         defaultValue={
// //                           row["UT3-Q1"] === null ? -1 : row["UT3-Q1"]
// //                         }
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UT3-Q1"]: e.target.value });
// //                           handleMarksChange(
// //                             index,
// //                             "UT3-Q1",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`q2-input-${index}`}
// //                         defaultValue={
// //                           row["UT3-Q2"] === null ? -1 : row["UT3-Q2"]
// //                         }
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UT3-Q2"]: e.target.value });
// //                           handleMarksChange(
// //                             index,
// //                             "UT3-Q2",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         className={`UA-input-${index}`}
// //                         defaultValue={row["UA"] === null ? -1 : row["UA"]}
// //                         onChange={(e) => {
// //                           setData({ ...data, ["UA"]: e.target.value });
// //                           handleMarksChangeUA(
// //                             index,
// //                             "UA",
// //                             parseInt(e.target.value, 10) || 0,
// //                             e
// //                           );
// //                         }}
// //                       />
// //                     </td>

// //                     <td>{row["Total-UT1"] === null ? -1 : row["Total-UT1"]}</td>
// //                     <td>{row["Total-UT2"] === null ? -1 : row["Total-UT2"]}</td>
// //                     <td>{row["Total-UT3"] === null ? -1 : row["Total-UT3"]}</td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </Table>
// //         </div>
// //       <div className="omkar">
// //         <Button onClick={insertData} className="leftbtn">
// //           Send to database
// //         </Button>
// //         <Button onClick={handleGeneratePdf} className="leftbtn">
// //           Export to PDF
// //         </Button>
// //       </div>
// //     </>
// //   );
// // };

// // export default DB_fetch;

// import React, { useState, useEffect, useContext } from 'react';
// import { Table, Modal, Button } from 'react-bootstrap';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import { CSVLink } from 'react-csv';
// import axios from 'axios';
// import {ContextProvider,UseData} from '../NewContext';

// const DB_fetch = () => {

//     // value form context
//     const{valuefortest1,setValuefortest1}=UseData();
//     // this for store  display result in handeler
//     const{resultState,setResultState}=UseData();

//     const [data, setData] = useState([]);
//     // const [qMarks,setQmarks]=useState()

//     useEffect(() => {
//         fetchData();
//     }, []);
    
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/students');
//             const updatedData = response.data.map((row) => {
//                 const newTotalUT1 = row['UT1-Q1'] + row['UT1-Q2'];
//                 const newTotalUT2 = row['UT2-Q1'] + row['UT2-Q2'];
//                 const newTotalUT3 = row['UT3-Q1'] + row['UT3-Q2'];
    
//                 return {
//                     ...row,
//                     ['Total-UT1']: newTotalUT1,
//                     ['Total-UT2']: newTotalUT2,
//                     ['Total-UT3']: newTotalUT3,
//                 };
//             });
    
//             setData(updatedData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
    


//     const handleMarksChange = (index, question, value, e) => {
//         const updatedData = [...data];
//         const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

//         if (numericValue > 15) {
//             e.target.value = 15;
//             return;
//         }

//         updatedData[index] ??= {};
//         updatedData[index][question] = numericValue;
//         updatedData[index]['Total-UT1'] = (updatedData[index]['UT1-Q1'] || 0) + (updatedData[index]['UT1-Q2'] || 0);
//         updatedData[index]['Total-UT2'] = (updatedData[index]['UT2-Q1'] || 0) + (updatedData[index]['UT2-Q2'] || 0);
//         updatedData[index]['Total-UT3'] = (updatedData[index]['UT3-Q1'] || 0) + (updatedData[index]['UT3-Q2'] || 0);

//         setData(updatedData);
//     };

//     const handleMarksChangeUA = (index, question, value, e) => {
//         const updatedData = [...data];
//         const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

//         if (numericValue > 100) {
//             e.target.value = 100;
//             return;
//         }

//         updatedData[index] ??= {};
//         updatedData[index][question] = numericValue;
//         setData(updatedData);
//     };

//     const handleDownload = (format) => {
//         if (format === 'csv') {
//         }
//     };
//     const insertData = async () => {
//         try {
//             console.log("Data to insert:", data);
//             const response = await axios.post('http://localhost:3000/updateDatabase', { dataToInsert: data });
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error inserting data:', error);
//         }
//     };

//     // it is to toggle button hide and show
//     const displayResult = () => {
//         setResultState((prevState) => !prevState); // Toggle the display state
//     };
    
//     return (
//         <>
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Sr No</th>
//                         <th>Roll no</th>
//                         <th>Seat no</th>
//                         <th>Name</th>
//                         {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-1</th>}
//                         {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-2</th>}
//                         {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-3</th>}
//                         {(valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-4</th>}
//                         {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-5</th>}
//                         {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>CO-6</th>}
//                         {( valuefortest1==="UA")&&<th>UA</th>}
//                         {(valuefortest1==="UT-1"  || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>UT-1</th>}
//                         {(valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<th>UT-2</th>}
//                         {( valuefortest1==="UT-3"|| valuefortest1==="UA" )&&<th>UT-3</th>}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((row, index) => {
//                         return <tr key={index}>

//                             <td>{index + 1}</td>
//                             <td>{row['Roll No']}</td>
//                             <td>{row['Seat No']}</td>
//                             <td>{row['Name']}</td>
//                             {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={q1-input-${index}}
//                                     defaultValue={row['UT1-Q1'] === null ? -1 : row['UT1-Q1']}
//                                     onChange={(e) => {
//                                         setData({...data,['UT1-Q1']:e.target.value})
//                                         handleMarksChange(index, 'UT1-Q1', (parseInt(e.target.value, 10) || 0), e)}}
//                                 />
//                             </td>}
//                             {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={q2-input-${index}}
//                                     defaultValue={row['UT1-Q2'] === null ? -1 : row['UT1-Q2']}
//                                     onChange={(e) => {
//                                         setData({...data,['UT1-Q2']:e.target.value})
//                                         handleMarksChange(index, 'UT1-Q2', (parseInt(e.target.value, 10) || 0), e)}}
                                    
//                                 />
//                             </td>}
//                             {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={q1-input-${index}}
//                                     defaultValue={row['UT2-Q1']=== null ? -1 : row['UT2-Q1']}
//                                     onChange={(e) => {
//                                         setData({...data,['UT2-Q1']:e.target.value})
//                                         handleMarksChange(index, 'UT2-Q1', (parseInt(e.target.value, 10) || 0), e)}}
//                                 />
//                             </td>}
//                             {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={q2-input-${index}}
//                                     defaultValue={row['UT2-Q2'] === null ? -1 : row['UT2-Q2']}
//                                     onChange={(e) => {
//                                         setData({...data,['UT2-Q2']:e.target.value})
//                                         handleMarksChange(index, 'UT2-Q2', (parseInt(e.target.value, 10) || 0), e)
//                                     }
//                                     }
//                                 />
//                             </td>}
//                             {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={q1-input-${index}}
//                                     defaultValue={row['UT3-Q1'] === null ? -1 : row['UT3-Q1']}
//                                     onChange={(e) => {
//                                         setData({...data,['UT3-Q1']:e.target.value})
//                                         handleMarksChange(index, 'UT3-Q1', (parseInt(e.target.value, 10) || 0), e);
//                                     }}
//                                 />
//                             </td>}
//                             {( valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={q2-input-${index}}
//                                     defaultValue={row['UT3-Q2'] === null ? -1 : row['UT3-Q2']}
//                                     onChange={(e) => {
//                                         setData({...data,['UT3-Q2']:e.target.value})
//                                         handleMarksChange(index, 'UT3-Q2', (parseInt(e.target.value, 10) || 0), e)
//                                     }
//                                     }
//                                 />
//                             </td>}
//                             {( valuefortest1==="UA")&&<td>
//                                 <input
//                                     type="number"
//                                     className={UA-input-${index}}
//                                     defaultValue={row['UA'] === null ? -1 : row['UA']}
//                                     onChange={(e) => {
//                                         setData({...data,['UA']:e.target.value})
//                                         handleMarksChangeUA(index, 'UA', (parseInt(e.target.value, 10) || 0), e)}}
//                                 />
//                             </td>}

//                             {(valuefortest1==="UT-1"  || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>{row['Total-UT1'] === null ? -1 : row['Total-UT1']}</td>}
//                             {(valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>{row['Total-UT2'] === null ? -1 : row['Total-UT2']}</td>}
//                             {( valuefortest1==="UT-3"|| valuefortest1==="UA" )&&<td>{row['Total-UT3'] === null ? -1 : row['Total-UT3']}</td>}
//                         </tr>
//                     })}
//                 </tbody>
//             </Table> */}
//             <div className='omkar'>
//                 <Button className='p-[20px] font-bol' onClick={displayResult}>
//                     {resultState ? 'Hide Result' : 'Show Result'}
//                 </Button>
//             </div>
//         </>
//     );
// };

// export default DB_fetch;

{/* <Table striped bordered hover>
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
                                    className={`q1-input-${index}`}
                                    defaultValue={row['UT1-Q1'] === null ? -1 : row['UT1-Q1']}
                                    onChange={(e) => {
                                        setData({...data,['UT1-Q1']:e.target.value})
                                        handleMarksChange(index, 'UT1-Q1', (parseInt(e.target.value, 10) || 0), e)}}
                                />
                            </td>}
                            {(valuefortest1==="UT-1" || valuefortest1==="UT-2"  || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={`q2-input-${index}`}
                                    defaultValue={row['UT1-Q2'] === null ? -1 : row['UT1-Q2']}
                                    onChange={(e) => {
                                        setData({...data,['UT1-Q2']:e.target.value})
                                        handleMarksChange(index, 'UT1-Q2', (parseInt(e.target.value, 10) || 0), e)}}
                                    
                                />
                            </td>}
                            {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={`q1-input-${index}`}
                                    defaultValue={row['UT2-Q1']=== null ? -1 : row['UT2-Q1']}
                                    onChange={(e) => {
                                        setData({...data,['UT2-Q1']:e.target.value})
                                        handleMarksChange(index, 'UT2-Q1', (parseInt(e.target.value, 10) || 0), e)}}
                                />
                            </td>}
                            {( valuefortest1==="UT-2" || valuefortest1==="UT-3" || valuefortest1==="UA")&&<td>
                                <input
                                    type="number"
                                    className={`q2-input-${index}`}
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
                                    className={`UA-input-${index}`}
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
            </Table> */}
