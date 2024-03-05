const express = require("express");
const mysql = require("mysql2/promise");
const ExcelJS = require("exceljs");
const XLSX =require("XLSX");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const pool = mysql.createPool({
  host: "localhost",
  database: "inhouse",
  user: "root",
  password: "",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define the upload directory
const uploadDir = __dirname + "/uploads/";

// app.get("/students", async (req, res) => {
//   try {
//     let sql = "SELECT * FROM sample";
//     const [result] = await pool.query(sql);
//     console.log("Data fetched successfully!");
//     res.send(result);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
const path = require("path");

app.post("/upload/:tableName", async (req, res) => {
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
    await excelToMySQLArray(filePath, tableName);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

// async function excelToMySQLArray(filePath, tableName) {
//   try {
//     // Load the Excel file
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.readFile(filePath);
//     console.log(tableName);
//     // Get the first worksheet
//     const worksheet = workbook.getWorksheet(1);

//     // Define the MySQL table structure
//     const columns = [
//       "Serial No",
//       "Roll No",
//       "Seat No",
//       "Name",
//       "UT1-Q1",
//       "UT1-Q2",
//       "UT2-Q1",
//       "UT2-Q2",
//       "UT3-Q1",
//       "UT3-Q2",
//       "UA",
//       "Total-UT1",
//       "Total-UT2",
//       "Total-UT3",
//     ];

//     // Initialize array to store data
//     const dataArray = [];

//     // Iterate through rows and convert to objects
//     worksheet.eachRow((row, rowNumber) => {
//       if (rowNumber !== 1) {
//         // Skip the header row
//         const rowData = {};

//         // Populate rowData dynamically
//         columns.forEach((colName, index) => {
//           const cellValue = row.getCell(index + 1).value;
//           rowData[colName] = cellValue;
//         });

//         // Push rowData to dataArray
//         dataArray.push(rowData);
//       }
//     });

//     // Insert data into the MySQL table
//     if (dataArray.length > 0) {
//       const placeholders = columns.map(() => "?").join(", ");

//       const values = dataArray.map((rowData) =>
//         columns.map((col) => rowData[col])
//       );

//       // Execute the SQL INSERT query
//       await pool.execute(
//         `INSERT INTO ${tableName} (\`${columns.join("`, `")}\`) VALUES ${values
//           .map(() => `(${placeholders})`)
//           .join(", ")}`,
//         values.flat()
//       );

//       console.log("Data inserted into MySQL table.");
//     } else {
//       console.log("No data to insert.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

//temp ai code

async function excelToMySQLArray(filePath, tableName) {
  
  try {
    // Load the Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1);
    // Define the MySQL table structure
    const columns = [
      "Serial No",
      "Roll No",
      "Seat No",
      "Name",
      "UT1-Q1",
      "UT1-Q2",
      "UT2-Q1",
      "UT2-Q2",
      "UT3-Q1",
      "UT3-Q2",
      "UA",
      "Total-UT1",
      "Total-UT2",
      "Total-UT3",
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

          // Check for 'A' or 'FF' and handle accordingly
          if (cellValue === 'A') {
            rowData[colName] = null; // 'A' should be saved as null
          }
          else if (cellValue === 'ff') {
            // If 'FF' is encountered, set all fields in the row to null except for specified columns
            rowData[colName] = 0;
          }
        
        else {
            rowData[colName] = cellValue;
          }
        });

        // Push rowData to dataArray
        dataArray.push(rowData);
      }
    });

    // Insert data into the MySQL table
    if (dataArray.length > 0) {
      const placeholders = columns.map(() => "?").join(", ");

      const values = dataArray.map((rowData) =>
        columns.map((col) => rowData[col])
      );

      // Execute the SQL INSERT query
      await pool.execute(
        `INSERT INTO ${tableName} (\`${columns.join("`, `")}\`) VALUES ${values
          .map(() => `(${placeholders})`)
          .join(", ")}`,
        values.flat()
      );

      console.log("Data inserted into MySQL table.");
    } else {
      console.log("No data to insert.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

app.get("/students", async (req, res) => {
  try {
    let sql = "SELECT * FROM sample";
    const queryResult = await pool.query(sql);
    // console.log(queryResult[0]); // Log the entire query result
    if (queryResult.length === 0) {
      console.log("No data found"); // Log if query result is empty
      res.status(404).send("No data found");
      return;
    }
    const result = queryResult[0]; // Extracting result from queryResult
    // console.log(result);
    // console.log("Fetched!");
    res.send(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/updateDatabase/:tableName", async (req, res) => {
  try {
    // Validate request body
    const data = req.body.dataToInsert;
    console.log(data[0]);
    tableName = req.params.tableName;

    // Execute all queries concurrently
    await Promise.all(
      data.map(async (row) => {
        const {
          "Roll No": roll,
          "Seat No": seat,
          "UT1-Q1": q11,
          "UT1-Q2": q12,
          "UT2-Q1": q21,
          "UT2-Q2": q22,
          "UT3-Q1": q31,
          "UT3-Q2": q32,
          UA: ua,
          "Total-UT1": tut1,
          "Total-UT2": tut2,
          "Total-UT3": tut3,
        } = row;
        const query = `
        UPDATE ${tableName}
        SET \`UT1-Q1\` = ?, \`UT1-Q2\` = ?, \`UT2-Q1\` = ?, \`UT2-Q2\` = ?,
            \`UT3-Q1\` = ?, \`UT3-Q2\` = ?, \`UA\` = ?, \`Total-UT1\` = ?,
            \`Total-UT2\` = ?, \`Total-UT3\` = ?
        WHERE \`Roll No\` = ? AND \`Seat No\` = ?
      `;
        const values = [
          q11,
          q12,
          q21,
          q22,
          q31,
          q32,
          ua === "FF" ? 0 : ua,
          tut1,
          tut2,
          tut3,
          roll,
          seat,
        ];

        const [result] = await pool.query(query, values);
        console.log(result)
      })
    );

    res.send("Data update request received");
  } catch (error) {
    console.error("Error updating rows:", error);
    res.status(500).send("Internal Server Error");
  }
});

//queries related to bwlow table calculation

// for counting present student
app.get("/insertCountsOfPresentStudent/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    let sql = `SELECT
    SUM(CASE WHEN \`UT1-Q1\` IS NOT NULL THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN \`UT1-Q2\` IS NOT NULL THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN \`UT2-Q1\` IS NOT NULL THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN \`UT2-Q2\` IS NOT NULL THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN \`UT3-Q1\` IS NOT NULL THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN \`UT3-Q2\` IS NOT NULL THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN UA IS NOT NULL THEN 1 ELSE 0 END) AS sum_UA
    FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);
    console.log("Query result:", queryResult);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result
    console.log("First row of the result:", queryResult[0]);

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];
    // console.log("Fetched sum_q11:", present);

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// for counting absent student
app.get("/insertCountsOfAbsentStudent/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    let sql = `SELECT
    SUM(CASE WHEN \`UT1-Q1\` IS  NULL THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN \`UT1-Q2\` IS  NULL THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN \`UT2-Q1\` IS  NULL THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN \`UT2-Q2\` IS  NULL THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN \`UT3-Q1\` IS  NULL THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN \`UT3-Q2\` IS  NULL THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN UA IS  NULL THEN 1 ELSE 0 END) AS sum_UA
    FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);
    console.log("Query result:", queryResult);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result
    console.log("First row of the result:", queryResult[0]);

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];
    // console.log("Fetched sum_q11:", present);

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// for counting present student
app.get(
  "/insertCountsOfPresentStudentPercentage/:tableName",
  async (req, res) => {
    try {
      const { tableName } = req.params;
      let sql = `SELECT
    SUM(CASE WHEN \`UT1-Q1\` IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q11,
    SUM(CASE WHEN \`UT1-Q2\` IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q12,
    SUM(CASE WHEN \`UT2-Q1\` IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q21,
    SUM(CASE WHEN \`UT2-Q2\` IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q22,
    SUM(CASE WHEN \`UT3-Q1\` IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q31,
    SUM(CASE WHEN \`UT3-Q2\` IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q32,
    SUM(CASE WHEN UA IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_UA
    FROM ${tableName} AS new_table;`;

      const queryResult = await pool.query(sql);
      console.log("Query result:", queryResult);

      if (queryResult.length === 0) {
        console.log("No data found");
        res.status(404).send("No data found");
        return;
      }

      // Log the entire first row of the result
      console.log("First row of the result:", queryResult[0]);

      // Attempt to fetch the value of sum_q11
      const present = queryResult[0];
      // console.log("Fetched sum_q11:", present);

      res.send(present); // Sending a JSON response with the value of sum_q11
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// To find level 1 student count
app.get("/insertCountsOflevel1/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    let sql = `SELECT
    SUM(CASE WHEN (\`UT1-Q1\` IS NOT NULL AND \`UT1-Q1\` >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN (\`UT1-Q2\` IS NOT NULL AND \`UT1-Q2\` >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN (\`UT2-Q1\` IS NOT NULL AND \`UT2-Q1\` >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN (\`UT2-Q2\` IS NOT NULL AND \`UT2-Q2\` >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN (\`UT3-Q1\` IS NOT NULL AND \`UT3-Q1\` >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN (\`UT3-Q2\` IS NOT NULL AND \`UT3-Q2\` >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN (UA IS NOT NULL AND UA >=(100*40/100) ) THEN 1 ELSE 0 END) AS sum_UA
    FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);
    console.log("Query result:", queryResult);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result
    console.log("First row of the result:", queryResult[0]);

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];
    // console.log("Fetched sum_q11:", present);

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// To find level 2 student count
app.get("/insertCountsOflevel2/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    let sql = `SELECT
    SUM(CASE WHEN (\`UT1-Q1\` IS NOT NULL AND \`UT1-Q1\` >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN (\`UT1-Q2\` IS NOT NULL AND \`UT1-Q2\` >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN (\`UT2-Q1\` IS NOT NULL AND \`UT2-Q1\` >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN (\`UT2-Q2\` IS NOT NULL AND \`UT2-Q2\` >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN (\`UT3-Q1\` IS NOT NULL AND \`UT3-Q1\` >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN (\`UT3-Q2\` IS NOT NULL AND \`UT3-Q2\` >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN (UA IS NOT NULL AND UA >=(100*60/100) ) THEN 1 ELSE 0 END) AS sum_UA
    FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);
    console.log("Query result:", queryResult);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result
    console.log("First row of the result:", queryResult[0]);

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];
    // console.log("Fetched sum_q11:", present);

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// To find level 3 student count
app.get("/insertCountsOflevel3:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    let sql = `SELECT
    SUM(CASE WHEN (\`UT1-Q1\` IS NOT NULL AND \`UT1-Q1\` >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN (\`UT1-Q2\` IS NOT NULL AND \`UT1-Q2\` >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN (\`UT2-Q1\` IS NOT NULL AND \`UT2-Q1\` >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN (\`UT2-Q2\` IS NOT NULL AND \`UT2-Q2\` >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN (\`UT3-Q1\` IS NOT NULL AND \`UT3-Q1\` >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN (\`UT3-Q2\` IS NOT NULL AND \`UT3-Q2\` >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN (UA IS NOT NULL AND UA >=(100*66/100) ) THEN 1 ELSE 0 END) AS sum_UA
    FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);
    console.log("Query result:", queryResult);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result
    console.log("First row of the result:", queryResult[0]);

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];
    // console.log("Fetched sum_q11:", present);

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});
// ... (existing code)

// API endpoint to create the table with dynamic name
const createTable = async (req, res) => {
  const { tableName } = req.params;
  console.log(tableName);

  // Check if the table already exists
  const checkTableQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'inhouse'
      AND table_name = '${tableName}'
    ) AS table_exists;
  `;

  try {
    const result = await pool.query(checkTableQuery);
    const tableExists = result[0][0].table_exists;

    if (tableExists) {
      // Table exists, check if it's empty
      const checkEmptyTableQuery = `SELECT COUNT(*) AS row_count FROM ${tableName}`;
      const rowCountResult = await pool.query(checkEmptyTableQuery);
      const rowCount = rowCountResult[0][0].row_count;
      console.log(rowCount);
      if (rowCount === 0) {
        // Table is empty, send notification
        console.log("first");
        const fetchDataQuery = `SELECT * FROM ${tableName}`;
        const tableData = await pool.query(fetchDataQuery);
        console.log(rowCount);
        return res.status(200).send([]);
      } else {
        console.log("tableData[0]");
        // Table is not empty, fetch data
        const fetchDataQuery = `SELECT * FROM ${tableName}`;
        const tableData = await pool.query(fetchDataQuery);
        // console.log(tableData[0])
        return res.status(200).send(tableData[0]);
      }
    } else {
      // Table doesn't exist, create table
      const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    \`Serial No\` INT,
    \`Roll No\` INT,
    \`Seat No\` VARCHAR(10),
    Name VARCHAR(255),
    \`UT1-Q1\` INT,
    \`UT1-Q2\` INT,
    \`UT2-Q1\` INT,
    \`UT2-Q2\` INT,
    \`UT3-Q1\` INT,
    \`UT3-Q2\` INT,
    UA INT,
    \`Total-UT1\` INT,
    \`Total-UT2\` INT,
    \`Total-UT3\` INT
  )
`;
      await pool.query(createTableQuery);
      return res.status(200).send("Table created successfully.");
    }
  } catch (error) {
    console.error("Error creating or fetching table:", error);
    return res.status(500).send("Error creating or fetching table");
  }
};

app.get("/createTable/:tableName", createTable);

// ... (existing code)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
