require('dotenv').config();
const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param, route } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})
const nodemailer = require('nodemailer');
const { attachment } = require('express/lib/response');

router.get('/', (req,res)=>{
    console.log('---CONTACT US GET REQUEST---')
    let context = {
        contactUsErrorMessage : ""
    }
    if(req.session.contactUsErrorMessage){
        context.contactUsErrorMessage = req.session.contactUsErrorMessage;
    }
    req.session.contactUsErrorMessage = ""
    res.render('contactUs.ejs',context)
})


router.post('/',urlencodedParser,async function(req,res){
    console.log('---CONTACT US POST REQUEST---')
    console.log(req.body)
    req.session.contactUsErrorMessage = "Thank you! We will get in touch with you in no time InshaaAllah"
    let query = `INSERT INTO CONTACT_US (NAME, EMAIL, PHONE_NUMBER, MESSAGE) VALUES (:1,:2,:3,:4)`
    let params = [req.body.contactUsName,req.body.contactUsEmail,req.body.contactUsPhone,req.body.contactUsMessage]
    let result = await queryDB(query,params,false);

    //send email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    let mailOptions = {
        from: 'ihtemadul.csebuet71@gmail.com',
        to: 'asifihtemadulhaque@gmail.com',
        subject: 'Institutional Library',
        text: `Hi How are you?`
        // attachment:[
        //     {
        //         filename: 'meme.jpg',
        //         path: '../../meme.jpg'
        //     }
        // ]
    };
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log(`error occurs: ${err}`)
        }
        else{
            console.log('Email Sent!!!')
        }
    });
    res.redirect('/contactUs')
})

module.exports = router;