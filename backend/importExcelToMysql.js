const ExcelJS = require('exceljs');
const mysql = require('mysql2/promise'); // Using the promise-based version for async/await

async function excelToMySQLArray() {
    try {
        // Connect to MySQL
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '@nshu1011_._',
            database: 'inhouse'
        });

        // Load your Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('./Book1.xlsx');

        // Assuming data is in the first sheet, adjust as needed
        const worksheet = workbook.getWorksheet(1);

        // Define the MySQL table structure
        const tableName = 'sample';
        const columns = ['serial', 'name', 'roll', 'Q1', 'Q2', 'total'];

        // Initialize array to store objects
        const dataArray = [];

        // Iterate through rows and convert to array of objects
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {  // Skip the header row
                // Calculate Total Marks
                const q1 = row.getCell(columns.indexOf('Q1') + 1).value || 0;
                const q2 = row.getCell(columns.indexOf('Q2') + 1).value || 0;
                const total = q1 + q2;

                const rowData = columns.reduce((acc, col, index) => {
                    acc[col] = col === 'total' ? total : row.getCell(index + 1).value;
                    return acc;
                }, {});

                dataArray.push(rowData);
            }
        });
        // Insert array of objects into MySQL table
        if (dataArray.length > 0) {
            const columnNames = columns.join(', ');
            const placeholders = columns.map(() => '?').join(', ');

            const values = dataArray.map(rowData => columns.map(col => rowData[col]));

            await connection.execute(`INSERT INTO ${tableName} (${columnNames}) VALUES ${values.map(() => `(${placeholders})`).join(', ')}`, values.flat());

            console.log('Data inserted into MySQL table.');
        } else {
            console.log('No data to insert.');
        }

        // Close MySQL connection
        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

excelToMySQLArray();

