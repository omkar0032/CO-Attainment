// const express=require("express");
const {dropdownPool}=require("../config/database")

 async function handleGetPattern(req,res){
    try{
        let sqlQuery=`SELECT DISTINCT Pattern FROM year_wise_pattern`;
        const result=await dropdownPool.query(sqlQuery);
        if(result.length===0){
            res.status(400).send({message:"Not found"});
        }
        // console.log(result[0]);
        res.send(result[0]);

    }catch(error){
        res.status(500).send({error:"Internal server Error."});
    }
 };

 async function handleGetAcadamicYear(req,res){
    try{
        const {pattern} = req.params; 
        let sqlQuery = `SELECT DISTINCT Acadamic_Year FROM year_wise_pattern WHERE Pattern = ?`; 
        const result = await dropdownPool.query(sqlQuery, [pattern]); 
        if (result.length === 0) {
            res.status(404).send({ message: "Not found" }); 
        } else {
            res.send(result[0]);
        }       
    }catch(error){
        res.status(500).send({error:"Internal server Error."});
    }
 };

 async function handleGetDepartment(req,res){
    try{
        let sqlQuery=`SELECT DISTINCT Department FROM department_and_year_wise_division`;
        const result=await dropdownPool.query(sqlQuery);
        if(result.length===0){
            res.status(400).send({message:"Not found"});
        }
        // console.log(result[0]);
        res.send(result[0]);
    }catch(error){
        res.status(500).send({error:"Internal server Error."});
    }
 };

 async function handleGetDivision(req,res){
    try{
        const[department,year]=(req.params.name).split("_");
        let sqlQuery=`SELECT DISTINCT Division FROM department_and_year_wise_division WHERE Department = ? AND Degree_Year = ?`;
        const result=await dropdownPool.query(sqlQuery,[department,year]);
        if(result.length===0){
            res.status(400).send({message:"Not found"});
        }
        // console.log(result[0]);
        res.send(result[0]);
    }catch(error){
        res.status(500).send({error:"Internal server Error."});
    }
 };

 async function handleGetSubject(req,res){
    try{
        const {name}=req.params;
        let sqlQuery=`SELECT  Subject_Name FROM subject_table WHERE Name_Till_Sem = ?`;
        const result=await dropdownPool.query(sqlQuery,[name]);
        if(result.length===0){
            res.status(400).send({message:"Not found"});
        }
        // console.log(result[0]);
        res.send(result[0]);
    }catch(error){
        res.status(500).send({error:"Internal server Error."});
    }
 };

 module.exports={handleGetPattern,handleGetAcadamicYear,handleGetDepartment,handleGetDivision,handleGetSubject}