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

 Date: 22/02/2022 20:39:03
*/


-- ----------------------------
-- Table structure for BOOKLIST_OTHERS
-- ----------------------------
DROP TABLE "C##INSLIB"."BOOKLIST_OTHERS";
CREATE TABLE "C##INSLIB"."BOOKLIST_OTHERS" (
  "BOOK_ID" NUMBER(10,0) VISIBLE NOT NULL,
  "CATEGORY" VARCHAR2(255 BYTE) VISIBLE,
  "GENRE" VARCHAR2(255 BYTE) VISIBLE
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
-- Records of BOOKLIST_OTHERS
-- ----------------------------
INSERT INTO "C##INSLIB"."BOOKLIST_OTHERS" VALUES ('11', 'BANGLA_LITERATURE', 'STORY');
INSERT INTO "C##INSLIB"."BOOKLIST_OTHERS" VALUES ('12', 'BANGLA_LITERATURE', 'STORY');
INSERT INTO "C##INSLIB"."BOOKLIST_OTHERS" VALUES ('14', 'Other', 'children');
INSERT INTO "C##INSLIB"."BOOKLIST_OTHERS" VALUES ('13', 'BANGLA_LITERATURE', 'NOVEL');

-- ----------------------------
-- Checks structure for table BOOKLIST_OTHERS
-- ----------------------------
ALTER TABLE "C##INSLIB"."BOOKLIST_OTHERS" ADD CONSTRAINT "SYS_C007574" CHECK ("BOOK_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table BOOKLIST_OTHERS
-- ----------------------------
ALTER TABLE "C##INSLIB"."BOOKLIST_OTHERS" ADD CONSTRAINT "OT_BOOK_FK" FOREIGN KEY ("BOOK_ID") REFERENCES "C##INSLIB"."BOOK" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
