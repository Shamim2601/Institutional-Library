const bodyParser = require('body-parser');
const { resolveInclude } = require('ejs');
const express = require('express');
const { param } = require('./basicTableRoutes');
const router = express.Router();
const queryDB = require('./queryDBMS');
let urlencodedParser = bodyParser.urlencoded({extended:false})

function makeRandomeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

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

router.get('/APPLICANT', async function(req,res){
    // console.log('jonmo')
    if(!req.session.applicantSearchById){
        req.session.applicantSearchById = '%';
    }
    let query = `SELECT NAME, DESIGNATION, DEPT, ID, DATE_OF_BIRTH, ADDRESS, EMAIL, PHONE_NUMBER, BLOOD_GROUP, RESIDENCE
    FROM APPLICANT
    WHERE ID LIKE :1
    ORDER BY NAME`
    let params = [req.session.applicantSearchById]
    let result = await queryDB(query,params,false);
    // if(!result){
    //     res.redirect('/admin_page')
    //     return;
    // }
    req.session.applicantSearchById = "";
    res.status(200).json(result.rows);
})
router.post('/searchApplicantTable', urlencodedParser, async function(req,res){
    console.log(req.body.applicantAddById, req.body.applicantSearchById);

    let query,params,result;
    if(req.body.applicantAddById){
        query = `SELECT COUNT(*) CNT
        FROM APPLICANT
        WHERE ID = :1`
        params = [req.body.applicantAddById];
        try{
            result = await queryDB(query,params,false);
        }catch{
            res.redirect('/admin_page');
            return;
        }
        if(result.rows[0].CNT > 0){
            let query2,params2,result2;
            query2 = `SELECT *
            FROM APPLICANT
            WHERE ID = :1`
            params2 = [req.body.applicantAddById];
            try{
                result2 = await queryDB(query2,params2,false);
            }catch{
                res.redirect('/admin_page');
                return;
            }
            query = `SELECT COUNT(*) CNT
            FROM MEMBER
            WHERE PHONE_NUMBER = :1`
            params = [result2.rows[0].PHONE_NUMBER];
            try{
                result = await queryDB(query,params,false);
            }catch{
                res.redirect('/admin_page');
                return;
            }
            if(result.rows[0].CNT == 0){
                let query3,query4,params3,params4,result3,result4;
                query = `SELECT COUNT(*) CNT
                FROM MEMBER_STUDENT
                WHERE STUDENT_ID = :1`
                query3 = `SELECT COUNT(*) CNT
                FROM MEMBER_TEACHER
                WHERE TEACHER_ID = :1`
                query4 = `SELECT COUNT(*) CNT
                FROM MEMBER_OTHERS
                WHERE ID = :1`
                params = [req.body.applicantAddById];
                params3 = [req.body.applicantAddById];
                params4 = [result2.rows[0].ID];
                try{
                    result = await queryDB(query,params,false);
                    result3 = await queryDB(query3,params3,false);
                    result4 = await queryDB(query4,params4,false);

                }catch{
                    res.redirect('/admin_page');
                    return;
                }
                    result = await queryDB(query,params,false);
                    if(result.rows[0].CNT == 0 || result3.rows[0].CNT == 0 || result4.rows[0].CNT == 0){
                        if(result.rows[0].TYPE == "STUDENT"){
                            query = `
                            DECLARE
                                NEW_MEMBER_ID NUMBER(10);
                            BEGIN
                                GENERATE_MEMBER_ID(1,NEW_MEMBER_ID);
                                INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE,DEPT)
                                VALUES (NEW_MEMBER_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9);
                                INSERT INTO MEMBER_STUDENT (STUDENT_ID, RESIDENCE, MEMBER_ID) VALUES (:10,:11,NEW_MEMBER_ID);
                            END;`
                            params = [result2.rows[0].NAME,result2.rows[0].EMAIL,result2.rows[0].PHONE_NUMBER,result2.rows[0].BLOOD_GROUP,
                            result2.rows[0].DATE_OF_BIRTH,req.session.adminId,result2.rows[0].PASSWORD,0,result2.rows[0].DEPT,result2.rows[0].ID,
                            result2.rows[0].RESIDENCE];
                            try{
                                result = await queryDB(query,params,true);
                            }catch{
                                res.redirect('/admin_page')
                                return;
                            }
                        }
                        else if(result.rows[0].TYPE == "TEACHER"){
                            query = `
                            DECLARE
                                NEW_MEMBER_ID NUMBER(10);
                            BEGIN
                                GENERATE_MEMBER_ID(2,NEW_MEMBER_ID);
                                INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE,DEPT)
                                VALUES (NEW_MEMBER_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9);
                                INSERT INTO MEMBER_TEACHER (MEMBER_ID, ADDRESS, TEACHER_ID, DESIGNATION) VALUES (NEW_MEMBER_ID,:10,:11,:12);
                            END;`
                            params = [result2.rows[0].NAME,result2.rows[0].EMAIL,result2.rows[0].PHONE_NUMBER,result2.rows[0].BLOOD_GROUP,
                            result2.rows[0].DATE_OF_BIRTH,req.session.adminId,result2.rows[0].PASSWORD,0,result2.rows[0].DEPT,result2.rows[0].ADDRESS,result2.rows[0].ID,
                            result2.rows[0].DESIGNATION];
                            try{
                                result = await queryDB(query,params,true);
                            }catch{
                                res.redirect('/admin_page')
                                return;
                            }
                        }
                        else{
                            query = `
                            DECLARE
                                NEW_MEMBER_ID NUMBER(10);
                            BEGIN
                                GENERATE_MEMBER_ID(3,NEW_MEMBER_ID);
                                INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE,DEPT)
                                VALUES (NEW_MEMBER_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9);
                                INSERT INTO MEMBER_OTHERS (MEMBER_ID, ADDRESS, DESIGNATION,ID) VALUES (NEW_MEMBER_ID,:10,:11,:12);
                            END;`
                            params = [result2.rows[0].NAME,result2.rows[0].EMAIL,result2.rows[0].PHONE_NUMBER,result2.rows[0].BLOOD_GROUP,
                            result2.rows[0].DATE_OF_BIRTH,req.session.adminId,result2.rows[0].PASSWORD,0,result2.rows[0].DEPT,result2.rows[0].ADDRESS,
                            result2.rows[0].DESIGNATION,result2.rows[0].ID];
                            try{
                                result = await queryDB(query,params,true);
                            }catch{
                                res.redirect('/admin_page')
                                return;
                            }
                            query = `DELETE FROM APPLICANT WHERE ID = :1`
                            params = [req.body.applicantAddById];
                            try{
                                result = await queryDB(query,params,true);
                            }catch{
                                res.redirect('/admin_page')
                                return;
                            }
                        }
                    }
            }
        }
    }
    if(req.body.applicantSearchById){
        req.session.applicantSearchById = req.body.applicantSearchById;
    }
    res.redirect('/admin_page')
    
})
router.post('/',urlencodedParser, async function(req,res){
    if(!req.session.adminId){
        res.redirect('/admin_login')
        return;
    }

    // console.log('bhumi aage')
    console.log(req.body);
    //member info
    if(req.body.newMemberName != undefined){
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

        let query,params,result;
        try{
            query = `SELECT COUNT(*) CNT
            FROM MEMBER
            WHERE PHONE_NUMBER = :1`
            params = [req.body.newMemberPhone]
            result = await queryDB(query,params,false);
        }catch{
            req.session.newMemberErrorMessage = 'Error has occured try again'
            res.redirect('/admin_page');
            return;
        }
        if(result.rows[0].CNT > 0){
            req.session.newMemberErrorMessage = "Phone Number already exists. TRY AGAIN!"
            res.redirect('/admin_page')
            return;
        }
        else{
            let query2,query3,result2,result3;
            query = `SELECT COUNT(*) CNT
            FROM MEMBER_STUDENT
            WHERE STUDENT_ID = :1`
            query2 = `SELECT COUNT(*) CNT
            FROM MEMBER_TEACHER
            WHERE TEACHER_ID = :1`
            params = [req.body.newMemberId]
            query3 = `SELECT COUNT(*) CNT
            FROM MEMBER_OTHERS
            WHERE ID = :1`
            try{
                result = await queryDB(query,params,false)
                result2 = await queryDB(query2,params,false);
                result3 = await queryDB(query3,params,false);
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            if(result.rows[0].CNT > 0 || result2.rows[0].CNT > 0 || result3.rows[0].CNT > 0){
                req.session.newMemberErrorMessage = "Sorry! This Member is not unique! try again"
                res.redirect('/admin_page')
            }
            else{
                if(req.body.newMemberType.toUpperCase() == "STUDENT"){
                    query = `
                    DECLARE
                        NEW_MEMBER_ID NUMBER(10);
                    BEGIN
                        GENERATE_MEMBER_ID(1,NEW_MEMBER_ID);
                        INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE,DEPT)
                        VALUES (NEW_MEMBER_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9);
                        INSERT INTO MEMBER_STUDENT (STUDENT_ID, RESIDENCE, MEMBER_ID) VALUES (:10,:11,NEW_MEMBER_ID);
                    END;`
                    params = [req.body.newMemberName,req.body.newMemberEmail,req.body.newMemberPhone,req.body.newMemberBloodGroup,
                        req.body.newMemberDob,req.session.adminId,makeRandomeId(12),0,req.body.newMemberDepartment,
                        req.body.newMemberId,req.body.newMemberResidence]
                    try{
                        result = await queryDB(query,params,true);

                    }catch(err){
                        console.log(`${err}`);
                        res.redirect('/admin_page');
                        return;
                    }
                    req.session.newMemberErrorMessage = "";
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
                    query = `
                    DECLARE
                        NEW_MEMBER_ID NUMBER(10);
                    BEGIN
                        GENERATE_MEMBER_ID(2,NEW_MEMBER_ID);
                        INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE, DEPT)
                        VALUES (NEW_MEMBER_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9);
                        INSERT INTO MEMBER_TEACHER (MEMBER_ID,ADDRESS, TEACHER_ID, DESIGNATION) VALUES (NEW_MEMBER_ID,:10,:11,:12);
                    END;`
                    params = [req.body.newMemberName,req.body.newMemberEmail,req.body.newMemberPhone,req.body.newMemberBloodGroup,
                        req.body.newMemberDob,req.session.adminId,req.body.newMemberPhone,0,req.body.newMemberDepartment,
                        req.body.newMemberAddress,req.body.newMemberId,req.body.newMemberDesignation]
                    try{
                        result = await queryDB(query,params,true);

                    }catch(err){
                        console.log(`${err}`);
                        res.redirect('/admin_page');
                        return;
                    }
                    // if(!result){
                    //     res.redirect('/admin_page')
                    //     return;
                    // }
                    req.session.newMemberErrorMessage = "";
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
                    query = `INSERT INTO MEMBER_OTHERS (MEMBER_ID, DEPT, ADDRESS, DESIGNATION) VALUES (NEW_MEMBER_ID,:1,:2,:3)`
                    query = `
                    DECLARE
                        NEW_MEMBER_ID NUMBER(10);
                    BEGIN
                        GENERATE_MEMBER_ID(3,NEW_MEMBER_ID);
                        INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, EMAIL, PHONE_NUMBER, BLOOD_GROUP, DATE_OF_BIRTH, ADMIN_ID, PASSWORD,NUM_OF_ISSUE,DEPT)
                        VALUES (NEW_MEMBER_ID,:1,:2,:3,:4,:5,:6,:7,:8);
                        INSERT INTO MEMBER_OTHERS (MEMBER_ID, ADDRESS, DESIGNATION,ID) VALUES (NEW_MEMBER_ID,:10,:11,:12);
                    END;`
                    params = [req.body.newMemberName,req.body.newMemberEmail,req.body.newMemberPhone,req.body.newMemberBloodGroup,
                        req.body.newMemberDob,req.session.adminId,req.body.newMemberPhone,0,req.body.newMemberDepartment,
                        req.body.newMemberAddress,req.body.newMemberDesignation,req.body.newMemberId]
                    try{
                        result = await queryDB(query,params,true);

                    }catch(err){
                        console.log(`${err}`);
                        res.redirect('/admin_page');
                        return;
                    }
                    // if(!result){
                    //     res.redirect('/admin_page')
                    //     return;
                    // }
                    req.session.newMemberErrorMessage = "";
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
                // else{
                //     req.session.newMemberErrorMessage = "Sorry! check the Type again"
                //     res.redirect('/admin_page')
                // }
            }
        }
        
    }

    //Delete Member
    if(req.body.deleteMemberId != undefined){
        let result,query,params;
        query = `SELECT COUNT(*) CNT
        FROM MEMBER
        WHERE MEMBER_ID = :1`
        params = [req.body.deleteMemberId]
        result = await queryDB(query,params,false);
        try{
            result = await queryDB(query,params,false);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
            return;
        }
        if(result.rows[0].CNT>0){
            query = `DELETE FROM MEMBER_STUDENT
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            query = `DELETE FROM MEMBER_TEACHER
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            
            query = `DELETE FROM MEMBER_OTHERS
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            
            query = `DELETE FROM FAV_LIST
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }

            query = `DELETE FROM ISSUE_LIST
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }

            query = `DELETE FROM REVIEW_LIST
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            query = `DELETE FROM SUGG_LIST
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            
            query = `DELETE FROM MEMBER
            WHERE MEMBER_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }

            console.log("MEMBER DELETED!")
            res.redirect('/admin_page');
        }
        else{
            res.redirect('/admin_page');
        }
    }

    //add a new book
    if(req.body.newBookAuthor != undefined){
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
        
        let query,params,result;
        query = `SELECT COUNT(*) CNT
        FROM AUTHOR
        WHERE AUTHOR_ID = :1`
        params = [req.body.newBookAuthor]
        try{
            result = await queryDB(query,params,false);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
            return;
        }
        
        if(result.rows[0].CNT == 0){
            req.session.newBookErrorMessage = "Author ID does not exist!";
            req.session.newBookAuthor = "";
            res.redirect('/admin_page');
            return;
        }
        else{
            console.log('here')
            query = `SELECT COUNT(*) CNT
            FROM PUBLISHER
            WHERE PUBLISHER_NAME = :1`
            params = [req.body.newBookPublisher]
            try{
                result = await queryDB(query,params,false);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            if(result.rows[0].CNT == 0){
                req.session.newBookErrorMessage = "Publisher does not exist!";
                req.session.newBookPublisher = "";
                res.redirect('/admin_page');
                return;
            }
            else{
                if(req.body.newBookType.toUpperCase() == "ACADEMIC"){
                    console.log('acad stuff');
                    query = `
                    DECLARE
                        NEW_BOOK_ID NUMBER(10);
                    BEGIN
                        GENERATE_BOOK_ID(2,NEW_BOOK_ID);
                        INSERT INTO BOOK (BOOK_ID, BOOK_NAME, AUTHOR_ID, PUBLISHER_NAME, COVER_IMAGE, STATUS, DATE_OF_ARRIVAL, YEAR,
                        EDITION, NO_OF_PAGES, LANGUAGE, ADMIN_ID) VALUES (NEW_BOOK_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11);
                        INSERT INTO BOOKLIST_ACADEMIC (BOOK_ID, SUBJECT, TOPIC, DEPARTMENT) VALUES (NEW_BOOK_ID,:12,:13,:14);
                    END;`
                    params = [req.body.newBookName,req.body.newBookAuthor,req.body.newBookPublisher,req.body.newBookCoverImg,
                        req.body.newBookStatus,req.body.newBookArrivalDate,req.body.newBookYearReleased,req.body.newBookEdition,
                        req.body.newBookNumberOfPage,req.body.newBookLanguage,req.session.adminId,
                        req.body.newBookSubject,req.body.newBookTopic,req.body.newBookDepartment]
                    try{
                        result = await queryDB(query,params,true);
            
                    }catch(err){
                        console.log(`${err}`);
                        res.redirect('/admin_page');
                        return;
                    }
                }
                else{
                    console.log('others')
                    query = `
                    DECLARE
                        NEW_BOOK_ID NUMBER(10);
                    BEGIN
                        GENERATE_BOOK_ID(1,NEW_BOOK_ID);
                        INSERT INTO BOOK (BOOK_ID, BOOK_NAME, AUTHOR_ID, PUBLISHER_NAME, COVER_IMAGE, STATUS, DATE_OF_ARRIVAL, YEAR,
                        EDITION, NO_OF_PAGES, LANGUAGE, ADMIN_ID) VALUES (NEW_BOOK_ID,:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11);
                        INSERT INTO BOOKLIST_OTHERS (BOOK_ID, GENRE, CATEGORY) VALUES (NEW_BOOK_ID,:12,:13);
                    END;`
                    params = [req.body.newBookName,req.body.newBookAuthor,req.body.newBookPublisher,req.body.newBookCoverImg,
                        req.body.newBookStatus,req.body.newBookArrivalDate,req.body.newBookYearReleased,req.body.newBookEdition,
                        req.body.newBookNumberOfPage,req.body.newBookLanguage,req.session.adminId,
                        req.body.newBookGenre,req.body.newBookCategory];
                    try{
                        result = await queryDB(query,params,true);
            
                    }catch(err){
                        console.log(`${err}`);
                        res.redirect('/admin_page');
                        return;
                    }
                        // if(!result){
                        //     res.redirect('/admin_page')
                        //     return;
                        // }
                }
                req.session.newBookErrorMessage = "";
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
                console.log('mehram')
                res.redirect('/admin_page')
            }
        }
    }


    //delete book
    if(req.body.deleteBookId != undefined){
        let query,params,result;
        query = `SELECT COUNT(*) CNT
        FROM BOOK
        WHERE BOOK_ID = :1`
        params = [req.body.deleteBookId]
        try{
            result = await queryDB(query,params,false);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
            return;
        }
        if(result.rows[0].CNT == 0){
            res.redirect('/admin_page')
        }
        else{
            query = `DELETE FROM BOOK
            WHERE BOOK_ID = :1`
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
                return;
            }
            console.log("Book Deleted")
            res.redirect('/admin_page')
        }
    }

    //add issue list
    if(req.body.issueBookId != undefined){
        req.session.issueBookId = req.body.issueBookId;
        req.session.issueMemberId = req.body.issueMemberId;
        req.session.issueDate = req.body.issueDate;
        let query,params,result;
        query = `SELECT COUNT(*) CNT
        FROM MEMBER
        WHERE MEMBER_ID = :1`
        params = [req.body.issueMemberId]
        try{
            result = await queryDB(query,params,false);

        }catch(err){
            console.log(err);
            res.redirect('/admin_page');
            return;
        }
        if(result.rows[0].CNT == 0){
            req.session.issueErrorMessage = "Member does not exist"
            req.session.issueMemberId = "";
            res.redirect('/admin_page');
            return;
        }
        else{
            query = `SELECT COUNT(*) CNT
            FROM BOOK
            WHERE BOOK_ID = :1 AND UPPER(STATUS) = 'AVAILABLE'`
            params = [req.body.issueBookId]
            try{
                result = await queryDB(query,params,false);
    
            }catch(err){
                console.log(err);
                res.redirect('/admin_page');
                return;
            }
            if(result.rows[0].CNT == 0){
                req.session.issueErrorMessage = "THIS BOOK IS NOT AVAILABLE"
                req.session.issueBookId = "";
                res.redirect('/admin_page');
            }
            else{
                if(req.body.issueDate){
                    query = `INSERT INTO ISSUE_LIST (MEMBER_ID, BOOK_ID, ISSUE_DATE, ADMIN_ID) VALUES (:1,:2,:3,:4)`
                    params = [req.body.issueMemberId,req.body.issueBookId,req.body.issueDate,req.session.adminId]
                    try{
                        result = await queryDB(query,params,true);
            
                    }catch(err){
                        console.log(err);
                        res.redirect('/admin_page');
                        return;
                    }
                }
                else{
                    query = `INSERT INTO ISSUE_LIST (MEMBER_ID, BOOK_ID, ADMIN_ID) VALUES (:1,:2,:3)`
                    params = [req.body.issueMemberId,req.body.issueBookId,req.session.adminId]
                    try{
                        result = await queryDB(query,params,true);
        
                    }catch(err){
                        console.log(err);
                        res.redirect('/admin_page');
                        return;
                    }
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
        let query,params,result;
        query = `DELETE FROM ISSUE_LIST
        WHERE ISSUE_ID = :1`
        params = [req.body.deleteIssueId]
        try{
            result = await queryDB(query,params,true);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
            return;
        }
        res.redirect('/admin_page');
    }

    //link
    if(req.body.linkText != undefined){
        let query,params,result;
        query = `INSERT INTO LINKS (LINK_NAME, LINK_TEXT) VALUES (:1,:2)`
        params = [req.body.linkName, req.body.linkText]
        try{
            result = await queryDB(query,params,true);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
            return;
        }
        res.redirect('/admin_page')
    }

    //new info
    if(req.body.newsDate != undefined){
        let query,params,result;
        query = `INSERT INTO NEWS_AND_EVENTS (NEWS_DATE, IMAGE,TITLE, DESCRIPTION) VALUES (:1,:2,:3,:4)`
        params = [req.body.newsDate,req.body.newsImage,req.body.newsTitle,req.body.newsDescription]
        try{
            result = await queryDB(query,params,true);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
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

        let query,params,result;
        query = `SELECT COUNT(*) CNT
        FROM ADMIN
        WHERE ADMIN_ID = :1`
        params = [req.body.newAdminId]
        try{
            result = await queryDB(query,params,true);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
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
            params = [req.body.newAdminEmail]
            try{
                result = await queryDB(query,params,false);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
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
                params = [req.body.newAdminPhone]
                try{
                    result = await queryDB(query,params,false);
        
                }catch(err){
                    console.log(`${err}`);
                    res.redirect('/admin_page');
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
                    try{
                        result = await queryDB(query,params,true);
            
                    }catch(err){
                        console.log(`${err}`);
                        res.redirect('/admin_page');
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

        let query,params,result;
        query = `SELECT COUNT(*) CNT
        FROM AUTHOR
        WHERE AUTHOR_ID = :1`
        params = [req.body.newAuthorId]
        try{
            result = await queryDB(query,params,false);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
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
            try{
                result = await queryDB(query,params,true);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
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
        let query,params,result;
        query = `SELECT COUNT(*) CNT
        FROM PUBLISHER
        WHERE PUBLISHER_NAME = :1`
        params = [req.body.newPublisherName]
        try{
            result = await queryDB(query,params,false);

        }catch(err){
            console.log(`${err}`);
            res.redirect('/admin_page');
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
            params = [req.body.newPublisherPhone]
            try{
                result = await queryDB(query,params,false);
    
            }catch(err){
                console.log(`${err}`);
                res.redirect('/admin_page');
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
                try{
                    result = await queryDB(query,params,true);
        
                }catch(err){
                    console.log(`${err}`);
                    res.redirect('/admin_page');
                    return;
                }
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