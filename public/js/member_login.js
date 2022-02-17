const express = require('express');
const router = express.Router();
const queryDB = require('./queryDBMS');

router.get('/',(req,res)=>{
    console.log("NOOOOOOOO");
    res.render('memberLogin.ejs');
})

// memberID exists(select member_id from member)
// router.post('/', async (req,res)=>{
//     let {user_id,password} = req.body;
//     const query = `SELECT MEMBER_ID, PASSWORD
//     FROM MEMBER
//     WHERE EXISTS
//     (
//       WHERE d.department_id 
//       = e.department_id);`
// })
module.exports = router;