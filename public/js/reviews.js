const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const revtablerouter = express.Router();

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

revtablerouter.get("/Reviews.html/list", async (req,res)=>{
    const query = "SELECT RL.BOOK_ID, B.BOOK_NAME, RL.MEMBER_ID, RL.REVIEW_TEXT  FROM BOOK B JOIN REVIEW_LIST RL ON (B.BOOK_ID=RL.BOOK_ID) ORDER BY RL.BOOK_ID";
    const params = [];
    const result = await dbQuery(query,params);
    res.status(200).json(result);
  });

  revtablerouter.get("/links.html/fill", async (req,res)=>{
    const query = "SELECT LINK_NAME,LINK_TEXT FROM LINKS ORDER BY LINK_NAME";
    const params = [];
    const result = await dbQuery(query,params);
    res.status(200).json(result);
  });

module.exports = revtablerouter;