const bodyParser = require('body-parser');
const express = require('express');
const { param } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log(req.query);
    console.log(`REALLY!???? ${req.session.memberName}`);
    let credentials = {
        memberId: req.session.memberId,
        memberName: req.session.memberName
    }
    console.log(credentials.memberId);
    res.render('member_page.ejs',credentials);
})

router.post('/',urlencodedParser,async function(req,res){
    console.log(req.body);

    if(req.body.reviewBookId != undefined){

        let query = `SELECT *
        FROM BOOK
        WHERE BOOK_ID = :1`
        let params = [req.body.reviewBookId]
        let result = await queryDB(query,params,false);
        if(result.rows.length == 0){
             console.log('Sorry! Wrong Book ID. Try Again!');//it will be an alert
        }  
        else{
            query = `SELECT *
            FROM REVIEW_LIST
            WHERE MEMBER_ID = :1 AND BOOK_ID = :2`
            params = [req.session.memberId,req.body.reviewBookId]
            let result = await queryDB(query,params,false);
            if(result.rows.length == 0){//new insert
                query = `INSERT INTO REVIEW_LIST (MEMBER_ID,BOOK_ID,REVIEW_TEXT) VALUES (:1, :2, :3)`
                params = [req.session.memberId,req.body.reviewBookId,req.body.reviewText]
                result = await queryDB(query,params,true);
                console.log("successful");
            }
            else{//update the reiviw only
                query = `UPDATE REVIEW_LIST
                SET REVIEW_TEXT = :1
                WHERE MEMBER_ID = :2 AND BOOK_ID = :3`
                params = [req.body.reviewText,req.session.memberId,req.body.reviewBookId]
                result = await queryDB(query,params,true);
                console.log("Thik e dhukse")
            }
        }
    }

    if(req.body.favBookId != undefined){
        let query = `SELECT COUNT(*) PRESENT
        FROM BOOK
        WHERE BOOK_ID = :1`
        let params = [req.body.favBookId]
        let result = await queryDB(query,params,false);
        // console.log(`I am gonna say ${result.rows[0].PRESENT}`);
        if(result.rows[0].PRESENT == 0){
            console.log("Sorry! No Book Found!");
        }
        else{
            query = `SELECT COUNT(*) PRESENT
            FROM FAV_LIST
            WHERE MEMBER_ID = :1 AND BOOK_ID = :2`
            params = [req.session.memberId,req.body.favBookId]
            result = await queryDB(query,params,false);
            if(result.rows[0].PRESENT == 0){
                query = `INSERT INTO FAV_LIST (MEMBER_ID, BOOK_ID) VALUES (:1, :2)`
                params = [req.session.memberId,req.body.favBookId]
                result = await queryDB(query,params,true);
            }
        }
    }

    // console.log(`This is review ID ->${req.body.reviewBookId}99`)
    // console.log(`This is fav ID ->${req.body.favBookId}99`)
    
    res.redirect('/member_page');

})
module.exports = router;
