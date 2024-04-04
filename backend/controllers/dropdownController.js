// const express=require("express");
const { dropdownPool } = require("../config/database")

async function handleGetPattern(req, res) {
    try {
        let sqlQuery = `SELECT DISTINCT Pattern FROM year_wise_pattern`;
        const result = await dropdownPool.query(sqlQuery);
        if (result.length === 0) {
            res.status(400).send({ message: "Not found" });
        }
        // console.log(result[0]);
        res.send(result[0]);

    } catch (error) {
        res.status(500).send({ error: "Internal server Error." });
    }
};

async function handleGetAcadamicYear(req, res) {
    try {
        const { pattern } = req.params;
        let sqlQuery = `SELECT DISTINCT Academic_Year FROM year_wise_pattern WHERE Pattern = ?`;
        const result = await dropdownPool.query(sqlQuery, [pattern]);
        if (result.length === 0) {
            res.status(404).send({ message: "Not found" });
        } else {
            res.send(result[0]);
        }
    } catch (error) {
        res.status(500).send({ error: "Internal server Error." });
    }
};

async function handleGetDepartment(req, res) {
    try {
        let sqlQuery = `SELECT DISTINCT Department FROM department_and_year_wise_division`;
        const result = await dropdownPool.query(sqlQuery);
        if (result.length === 0) {
            res.status(400).send({ message: "Not found" });
        }
        // console.log(result[0]);
        res.send(result[0]);
    } catch (error) {
        res.status(500).send({ error: "Internal server Error." });
    }
};

async function handleGetDivision(req, res) {
    try {
        const [department, year] = (req.params.name).split("_");
        let sqlQuery = `SELECT DISTINCT Division FROM department_and_year_wise_division WHERE Department = ? AND Degree_Year = ?`;
        const result = await dropdownPool.query(sqlQuery, [department, year]);
        if (result.length === 0) {
            res.status(400).send({ message: "Not found" });
        }
        // console.log(result[0]);
        res.send(result[0]);
    } catch (error) {
        res.status(500).send({ error: "Internal server Error." });
    }
};

async function handleGetSubject(req, res) {
    try {
        const { name } = req.params;
        let sqlQuery = `SELECT  Subject_Name FROM subject_table WHERE Name_Till_Sem = ?`;
        const result = await dropdownPool.query(sqlQuery, [name]);
        if (result.length === 0) {
            res.status(400).send({ message: "Not found" });
        }
        // console.log(result[0]);
        res.send(result[0]);
    } catch (error) {
        res.status(500).send({ error: "Internal server Error." });
    }
};

const fetchPatternAndYear = async (req, res) => {
    try {
        const sql = 'SELECT * FROM year_wise_pattern';
        const results = await dropdownPool.query(sql);
        if (results) {
            res.status(200).send(results[0])
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const deletePatternAndYear = async (req, res) => {
    try {
        const { PYear, AYear } = req.params;
        const query = `DELETE FROM year_wise_pattern WHERE Pattern='${PYear}' AND Academic_Year='${AYear}'`;
        const result = await dropdownPool.query(query);

        if (result[0].affectedRows == 1) {
            res.sendStatus(200); // Send a success response if deletion is successful
        }
        else if (result[0].affectedRows == 0) {
            res.status(500).send("Internal Server Error")
        }

    } catch (error) {
        console.error('Error deleting pattern and academic year:', error);
        res.status(500).send('Internal Server Error'); // Send a 500 error response if an error occurs
    }
};

const insertPattern = async (req, res) => {
    const { PYear, AYear } = req.body;
    try {
        const sql = 'INSERT INTO year_wise_pattern (Pattern, Academic_Year) VALUES (?, ?)';
        const result = await dropdownPool.query(sql, [PYear, AYear]);
        res.status(200).send('Pattern saved successfully');
    } catch (error) {
        console.error('Error inserting pattern:', error);
        res.status(500).send('Error in saving pattern');
    }
}

const fetchSubjects = async (req, res) => {
    try {
        const { tableName } = req.params;
        const sql = `SELECT Subject_Name from subject_table where Name_Till_Sem='${tableName}'`;
        const result = await dropdownPool.query(sql);
        const subjectNames = result[0].map(subject => subject.Subject_Name);


        res.status(200).send(subjectNames);

    }

    catch (error) {
        console.log("Error occured", error)
    }

}


const deleteSubject = async (req, res) => {
    try {
        const { tableName, subject } = req.params;
        console.log(tableName, subject);
        const sql = `DELETE FROM subject_table where Name_Till_Sem='${tableName}' AND Subject_Name='${subject}'`;
        const result = await dropdownPool.query(sql);
        console.log(result);
        res.status(200).send("Deleted Successfully!")
    }
    catch (error) {
        console.log("Error occured: ", error);
    }
}

const addSubject = async (req, res) => {
    try {
        const { tableName, inputValue } = req.params;
        const sql = 'INSERT INTO subject_table (Name_Till_Sem, Subject_Name) VALUES (?, ?)';
        const result = await dropdownPool.query(sql, [tableName, inputValue]);
        res.status(200).send('Subject saved successfully');
    } catch (error) {
        console.error('Error inserting pattern:', error);
        res.status(500).send('Internal Server Error');
    }
}

const handleCoPoAttainment=async(req,res)=>{
    try{
        const { tableName } = req.params;
        // const {UA_CO_AT,}=req.body;
        // console.log(coValue)

         // Check if entry with Main_Table_Name exists
        const checkQuery = `SELECT * FROM co_po_attainment WHERE Main_Table_Name = '${tableName}'`;
        const checkResult = await dropdownPool.query(checkQuery);

        if (checkResult[0].length === 0) {
            // If Main_Table_Name entry doesn't exist, create it with default values
            const createQuery = `INSERT INTO co_po_attainment (Main_Table_Name,UA_CO_AT,UT_CO_attainment,\`Course Outcome\` ) VALUES ('${tableName}', 0, 0, 0)`;
            await dropdownPool.query(createQuery);
        }
        
        const UA_CO_AT=Number(req.body.UA_CO_AT);
        const UT_CO_attainment=Number(req.body.UT_CO_attainment);
        const Course_Outcome=Number(req.body.Course_Outcome);

        let sqlquery=`UPDATE co_po_attainment SET  UA_CO_AT= ?,UT_CO_attainment = ?,\`Course Outcome\` = ? WHERE Main_Table_Name = '${tableName}'`;

        await dropdownPool.query(sqlquery,[UA_CO_AT,UT_CO_attainment,Course_Outcome]);
        res.status(200).send({message:"posted successfully"});
    }catch(error){
        console.log("Error:",error);
        res.status(500).send({message:"enternal server error"});
    }
}
module.exports = { deletePatternAndYear, insertPattern, fetchPatternAndYear, handleGetPattern, handleGetAcadamicYear, handleGetDepartment, handleGetDivision, handleGetSubject, fetchSubjects, deleteSubject, addSubject,handleCoPoAttainment}