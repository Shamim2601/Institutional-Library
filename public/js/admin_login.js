const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');

router.get('/',(req,res)=>{
    console.log("---ADMIN GET REQUEST---");
    let context = {
        adminId:"",
    }
    if(req.session.adminId){
        context.adminId = req.session.adminId;
    }

    res.render('admin_login.ejs',context);
})

router.post('/', async function(req,res){
    console.log(req.body);
    let query = `SELECT *
    FROM ADMIN
    WHERE ADMIN_ID = :1`
    let params = [req.body.adminId];
    let result = await queryDB(query,params,false);
    if(result.rows.length == 0){
        // res.send("No DATA FOUND");
        res.redirect('/admin_login');
    }
    else if(result.rows[0].ADMIN_PSW != req.body.adminPassword){
        req.session.adminId = req.body.adminId;
        console.log("Password dind't match")
        res.redirect('/admin_login')
    }
    else{
        console.log('successful')
        req.session.adminId = req.body.adminId;
        req.session.adminPassword = req.body.adminPassword;
        req.session.adminName = result.rows[0].NAME;
        res.redirect('/admin_page');
    }

})
module.exports = router;