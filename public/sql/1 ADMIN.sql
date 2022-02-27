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

 Date: 22/02/2022 20:35:14
*/


-- ----------------------------
-- Table structure for ADMIN
-- ----------------------------
--DROP TABLE "C##INSLIB"."ADMIN";
CREATE TABLE "C##INSLIB"."ADMIN" (
  "ADMIN_ID" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "ADMIN_PSW" VARCHAR2(255 BYTE) VISIBLE,
  "NAME" VARCHAR2(255 BYTE) VISIBLE,
  "EMAIL" VARCHAR2(255 BYTE) VISIBLE,
  "PHONE_NUMBER" VARCHAR2(20 BYTE) VISIBLE
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
-- Records of ADMIN
-- ----------------------------
INSERT INTO "C##INSLIB"."ADMIN" VALUES ('AD1', '4321', 'ADMIN1', 'ad1@gmail.com', '1703902176');

-- ----------------------------
-- Primary Key structure for table ADMIN
-- ----------------------------
ALTER TABLE "C##INSLIB"."ADMIN" ADD CONSTRAINT "SYS_C007589" PRIMARY KEY ("ADMIN_ID");

-- ----------------------------
-- Checks structure for table ADMIN
-- ----------------------------
ALTER TABLE "C##INSLIB"."ADMIN" ADD CONSTRAINT "SYS_C007588" CHECK ("ADMIN_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
