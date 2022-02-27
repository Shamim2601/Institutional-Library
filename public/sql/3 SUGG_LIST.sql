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

 Date: 22/02/2022 20:43:35
*/


-- ----------------------------
-- Table structure for SUGG_LIST
-- ----------------------------
--DROP TABLE "C##INSLIB"."SUGG_LIST";
CREATE TABLE "C##INSLIB"."SUGG_LIST" (
  "MEMBER_ID" NUMBER VISIBLE NOT NULL,
  "MESSAGE" VARCHAR2(255 BYTE) VISIBLE
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
-- Records of SUGG_LIST
-- ----------------------------
INSERT INTO "C##INSLIB"."SUGG_LIST" VALUES ('1', 'Everything is fine. However, if the library would remain open on thursday from 2pm to 4pm, it would be very nice.');

-- ----------------------------
-- Checks structure for table SUGG_LIST
-- ----------------------------
ALTER TABLE "C##INSLIB"."SUGG_LIST" ADD CONSTRAINT "SYS_C007771" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table SUGG_LIST
-- ----------------------------
ALTER TABLE "C##INSLIB"."SUGG_LIST" ADD CONSTRAINT "SUG_MEM_FK" FOREIGN KEY ("MEMBER_ID") REFERENCES "C##INSLIB"."MEMBER" ("MEMBER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
