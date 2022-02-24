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
    let query,params,result;
    try{
        query = `SELECT COUNT(*) CNT
        FROM MEMBER 
        WHERE PHONE_NUMBER = :1`
        params = [req.body.phoneNumber]
        result = await queryDB(query,params,false);
    }catch{
        console.log('wrong catch!');
        res.redirect('/member_login');
        return;
    }
    if(result.rows[0].CNT == 0){
        console.log('wrong phone!');
        res.redirect('/member_login')
    }
    else{
        query = `SELECT *
        FROM MEMBER 
        WHERE PHONE_NUMBER = :1`
        params = [req.body.phoneNumber]
        result = await queryDB(query,params,false);
        if(result.rows[0].PASSWORD != req.body.password){
            console.log(`wrong pw! right-> ${result.rows[0].PASSWORD}`);
            req.session.memberPhoneNumber = req.body.phoneNumber;
            res.redirect('/member_login')
        }
        else{
            console.log('right!');
            req.session.memberPhoneNumber = req.body.phoneNumber;
            req.session.memberId = result.rows[0].MEMBER_ID;
            req.session.memberName = result.rows[0].MEMBER_NAME;
            req.session.adminId = ""
            res.redirect('/member_page');
        }
    }
})
module.exports = router;