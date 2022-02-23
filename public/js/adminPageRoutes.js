const express = require('express');
const oracledb = require('oracledb');
const { subscribe } = require('./basicTableRoutes');
oracledb.outFormat = oracledb.OBJECT ;
const adpageRouter = express.Router();

let connection = undefined;
async function dbQuery(query, params){
  if(connection===undefined){
    connection = await oracledb.getConnection({ user: "C##INSLIB", password: "PROJECT", connectionString: "127.0.0.1/orcl" });
  }
  try{
    let result = await connection.execute(query,params);
    return result.rows;
  }catch(error){
    console.log('error');
  }
}

adpageRouter.get('/admin_page/:child', async (req,res)=>{
    var info = req.params;
    let query;
    let query1;
    query = `SELECT * FROM ${info.child} `;
    const params = [];
    const result = await dbQuery(query,params);
    res.status(200).json(result);
    
});



module.exports = adpageRouter;