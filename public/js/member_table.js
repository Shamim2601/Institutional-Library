const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const memtablerouter = express.Router();

let connection = undefined;
async function dbQuery(query, params){
  if(connection===undefined){
    connection = await oracledb.getConnection({ user: "C##INSLIB", password: "PROJECT", connectionString: "localhost/orcl" });
  }
  try{
    let result = await connection.execute(query,params);
    return result.rows;
  }catch(error){
    console.log(error);
  }
}

memtablerouter.get("/members.html/bg", async (req,res)=>{
    const query = "SELECT MEMBER_ID, MEMBER_NAME, TYPE, EMAIL, PHONE_NUMBER, BLOOD_GROUP FROM MEMBER ORDER BY BLOOD_GROUP";
    const params = [];
    const result = await dbQuery(query,params);
    res.status(200).json(result);
  });

  memtablerouter.get("/members.html/id", async (req,res)=>{
    const query = "SELECT MEMBER_ID, MEMBER_NAME, TYPE, EMAIL, PHONE_NUMBER, BLOOD_GROUP FROM MEMBER ORDER BY MEMBER_ID";
    const params = [];
    const result = await dbQuery(query,params);
    res.status(200).json(result);
  });

module.exports = memtablerouter;