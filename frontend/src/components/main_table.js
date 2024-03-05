import { Table, Button } from "react-bootstrap";
// import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import DataTable from "../DataTable";
import { UseData } from "../NewContext";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import { Document, Page, Text } from "react-pdf";
// import ParentComponent from "./ParentComponent";
import DefaultHeader from "../components/pdfHeader/header";
import * as XLSX from "xlsx";
import React, { useState, useEffect, useRef } from "react";
import BelowTable from "./below_table";
import Level from "./level";
const Main_table = ({ tableName }) => {
  useEffect(() => {
    createTable();
  }, []);
  const containerRef = useRef(null);
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [showbtn, setShowbtn] = useState(false);
  const { valuefortest1, setValuefortest1 } = UseData();
  const { valueforacadamicyearlabel, setValueForAcademicYearlabel } = UseData();
  const { valuefordepartmentlabel, setvaluefordepartmentlabel } = UseData();
  const { valueforyearlabel, setvalueforyearlabel } = UseData();
  const { valueforsubjectlabel, setvalueforsubjectlabel } = UseData();
  const { valueforsemlabel, setvalueforsemlabel } = UseData();
  const { resultState, setResultState } = UseData() || {};
  const createTable = async () => {
    try {
      setShowbtn(true);
      console.log("valuetest1", valuefortest1);
      console.log("valueacadamicyear", valueforacadamicyearlabel);
      const response = await axios.get(
        `http://localhost:3000/createTable/${tableName}`
      );
      if (response.data.length === 0) {
        // Display toast notification for empty table
        toast.warn("Table is empty. Upload to the database.");
      } else if (response.status === 200) {
        if (response.data === "Table created successfully.") {
          // Table created successfully, show success notification
          toast.success("Table Created Successfully. Enter Data.");
        } else {
          // Table data fetched successfully, show success notification
          toast.success("Data Fetched Successfully.");
          // Handle table data if needed
          if (response.data.length === 0) {
            // Display toast notification for empty table
            toast.warning("Table is empty. Upload to the database.");
          } else {
            // console.log("first")
            // console.log(reportInfo);
            // console.log(valuefortest1)
            const updatedData = response.data.map((row) => {
              const newTotalUT1 = row["UT1-Q1"] + row["UT1-Q2"];
              const newTotalUT2 = row["UT2-Q1"] + row["UT2-Q2"];
              const newTotalUT3 = row["UT3-Q1"] + row["UT3-Q2"];

              return {
                ...row,
                ["Total-UT1"]: newTotalUT1,
                ["Total-UT2"]: newTotalUT2,
                ["Total-UT3"]: newTotalUT3,
              };
            });
            setData(updatedData);
            // console.log(data)
          }
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
  };

  // const handleMarksChange = (index, question, value, e) => {
  //   try {
  //     const updatedData = [...data];
  //     const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

  //     // Limit marks to a maximum of 15
  //     const limitedMarks = Math.min(numericValue, 15);

  //     updatedData[index] ??= {};
  //     updatedData[index][question] = limitedMarks;

  //     // Recalculate total marks
  //     updatedData[index]["Total-UT1"] =
  //       (updatedData[index]["UT1-Q1"] || 0) +
  //       (updatedData[index]["UT1-Q2"] || 0);
  //     updatedData[index]["Total-UT2"] =
  //       (updatedData[index]["UT2-Q1"] || 0) +
  //       (updatedData[index]["UT2-Q2"] || 0);
  //     updatedData[index]["Total-UT3"] =
  //       (updatedData[index]["UT3-Q1"] || 0) +
  //       (updatedData[index]["UT3-Q2"] || 0);

  //     setData(updatedData);
  //   } catch (error) {
  //     console.error("Error occurred while handling marks change:", error);
  //     // Handle error here, such as displaying a message to the user
  //   }
  // };

  useEffect(() => {
    const updatedData = data.map((row) => ({
      ...row,
      ["Total-UT1"]: row["UT1-Q1"] + row["UT1-Q2"],
      ["Total-UT2"]: row["UT2-Q1"] + row["UT2-Q2"],
      ["Total-UT3"]: row["UT3-Q1"] + row["UT3-Q2"],
    }));

    setData(updatedData); // <-- Update data instead of tableData
  }, []);

  const handleMarksChange = (index, question, value, e) => {
    const updatedData = [...data];
    
    if (value === null) {
      updatedData[index][question] = null;
    } else {
      const numericValue = isNaN(value) ? 0 : parseInt(value, 10);
      if (numericValue > 15) {
        e.target.value = 15;
        updatedData[index] ??= {};
        updatedData[index][question] = 15;
      } 
      else if (numericValue < 0) {
        e.target.value = 0;
        updatedData[index] ??= {};
        updatedData[index][question] = 0;
      } else {
        updatedData[index] ??= {};
        updatedData[index][question] = numericValue;
      }
    }

    updatedData[index] ??= {};
    if (
      updatedData[index]["UT1-Q1"] === null ||
      updatedData[index]["UT1-Q2"] === null
    ) {
      updatedData[index]["Total-UT1"] = null;
    } else {
      updatedData[index]["Total-UT1"] =
        (updatedData[index]["UT1-Q1"] || 0) +
        (updatedData[index]["UT1-Q2"] || 0);
    }

    if (
      updatedData[index]["UT2-Q1"] === null ||
      updatedData[index]["UT2-Q2"] === null
    ) {
      updatedData[index]["Total-UT2"] = null;
    } else {
      updatedData[index]["Total-UT2"] =
        (updatedData[index]["UT2-Q1"] || 0) +
        (updatedData[index]["UT2-Q2"] || 0);
    }

    if (
      updatedData[index]["UT3-Q1"] === null ||
      updatedData[index]["UT3-Q2"] === null
    ) {
      updatedData[index]["Total-UT3"] = null;
    } else {
      updatedData[index]["Total-UT3"] =
        (updatedData[index]["UT3-Q1"] || 0) +
        (updatedData[index]["UT3-Q2"] || 0);
    }
    setData(updatedData);
  };

  const handleMarksChangeUA = (index, question, value, e) => {
    const updatedData = [...data];
    const numericValue = isNaN(value) ? 0 : parseInt(value, 10);

    if (numericValue > 100) {
      e.target.value = 100;
      updatedData[index] ??= {};
      updatedData[index][question] = 100;
    }
    else if (numericValue < 0) {
      e.target.value = 0;
      updatedData[index] ??= {};
      updatedData[index][question] = 0;
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
      toast.success("Data updatde successfullyy!!");
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  const displayResult = () => {
    setResultState((prevState) => !prevState); // Toggle the display state
  };
  const handleGeneratePdf = async () => {
    try {
      // console.log("academic year",valueforacadamicyear)
      // console.log("in the handleGenerate")
      const tableContainer = document.getElementById("table-container");
      const belowTableContainer = document.getElementById("below");
      // console.log(belowTableContainer)
      // console.log(tableContainer)
      if (!tableContainer) {
        console.error("Table container not found.");
        return;
      }
      toast.info("Report generating");
      const tempContainer = document.createElement("div");
      // Create a new DefaultHeader component
      const headerComponent = (
        <DefaultHeader
          academicYear={valueforacadamicyearlabel}
          department={valuefordepartmentlabel}
          eYear={valueforyearlabel}
          subject={valueforsubjectlabel}
          sem={valueforsemlabel}
        />
      );

      // Render the DefaultHeader component to HTML
      const headerHtml = ReactDOMServer.renderToString(headerComponent);

      // Append the HTML to the temporary container
      tempContainer.innerHTML = headerHtml;

      // Append the content of tableContainer to the temporary container
      tempContainer.appendChild(tableContainer.cloneNode(true));
      // tempContainer.appendChild(belowTableContainer.cloneNode(true));

      // Generate PDF with the temporary container
      await html2pdf()
        .from(tempContainer)
        .set({
          margin: 10,
          filename: "report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        })
        .save();
      toast.success("Report Downloaded");

      // Remove the temporary container after generating PDF
      tempContainer.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  const handleGeneratePdfreport = async () => {
    try {
      console.log("in the handleGenerate");
      const belowTableContainer = document.getElementById("below");
      // belowTableContainer.style.height = "100px";
      toast.info("Report generating");
      const tempContainer = document.createElement("div");
      tempContainer.appendChild(belowTableContainer.cloneNode(true));
      await html2pdf()
        .from(tempContainer)
        .set({
          margin: 0,
          filename: "report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        })
        .save();
      toast.success("Report Downloaded");
      tempContainer.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const convertToExcel = async () => {
    const workbook = XLSX.utils.book_new();

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");

    // Modify the worksheet to add default headings and selected class

    // Insert default headings and selected class as separate rows

    // Save the workbook as an Excel file
    toast.success("Excel Downloaded!");
    XLSX.writeFile(workbook, "students_data.xlsx");
  };

  return (
    <>
      <Level />
      <div id="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="marks">Sr No</th>
              <th className="roll-no">Roll no</th>
              <th>Seat no</th>
              <th className="name-col">Name</th>
              {(valuefortest1 === "UT-1" ||
                valuefortest1 === "UT-2" ||
                valuefortest1 === "UT-3" ||
                valuefortest1 === "UA") && <th>CO-1</th>}
              {(valuefortest1 === "UT-1" ||
                valuefortest1 === "UT-2" ||
                valuefortest1 === "UT-3" ||
                valuefortest1 === "UA") && <th>CO-2</th>}
              {(valuefortest1 === "UT-2" ||
                valuefortest1 === "UT-3" ||
                valuefortest1 === "UA") && <th>CO-3</th>}
              {(valuefortest1 === "UT-2" ||
                valuefortest1 === "UT-3" ||
                valuefortest1 === "UA") && <th>CO-4</th>}
              {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                <th>CO-5</th>
              )}
              {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                <th>CO-6</th>
              )}
              {valuefortest1 === "UA" && <th>UA</th>}
              {(valuefortest1 === "UT-1" ||
                valuefortest1 === "UT-2" ||
                valuefortest1 === "UT-3" ||
                valuefortest1 === "UA") && <th>UT-1</th>}
              {(valuefortest1 === "UT-2" ||
                valuefortest1 === "UT-3" ||
                valuefortest1 === "UA") && <th>UT-2</th>}
              {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                <th>UT-3</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row["Roll No"]}</td>
                  <td>{row["Seat No"]}</td>
                  <td className="name-col">{row["Name"]}</td>
                  {(valuefortest1 === "UT-1" ||
                    valuefortest1 === "UT-2" ||
                    valuefortest1 === "UT-3" ||
                    valuefortest1 === "UA") && (
                    <td>
                      <input
                        type="text"
                        className={`q1-input-${index}`}
                        defaultValue={
                          row["UT1-Q1"] === null ? "A" : row["UT1-Q1"]
                        }
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UT1-Q1"]: value });
                            handleMarksChange(
                              index,
                              "UT1-Q1",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value === "a" || value === "A") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UT1-Q1"]: null });
                            handleMarksChange(index, "UT1-Q1", null, e);
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'a' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}
                  {(valuefortest1 === "UT-1" ||
                    valuefortest1 === "UT-2" ||
                    valuefortest1 === "UT-3" ||
                    valuefortest1 === "UA") && (
                    <td>
                      <input
                        type="text"
                        className={`q2-input-${index}`}
                        defaultValue={
                          row["UT1-Q2"] === null ? "A" : row["UT1-Q2"]
                        }
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UT1-Q2"]: value });
                            handleMarksChange(
                              index,
                              "UT1-Q2",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value === "a" || value === "A") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UT1-Q2"]: null });
                            handleMarksChange(index, "UT1-Q2", null, e);
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'a' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}
                  {(valuefortest1 === "UT-2" ||
                    valuefortest1 === "UT-3" ||
                    valuefortest1 === "UA") && (
                    <td>
                      <input
                        type="text"
                        className={`q1-input-${index}`}
                        defaultValue={
                          row["UT2-Q1"] === null ? "A" : row["UT2-Q1"]
                        }
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UT2-Q1"]: value });
                            handleMarksChange(
                              index,
                              "UT2-Q1",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value === "a" || value === "A") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UT2-Q1"]: null });
                            handleMarksChange(index, "UT2-Q1", null, e);
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'a' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}
                  {(valuefortest1 === "UT-2" ||
                    valuefortest1 === "UT-3" ||
                    valuefortest1 === "UA") && (
                    <td>
                      <input
                        type="text"
                        className={`q2-input-${index}`}
                        defaultValue={
                          row["UT2-Q2"] === null ? "A" : row["UT2-Q2"]
                        }
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UT2-Q2"]: value });
                            handleMarksChange(
                              index,
                              "UT2-Q2",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value === "a" || value === "A") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UT2-Q2"]: null });
                            handleMarksChange(index, "UT2-Q2", null, e);
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'a' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}
                  {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                    <td>
                      <input
                        type="text"
                        className={`q1-input-${index}`}
                        defaultValue={
                          row["UT3-Q1"] === null ? "A" : row["UT3-Q1"]
                        }
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UT3-Q1"]: value });
                            handleMarksChange(
                              index,
                              "UT3-Q1",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value === "a" || value === "A") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UT3-Q1"]: null });
                            handleMarksChange(index, "UT3-Q1", null, e);
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'a' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}
                  {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                    <td>
                      <input
                        type="text"
                        className={`q2-input-${index}`}
                        defaultValue={
                          row["UT3-Q2"] === null ? "A" : row["UT3-Q2"]
                        }
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UT3-Q2"]: value });
                            handleMarksChange(
                              index,
                              "UT3-Q2",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value === "a" || value === "A") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UT3-Q2"]: null });
                            handleMarksChange(index, "UT3-Q2", null, e);
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'a' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}
                  {valuefortest1 === "UA" && (
                    <td>
                      <input
                        type="text"
                        className={`UA-input-${index}`}
                        defaultValue={row["UA"] === 0 ? "FF" : row["UA"]}
                        onChange={(e) => {
                          let value = e.target.value.trim();
                          if (/^[0-9]*$/.test(value)) {
                            // If input is a number, update normally
                            setData({ ...data, ["UA"]: value });
                            handleMarksChange(
                              index,
                              "UA",
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else if (value==='f' || value==='F' || value === "ff" || value === "FF" || value === "Ff" || value === "fF") {
                            // If input is 'a' or 'A', update normally
                            setData({ ...data, ["UA"]: 0 });
                            handleMarksChange(
                              index,
                              0,
                              parseInt(e.target.value, 10) || 0,
                              e
                            );
                          } else {
                            // Notify user about invalid input
                            alert("Please enter only 'FF' or a number.");
                            e.preventDefault();
                            return;
                          }
                        }}
                      />
                    </td>
                  )}

                  {(valuefortest1 === "UT-1" ||
                    valuefortest1 === "UT-2" ||
                    valuefortest1 === "UT-3" ||
                    valuefortest1 === "UA") && (
                    <td>
                      {row["Total-UT1"] === null ? "A" : row["Total-UT1"]}
                    </td>
                  )}
                  {(valuefortest1 === "UT-2" ||
                    valuefortest1 === "UT-3" ||
                    valuefortest1 === "UA") && (
                    <td>
                      {row["Total-UT2"] === null ? "A" : row["Total-UT2"]}
                    </td>
                  )}
                  {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                    <td>
                      {row["Total-UT3"] === null ? "A" : row["Total-UT3"]}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
                  
        </Table>
      </div>
      <div />
      <div className="omkar">
        <Button onClick={insertData} className="leftbtn">
          Save Changed marks
        </Button>
        <Button onClick={handleGeneratePdf} className="leftbtn">
          {/* <Button onClick={handleGeneratePdf()} className="leftbtn"> */}
          Export to PDF
        </Button>
        <Button onClick={convertToExcel} className="leftbtn">
          Export to Excel
        </Button>
      </div>
      <div className="omkar">
        <Button className="p-[20px] font-bol" onClick={displayResult}>
          {resultState ? "Hide Result" : "Show Result"}
        </Button>
      </div>
      {resultState && (
        <BelowTable containerRef={containerRef} tableName={tableName} />
      )}
      {resultState && (
        <div className="omkar">
          <Button
            className="p-[20px] font-bol"
            onClick={handleGeneratePdfreport}
          >
            {resultState ? "Generate Report" : "Show Result"}
          </Button>
        </div>
      )}
    </>
  );
};
export default Main_table;


