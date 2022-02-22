const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/',(req,res)=>{
    console.log(`--- ADMIN PAGE GET REQUEST---`);
    
    if(!req.session.adminId){
        res.redirect('/admin_login')
        return;
    }

    // console.log(req.query);
    let context = {
        adminId : req.session.adminId,
        adminName : req.session.adminName,
        newMemberErrorMessage : req.session.newMemberErrorMessage,
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
        newBookErrorMessage: req.session.newBookErrorMessage,
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
        newBookGenre : req.session.newBookGenre,
        issueBookId : req.session.issueBookid,
        issueMemberId : req.session.issueMemberId,
        issueDate : req.session.issueDate,
        issueErrorMessage : req.session.issueErrorMessage,
        newAdminErrorMessage : req.session.newAdminErrorMessage,
        newAdminName : req.session.newAdminName,
        newAdminId : req.session.newAdminId, 
        newAdminEmail : req.session.newAdminEmail,
        newAdminPhone : req.session.newAdminPhone,
        newAuthorErrorMessage : req.session.newAuthorErrorMessage,
        newAuthorName : req.session.newAuthorName,
        newAuthorId : req.session.newAuthorId,
        newAuthorNationality : req.session.newAuthorNationality,
        newAuthorLife : req.session.newAuthorLife,
        newPublisherErrorMessage : req.session.newPublisherErrorMessage,
        newPublisherName :   req.session.newPublisherName,
        newPublisherAddress : req.session.newPublisherAddress,
        newPublisherPhone : req.session.newPublisherPhone
    }
    res.render('admin_page.ejs',context);
})

router.get('/applicantTable', async function(req,res){
    // console.log('jonmo')
    let query = `SELECT NAME, DESIGNATION, DEPT, ID, DATE_OF_BIRTH, ADDRESS, EMAIL, PHONE_NUMBER, BLOOD_GROUP, RESIDENCE
    FROM APPLICANT
    ORDER BY NAME`
    let params = []
    let result = await queryDB(query,params,false);
    // if(!result){
    //     res.redirect('/admin_page')
    //     return;
    // }
    res.status(200).json(result.rows);
})

