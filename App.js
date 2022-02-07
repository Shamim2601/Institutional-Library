const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const express = require('express'); 
const router = express.Router();
const memtablerouter = require('./public/js/member_table');

var app = new express(); 
var port = 8080; 
app.use(express.json());
app.use(router);
app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(memtablerouter);

app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 