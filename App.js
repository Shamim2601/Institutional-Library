const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const express = require('express'); 
const router = express.Router(); //require('express-promise-router');
const cors = require('cors');
const app = express(); 
var port = 8080; 

app.set('view-engine','ejs');

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

router.get("/members.html", async function(req,res,next){
  const query = "SELECT MEMBER_ID, MEMBER_NAME, TYPE, EMAIL, PHONE_NUMBER FROM MEMBER";
  const params = [];
  const result = await dbQuery(query,params);
  res.status(200).json(result);
});

app.use(express.json());
app.use(router);
app.use(cors());
app.options('*',cors());
app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(express.urlencoded({extended: true}))


const signUpRouter = require('./public/js/sign_up');
app.use("/sign_up",signUpRouter);


app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 