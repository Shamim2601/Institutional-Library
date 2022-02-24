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
    if(info.child=='MEMBER'){
      query1 = `DECLARE
                DAYS NUMBER(10);
                BEGIN
                FOR R IN (SELECT ISSUE_LIST.ISSUE_DATE, MEMBER.FINE, MEMBER.MEMBER_ID FROM ISSUE_LIST JOIN MEMBER ON ISSUE_LIST.MEMBER_ID = MEMBER.MEMBER_ID)
                LOOP
                SELECT TRUNC(SYSDATE - R.ISSUE_DATE) INTO DAYS
                FROM DUAL;
                IF(DAYS >14) THEN
                  UPDATE MEMBER SET FINE = FINE+ (DAYS - 14) * 5
                  WHERE MEMBER_ID = R.MEMBER_ID;
                END IF;
                END LOOP;
                END;`
    }
    query = `SELECT * FROM ${info.child} `;
    const params = [];
    const result1 = await dbQuery(query1,params); //updates the fine column of member table
    const result = await dbQuery(query,params);
    res.status(200).json(result);
    
});



module.exports = adpageRouter;