const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const express = require('express'); 
const tablerouter = require('./public/js/basicTableRoutes');

var app = new express(); 
var port = 8080; 
app.use(express.json());
app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(tablerouter);

app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 