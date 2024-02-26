const express = require("express");
const mysql = require("mysql2/promise");
const ExcelJS = require("exceljs");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
const { CleaningServices } = require("@mui/icons-material");

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

app.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const excelFile = req.files.file;

    // Save the file to a temporary location
    const filePath = uploadDir + excelFile.name;
    await excelFile.mv(filePath);

    // Call the function to process the Excel file
    await excelToMySQLArray(filePath);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

async function excelToMySQLArray(filePath) {
  try {
    // Load the Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Define the MySQL table structure
    const tableName = "sample";
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
        columns.map((col) => rowData[col])
      );

      // Execute the SQL INSERT query
      await pool.execute(
        INSERT INTO ${tableName} (\${columns.join("`, ")}\) VALUES ${values
          .map(() => (${placeholders}))
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
      console.log("Fetched!");
      res.send(result);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
  }
});

app.post('/updateDatabase', async (req, res) => {
  try {
    // Validate request body
    const data = req.body.dataToInsert;
    console.log(data[0]);

    // Execute all queries concurrently
    await Promise.all(data.map(async (row) => {
      const { 'Roll No':roll, 'Seat No':seat, 'UT1-Q1': q11, 'UT1-Q2': q12, 'UT2-Q1': q21, 'UT2-Q2': q22, 'UT3-Q1': q31, 'UT3-Q2': q32, UA: ua, 'Total-UT1': tut1, 'Total-UT2': tut2, 'Total-UT3': tut3 } = row;
      const query = `
        UPDATE sample
        SET \UT1-Q1\ = ?, \UT1-Q2\ = ?, \UT2-Q1\ = ?, \UT2-Q2\ = ?,
            \UT3-Q1\ = ?, \UT3-Q2\ = ?, \UA\ = ?, \Total-UT1\ = ?,
            \Total-UT2\ = ?, \Total-UT3\ = ?
        WHERE \Roll No\ = ? AND \Seat No\ = ?
      `;
      const values = [q11, q12, q21, q22, q31, q32, ua, tut1, tut2, tut3, roll, seat];
      
      const [result] = await pool.query(query, values);
      console.log(Row with Roll No ${roll} and Seat No ${seat} updated successfully);
    }));

    res.send('Data update request received');
  } catch (error) {
    console.error('Error updating rows:', error);
    res.status(500).send('Internal Server Error');
  }
});



