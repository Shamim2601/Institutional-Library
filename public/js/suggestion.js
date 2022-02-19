const bodyParser = require('body-parser');
const express = require('express');
const { param } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
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
        query = `INSERT INTO SUGG_LIST (MEMBER_ID, MESSAGE) VALUES (:1,:2)`
        params = [req.body.memberId, req.body.message]
        result = await queryDB(query,params,true);
        res.redirect('/member_page');           
    }
})
module.exports = router;