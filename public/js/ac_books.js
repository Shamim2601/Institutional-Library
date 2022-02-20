const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param, route } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log(`---ACADEMIC BOOKS GET REQUEST`)
    res.render('ac_books.ejs');
})
router.get('/searchTable',async (req,res)=>{
    console.log('LIKE FOR LIKE')
    let query = `SELECT BOOK.BOOK_ID, BOOK.BOOK_NAME, AUTHOR.AUTHOR_NAME, BOOK.PUBLISHER_NAME, BOOK.STATUS, BOOK.LANGUAGE, BOOK.YEAR, BOOK.EDITION, BOOK.NO_OF_PAGES,COVER_IMAGE
    FROM BOOK JOIN AUTHOR ON (BOOK.AUTHOR_ID = AUTHOR.AUTHOR_ID)
    WHERE AUTHOR.AUTHOR_ID = 'AH'`
    let book = '%' + req.session.bookName + '%'
    let author = '%' + req.session.author + '%';
    let params = [book,author]
    let result = await queryDB(query,[],false);
    res.status(200).json(result.rows);
})
router.post('/', async function (req,res){
    console.log('POST FOR FORM')
    console.log(req.body)
    req.session.bookName = req.body.bookName;
    req.session.author = req.body.author;
    res.redirect('/ac_books')
})
module.exports = router