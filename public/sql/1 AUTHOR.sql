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

 Date: 22/02/2022 20:38:14
*/


-- ----------------------------
-- Table structure for AUTHOR
-- ----------------------------
--DROP TABLE "C##INSLIB"."AUTHOR";
CREATE TABLE "C##INSLIB"."AUTHOR" (
  "AUTHOR_ID" VARCHAR2(5 BYTE) VISIBLE NOT NULL,
  "AUTHOR_NAME" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "NATIONALITY" VARCHAR2(255 BYTE) VISIBLE,
  "LIFE_SPAN" VARCHAR2(255 BYTE) VISIBLE
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
-- Records of AUTHOR
-- ----------------------------
INSERT INTO "C##INSLIB"."AUTHOR" VALUES ('SUKA', 'SUFIA KAMAL', 'BENGALI', ':2006');
INSERT INTO "C##INSLIB"."AUTHOR" VALUES ('RNT', 'RABINDRA NATH TAGORE', 'BENGALI', '1861: 1941');
INSERT INTO "C##INSLIB"."AUTHOR" VALUES ('SMA', 'SYED MUJTABA ALI', 'BENGALI', ' JAN-1911: MAY-76');
INSERT INTO "C##INSLIB"."AUTHOR" VALUES ('NAS', 'NATHAN ART-SHILLER', 'ENGLISH', NULL);

-- ----------------------------
-- Primary Key structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##INSLIB"."AUTHOR" ADD CONSTRAINT "SYS_C007665" PRIMARY KEY ("AUTHOR_ID");

-- ----------------------------
-- Checks structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##INSLIB"."AUTHOR" ADD CONSTRAINT "SYS_C007559" CHECK ("AUTHOR_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##INSLIB"."AUTHOR" ADD CONSTRAINT "SYS_C007560" CHECK ("AUTHOR_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
