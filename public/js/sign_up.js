const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');


router.get('/',(req,res)=>{
    console.log("YESSSS");
    res.render('sign_up.ejs');
})

router.post("/",async function(req,res){
    let {name,designation,department,id,dob,address,email,phone,blood_group,residence,password} = req.body;
    let user_id = Date.now().toString();
    const query = `INSERT INTO APPLICANT (NAME,DESIGNATION,DEPT,ID,DATE_OF_BIRTH,ADDRESS,EMAIL,PHONE_NUMBER,BLOOD_GROUP,RESIDENCE,PASSWORD,USER_ID) VALUES
     (:1, :2, :3, :4, :5, :6, :7, :8, :9,:10, :11, :12)`
     // const query = `INSERT INTO APPLICANT VALUES('esse','EsE','TEACHER','18343', '11-feb-98','DHAKA','A@A',12345678911,'B+','DHAKA','111a')`
    let params = [name,designation,department,id.toString(),dob,address,email,phone,blood_group,residence,password]
    let result = await queryDB(query,[name,designation,department,id.toString(),dob,address,email,phone,blood_group,residence,password,user_id],true);
    // console.log(result);
    
    // res.status(200).json(result);
    // console.log(`${req.body.name},${req.body.designation},${req.body.department}, ${req.body.id},${req.body.dob}, ${req.body.address}, ${req.body.email},${req.body.phone},${req.body.blood_group},${req.body.residence}, ${req.body.password}`);

    // res.redirect('https://www.google.com')
    res.redirect('/');
    
})

module.exports = router; 