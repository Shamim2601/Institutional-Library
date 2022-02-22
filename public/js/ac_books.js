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
    console.log(req.body.entry)
    // req.session.bookName = req.body.bookName;
    // req.session.author = req.body.author;
    let query,params,result;
    query = `SELECT BOOK.BOOK_ID, BOOK.BOOK_NAME, AUTHOR.AUTHOR_NAME, BOOK.PUBLISHER_NAME, BOOK.STATUS, BOOK.LANGUAGE, BOOK.YEAR,
    BOOK.EDITION, BOOK.NO_OF_PAGES,COVER_IMAGE
    FROM BOOK
    JOIN AUTHOR ON (BOOK.AUTHOR_ID = AUTHOR.AUTHOR_ID)
    JOIN BOOKLIST_ACADEMIC ON (BOOK.BOOK_ID = BOOKLIST_ACADEMIC.BOOK_ID)
    WHERE (BOOK.BOOK_NAME LIKE :1)
    OR (BOOK.STATUS LIKE :1)
    OR (AUTHOR.AUTHOR_NAME LIKE :1)
    OR (AUTHOR.AUTHOR_ID LIKE :1)
    OR (BOOK.PUBLISHER_NAME LIKE :1)
    OR (BOOK.LANGUAGE LIKE :1)
    OR (BOOKLIST_ACADEMIC.SUBJECT LIKE :1)
    OR (BOOKLIST_ACADEMIC.TOPIC LIKE :1)
    OR (BOOKLIST_ACADEMIC.DEPARTMENT LIKE :1)
    ORDER BY AUTHOR.AUTHOR_NAME`

    let entry = '%'
    if(req.body.entry){
        for(let i=0;i<req.body.entry.length;i++){
            entry += req.body.entry[i] + '%';
        }
    }
    params = [entry.toUpperCase()]
    try{
        result = await queryDB(query,params,false);
    }catch{
        res.redirect('/ac_books');
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