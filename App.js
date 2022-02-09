const express = require('express'); 
const router = express.Router(); //require('express-promise-router');
const cors = require('cors');
const app = express(); 
const queryDB = require('./public/js/queryDBMS');
var port = 8080; 

app.set('view-engine','ejs');

// let connection = undefined;
// async function dbQuery(query){
//   if(connection===undefined){
//     connection = await oracledb.getConnection({ user: "C##INSLIB", password: "PROJECT", connectionString: "127.0.0.1/orcl" });
    
//   }
//   try{
//     let result = await connection.execute(query);
//     // let r = json(result.rows);
//     console.log(`korse to`);
//     return result.rows;
//   }catch(err){
//     console.log(`neo tmr ${err}`);
//     return err;
//   }finally{
//     if(connection){
//       try{
//         await connection.close();
//       }catch(err){
//         console.log(`abar khaiso dhora ${err}`);
//         return err;
//       }
//     }
//   }
// }

router.get("/members.html", async function(req,res,next){
  // const query = "SELECT MEMBER_ID, MEMBER_NAME, TYPE, EMAIL, PHONE_NUMBER FROM MEMBER";
  const query = `SELECT * FROM APPLICANT`;
  const params = [];
  const result = await queryDB(query,params,false);
  // res.json(JSON.parse(result.rows));
  
  console.log(result.rows);
  res.status(200).json(result.rows);
});

app.use(express.json());
app.use(router);
app.use(cors());
app.options('*',cors());
app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(express.urlencoded({extended: true}))


const signUpRouter = require('./public/js/sign_up');
const { json } = require('express');
app.use("/sign_up",signUpRouter);

// app.get('/',(req,res)=>{
// })

app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 