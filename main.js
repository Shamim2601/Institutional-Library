const oracledb = require('oracledb');
var http = require('http');
var url  = require('url');

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "C##INSLIB", password: "PROJECT", connectionString: "localhost/orcl" });

    console.log("Successfully connected to Oracle Database");

    // Insert some data

    const sql = `insert into ADMIN (ADMIN_ID, ADMIN_PSW, NAME, EMAIL, PHONE_NUMBER) values(:1, :2, :3, :4, :5)`;

    const rows =
      [[05, 50604, "MAMUN", "shamim2601@gmail.com", '017*******']];

    let result = await connection.executeMany(sql, rows);

    console.log(result.rowsAffected, "Rows Inserted");

    connection.commit();

    // Now query the rows 
    
    result = await connection.execute(
      `select ADMIN_ID, NAME, EMAIL, PHONE_NUMBER from ADMIN order by ADMIN_ID`,
      [],
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

    const rs = result.resultSet;
    let row;

    console.log("ID"," ","NAME"," ","EMAIL"," ","PHONE")
    while ((row = await rs.getRow())) {
      console.log(row.ADMIN_ID, " ", row.NAME, " ", row.EMAIL, " ", row.PHONE_NUMBER);
    }

    await rs.close();

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();