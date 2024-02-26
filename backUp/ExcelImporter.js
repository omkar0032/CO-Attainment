import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelImporter = ({ onDataLoaded }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheet);
            onDataLoaded(jsonData);

            // Send data to the backend with the file path
            axios.post('http://localhost:3000/import', { filePath: selectedFile.path, data: jsonData })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error sending data to the backend:', error);
                });
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    return (
        <div>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            {file && <p>File selected: {file.name}</p>}
        </div>
    );
};

export default ExcelImporter;
