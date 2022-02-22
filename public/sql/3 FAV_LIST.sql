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

 Date: 22/02/2022 20:39:33
*/


-- ----------------------------
-- Table structure for FAV_LIST
-- ----------------------------
DROP TABLE "C##INSLIB"."FAV_LIST";
CREATE TABLE "C##INSLIB"."FAV_LIST" (
  "MEMBER_ID" NUMBER VISIBLE NOT NULL,
  "BOOK_ID" NUMBER VISIBLE
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
-- Records of FAV_LIST
-- ----------------------------
INSERT INTO "C##INSLIB"."FAV_LIST" VALUES ('1', '13');
INSERT INTO "C##INSLIB"."FAV_LIST" VALUES ('1', '11');
INSERT INTO "C##INSLIB"."FAV_LIST" VALUES ('3', '11');

-- ----------------------------
-- Checks structure for table FAV_LIST
-- ----------------------------
ALTER TABLE "C##INSLIB"."FAV_LIST" ADD CONSTRAINT "SYS_C007764" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FAV_LIST
-- ----------------------------
ALTER TABLE "C##INSLIB"."FAV_LIST" ADD CONSTRAINT "FAV_BK_FK" FOREIGN KEY ("BOOK_ID") REFERENCES "C##INSLIB"."BOOK" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##INSLIB"."FAV_LIST" ADD CONSTRAINT "FAV_MEM_FK" FOREIGN KEY ("MEMBER_ID") REFERENCES "C##INSLIB"."MEMBER" ("MEMBER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
