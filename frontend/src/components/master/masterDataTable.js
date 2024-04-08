import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const MasterDataTable = () => {
  const [file, setFile] = useState(null);
  const [showTeachersBool, setShowTeachersBool] = useState(false);
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const tableName = "teacherdata";
  const showAllTeachersData = async () => {
    try {
        console.log("first")
      const response = await axios.get(
        `http://localhost:3000/teacherData/${tableName}`
      );
      console.log(response.data);
      console.log("first")
      // setdata(result);
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
          }
          setData(response.data);
          console.log(data);
          // console.log(data)
          // }
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
    showAllTeachersData();
  }, []);
  const downloadSampleFile = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Serial No", "Email ID", "Password", "Name", "Master"],
    ]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample");

    // Generate a data blob from the workbook
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    // Convert the blob to a buffer
    const buffer = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    // Create a Blob object from the buffer
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "TeachersInfo.xlsx"; // Set the file name here

    // Click the link programmatically to trigger the download
    link.click();

    // Clean up resources
    window.URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (!file) {
      toast.warning("Please choose an Excel file.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:3000/upload_main_table/`,
        formData
      );

      if (response.status === 200) {
        toast.success("Data inserted into MySQL table.");
      } else if (
        response.status === 400 &&
        response.data === "Duplicate entries not allowed"
      ) {
        toast.warning("Duplicate entries not allowed.");
      } else {
        toast.warning("Error inserting data into MySQL table.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        toast.warning(error.response.data);
      } else {
        toast.error("An error occurred while saving data to the database.");
      }
    } finally {
      setUploading(false);
    }
  };
  const handleDeleteRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    console.log(updatedData);
  };

  const handleInputChange = (event, index, key) => {
    const updatedData = [...data];
    updatedData[index][key] = event.target.value;
    setData(updatedData);
  };
  const 
  handleSaveData = async () => {
    try {
      console.log("into fun")
      const response = await axios.post(
        `http://localhost:3000/teachers/update_teacher_data/${tableName}`,
        data
      );
      console.log("succesee")
      toast.success("Changes saved successfully");
      
    } catch (error) {
      console.error("Error in saving the data", error);
      // Handle error if needed
    }
  };
  const handleAddRow = () => {
    setData([
      ...data,
      { "Email ID": "", Password: "", name: "", Department: "",Role:"" },
    ]);
  };
  return (
    <div style={{ width: "90%"}}>
      <h1 style={{ textAlign: "center" }}>Insert Teacher's Data</h1>
      <Button onClick={downloadSampleFile} style={{ margin: "3% 0 0 43%" }}>
        Download Sample File
      </Button>
      <div className="accept-and-save">
        <input
          className="accept-file"
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
        />
        <div className="omkar">
          <Button variant="primary" onClick={handleSave} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Excel"}
          </Button>
        </div>
      </div>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Mail</th>
                <th>Password</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="name-col">
                    <input
                      type="text"
                      value={row["Email ID"]}
                      onChange={(e) => handleInputChange(e, index, "Email ID")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row["Password"]}
                      onChange={(e) => handleInputChange(e, index, "Password")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row["name"]}
                      onChange={(e) => handleInputChange(e, index, "name")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row["Department"]}
                      onChange={(e) =>
                        handleInputChange(e, index, "Department")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row["Role"]}
                      onChange={(e) =>
                        handleInputChange(e, index, "Role")
                      }
                    />
                  </td>
                  <td style={{width:"5px"}}>
                    <Button 
                      variant="danger"
                      onClick={() => handleDeleteRow(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">
                  <Button onClick={handleAddRow}>Add Row</Button>
                </td>
              </tr>
            </tfoot>
          </Table>
          <Button
            onClick={handleSaveData}
            style={{
              width: "30%",
              textAlign: "center",
              alignItems: "center",
              marginLeft: "40%",
            }}
          >
            Save Data
          </Button>
        {/* </div> */}
    {/* //   )} */}
    </div>
  );
};

export default MasterDataTable;
