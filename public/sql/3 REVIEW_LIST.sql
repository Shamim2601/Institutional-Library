/*
 Navicat Premium Data Transfer

 Source Server         : Oracle
 Source Server Type    : Oracle
 Source Server Version : 190000
 Source Host           : localhost:1521
 Source Schema         : C##INSLIB

 Target Server Type    : Oracle
 Target Server Version : 190000
 File Encoding         : 65001

 Date: 22/02/2022 20:43:18
*/


-- ----------------------------
-- Table structure for REVIEW_LIST
-- ----------------------------
DROP TABLE "C##INSLIB"."REVIEW_LIST";
CREATE TABLE "C##INSLIB"."REVIEW_LIST" (
  "MEMBER_ID" NUMBER VISIBLE NOT NULL,
  "BOOK_ID" NUMBER VISIBLE,
  "REVIEW_TEXT" VARCHAR2(4000 BYTE) VISIBLE,
  "ADD_DATE" DATE VISIBLE DEFAULT SYSDATE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of REVIEW_LIST
-- ----------------------------
INSERT INTO "C##INSLIB"."REVIEW_LIST" VALUES ('1', '11', 'Just because it does not have a translation in English, otherwise it would have been considered as one of the best travel stories books of all time. So for now, it is the best-written Bangla book on traveling.', TO_DATE('2022-02-10 15:49:54', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##INSLIB"."REVIEW_LIST" VALUES ('2', '11', 'Writer has a very good sense of humor.', TO_DATE('2022-02-10 18:51:58', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##INSLIB"."REVIEW_LIST" VALUES ('3', '11', 'My favourite book so far.', TO_DATE('2022-02-10 19:02:22', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##INSLIB"."REVIEW_LIST" VALUES ('2', '13', 'this book has shown the flow of love over time. Ending is pathetic however realistic. Another master piece of Tagore.', TO_DATE('2022-02-10 19:49:27', 'SYYYY-MM-DD HH24:MI:SS'));

-- ----------------------------
-- Checks structure for table REVIEW_LIST
-- ----------------------------
ALTER TABLE "C##INSLIB"."REVIEW_LIST" ADD CONSTRAINT "SYS_C007592" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REVIEW_LIST
-- ----------------------------
ALTER TABLE "C##INSLIB"."REVIEW_LIST" ADD CONSTRAINT "REV_BK_FK" FOREIGN KEY ("BOOK_ID") REFERENCES "C##INSLIB"."BOOK" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##INSLIB"."REVIEW_LIST" ADD CONSTRAINT "REV_MEM_FK" FOREIGN KEY ("MEMBER_ID") REFERENCES "C##INSLIB"."MEMBER" ("MEMBER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