router.post('/',urlencodedParser, async function(req,res){
    if(!req.session.adminId){
        res.redirect('/sign_out')
        return;
    }

    // console.log('bhumi aage')
    console.log(req.body);
    //member info
    if(req.body.newMemberMemberId != undefined){
        req.session.newMemberMemberId = req.body.newMemberMemberId
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
        if(!result){
            res.redirect('/admin_page')
            return;
        }
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
            if(!result || !result2 || !result3){
                res.redirect('/admin_page')
                return;
            }
            if(result.rows[0].CNT > 0 || result2.rows[0].CNT > 0 || result3.rows[0].CNT > 0){
                req.session.newMemberErrorMessage = "Sorry! This Member is not unique! try again"
                res.redirect('/admin_page')
            }
            else{
                query = `INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE)
                VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9)`
                params = [req.body.newMemberMemberId,req.body.newMemberName,req.body.newMemberEmail,req.body.newMemberPhone,req.body.newMemberBloodGroup,req.body.newMemberDob,req.session.adminId,req.body.newMemberPhone,0];
                result = await queryDB(query,params,true)
                if(!result){
                    res.redirect('/admin_page')
                    return;
                }
                if(req.body.newMemberType.toUpperCase() == "STUDENT"){
                    query = `INSERT INTO MEMBER_STUDENT (DEPT, STUDENT_ID, RESIDENCE, MEMBER_ID) VALUES (:1,:2,:3,:4)`
                    params = [req.body.newMemberDepartment,req.body.newMemberId,req.body.newMemberResidence,req.body.newMemberMemberId]
                    result = await queryDB(query,params,true);
                    if(!result){
                        res.redirect('/admin_page')
                        return;
                    }
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
                    if(!result){
                        res.redirect('/admin_page')
                        return;
                    }
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
                    if(!result){
                        res.redirect('/admin_page')
                        return;
                    }
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
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        if(result.rows[0].CNT>0){
            query = `DELETE FROM MEMBER_STUDENT
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            
            query = `DELETE FROM MEMBER_TEACHER
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            
            query = `DELETE FROM MEMBER_OTHERS
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            
            query = `DELETE FROM FAV_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }

            query = `DELETE FROM ISSUE_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }

            query = `DELETE FROM REVIEW_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }

            query = `DELETE FROM SUGG_LIST
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            
            query = `DELETE FROM MEMBER
            WHERE MEMBER_ID = :1`
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }

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
        if(!result){
            res.redirect('/admin_page')
            return;
        }
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
            if(!result){
                res.redirect('/admin_page')
                return;
            }
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
                if(!result){
                    res.redirect('/admin_page')
                    return;
                }
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
                    if(!result){
                        res.redirect('/admin_page')
                        return;
                    }

                    if(req.body.newBookType != undefined && req.body.newBookType.toUpperCase() == "ACADEMIC"){
                        query = `INSERT INTO BOOKLIST_ACADEMIC (BOOK_ID, SUBJECT, TOPIC, DEPARTMENT) VALUES (:1,:2,:3,:4)`
                        params = [req.body.newBookId,req.body.newBookSubject,req.body.newBookTopic,req.body.newBookDepartment]
                        result = await queryDB(query,params,true);
                        if(!result){
                            res.redirect('/admin_page')
                            return;
                        }
                    }
                    else{
                        query = `INSERT INTO BOOKLIST_OTHERS (BOOK_ID, GENRE, CATEGORY) VALUES (:1,:2,:3)`
                        params = [req.body.newBookId,req.body.newBookGenre,req.body.newBookCategory];
                        result = await queryDB(query,params,true);
                        if(!result){
                            res.redirect('/admin_page')
                            return;
                        }
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


    //delete book
    if(req.body.deleteBookId != undefined){
        let query = `SELECT COUNT(*) CNT
        FROM BOOK
        WHERE BOOK_ID = :1`
        let params = [req.body.deleteBookId]
        let result = await queryDB(query,params,false);
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        if(result.rows[0].CNT == 0){
            res.redirect('/admin_page')
        }
        else{
            query = `DELETE FROM BOOK
            WHERE BOOK_ID = :1`
            result = await queryDB(query,params,true);
            console.log("Book Deleted")
            res.redirect('/admin_page')
        }
    }

    //add issue list
    if(req.body.issueBookId != undefined){
        req.session.issueBookId = req.body.issueBookId;
        req.session.issueMemberId = req.body.issueMemberId;
        req.session.issueDate = req.body.issueDate;

        let query = `SELECT COUNT(*) CNT
        FROM MEMBER
        WHERE MEMBER_ID = :1`
        let params = [req.body.issueMemberId]
        let result = await queryDB(query,params,false);
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        if(result.rows[0].CNT == 0){
            req.session.issueErrorMessage = "Member does not exist"
            req.session.issueMemberId = "";
            res.redirect('/admin_page');
        }
        else{
            query = `SELECT COUNT(*) CNT
            FROM BOOK
            WHERE BOOK_ID = :1 AND UPPER(STATUS) = 'AVAILABLE'`
            params = [req.body.issueBookId]
            result = await queryDB(query,params,false);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            if(result.rows[0].CNT == 0){
                req.session.issueErrorMessage = "THIS BOOK IS NOT AVAILABLE"
                req.session.issueBookId = "";
                res.redirect('/admin_page');
            }
            else{
                query = `INSERT INTO ISSUE_LIST (MEMBER_ID, BOOK_ID, ISSUE_DATE, ADMIN_ID) VALUES (:1,:2,:3,:4)`
                params = [req.body.issueMemberId,req.body.issueBookId,req.body.issueDate,req.session.adminId]
                result = await queryDB(query,params,true);
                if(!result){
                    res.redirect('/admin_page')
                    return;
                }
                req.session.issueBookId = "";
                req.session.issueMemberId = "";
                req.session.issueDate = "";
                res.redirect('/admin_page')
            }
        }
    }

    //delete issue list
    if(req.body.deleteIssueId != undefined){
        let query = `DELETE FROM ISSUE_LIST
        WHERE ISSUE_ID = :1`
        let params = [req.body.deleteIssueId]
        let result = await queryDB(query,params,true);
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        res.redirect('/admin_page');
    }

    //link
    if(req.body.linkText != undefined){
        let query = `INSERT INTO LINKS (LINK_NAME, LINK_TEXT) VALUES (:1,:2)`
        let params = [req.body.linkName, req.body.linkText]
        let result = await queryDB(query,params,true);
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        res.redirect('/admin_page')
    }

    //new info
    if(req.body.newsDate != undefined){
        let query = `INSERT INTO NEWS_AND_EVENTS (NEWS_DATE, IMAGE, DESCRIPTION) VALUES (:1,:2,:3)`
        let params = [req.body.newsDate,req.body.newsImage,req.body.newsDescription]
        let result = await queryDB(query,params,true);
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        res.redirect('/admin_page')
    }

    //add admin
    if(req.body.newAdminId != undefined){
        req.session.newAdminName = req.body.newAdminName
        req.session.newAdminId = req.body.newAdminId
        req.session.newAdminEmail = req.body.newAdminEmail
        req.session.newAdminPhone = req.body.newAdminPhone

        let query = `SELECT COUNT(*) CNT
        FROM ADMIN
        WHERE ADMIN_ID = :1`
        let params = [req.body.newAdminId]
        let result = await queryDB(query,params,false);
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        if(result.rows[0].CNT > 0){
            req.session.newAdminErrorMessage = "Admin ID already exists"
            req.session.newAdminId = ""
            res.redirect('/admin_page')
        }
        else{
            query = `SELECT COUNT(*) CNT
            FROM ADMIN
            WHERE EMAIL = :1`
            let params = [req.body.newAdminEmail]
            let result = await queryDB(query,params,false);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            if(result.rows[0].CNT > 0){
                req.session.newAdminErrorMessage = "Admin Email already exists"
                req.session.newAdminEmail = ""
                res.redirect('/admin_page')
            }
            else{
                query = `SELECT COUNT(*) CNT
                FROM ADMIN
                WHERE PHONE_NUMBER = :1`
                let params = [req.body.newAdminPhone]
                let result = await queryDB(query,params,false);
                if(!result){
                    res.redirect('/admin_page')
                    return;
                }
                if(result.rows[0].CNT > 0){
                    req.session.newAdminErrorMessage = "Phone Number already exists"
                    req.session.newAdminPhone = ""
                    res.redirect('/admin_page')
                }
                else{
                    query = `INSERT INTO ADMIN (ADMIN_ID, ADMIN_PSW, NAME, EMAIL, PHONE_NUMBER) VALUES (:1,:2,:3,:4,:5)`
                    params = [req.body.newAdminId,req.body.newAdminPassword,req.body.newAdminName,req.body.newAdminEmail,req.body.newAdminPhone]
                    let result = await queryDB(query,params,true);
                    if(!result){
                        res.redirect('/admin_page')
                        return;
                    }
                    req.session.newAdminErrorMessage = ""
                    req.session.newAdminName = ""
                    req.session.newAdminId = ""
                    req.session.newAdminEmail = ""
                    req.session.newAdminPhone = ""
                    res.redirect('/admin_page')
                }
            }
        }
    }

    //new Author
    if(req.body.newAuthorName != undefined){
        req.session.newAuthorName = req.body.newAuthorName;
        req.session.newAuthorId = req.body.newAuthorId
        req.session.newAuthorNationality = req.body.newAuthorNationality
        req.session.newAuthorLife = req.body.newAuthorLife

        let query = `SELECT COUNT(*) CNT
        FROM AUTHOR
        WHERE AUTHOR_ID = :1`
        let params = [req.body.newAuthorId]
        let result = await queryDB(query,params,false)
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        if(result.rows[0].CNT>0){
            req.session.newAuthorErrorMessage = "Author Id already exists"
            req.session.newAuthorId = "";
            res.redirect('/admin_page')
        }
        else{
            query = `INSERT INTO AUTHOR (AUTHOR_ID, AUTHOR_NAME, NATIONALITY, "LIFE-SPAN") VALUES (:1,:2,:3,:4)`
            params = [req.body.newAuthorId, req.body.newAuthorName, req.body.newAuthorNationality, req.body.newAuthorLife]
            result = await queryDB(query,params,true);
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            req.session.newAuthorErrorMessage = ""
            req.session.newAuthorName = ""
            req.session.newAuthorId = ""
            req.session.newAuthorNationality = ""
            req.session.newAuthorLife = ""
            res.redirect('/admin_page')
        }
    }

    //new Publisher
    if(req.body.newPublisherName != undefined){
        req.session.newPublisherName = req.body.newPublisherName
        req.session.newPublisherAddress = req.body.newPublisherAddress
        req.session.newPublisherPhone = req.body.newPublisherPhone

        let query = `SELECT COUNT(*) CNT
        FROM PUBLISHER
        WHERE PUBLISHER_NAME = :1`
        let params = [req.body.newPublisherName]
        let result = await queryDB(query,params,false)
        if(!result){
            res.redirect('/admin_page')
            return;
        }
        if(result.rows[0].CNT>0){
            req.session.newPublisherErrorMessage = "Publisher already exists"
            req.session.newPublisherName = ""
            res.redirect('/admin_page')
        }
        else{
            query = `SELECT COUNT(*) CNT
            FROM PUBLISHER
            WHERE PHONE_NUMBER = :1`
            let params = [req.body.newPublisherPhone]
            let result = await queryDB(query,params,false)
            if(!result){
                res.redirect('/admin_page')
                return;
            }
            if(result.rows[0].CNT>0){
                req.session.newPublisherErrorMessage = "Publisher's Phone Number already exists"
                req.session.newPublisherPhone = ""
                res.redirect('/admin_page')
            }
            else{
                query = `INSERT INTO PUBLISHER (PUBLISHER_NAME, ADDRESS, PHONE_NUMBER) VALUES (:1,:2,:3)`
                params = [req.body.newPublisherName,req.body.newPublisherAddress,req.body.newPublisherPhone]
                result = await queryDB(query,params,true)
                req.session.newPublisherErrorMessage = ""
                req.session.newPublisherName = ""
                req.session.newPublisherAddress = ""
                req.session.newPublisherPhone = ""
                res.redirect('/admin_page')
    
            }
        }

    }
    // res.redirect('/admin_page')
})


module.exports = router;