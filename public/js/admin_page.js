const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log(`--- ADMIN PAGE GET REQUEST---`);
    // console.log(req.query);
    let context = {
        adminId: req.session.adminId,
        adminName: req.session.adminName,
        newMemberErrorMessage: req.session.newMemberErrorMessage,
        newMemberMemberId : req.session.newMemberMemberId,
        newMemberName : req.session.newMemberName,
        newMemberEmail : req.session.newMemberEmail,
        newMemberPhone : req.session.newMemberPhone,
        newMemberBloodGroup : req.session.newMemberBloodGroup, 
        newMemberDob : req.session.newMemberDob,
        newMemberDepartment : req.session.newMemberDepartment,
        newMemberType : req.session.newMemberType,
        newMemberIssueLimit : req.session.newMemberIssueLimit,
        newMemberAddress : req.session.newMemberAddress, 
        newMemberId : req.session.newMemberId,
        newMemberDesignation : req.session.newMemberDesignation,
        newMemberResidence : req.session.newMemberResidence,
        newBookErrorMessage: "",
        newBookId : req.session.newBookId,
        newBookName : req.session.newBookName, 
        newBookAuthor: req.session.newBookAuthor, 
        newBookPublisher : req.session.newBookPublisher, 
        newBookCoverImg : req.session.newBookCoverImg,
        newBookStatus : req.session.newBookStatus,
        newBookArrivalDate : req.session.newBookArrivalDate, 
        newBookYearReleased : req.session.newBookYearReleased, 
        newBookEdition : req.session.newBookEdition,
        newBookLanguage : req.session.newBookLanguage, 
        newBookNumberOfPage : req.session.newBookNumberOfPage, 
        newBookDepartment : req.session.newBookDepartment, 
        newBookSubject : req.session.newBookSubject,
        newBookType : req.body.newBookType,
        newBookTopic: req.body.newBookTopic,
        newBookCategory : req.session.newBookCategory,
        newBookGenre : req.session.newBookGenre
    }
    res.render('admin_page.ejs',context);
})

