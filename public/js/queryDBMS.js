const oracledb = require('oracledb');
const cns = { 
    user: "C##INSLIB", 
    password: "PROJECT", 
    connectionString: "127.0.0.1/orcl"
}
async function queryDB(sql,params,autoCommit){
    let connection;
    try{
        connection = await oracledb.getConnection(cns);
        let result = await connection.execute(sql,params,{autoCommit: autoCommit});
        await connection.close();
        return result;
    } catch(err){
        console.log(err);
    }
}

module.exports = queryDB;