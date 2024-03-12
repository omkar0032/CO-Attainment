// const express = require('express');
// const { pool } = require("../config/database");

// const app = express();
// const port = 3000;

// app.use(express.json());

// const saveData = async (req, res) => {
//     const { data } = req.body;
//     console.log("in post");

//     let connection; // Declare the connection outside the try block

//     try {
//         connection = await pool.getConnection();

//         for (const row of data) {
//             const ut1Value = row.ut1 !== null ? row.ut1 : 0;
//             const sppu1Value = row.sppu1 !== null ? row.sppu1 : 0;
//             const ut2Value = row.ut2 !== null ? row.ut2 : 0;
//             const sppu2Value = row.sppu2 !== null ? row.sppu2 : 0;
//             const ut3Value = row.ut3 !== null ? row.ut3 : 0;
//             const sppu3Value = row.sppu3 !== null ? row.sppu3 : 0;

//             // Insert or update individual rows
//             const queryResult = await connection.query(
//                 'INSERT INTO average_table (year, ut1, sppu1, ut2, sppu2, ut3, sppu3) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ut1 = VALUES(ut1), sppu1 = VALUES(sppu1), ut2 = VALUES(ut2), sppu2 = VALUES(sppu2), ut3 = VALUES(ut3), sppu3 = VALUES(sppu3)',
//                 [row.year, ut1Value, sppu1Value, ut2Value, sppu2Value, ut3Value, sppu3Value]
//             );

//             console.log("Query Result:", queryResult);
//         }

//         // Calculate and store the average of the last three rows
//         // Calculate and store the average of the last three rows
//         // const averageQueryResult = await connection.query(
//         //     'INSERT INTO average_table (year, ut1, sppu1, ut2, sppu2, ut3, sppu3) SELECT "average", AVG(ut1), AVG(sppu1), AVG(ut2), AVG(sppu2), AVG(ut3), AVG(sppu3) FROM (SELECT * FROM average_table ORDER BY  DESC LIMIT 3) AS subquery GROUP BY "average"'
//         // );
        
//         // console.log("Average Query Result:", averageQueryResult);

//         const averageQueryResult = await connection.query(
//             'INSERT INTO average_table (year, ut1, sppu1, ut2, sppu2, ut3, sppu3) SELECT "average", ROUND(AVG(ut1)*0.02+AVG(ut1)), ROUND(AVG(sppu1)*0.02+AVG(sppu1)), ROUND(AVG(ut2)*0.02+AVG(ut2)), ROUND(AVG(sppu2)*0.02+AVG(sppu2)), ROUND(AVG(ut3)*0.02+AVG(ut3)), ROUND(AVG(sppu3)*0.02+AVG(sppu3)) FROM (SELECT * FROM average_table ORDER BY year DESC LIMIT 3) AS subquery'
//         );
        
        
        
//         console.log("Average Query Result:", averageQueryResult);
        
        
//         res.status(200).json({ message: 'Data saved successfully' });
//     } catch (error) {
//         console.error('Error saving data to the database', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         if (connection) {
//             connection.release(); // Release the connection in the finally block
//         }
//     }
// };

// const fetchAverage=async(req,res)=>{

// }

// module.exports = {
//     saveData,fetchAverage
// };


const express = require('express');
const { pool } = require("../config/database");

const app = express();
const port = 3000;

app.use(express.json());

const saveData = async (req, res) => {
    const { data } = req.body;
    console.log("in post");

    let connection; // Declare the connection outside the try block

    try {
        connection = await pool.getConnection();

        for (const row of data) {
            const ut1Value = row.ut1 !== null ? row.ut1 : 0;
            const sppu1Value = row.sppu1 !== null ? row.sppu1 : 0;
            const ut2Value = row.ut2 !== null ? row.ut2 : 0;
            const sppu2Value = row.sppu2 !== null ? row.sppu2 : 0;
            const ut3Value = row.ut3 !== null ? row.ut3 : 0;
            const sppu3Value = row.sppu3 !== null ? row.sppu3 : 0;

            // Insert or update individual rows
            const queryResult = await connection.query(
                'INSERT INTO average_table (year, ut1, sppu1, ut2, sppu2, ut3, sppu3) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ut1 = VALUES(ut1), sppu1 = VALUES(sppu1), ut2 = VALUES(ut2), sppu2 = VALUES(sppu2), ut3 = VALUES(ut3), sppu3 = VALUES(sppu3)',
                [row.year, ut1Value, sppu1Value, ut2Value, sppu2Value, ut3Value, sppu3Value]
            );

            // console.log("Query Result:", queryResult);
        }

        const averageQueryResult = await connection.query(
            'INSERT INTO average_table (year, ut1, sppu1, ut2, sppu2, ut3, sppu3) SELECT "average", LEAST(ROUND(AVG(ut1)*0.02+AVG(ut1)), 100), LEAST(ROUND(AVG(sppu1)*0.02+AVG(sppu1)), 100), LEAST(ROUND(AVG(ut2)*0.02+AVG(ut2)), 100), LEAST(ROUND(AVG(sppu2)*0.02+AVG(sppu2)), 100), LEAST(ROUND(AVG(ut3)*0.02+AVG(ut3)), 100), LEAST(ROUND(AVG(sppu3)*0.02+AVG(sppu3)), 100) FROM (SELECT * FROM average_table ORDER BY year DESC LIMIT 3) AS subquery'
        );
        

        // console.log("Average Query Result:", averageQueryResult);

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data to the database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) {
            connection.release(); // Release the connection in the finally block
        }
    }
};

const fetchAverage = async (req, res) => {
    let connection;

    try {
        connection = await pool.getConnection();

        // Select the last row from average_table
        const fetchResult = await connection.query(
            'SELECT * FROM average_table ORDER BY year DESC LIMIT 1'
        );

        const lastRow = fetchResult[0][0];
        console.log("Last Row:", lastRow);

        res.status(200).json({ lastRow });
    } catch (error) {
        console.error('Error fetching the last row from the database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};




module.exports = {
    saveData,
    fetchAverage
};
