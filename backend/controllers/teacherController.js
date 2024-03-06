// controllers/teachersController.js
const { teachersPool } = require("../config/database");
const ExcelJS = require("exceljs");
const xlsx = require("xlsx");
const path = require("path");
const createTableTeachers = async (req, res) => {
    const { tableName } = req.params;
    console.log(tableName);
  
    // Check if the table already exists
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'inhouse_teachers'
        AND table_name = '${tableName}'
      ) AS table_exists;
    `;
  
    try {
      const result = await teachersPool.query(checkTableQuery);
      const tableExists = result[0][0].table_exists;
  
      if (tableExists) {
        // Table exists, check if it's empty
        const checkEmptyTableQuery = `SELECT COUNT(*) AS row_count FROM ${tableName}`;
        const rowCountResult = await teachersPool.query(checkEmptyTableQuery);
        const rowCount = rowCountResult[0][0].row_count;
        console.log(rowCount);
        if (rowCount === 0) {
          // Table is empty, send notification
          console.log("first");
          const fetchDataQuery = `SELECT * FROM ${tableName}`;
          const tableData = await teachersPool.query(fetchDataQuery);
          console.log(rowCount);
          return res.status(200).send([]);
        } else {
          console.log("tableData[0]");
          // Table is not empty, fetch data
          const fetchDataQuery = `SELECT * FROM ${tableName}`;
          const tableData = await teachersPool.query(fetchDataQuery);
          // console.log(tableData[0])
          return res.status(200).send(tableData[0]);
        }
      } else {
        // Table doesn't exist, create table
        const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      \`Serial No\` INT AUTO_INCREMENT PRIMARY KEY,
      \`Email ID\` VARCHAR(50) UNIQUE,
      \`Password\` VARCHAR(20),
      Name VARCHAR(255),
      \`Subject\` INT,
      \`Division\` INT,
      \`Coordinator\` BOOLEAN
    )
  `;
        await teachersPool.query(createTableQuery);
        return res.status(200).send("Table created successfully.");
      }
    } catch (error) {
      console.error("Error creating or fetching table:", error);
      return res.status(500).send("Error creating or fetching table");
    }
  };
const uploadExcelTeachers= async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
  
        const { tableName } = req.params;
  
        const excelFile = req.files.file;
        const fileName = excelFile.name;
  
        // Save the file to a temporary location
        const filePath = path.join(__dirname, fileName);
        await excelFile.mv(filePath);
        console.log(filePath, tableName);
  
        // Call the function to process the Excel file
        const result = await excelToMySQLArrayTeachers(filePath, tableName);
  
        if (result && result.error && result.error.includes("Duplicate entry")) {
            return res.status(400).send("Duplicate entries not allowed");
        }
  
        res.sendStatus(200);
    } catch (error) {
        console.error("Error:", error);
        res.sendStatus(500);
    }
  };
  
  async function excelToMySQLArrayTeachers(filePath, tableName) {
    try {
        // Load the Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        console.log(tableName);
  
        // Get the first worksheet
        const worksheet = workbook.getWorksheet(1);
  
        // Define the MySQL table structure
        const columns = [
            "Serial No",
            "Email ID",
            "Password",
            "Name",
            "Subject",
            "Division",
            "Coordinator"
        ];
  
        // Initialize array to store data
        const dataArray = [];
  
        // Iterate through rows and convert to objects
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                // Skip the header row
                const rowData = {};
  
                // Populate rowData dynamically
                columns.forEach((colName, index) => {
                    const cellValue = row.getCell(index + 1).value;
                    rowData[colName] = cellValue;
                });
  
                // Push rowData to dataArray
                dataArray.push(rowData);
            }
        });
  
        // Insert data into the MySQL table
        if (dataArray.length > 0) {
            const placeholders = columns.map(() => "?").join(", ");
  
            const values = dataArray.map((rowData) =>
              columns.map((col) => {
                  // Extracting only the text property from 'Email ID' objects
                  if (col === 'Email ID' && typeof rowData[col] === 'object') {
                      return rowData[col].text;
                  } else {
                      return rowData[col];
                  }
              })
            );
  
            // Debugging: Print values array
            console.log("Values Array:", values);
  
            // Execute the SQL INSERT query
            try {
              await teachersPool.execute(
                `INSERT INTO ${tableName} (\`${columns.join("`, `")}\`) VALUES ${values
                  .map(() => `(${placeholders})`)
                  .join(", ")}`,
                values.flat()
              );
                console.log("Data inserted into MySQL table.");
            } catch (error) {
                // Check for MySQL error code indicating duplicate entry
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log("Duplicate entry not allowed");
                    return { error: "Duplicate entry not allowed" };
                } else {
                    throw error; // Rethrow other errors
                }
            }
        } else {
            console.log("No data to insert.");
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "An error occurred while processing the Excel file." };
    }
  }
module.exports = { createTableTeachers,uploadExcelTeachers };
