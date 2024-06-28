// controllers/studentsController.js
const { pool } = require("../config/database");
const{dropdownPool}=require("../config/database")
const ExcelJS = require("exceljs");
const xlsx = require("xlsx");
// const fileUpload = require("express-fileupload");
const path = require("path");
const createTableStudents = async (req, res) => {
  const { tableName,degree_year,department,division } = req.params;
  let divisionInNumber;
  // if(division!='ALL'){
  //   const divisionInNumber=Number(division);
  // }
   division!='All' ?  divisionInNumber=Number(division): divisionInNumber=-1;
  
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
      if (rowCount === 0) {
        // console.log(rowCount);
        return res.status(200).send([]);
      }else if(division=='All'){
        const fetchDataQuery = `SELECT * FROM ${tableName} `;
        const tableData = await pool.query(fetchDataQuery);
        return res.status(200).send(tableData[0]);

      }  else {
        const queryToFetchDivisionCode=`SELECT Division_Code FROM department_and_year_wise_division WHERE (Degree_Year='${degree_year}' AND Department='${department}') AND Division=${divisionInNumber}`;
        const resultOfDivisionCode=await dropdownPool.query(queryToFetchDivisionCode);
        // console.log(resultOfDivisionCode[0][0].Division_Code)
        const divisionCode=resultOfDivisionCode[0][0].Division_Code;
        const fetchDataQuery = `SELECT * FROM ${tableName} WHERE \`Roll No\` LIKE '${divisionCode}%'`;
        const tableData = await pool.query(fetchDataQuery);
        return res.status(200).send(tableData[0]);
      }
    } else {
      // Table doesn't exist, create table
      const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      \`Serial No\` INT,
      \`Roll No\` INT PRIMARY KEY,
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

const uploadExcelStudents = async (req, res) => {
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

    // Call the function to process the Excel file
    const result=await excelToMySQLArray(filePath, tableName);

    if (result && result.error && result.error.includes("Duplicate entry")) {
      return res.status(400).send("Duplicate entries not allowed");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
};

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
          let cellValue = row.getCell(index + 1).value;
          // If cell value is "A", set it to null
          if (cellValue === "A") {
            cellValue = null;
          }
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
      try {
        await pool.execute(
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

const updateDatabaseStudents = async (req, res) => {
  try {
    // Validate request body
    const data = req.body.dataToInsert;
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
      })
    );

    res.send("Data update request received");
  } catch (error) {
    console.error("Error updating rows:", error);
    res.status(500).send("Internal Server Error");
  }
};

//queries related to bwlow table calculation

// for counting present student
const countsOfPresentStudent = async (req, res) => {
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

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// for counting absent student
const countsOfAbsentStudent = async (req, res) => {
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

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// for counting present student
const countsOfPresentStudentPercentage = async (req, res) => {
  try {
    const { tableName } = req.params;
    let sql = `SELECT
        (SUM(CASE WHEN \`UT1-Q1\` IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_q11,
        (SUM(CASE WHEN \`UT1-Q2\` IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_q12,
        (SUM(CASE WHEN \`UT2-Q1\` IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_q21,
        (SUM(CASE WHEN \`UT2-Q2\` IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_q22,
        (SUM(CASE WHEN \`UT3-Q1\` IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_q31,
        (SUM(CASE WHEN \`UT3-Q2\` IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_q32,
        (SUM(CASE WHEN UA IS NOT NULL THEN 1 ELSE 0 END) * 100) / COUNT(*) AS sum_UA
      FROM ${tableName} AS new_table;
      `;
    const queryResult = await pool.query(sql);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};


// To find level 1 student count
const countsOflevel1 = async (req, res) => {
  try {
    const { tableName } = req.params;

    const resultQuery = `SELECT * FROM max_marks_for_each_co WHERE Main_Table_Name = '${tableName}'`;
    const result = await pool.query(resultQuery);
    const firstResult = result[0][0];

    let sql = `SELECT
      SUM(CASE WHEN (\`UT1-Q1\` IS NOT NULL AND \`UT1-Q1\` >=(${firstResult['CO-1']}*40/100) ) THEN 1 ELSE 0 END) AS sum_q11,
      SUM(CASE WHEN (\`UT1-Q2\` IS NOT NULL AND \`UT1-Q2\` >=(${firstResult['CO-2']}*40/100) ) THEN 1 ELSE 0 END) AS sum_q12,
      SUM(CASE WHEN (\`UT2-Q1\` IS NOT NULL AND \`UT2-Q1\` >=(${firstResult['CO-3']}*40/100) ) THEN 1 ELSE 0 END) AS sum_q21,
      SUM(CASE WHEN (\`UT2-Q2\` IS NOT NULL AND \`UT2-Q2\` >=(${firstResult['CO-4']}*40/100) ) THEN 1 ELSE 0 END) AS sum_q22,
      SUM(CASE WHEN (\`UT3-Q1\` IS NOT NULL AND \`UT3-Q1\` >=(${firstResult['CO-5']}*40/100) ) THEN 1 ELSE 0 END) AS sum_q31,
      SUM(CASE WHEN (\`UT3-Q2\` IS NOT NULL AND \`UT3-Q2\` >=(${firstResult['CO-6']}*40/100) ) THEN 1 ELSE 0 END) AS sum_q32,
      SUM(CASE WHEN (UA IS NOT NULL AND UA >=(100*40/100) ) THEN 1 ELSE 0 END) AS sum_UA
      FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// To find level 2 student count
const countsOflevel2 = async (req, res) => {
  try {
    const { tableName } = req.params;

    const resultQuery = `SELECT * FROM max_marks_for_each_co WHERE Main_Table_Name = '${tableName}'`;
    const result = await pool.query(resultQuery);
    const firstResult = result[0][0];

    let sql = `SELECT
      SUM(CASE WHEN (\`UT1-Q1\` IS NOT NULL AND \`UT1-Q1\` >=(${firstResult['CO-1']}*60/100) ) THEN 1 ELSE 0 END) AS sum_q11,
      SUM(CASE WHEN (\`UT1-Q2\` IS NOT NULL AND \`UT1-Q2\` >=(${firstResult['CO-2']}*60/100) ) THEN 1 ELSE 0 END) AS sum_q12,
      SUM(CASE WHEN (\`UT2-Q1\` IS NOT NULL AND \`UT2-Q1\` >=(${firstResult['CO-3']}*60/100) ) THEN 1 ELSE 0 END) AS sum_q21,
      SUM(CASE WHEN (\`UT2-Q2\` IS NOT NULL AND \`UT2-Q2\` >=(${firstResult['CO-4']}*60/100) ) THEN 1 ELSE 0 END) AS sum_q22,
      SUM(CASE WHEN (\`UT3-Q1\` IS NOT NULL AND \`UT3-Q1\` >=(${firstResult['CO-5']}*60/100) ) THEN 1 ELSE 0 END) AS sum_q31,
      SUM(CASE WHEN (\`UT3-Q2\` IS NOT NULL AND \`UT3-Q2\` >=(${firstResult['CO-6']}*60/100) ) THEN 1 ELSE 0 END) AS sum_q32,
      SUM(CASE WHEN (UA IS NOT NULL AND UA >=(100*60/100) ) THEN 1 ELSE 0 END) AS sum_UA
      FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);

    if (queryResult.length === 0) {
      console.log("No data found");
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// To find level 3 student count
const countsOflevel3 = async (req, res) => {
  try {
    const { tableName } = req.params;

    const resultQuery = `SELECT * FROM max_marks_for_each_co WHERE Main_Table_Name = '${tableName}'`;
    const result = await pool.query(resultQuery);
    const firstResult = result[0][0];
    let sql = `SELECT
      SUM(CASE WHEN (\`UT1-Q1\` IS NOT NULL AND \`UT1-Q1\` >=(${firstResult['CO-1']}*66/100) ) THEN 1 ELSE 0 END) AS sum_q11,
      SUM(CASE WHEN (\`UT1-Q2\` IS NOT NULL AND \`UT1-Q2\` >=(${firstResult['CO-2']}*66/100) ) THEN 1 ELSE 0 END) AS sum_q12,
      SUM(CASE WHEN (\`UT2-Q1\` IS NOT NULL AND \`UT2-Q1\` >=(${firstResult['CO-3']}*66/100) ) THEN 1 ELSE 0 END) AS sum_q21,
      SUM(CASE WHEN (\`UT2-Q2\` IS NOT NULL AND \`UT2-Q2\` >=(${firstResult['CO-4']}*66/100) ) THEN 1 ELSE 0 END) AS sum_q22,
      SUM(CASE WHEN (\`UT3-Q1\` IS NOT NULL AND \`UT3-Q1\` >=(${firstResult['CO-5']}*66/100) ) THEN 1 ELSE 0 END) AS sum_q31,
      SUM(CASE WHEN (\`UT3-Q2\` IS NOT NULL AND \`UT3-Q2\` >=(${firstResult['CO-6']}*66/100) ) THEN 1 ELSE 0 END) AS sum_q32,
      SUM(CASE WHEN (UA IS NOT NULL AND UA >=(100*66/100) ) THEN 1 ELSE 0 END) AS sum_UA
      FROM ${tableName} AS new_table;`;

    const queryResult = await pool.query(sql);

    if (queryResult.length === 0) {
      res.status(404).send("No data found");
      return;
    }

    // Log the entire first row of the result

    // Attempt to fetch the value of sum_q11
    const present = queryResult[0];

    res.send(present); // Sending a JSON response with the value of sum_q11
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};
const updateMaxMarks = async (req, res) => {
  try {
    const valueForMaxMarks = req.body.valueForMaxMarks;
    const tableName = req.params.tableName;

    const { CO_1, CO_2, CO_3, CO_4, CO_5, CO_6 } = valueForMaxMarks;

    const query = `
      UPDATE max_marks_for_each_co
      SET \`CO-1\` = ?, \`CO-2\` = ?, \`CO-3\` = ?, \`CO-4\` = ?,
          \`CO-5\` = ?, \`CO-6\` = ?
      WHERE \`Main_Table_Name\` = '${tableName}'`;

    const values = [CO_1, CO_2, CO_3, CO_4, CO_5, CO_6];

    await pool.query(query, values);
    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getMaxMarks = async (req, res) => {
  const { tableName } = req.params;

  try {
    // Check if entry with Main_Table_Name exists
    const checkQuery = `SELECT * FROM max_marks_for_each_co WHERE Main_Table_Name = '${tableName}'`;
    const checkResult = await pool.query(checkQuery);

    if (checkResult[0].length === 0) {
      // If Main_Table_Name entry doesn't exist, create it with default values
      const createQuery = `INSERT INTO max_marks_for_each_co (Main_Table_Name, \`CO-1\`, \`CO-2\`, \`CO-3\`, \`CO-4\`, \`CO-5\`, \`CO-6\`) VALUES ('${tableName}', 15 , 15, 15, 15, 15, 15)`;
      await pool.query(createQuery);
    }

    // Retrieve the data
    const resultQuery = `SELECT * FROM max_marks_for_each_co WHERE Main_Table_Name = '${tableName}'`;
    const result = await pool.query(resultQuery);

    res.status(200).send(result[0]);
  } catch (error) {
    console.error("Error while fetching", error);
    res.status(500).send("Error while fetching");
  }
};

const saveTarget_averageData = async (req, res) => {
  const { data } = req.body;
  const { tableName } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();

    // Iterate over data, starting from the second element, in steps of 2
    for (let i = 1; i < data.length; i += 2) {
      const row = data[i];
      const year = data[i - 1].year || 0;

      // Extract values from row
      const ut1Value = row.ut1 || 0;
      const ua1Value = row.ua1 || 0;
      const ut2Value = row.ut2 || 0;
      const ua2Value = row.ua2 || 0;
      const ut3Value = row.ut3 || 0;
      const ua3Value = row.ua3 || 0;
      const utCoAtValue = row.coUt || 0;
      const uaCoAtValue = row.coUa || 0;
      const coAtValue = row.coAt || 0;

      // Prepare and execute the SQL query
      const queryResult = await connection.query(
        `INSERT INTO yearwise_attainments (TableName, Year, UT_66, UA_66, UT_60, UA_60, UT_PASS, UA_PASS, CO_UT, CO_UA, CO_AT)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          UT_66 = VALUES(UT_66),
          UA_66 = VALUES(UA_66),
          UT_60 = VALUES(UT_60),
          UA_60 = VALUES(UA_60),
          UT_PASS = VALUES(UT_PASS),
          UA_PASS = VALUES(UA_PASS),
          CO_UT = VALUES(CO_UT),
          CO_UA = VALUES(CO_UA),
          CO_AT = VALUES(CO_AT)`,
        [tableName, year, ut1Value, ua1Value, ut2Value, ua2Value, ut3Value, ua3Value, utCoAtValue, uaCoAtValue, coAtValue]
      );
    }

    // Respond with success message
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
        connection.release();
    }
  }
};
const average_attainment_pastYears = async (req, res) => {
  const { tableName, startingYear } = req.params;
  // Calculate the past years of interest
  const pastYears = [
      startingYear - 1,
      startingYear - 2,
      startingYear - 3
  ];

  let connection;
  try {
      connection = await pool.getConnection();
      // Query the database for rows from the specified table name and past years
      const query = `
          SELECT *
          FROM yearwise_attainments
          WHERE TableName = ?
          AND Year IN (?, ?, ?)
      `;
      const [rows] = await connection.query(query, [tableName, ...pastYears]);

      // Send the retrieved rows to the frontend as a JSON response
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error querying the database', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          connection.release();
      }
  }
};



module.exports = {
  createTableStudents,
  uploadExcelStudents,
  updateDatabaseStudents,
  countsOfAbsentStudent,
  countsOfPresentStudent,
  countsOfPresentStudentPercentage,
  countsOflevel1,
  countsOflevel2,
  countsOflevel3,
  getMaxMarks,
  updateMaxMarks,
  saveTarget_averageData,
  average_attainment_pastYears
};
