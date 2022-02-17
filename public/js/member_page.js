const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');

router.get('/',(req,res)=>{
    console.log("Bhai re Bhai");
    res.render('member_page.ejs');
})

// const reviewSubmitBtn = document.querySelector("#reviewSubmitBtn");
// reviewSubmitBtn.addEventListener('click',e =>{
//     console.log('shut up');

// })
// router.post('/',)
module.exports = router;
