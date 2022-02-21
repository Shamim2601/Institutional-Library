const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');
router.get('/',async(req,res)=>{
    console.log("---MEMBER LOGIN GET REQUEST---");
    let context = {
        phoneNumber:""
    }
    if(req.session.phoneNumber){
        context.phoneNumber = req.session.memberPhoneNumber;
    }

    res.render('member_login.ejs',context);
})

router.post('/', async (req,res)=>{
    console.log(req.body);
    const query = `SELECT *
    FROM MEMBER 
    WHERE PHONE_NUMBER = :1`
    // let  params = [req.body.phoneNumber];
    let params = [req.body.phoneNumber]
    let result = await queryDB(query,params,false);
    if(result.rows.length == 0){
        // res.send('No Data found! try again!');
        res.redirect('/member_login')
    }
    else if(result.rows[0].PASSWORD != req.body.password){
        req.session.memberPhoneNumber = req.body.phoneNumber;
        res.redirect('/member_login')
        
        // phoneNumber.innerHTML = req.body.phoneNumber;
    }
    else{
        req.session.memberPhoneNumber = req.body.phoneNumber;
        req.session.memberId = result.rows[0].MEMBER_ID;
        req.session.memberName = result.rows[0].MEMBER_NAME;
        req.session.adminId = ""
        res.redirect('/member_page');
    }
    // console.log(result.rows)

    // console.log(result.rows.length);
    // console.log(result.rows[1].PHONE_NUMBER);
})
module.exports = router;