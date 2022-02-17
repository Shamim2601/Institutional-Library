const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');


router.get('/',(req,res)=>{
    console.log('OYYYYYY');
    res.render('sign_up.ejs');
})

router.post("/",async function(req,res){
    let {name,type,department,id,dob,address,email,phone,blood_group,residence,designation,password} = req.body;
    console.log(req.body);
    let query = `INSERT INTO APPLICANT (NAME,TYPE,DEPT,ID,DATE_OF_BIRTH,ADDRESS,EMAIL,PHONE_NUMBER,BLOOD_GROUP,RESIDENCE,DESIGNATION,PASSWORD) VALUES
     (:1, :2, :3, :4, :5, :6, :7, :8, :9,:10, :11, :12)`
    let params = [name,type,department,id,dob,address,email,phone,blood_group,residence,designation,password]
    let result = await queryDB(query,params,true);
    res.redirect('/');
    
    
    // query = `SELECT * FROM APPLICANT WHERE PHONE_NUMBER =:1`
    // params = [phone]
    // result = await queryDB(query,params,false);
    // console.log(result.rows);
})

module.exports = router; 