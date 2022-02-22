const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param, route } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log('---OTHER BOOKS GET REQUEST---')
    
    // if(!req.session.memberId){
    //     res.redirect('/sign_out')
    //     return;
    // }

    let context = {
        otherBookRows : req.session.otherBookRows
    }
    req.session.otherBookRows = []
    res.render('other_books.ejs',context);
})

router.post('/searchTable',urlencodedParser, async function(req,res){
    console.log('---OTHER BOOKS SEARCH TABLE POST REQUEST---')
    console.log(req.body.otherBookEntry)
    // req.session.bookName = req.body.bookName;
    // req.session.author = req.body.author;
    let query,params,result;
    query = `SELECT BOOK.BOOK_ID, BOOK.BOOK_NAME, AUTHOR.AUTHOR_NAME, BOOK.PUBLISHER_NAME, BOOK.STATUS, BOOK.LANGUAGE, BOOK.YEAR, 
    BOOK.EDITION, BOOK.NO_OF_PAGES,COVER_IMAGE
    FROM BOOK 
    JOIN AUTHOR ON (BOOK.AUTHOR_ID = AUTHOR.AUTHOR_ID)
    JOIN BOOKLIST_OTHERS ON (BOOK.BOOK_ID = BOOKLIST_OTHERS.BOOK_ID)
    WHERE (BOOK.BOOK_NAME LIKE :1)
    OR (BOOK.STATUS LIKE :1)
    OR (AUTHOR.AUTHOR_NAME LIKE :1) 
    OR (AUTHOR.AUTHOR_ID LIKE :1)
    OR (BOOK.PUBLISHER_NAME LIKE :1)
    OR (BOOK.LANGUAGE LIKE :1)
    OR (BOOKLIST_OTHERS.CATEGORY LIKE :1)
    OR (BOOKLIST_OTHERS.GENRE LIKE :1)
    ORDER BY AUTHOR.AUTHOR_NAME`
    
    let otherBookEntry = '%'
    if(req.body.otherBookEntry){
        for(let i=0;i<req.body.otherBookEntry.length;i++){
            otherBookEntry += req.body.otherBookEntry[i] + '%';
        }
    }
    params = [otherBookEntry.toUpperCase()]
    try{
        result = await queryDB(query,params,false);
    }catch{
        res.redirect('/other_books');
        return;
    }
    req.session.otherBookRows = []
    for(let i=0;i<result.rows.length;i++){
        let myArray = {
            otherBookId : result.rows[i].BOOK_ID,
            otherBookName : result.rows[i].BOOK_NAME,
            otherBookAuthor : result.rows[i].AUTHOR_NAME,
            otherBookPublisher : result.rows[i].PUBLISHER_NAME,
            otherBookStatus : result.rows[i].STATUS,
            otherBookLanguage : result.rows[i].LANGUAGE,
            otherBookYear : result.rows[i].YEAR,
            otherBookEdition : result.rows[i].EDITION,
            otherBookNumOfPage : result.rows[i].NO_OF_PAGES,
            otherBookCoverImage : '<a href='+result.rows[i].COVER_IMAGE+'><img src="'+ result.rows[i].COVER_IMAGE +'" height ="70px" width = "70px"></a>'
        }
        req.session.otherBookRows.push(myArray);
    }
    res.redirect('/other_books')
})

module.exports = router;