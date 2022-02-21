const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT ;
const express = require('express');
const cors = require('cors');
const router = express.Router(); 
const tablerouter = require('./public/js/basicTableRoutes');
const bookRouter = require('./public/js/bookRoutes');
const { json } = require('express');
const session = require('express-session')

var app = new express(); 
var port = 8080; 

app.set('view-engine','ejs'); 
app.use(express.json());
//app.use(express.static('public'));   
app.use(express.static('src/html'));
app.use(express.urlencoded({extended: false}))
app.use(tablerouter);
app.use(bookRouter);
app.use(router);
app.use(session({secret:"secretKey"}));

const signUpRouter = require('./public/js/sign_up');
app.use("/sign_up",signUpRouter);

const memberLoginRouter = require('./public/js/member_login');
app.use("/member_login",memberLoginRouter);

const memberPageRouter = require('./public/js/member_page');
app.use("/member_page",memberPageRouter);

const suggestionRouter = require('./public/js/suggestion');
app.use("/suggestion",suggestionRouter);

const adminLoginRouter = require('./public/js/admin_login');
app.use('/admin_login',adminLoginRouter);

const adminPageRouter = require('./public/js/admin_page');
app.use('/admin_page',adminPageRouter);

const acBooksRouter = require('./public/js/ac_books');
app.use('/ac_books',acBooksRouter)

const otherBooksRouter = require('./public/js/other_books');
app.use('/other_books',otherBooksRouter)

const contactUsRouter = require('./public/js/contactUs')
app.use('/contactUs',contactUsRouter)

const signOutRouter = require('./public/js/sign_out')
app.use('/sign_out',signOutRouter)

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 