router.post('/', async function(req,res){
    console.log(req.body);

    //member info
    if(req.body.newMemberMemberId != undefined){
        req.session.newMemberMemberId = req.body.newMemberMemberId;
        req.session.newMemberName = req.body.newMemberName
        req.session.newMemberEmail = req.body.newMemberEmail
        req.session.newMemberPhone = req.body.newMemberPhone
        req.session.newMemberBloodGroup = req.body.newMemberBloodGroup
        req.session.newMemberDob = req.body.newMemberDob
        req.session.newMemberDepartment = req.body.newMemberDepartment
        req.session.newMemberType = req.body.newMemberType
        req.session.newMemberIssueLimit = req.body.newMemberIssueLimit
        req.session.newMemberAddress = req.body.newMemberAddress
        req.session.newMemberId = req.body.newMemberId
        req.session.newMemberDesignation = req.body.newMemberDesignation
        req.session.newMemberResidence = req.body.newMemberResidence;

        let query = `SELECT COUNT(*) CNT
        FROM MEMBER
        WHERE MEMBER_ID = :1 OR PHONE_NUMBER = :2`
        let params = [req.body.newMemberMemberId,req.body.newMemberPhone]
        let result = await queryDB(query,params,false);
        if(result.rows[0].CNT > 0){
            req.session.newMemberErrorMessage = "Sorry! Phone Number or Member Id already exists!"
            req.session.newMemberMemberId = "";
            res.redirect('/admin_page')
        }
        else{
            query = `SELECT COUNT(*) CNT
            FROM MEMBER_STUDENT
            WHERE STUDENT_ID = :1`
            let query2 = `SELECT COUNT(*) CNT
            FROM MEMBER_TEACHER
            WHERE TEACHER_ID = :1`
            params = [req.body.newMemberId]
            let query3 = `SELECT COUNT(*) CNT
            FROM MEMBER_OTHERS
            WHERE DESIGNATION = :1 AND DEPT = :2 AND ADDRESS = :3`
            let params2 = [req.body.newMemberDesignation,req.body.newMemberDepartment,req.body.newMemberAddress]
            result = await queryDB(query,params,false)
            let result2 = await queryDB(query2,params,false);
            let result3 = await queryDB(query3,params2,false);
            if(result.rows[0].CNT > 0 || result2.rows[0].CNT > 0 || result3.rows[0].CNT > 0){
                req.session.newMemberErrorMessage = "Sorry! This Member is not unique! try again"
                res.redirect('/admin_page')
            }
            else{
                query = `INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD)
                VALUES (:1,:2,:3,:4,:5,:6,:7,:8)`
                params = [req.body.newMemberMemberId,req.body.newMemberName,req.body.newMemberEmail,req.body.newMemberPhone,req.body.newMemberBloodGroup,req.body.newMemberDob,req.session.adminId,req.body.newMemberPhone];
                result = await queryDB(query,params,true)
                if(req.body.newMemberType.toUpperCase() == "STUDENT"){
                    query = `INSERT INTO MEMBER_STUDENT (DEPT, STUDENT_ID, RESIDENCE, MEMBER_ID) VALUES (:1,:2,:3,:4)`
                    params = [req.body.newMemberDepartment,req.body.newMemberId,req.body.newMemberResidence,req.body.newMemberMemberId]
                    result = await queryDB(query,params,true);
                    req.session.newMemberErrorMessage = "";
                    req.session.newMemberMemberId = ""
                    req.session.newMemberName = ""
                    req.session.newMemberEmail = ""
                    req.session.newMemberPhone = ""
                    req.session.newMemberBloodGroup = ""
                    req.session.newMemberDob = ""
                    req.session.newMemberDepartment = ""
                    req.session.newMemberType = ""
                    req.session.newMemberIssueLimit = ""
                    req.session.newMemberAddress = ""
                    req.session.newMemberId = ""
                    req.session.newMemberDesignation = ""
                    req.session.newMemberResidence = ""
                    res.redirect('/admin_page')
                }
                else if(req.body.newMemberType.toUpperCase() == "TEACHER"){
                    query = `INSERT INTO MEMBER_TEACHER (MEMBER_ID, DEPT, ADDRESS, TEACHER_ID, DESIGNATION) VALUES (:1,:2,:3,:4,:5)`
                    params = [req.body.newMemberMemberId,req.body.newMemberDepartment,req.body.newMemberAddress,req.body.newMemberId,req.body.newMemberDesignation]
                    result = await queryDB(query,params,true);
                    req.session.newMemberErrorMessage = "";
                    req.session.newMemberMemberId = ""
                    req.session.newMemberName = ""
                    req.session.newMemberEmail = ""
                    req.session.newMemberPhone = ""
                    req.session.newMemberBloodGroup = ""
                    req.session.newMemberDob = ""
                    req.session.newMemberDepartment = ""
                    req.session.newMemberType = ""
                    req.session.newMemberIssueLimit = ""
                    req.session.newMemberAddress = ""
                    req.session.newMemberId = ""
                    req.session.newMemberDesignation = ""
                    req.session.newMemberResidence = ""
                    res.redirect('/admin_page')
                }
                else if(req.body.newMemberType.toUpperCase() == "OTHERS"){
                    query = `INSERT INTO MEMBER_OTHERS (MEMBER_ID, DEPT, ADDRESS, DESIGNATION) VALUES (:1,:2,:3,:4)`
                    params = [req.body.newMemberMemberId,req.body.newMemberDepartment,req.body.newMemberAddress,req.body.newMemberDesignation]
                    result = await queryDB(query,params,true);
                    req.session.newMemberErrorMessage = "";
                    req.session.newMemberMemberId = ""
                    req.session.newMemberName = ""
                    req.session.newMemberEmail = ""
                    req.session.newMemberPhone = ""
                    req.session.newMemberBloodGroup = ""
                    req.session.newMemberDob = ""
                    req.session.newMemberDepartment = ""
                    req.session.newMemberType = ""
                    req.session.newMemberIssueLimit = ""
                    req.session.newMemberAddress = ""
                    req.session.newMemberId = ""
                    req.session.newMemberDesignation = ""
                    req.session.newMemberResidence = ""
                    res.redirect('/admin_page')
                }
                else{
                    req.session.newMemberErrorMessage = "Sorry! check the Type again"
                    res.redirect('/admin_page')
                }
            }
        }
        
    }

    //Delete Member
    if(req.body.deleteMemberId != undefined){
        let query = `SELECT COUNT(*) CNT
        FROM MEMBER
        WHERE MEMBER_ID = :1`
        let params = [req.body.deleteMemberId]
        let result = await queryDB(query,params,false);
        if(result.rows[0].CNT>0){
            query = `DELETE FROM MEMBER_STUDENT
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            
            query = `DELETE FROM MEMBER_TEACHER
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            
            query = `DELETE FROM MEMBER_OTHERS
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            
            query = `DELETE FROM FAV_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);

            query = `DELETE FROM ISSUE_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);

            query = `DELETE FROM REVIEW_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);

            query = `DELETE FROM SUGG_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            
            query = `DELETE FROM MEMBER
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);

            console.log("MEMBER DELETED!")
            res.redirect('/admin_page');
        }
        else{
            res.redirect('/admin_page');
        }
    }


    if(req.body.newBookId != undefined){
        req.session.newBookId = req.body.newBookId
        req.session.newBookName = req.body.newBookName
        req.session.newBookAuthor = req.body.newBookAuthor
        req.session.newBookPublisher = req.body.newBookPublisher
        req.session.newBookCoverImg = req.body.newBookCoverImg
        req.session.newBookStatus = req.body.newBookStatus
        req.session.newBookArrivalDate = req.body.newBookArrivalDate
        req.session.newBookYearReleased = req.body.newBookYearReleased
        req.session.newBookEdition = req.body.newBookEdition
        req.session.newBookLanguage = req.body.newBookLanguage
        req.session.newBookNumberOfPage = req.body.newBookNumberOfPage
        req.session.newBookType = req.body.newBookType
        req.session.newBookTopic = req.body.newBookTopic
        req.session.newBookDepartment = req.body.newBookDepartment
        req.session.newBookSubject = req.body.newBookSubject
        req.session.newBookCategory = req.body.newBookCategory
        req.session.newBookGenre = req.body.newBookGenre

        let query = `SELECT COUNT(*) CNT
        FROM BOOK
        WHERE BOOK_ID = :1`
        let params = [req.body.newBookId]
        let result = await queryDB(query,params,false);
        if(result.rows[0].CNT > 0){
            req.session.newBookErrorMessage = "Book ID already exists";
            req.session.newBookId = "";
            res.redirect('/admin_page');
        }
        else{
            query = `SELECT COUNT(*) CNT
            FROM AUTHOR
            WHERE AUTHOR_ID = :1`
            params = [req.body.newBookAuthor]
            result = await queryDB(query,params,false);
            if(result.rows[0].CNT == 0){
                req.session.newBookErrorMessage = "Author ID does not exist!";
                req.session.newBookAuthor = "";
                res.redirect('/admin_page');
            }
            else{
                query = `SELECT COUNT(*) CNT
                FROM PUBLISHER
                WHERE PUBLISHER_NAME = :1`
                params = [req.body.newBookPublisher]
                result = await queryDB(query,params,false);
                if(result.rows[0].CNT == 0){
                    req.session.newBookErrorMessage = "Publisher does not exist!";
                    req.session.newBookPublisher = "";
                    res.redirect('/admin_page');
                }
                else{
                    query = `INSERT INTO BOOK (BOOK_ID, BOOK_NAME, AUTHOR_ID, PUBLISHER_NAME, COVER_IMAGE, STATUS, DATE_OF_ARRIVAL, YEAR, EDITION, NO_OF_PAGES, LANGUAGE, ADMIN_ID)
                    VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12)`
                    params = [req.body.newBookId,req.body.newBookName,req.body.newBookAuthor,req.body.newBookPublisher,req.body.newBookCoverImg,req.body.newBookStatus,req.body.newBookArrivalDate,req.body.newBookYearReleased,req.body.newBookEdition,req.body.newBookNumberOfPage,req.body.newBookLanguage,req.session.adminId]
                    result = await queryDB(query,params,true);

                    if(req.body.newBookType != undefined && req.body.newBookType.toUpperCase() == "ACADEMIC"){
                        query = `INSERT INTO BOOKLIST_ACADEMIC (BOOK_ID, SUBJECT, TOPIC, DEPARTMENT) VALUES (:1,:2,:3,:4)`
                        params = [req.body.newBookId,req.body.newBookSubject,req.body.newBookTopic,req.body.newBookDepartment]
                        result = await queryDB(query,params,true);
                    }
                    else{
                        query = `INSERT INTO BOOKLIST_OTHERS (BOOK_ID, GENRE, CATEGORY) VALUES (:1,:2,:3)`
                        params = [req.body.newBookId,req.body.newBookGenre,req.body.newBookCategory];
                        result = await queryDB(query,params,true);
                    }
                    req.session.newBookErrorMessage = "";
                    req.session.newBookId = ""
                    req.session.newBookName = ""
                    req.session.newBookAuthor = ""
                    req.session.newBookPublisher = ""
                    req.session.newBookCoverImg = ""
                    req.session.newBookStatus = ""
                    req.session.newBookArrivalDate = ""
                    req.session.newBookYearReleased = 
                    req.session.newBookEdition = ""
                    req.session.newBookLanguage = ""
                    req.session.newBookNumberOfPage = ""
                    req.session.newBookTopic = ""
                    req.session.newBookType = ""
                    req.session.newBookDepartment = ""
                    req.session.newBookSubject = ""
                    req.session.newBookCategory = ""
                    req.session.newBookGenre = ""
                    res.redirect('/admin_page')
                }

            }
        }
        

    }
    // res.redirect('/admin_page')
})


module.exports = router;