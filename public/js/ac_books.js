const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param, route } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log(`---ACADEMIC BOOKS GET REQUEST---`)

    // if(!req.session.memberId){
    //     res.redirect('/sign_out')
    //     return;
    // }

    let context = {
        bookRows : req.session.bookRows
    }
    req.session.bookRows = []
    res.render('ac_books.ejs',context);
})

router.post('/searchTable', urlencodedParser,async function (req,res){
    console.log('---ACADEMIC BOOKS SEARCH TABLE POST REQUEST---')
    console.log(req.body.bookName + " + " + req.body.author)
    // req.session.bookName = req.body.bookName;
    // req.session.author = req.body.author;

    let query = `SELECT BOOK.BOOK_ID, BOOK.BOOK_NAME, AUTHOR.AUTHOR_NAME, BOOK.PUBLISHER_NAME, BOOK.STATUS, BOOK.LANGUAGE, BOOK.YEAR, 
    BOOK.EDITION, BOOK.NO_OF_PAGES,COVER_IMAGE
    FROM BOOK JOIN AUTHOR ON (BOOK.AUTHOR_ID = AUTHOR.AUTHOR_ID)
    WHERE (BOOK.BOOK_NAME IS NOT NULL AND BOOK.BOOK_NAME LIKE :1) AND 
    ((AUTHOR.AUTHOR_NAME IS NOT NULL AND AUTHOR.AUTHOR_NAME LIKE :2) OR (AUTHOR.AUTHOR_ID LIKE :3))
    ORDER BY AUTHOR.AUTHOR_NAME`

    let bookName = '%'
    if(req.body.bookName){
        for(let i=0;i<req.body.bookName.length;i++){
            bookName += req.body.bookName[i] + '%';
        }
    }
    let bookAuthor = '%'
    if(req.body.author){
        for(let i=0;i<req.body.author.length;i++){
            bookAuthor += req.body.author[i] + '%';
        }
    }
    let params = [bookName.toUpperCase(),bookAuthor.toUpperCase(),bookAuthor.toUpperCase()]
    
    let result = await queryDB(query,params,false);
    if(!result){
        res.redirect('/ac_books')
        return;
    }
    req.session.bookRows = []
    for(let i=0;i<result.rows.length;i++){
        let myArray = {
            bookId : result.rows[i].BOOK_ID,
            bookName : result.rows[i].BOOK_NAME,
            bookAuthor : result.rows[i].AUTHOR_NAME,
            bookPublisher : result.rows[i].PUBLISHER_NAME,
            bookStatus : result.rows[i].STATUS,
            bookLanguage : result.rows[i].LANGUAGE,
            bookYear : result.rows[i].YEAR,
            bookEdition : result.rows[i].EDITION,
            bookNumOfPage : result.rows[i].NO_OF_PAGES,
            bookCoverImage : '<a href='+result.rows[i].COVER_IMAGE+'><img src="'+ result.rows[i].COVER_IMAGE +'" height ="70px" width = "70px"></a>'
        }
        req.session.bookRows.push(myArray);
    }
    res.redirect('/ac_books')
})


module.exports = router