`
// for counting present student
app.get("/insertCountsOfPresentStudent", async (req, res) => {
  try {
    let sql = `SELECT
    SUM(CASE WHEN \UT1-Q1\ IS NOT NULL THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN \UT1-Q2\ IS NOT NULL THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN \UT2-Q1\ IS NOT NULL THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN \UT2-Q2\ IS NOT NULL THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN \UT3-Q1\ IS NOT NULL THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN \UT3-Q2\ IS NOT NULL THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN UA IS NOT NULL THEN 1 ELSE 0 END) AS sum_UA
    FROM sample AS new_table;`;
    
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
app.get("/insertCountsOfAbsentStudent", async (req, res) => {
  try {
    let sql = `SELECT
    SUM(CASE WHEN \UT1-Q1\ IS  NULL THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN \UT1-Q2\ IS  NULL THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN \UT2-Q1\ IS  NULL THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN \UT2-Q2\ IS  NULL THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN \UT3-Q1\ IS  NULL THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN \UT3-Q2\ IS  NULL THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN UA IS  NULL THEN 1 ELSE 0 END) AS sum_UA
    FROM sample AS new_table;`;
    
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
app.get("/insertCountsOfPresentStudentPercentage", async (req, res) => {
  try {
    let sql = `SELECT
    SUM(CASE WHEN \UT1-Q1\ IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q11,
    SUM(CASE WHEN \UT1-Q2\ IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q12,
    SUM(CASE WHEN \UT2-Q1\ IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q21,
    SUM(CASE WHEN \UT2-Q2\ IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q22,
    SUM(CASE WHEN \UT3-Q1\ IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q31,
    SUM(CASE WHEN \UT3-Q2\ IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_q32,
    SUM(CASE WHEN UA IS NOT NULL THEN 1 ELSE 0 END)100/COUNT() AS sum_UA
    FROM sample AS new_table;`;
    
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

// // To find level 1 student count
// app.get("/insertCountsOflevel1", async (req, res) => {
//   try {
//     let sql = `SELECT
//     SUM(CASE WHEN (\UT1-Q1\ IS NOT NULL AND \UT1-Q1\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q11,
//     SUM(CASE WHEN (\UT1-Q2\ IS NOT NULL AND \UT1-Q2\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q12,
//     SUM(CASE WHEN (\UT2-Q1\ IS NOT NULL AND \UT2-Q1\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q21,
//     SUM(CASE WHEN (\UT2-Q2\ IS NOT NULL AND \UT2-Q2\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q22,
//     SUM(CASE WHEN (\UT3-Q1\ IS NOT NULL AND \UT3-Q1\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q31,
//     SUM(CASE WHEN (\UT3-Q2\ IS NOT NULL AND \UT3-Q2\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q32,
//     SUM(CASE WHEN (\UA\ IS NOT NULL AND \UA\ >=(100*40/100) ) THEN 1 ELSE 0 END) AS sum_UA
//     FROM sample AS new_table;`;
    
//     const queryResult = await pool.query(sql);
//     console.log("Query result:", queryResult);

//     if (queryResult.length === 0) {
//         console.log("No data found");
//         res.status(404).send("No data found");
//         return;
//     }

//     // Log the entire first row of the result
//     console.log("First row of the result:", queryResult[0]);

//     // Attempt to fetch the value of sum_q11
//     const present = queryResult[0];
//     // console.log("Fetched sum_q11:", present);

//     res.send(present); // Sending a JSON response with the value of sum_q11
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// To find level 1 student count
app.get("/insertCountsOflevel1", async (req, res) => {
  try {
    let sql = `SELECT
    SUM(CASE WHEN (\UT1-Q1\ IS NOT NULL AND \UT1-Q1\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN (\UT1-Q2\ IS NOT NULL AND \UT1-Q2\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN (\UT2-Q1\ IS NOT NULL AND \UT2-Q1\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN (\UT2-Q2\ IS NOT NULL AND \UT2-Q2\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN (\UT3-Q1\ IS NOT NULL AND \UT3-Q1\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN (\UT3-Q2\ IS NOT NULL AND \UT3-Q2\ >=(10*40/100) ) THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN (\UA\ IS NOT NULL AND \UA\ >=(100*40/100) ) THEN 1 ELSE 0 END) AS sum_UA
    FROM sample AS new_table;`;
    
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
app.get("/insertCountsOflevel2", async (req, res) => {
  try {
    let sql = `SELECT
    SUM(CASE WHEN (\UT1-Q1\ IS NOT NULL AND \UT1-Q1\ >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN (\UT1-Q2\ IS NOT NULL AND \UT1-Q2\ >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN (\UT2-Q1\ IS NOT NULL AND \UT2-Q1\ >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN (\UT2-Q2\ IS NOT NULL AND \UT2-Q2\ >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN (\UT3-Q1\ IS NOT NULL AND \UT3-Q1\ >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN (\UT3-Q2\ IS NOT NULL AND \UT3-Q2\ >=(10*60/100) ) THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN (\UA\ IS NOT NULL AND \UA\ >=(100*60/100) ) THEN 1 ELSE 0 END) AS sum_UA
    FROM sample AS new_table;`;
    
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
app.get("/insertCountsOflevel3", async (req, res) => {
  try {
    let sql = `SELECT
    SUM(CASE WHEN (\UT1-Q1\ IS NOT NULL AND \UT1-Q1\ >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q11,
    SUM(CASE WHEN (\UT1-Q2\ IS NOT NULL AND \UT1-Q2\ >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q12,
    SUM(CASE WHEN (\UT2-Q1\ IS NOT NULL AND \UT2-Q1\ >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q21,
    SUM(CASE WHEN (\UT2-Q2\ IS NOT NULL AND \UT2-Q2\ >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q22,
    SUM(CASE WHEN (\UT3-Q1\ IS NOT NULL AND \UT3-Q1\ >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q31,
    SUM(CASE WHEN (\UT3-Q2\ IS NOT NULL AND \UT3-Q2\ >=(10*66/100) ) THEN 1 ELSE 0 END) AS sum_q32,
    SUM(CASE WHEN (\UA\ IS NOT NULL AND \UA\ >=(100*66/100) ) THEN 1 ELSE 0 END) AS sum_UA
    FROM sample AS new_table;`;
    
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



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
