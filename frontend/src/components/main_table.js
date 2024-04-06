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
import jsPDF from "jspdf";
import "jspdf-autotable"
import MaxMarkTable from "./MaxMarksTable";
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
            // const updatedData = response.data.map((row) => {
            //   const newTotalUT1 = row["UT1-Q1"] + row["UT1-Q2"];
            //   const newTotalUT2 = row["UT2-Q1"] + row["UT2-Q2"];
            //   const newTotalUT3 = row["UT3-Q1"] + row["UT3-Q2"];

            //   return {
            //     ...row,
            //     ["Total-UT1"]: newTotalUT1,
            //     ["Total-UT2"]: newTotalUT2,
            //     ["Total-UT3"]: newTotalUT3,
            //   };
            // });
            // setData(updatedData);
            const updatedData = response.data.map((row) => {
              const totalUT1 = (row["UT1-Q1"] !== null && row["UT1-Q2"] !== null) ? row["UT1-Q1"] + row["UT1-Q2"] : null;
              const totalUT2 = (row["UT2-Q1"] !== null && row["UT2-Q2"] !== null) ? row["UT2-Q1"] + row["UT2-Q2"] : null;
              const totalUT3 = (row["UT3-Q1"] !== null && row["UT3-Q2"] !== null) ? row["UT3-Q1"] + row["UT3-Q2"] : null;
              return {
                ...row,
                ["Total-UT1"]: totalUT1,
                ["Total-UT2"]: totalUT2,
                ["Total-UT3"]: totalUT3,
              };
            });
        
            setData(updatedData);
            console.log(updatedData)
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

  useEffect(() => {
    const updatedData = data.map((row) => {
      const totalUT1 = (row["UT1-Q1"] !== null && row["UT1-Q2"] !== null) ? row["UT1-Q1"] + row["UT1-Q2"] : null;
      const totalUT2 = (row["UT2-Q1"] !== null && row["UT2-Q2"] !== null) ? row["UT2-Q1"] + row["UT2-Q2"] : null;
      const totalUT3 = (row["UT3-Q1"] !== null && row["UT3-Q2"] !== null) ? row["UT3-Q1"] + row["UT3-Q2"] : null;
      return {
        ...row,
        ["Total-UT1"]: totalUT1,
        ["Total-UT2"]: totalUT2,
        ["Total-UT3"]: totalUT3,
      };
    });

    setData(updatedData);
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

    // Modify data before creating worksheet
    const modifiedData = data.map(row => {
        const modifiedRow = { ...row };
        // Handle null values
        if (modifiedRow["UA"] === 0) {
            modifiedRow["UA"] = 'FF';
        }
        // Iterate through other fields and replace null with 'A'
        Object.keys(modifiedRow).forEach(key => {
            if (modifiedRow[key] === null) {
                modifiedRow[key] = 'A';
            }
        });
        return modifiedRow;
    });

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(modifiedData, {
        raw: true, // This retains data type for numbers
        header: Object.keys(modifiedData[0]),
        cellDates: true // Enable date formatting
    });

    // Set alignment for cells with value 'A' and 'FF'
    modifiedData.forEach((row, rowIndex) => {
        Object.keys(row).forEach((key, colIndex) => {
            const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
            if (row[key] === 'A' || row[key] === 'FF') {
                worksheet[cellRef].s = { alignment: { horizontal: 'right' } };
            }
        });
    });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");

    // Save the workbook as an Excel file
    toast.success("Excel Downloaded!");
    XLSX.writeFile(workbook, "students_data.xlsx");
};

const addHeaderContent = (doc, data) => {
  // Add content to 1/4th of the page
  const contentX = doc.internal.pageSize.getWidth() / 2; // Center align content
  const contentY = 20; // Adjust Y position as needed

  // Add content goes here text
  const content = `Final CO Attainment for ${valueforacadamicyearlabel} `;
  doc.setFont("helvetica", "bold"); // Make the text bold
  doc.text(content, contentX, contentY, { align: "center" });

  // Add image
  const img = new Image();
  img.src = "./defaultHeader.jpg"; // Specify the path to your image
  const imgWidth = 400; // Adjust image width as needed
  const imgHeight = 80; // Adjust image height as needed
  doc.addImage(img, 'JPEG', contentX - imgWidth / 2, contentY + 20, imgWidth, imgHeight);

  // Add subheading
  // Define subheadings with bold font for labels and regular font for values
const subheading1 = `Subject: `;
const subheading2 = `Class: `;
const subheading3 = `Year & Sem: `;
const value1 = valueforsubjectlabel;
const value2 = valueforyearlabel;
const value3 = `${valueforacadamicyearlabel}, ${valueforsemlabel}`;
// Set font styles for subheadings
doc.setFont("helvetica", "bold"); // Set font to bold
doc.setFontSize(14);
// Add subheading 1
doc.text(subheading1, contentX - 150, contentY + 130, { align: "center" });
doc.text(subheading2, contentX - 150, contentY + 150, { align: "center" });
doc.text(subheading3, contentX - 150, contentY + 170, { align: "center" });
// Set font styles for values
doc.setFont("helvetica", "normal"); // Set font to normal
doc.setFontSize(12); // Set font size to smaller
// Add value for subheading 1
doc.text(value1, contentX - 90, contentY + 130, { align: "center" });
doc.text(value2, contentX - 90, contentY + 150, { align: "center" });
doc.text(value3, contentX - 50, contentY + 170, { align: "center" });
  doc.setFont('normal');
  return contentY + 200; // Return the startY position for the table
};

const generatePDF = () => {
  // Create new jsPDF instance
  const doc = new jsPDF('l', 'pt', 'a4');

  // Set startY position for the table
  const startY = addHeaderContent(doc, data);

  // Define small table data
  const smallTableData = [
    ["Level 3", valueforsubjectlabel],
    ["Level 2", valueforyearlabel],
    ["Level 1", `${valueforacadamicyearlabel}, ${valueforsemlabel}`]
  ];

  // Add small table to the right side
  doc.autoTable({
    startY: 130, // Adjust Y position as needed
    head: [["UT", "UA"]],
    body: smallTableData,
    theme: 'grid',
    margin: { left: 500 , right:150 }, // Adjust margin to position the table on the right side
    styles: {
      head: { fillColor: 'transparent' } // Set the background color of the header to transparent
    }
  });
  

  // Define main table headers and data
  const mainTableHeader = ["Serial No", "Roll No", "Seat No", "Name", "UT1-Q1", "UT1-Q2", "UT2-Q1", "UT2-Q2", "UT3-Q1", "UT3-Q2", "UA", "Total-UT1", "Total-UT2", "Total-UT3"];
  const mainTableData = [
    mainTableHeader, // Add the table header
    ...data.map(row => {
      // Replace null values with 'A' and 'FF' as required
      return [
        row["Serial No"],
        row["Roll No"],
        row["Seat No"],
        row["Name"],
        row["UT1-Q1"] === null ? 'A' : row["UT1-Q1"],
        row["UT1-Q2"] === null ? 'A' : row["UT1-Q2"],
        row["UT2-Q1"] === null ? 'A' : row["UT2-Q1"],
        row["UT2-Q2"] === null ? 'A' : row["UT2-Q2"],
        row["UT3-Q1"] === null ? 'A' : row["UT3-Q1"],
        row["UT3-Q2"] === null ? 'A' : row["UT3-Q2"],
        row["UA"] === 0 ? 'FF' : row["UA"],
        row["Total-UT1"] === null ? 'A' : row["Total-UT1"],
        row["Total-UT2"] === null ? 'A' : row["Total-UT2"],
        row["Total-UT3"] === null ? 'A' : row["Total-UT3"]
      ];
    })
  ];

  // Adjust column width and row height for the main table
  const columnStyles = {
    Name: { columnWidth: 120 }, // Increase the width of the "Name" column
    "Serial No": { columnWidth: 30 }, // Reduce the width of the "Serial No" column
    "Roll No": { columnWidth: 60 }, // Reduce the width of the "Roll No" column
    "Seat No": { columnWidth: 70 } // Reduce the width of the "Seat No" column
  };

  // Add the main table below the small table
  doc.autoTable({
    startY :230,
    head: [mainTableHeader],
    body: mainTableData.slice(1), // Skip the table header
    columnStyles: columnStyles,
    theme: 'grid',
    didDrawCell: (data) => {
      if (data.column.index === 3) { // Check if it's the "Name" column
        // Reduce font size to fit the content in the cell
        doc.setFontSize(10);
      }
    },
    // Adjust the row height
    didParseCell: (data) => {
      if (data.row.index > 0) { // Skip the header row
        data.cell.styles.cellHeight = 20; // Set the row height to 20
      }
    }
  });

  // Save the PDF
  doc.setFont("helvetica", "normal"); // Set font to normal
doc.setFontSize(10); // Set font size to 10 (or adjust as needed)



  // Add a new page for "below" content
  doc.addPage();

  // Add content for "below"
  const belowContentX = doc.internal.pageSize.getWidth() / 2; // Center align content
const belowContentY = 20; // Adjust Y position as needed
const belowContent1 = "Final Attainment Calculation";
doc.setFont("helvetica", "bold"); // Make the text bold
doc.setFontSize(20);
doc.text(belowContent1, belowContentX, belowContentY, { align: "center" });
doc.setFont('normal');
doc.setFontSize(10);
// Get the HTML content of the component with id "below"
// Get the below content from the UI
// Get the below content from the UI
const belowContentElement = document.getElementById('below');

// Convert the table HTML to a string
const tableHtml = belowContentElement.innerHTML;

// Create a temporary element to parse the HTML table
const tempElement = document.createElement('div');
tempElement.innerHTML = tableHtml;

// Get the table element
const tableElement = tempElement.querySelector('table');

// Parse the HTML table and extract the data
const tableData = [];
const headers = [];
const rows = tableElement.querySelectorAll('tr');
rows.forEach((row, rowIndex) => {
  const rowData = [];
  const cells = row.querySelectorAll('th, td');
  cells.forEach((cell, cellIndex) => {
    const text = cell.textContent.trim();
    if (rowIndex === 0) {
      headers.push(text);
    } else {
      rowData.push(text);
    }
  });
  if (rowIndex !== 0) {
    tableData.push(rowData);
  }
});

// Add the table to the PDF
doc.autoTable({
  head: [headers],
  body: tableData,
  startY: belowContentY + 50, // Adjust Y position as needed
  theme: 'striped',
  margin: { left: 40, right: 40 } // Adjust margins as needed
});
// Get the below content from the UI
const belowContentElement2 = document.getElementById('below-attainment');

// Convert the table HTML to a string
const tableHtml2 = belowContentElement2.innerHTML;

// Create a temporary element to parse the HTML table
const tempElement2 = document.createElement('div');
tempElement2.innerHTML = tableHtml2;

// Get the table element
const tableElement2 = tempElement2.querySelector('table');

// Parse the HTML table and extract the data
const tableData2 = [];
const rows2 = tableElement2.querySelectorAll('tr');
rows2.forEach((row, rowIndex) => {
  const rowData2 = [];
  const cells2 = row.querySelectorAll('td');
  cells2.forEach((cell, cellIndex) => {
    const text2 = cell.textContent.trim();
    rowData2.push(text2);
  });
  tableData2.push(rowData2);
});

// Add the second table to the PDF
doc.autoTable({
  body: tableData2,
  startY: belowContentY + 450, // Adjust Y position as needed
  theme: 'striped',
  margin: { left: 300, right: 300 } // Adjust margins as needed
});
const nameAndSign="Examiners name & Sign:"
doc.text(nameAndSign, belowContentX-60, belowContentY+560, { align: "center" });

const totalPages = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  doc.setFont('normal');
  doc.text('Page ' + i + ' of ' + totalPages, doc.internal.pageSize.getWidth() - 70, doc.internal.pageSize.getHeight() - 10);
}
  // Add page number for the "below" page
  // Save the PDF
  doc.save("table.pdf");
};
  return (
    <>
      <Level />
      <MaxMarkTable tableName={tableName}/>
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
                            handleMarksChangeUA(
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
                      {row["Total-UT2"] === null || row["UT2-Q1"] === null || row["UT2-Q2"] === null? "A" : row["Total-UT2"]}
                    </td>
                  )}
                  {(valuefortest1 === "UT-3" || valuefortest1 === "UA") && (
                    <td>
                      {row["Total-UT3"] === null || row["UT3-Q1"] === null || row["UT3-Q2"] === null? "A" : row["Total-UT3"]}
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
        <Button onClick={generatePDF} className="leftbtn">
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


