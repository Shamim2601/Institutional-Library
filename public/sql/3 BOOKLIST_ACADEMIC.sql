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

 Date: 22/02/2022 20:38:47
*/


-- ----------------------------
-- Table structure for BOOKLIST_ACADEMIC
-- ----------------------------
DROP TABLE "C##INSLIB"."BOOKLIST_ACADEMIC";
CREATE TABLE "C##INSLIB"."BOOKLIST_ACADEMIC" (
  "BOOK_ID" NUMBER(10,0) VISIBLE,
  "SUBJECT" VARCHAR2(255 BYTE) VISIBLE,
  "DEPARTMENT" VARCHAR2(255 BYTE) VISIBLE
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
ENABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of BOOKLIST_ACADEMIC
-- ----------------------------
INSERT INTO "C##INSLIB"."BOOKLIST_ACADEMIC" VALUES ('21', 'MATHEMATICS', 'SCIENCE');

-- ----------------------------
-- Foreign Keys structure for table BOOKLIST_ACADEMIC
-- ----------------------------
ALTER TABLE "C##INSLIB"."BOOKLIST_ACADEMIC" ADD CONSTRAINT "AC_BOOK_FK" FOREIGN KEY ("BOOK_ID") REFERENCES "C##INSLIB"."BOOK" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
