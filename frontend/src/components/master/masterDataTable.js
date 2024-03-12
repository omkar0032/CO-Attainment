import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const MasterDataTable = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const downloadSampleFile = () => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Create a worksheet
        const worksheet = XLSX.utils.aoa_to_sheet([
            ["Serial No", "Email ID", "Password", "Name"]
        ]);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample');

        // Generate a data blob from the workbook
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Convert the blob to a buffer
        const buffer = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xff;
        }

        // Create a Blob object from the buffer
        const blob = new Blob([buffer], { type: 'application/octet-stream' });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sample.xlsx'; // Set the file name here

        // Click the link programmatically to trigger the download
        link.click();

        // Clean up resources
        window.URL.revokeObjectURL(url);
    };

    const handleSave = async () => {
        if (!file) {
            toast.warning('Please choose an Excel file.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:3000/upload_main_table/`, formData);

            if (response.status === 200) {
                toast.success('Data inserted into MySQL table.');
            } else if (response.status === 400 && response.data === "Duplicate entries not allowed") {
                toast.warning('Duplicate entries not allowed.');
            } else {
                toast.warning('Error inserting data into MySQL table.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400) {
                toast.warning(error.response.data);
            } else {
                toast.error('An error occurred while saving data to the database.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Insert Teacher's Data</h1>
            <Button onClick={downloadSampleFile} style={{ margin: '3% 0 0 43%' }} >Download Sample File</Button>
            <div className='accept-and-save'>

                <input className='accept-file' type="file" onChange={handleFileChange} accept=".xlsx" />
                <div className="omkar">

                    <Button variant="primary" onClick={handleSave} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload Excel'}
                    </Button>
                </div>


            </div>
        </>
    )
}

export default MasterDataTable;