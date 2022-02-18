const bodyParser = require('body-parser');
const express = require('express');
const { param } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log("SUGGESTION");
    console.log(req.query.suggestionId);
    res.render('suggestion.ejs');
})

router.post('/',urlencodedParser, async function(req,res,next){
    console.log(req.body);
    if(req.body.memberId != req.session.memberId){
        console.log(`Sorry ! wrong member id try again`);
        res.redirect('/suggestion')
    }
    else{
        let query = `SELECT MEMBER_NAME
        FROM MEMBER
        WHERE MEMBER_ID = :1`
        let params = [req.body.memberId]
        let result = await queryDB(query,params,false);
        let name = req.body.memberName.toLowerCase();
        // console.log(`${result.rows[0].MMNAME}  == ${name}`)
        if(name != result.rows[0].MEMBER_NAME.toLowerCase()){
            console.log(`Sorry ! wrong name try again`);
            res.redirect('/suggestion')
        }
        else{
            query = `INSERT INTO SUGG_LIST (MEMBER_ID, NAME, MESSAGE) VALUES (:1,:2,:3)`
            params = [req.body.memberId,result.rows[0].MEMBER_NAME,req.body.message]
            result = await queryDB(query,params,true);
            res.redirect('/member_page');
        }
    }
})
module.exports = router;