const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const express = require('express');
const cors = require('cors');
const router = express.Router(); 
const tablerouter = require('./public/js/basicTableRoutes');
const bookRouter = require('./public/js/bookRoutes');
const queryDB = require('./public/js/queryDBMS');
const { json } = require('express');
const session = require('express-session')

var app = new express(); 
var port = 8080; 

app.set('view-engine','ejs');
app.use(express.json());
app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(express.urlencoded({extended: false}))
app.use(tablerouter);
app.use(bookRouter);
app.use(router);
app.use(session({secret:"secretKey"}));

const signUpRouter = require('./public/js/sign_up');
app.use("/sign_up",signUpRouter);

const loginRouter = require('./public/js/member_login');
app.use("/member_login",loginRouter);

const memberPageRouter = require('./public/js/member_page');
app.use("/member_page",memberPageRouter);

const suggestionRouter = require('./public/js/suggestion');
app.use("/suggestion",suggestionRouter);

app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 