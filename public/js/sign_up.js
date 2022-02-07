const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('sign_up.ejs');
})

router.post("/",(req,res)=>{
    console.log(req.body.name)
})

module.exports = router; 