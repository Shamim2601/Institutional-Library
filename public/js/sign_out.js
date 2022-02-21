const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');

router.get('/',(req,res)=>{
    console.log("---SIGN OUT GET REQUEST---");
    if(req.session.memberId){
        req.session.memberId = ""
        req.session.memberPassword = ""
        req.session.memberPhoneNumber = ""
        res.redirect('/member_login')
        return;
    }
    if(req.session.adminId){
        req.session.adminId = ""
        req.session.adminPassword = ""
        req.session.memberName = ""
        res.redirect('/admin_login')
        return;
    }
    res.redirect('/member_login')
})

module.exports = router;