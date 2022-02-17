const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const express = require('express');
const cors = require('cors');
const router = express.Router(); 
const tablerouter = require('./public/js/basicTableRoutes');
const bookRouter = require('./public/js/bookRoutes');
const queryDB = require('./public/js/queryDBMS');

var app = new express(); 
var port = 8080; 

app.set('view-engine','ejs');
app.use(express.json());
app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(express.urlencoded({extended: true}))
app.use(tablerouter);
app.use(bookRouter);
app.use(router);

const signUpRouter = require('./public/js/sign_up');
const { json } = require('express');
app.use("/sign_up",signUpRouter);

app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 