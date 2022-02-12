const express = require('express');
const oracledb = require('oracledb');
const { subscribe } = require('./basicTableRoutes');
oracledb.outFormat = oracledb.OBJECT ;
const bookRouter = express.Router();

let connection = undefined;
async function dbQuery(query, params){
  if(connection===undefined){
    connection = await oracledb.getConnection({ user: "C##INSLIB", password: "PROJECT", connectionString: "localhost/orcl" });
  }
  try{
    let result = await connection.execute(query,params);
    return result.rows;
  }catch(error){
    console.log(error);
  }
}

bookRouter.get('/:parent/:child/:grandchild', async (req,res)=>{
    var info = req.params;
    var query;
    if(info.parent == 'ac_books.html'){
       query = `SELECT B.BOOK_ID, B.BOOK_NAME, A.AUTHOR_NAME, B.PUBLISHER_NAME, B.STATUS, B.LANGUAGE, B.YEAR, B.EDITION, B.NO_OF_PAGES, B.COVER_IMAGE FROM BOOKLIST_ACADEMIC AC JOIN BOOK B ON (AC.BOOK_ID = B.BOOK_ID) JOIN AUTHOR A ON (A.AUTHOR_ID = B.AUTHOR_ID) WHERE UPPER(AC.DEPARTMENT) LIKE '%${info.child}%' AND UPPER(AC.SUBJECT) LIKE '%${info.grandchild}%' ORDER BY A.AUTHOR_NAME`;
    }
    if(info.parent == 'other_books.html'){
      query = `SELECT B.BOOK_ID, B.BOOK_NAME, A.AUTHOR_NAME, B.PUBLISHER_NAME, B.STATUS, B.LANGUAGE, B.YEAR, B.EDITION, B.NO_OF_PAGES, B.COVER_IMAGE FROM BOOKLIST_OTHERS OT JOIN BOOK B ON (OT.BOOK_ID = B.BOOK_ID) JOIN AUTHOR A ON (A.AUTHOR_ID = B.AUTHOR_ID) WHERE UPPER(OT.CATEGORY) LIKE '%${info.child}%' AND UPPER(OT.GENRE) LIKE '%${info.grandchild}%' ORDER BY A.AUTHOR_NAME`;
   }
    const params = [];
    const result = await dbQuery(query,params);
    res.status(200).json(result);
    
});

bookRouter.get('/new_arrivals.html/fill', async (req,res)=>{
  const query = "SELECT B.BOOK_ID, B.BOOK_NAME, A.AUTHOR_NAME, B.PUBLISHER_NAME, B.STATUS, B.BOOK_TYPE, B.LANGUAGE, B.YEAR, B.EDITION, B.COVER_IMAGE"+
                " FROM BOOK B JOIN AUTHOR A ON (A.AUTHOR_ID = B.AUTHOR_ID) WHERE ((SYSDATE-B.DATE_OF_ARRIVAL)/30)<=1 ORDER BY A.AUTHOR_NAME";
  const params = [];
  const result = await dbQuery(query,params);
  res.status(200).json(result);
})

module.exports = bookRouter;