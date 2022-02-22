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

 Date: 22/02/2022 20:43:02
*/


-- ----------------------------
-- Table structure for PUBLISHER
-- ----------------------------
DROP TABLE "C##INSLIB"."PUBLISHER";
CREATE TABLE "C##INSLIB"."PUBLISHER" (
  "PUBLISHER_NAME" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "ADDRESS" VARCHAR2(255 BYTE) VISIBLE,
  "PHONE_NUMBER" VARCHAR2(255 BYTE) VISIBLE
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
-- Records of PUBLISHER
-- ----------------------------
INSERT INTO "C##INSLIB"."PUBLISHER" VALUES ('KOTHAMALA', 'DHAKA', '0148759847');
INSERT INTO "C##INSLIB"."PUBLISHER" VALUES ('HAKKANI', 'BANGLABAZAR, DHAKA-1212', '016874837');
INSERT INTO "C##INSLIB"."PUBLISHER" VALUES ('SIMON AND SCHUSTER', 'UK', '+48759-4569');

-- ----------------------------
-- Primary Key structure for table PUBLISHER
-- ----------------------------
ALTER TABLE "C##INSLIB"."PUBLISHER" ADD CONSTRAINT "SYS_C007667" PRIMARY KEY ("PUBLISHER_NAME");

-- ----------------------------
-- Checks structure for table PUBLISHER
-- ----------------------------
ALTER TABLE "C##INSLIB"."PUBLISHER" ADD CONSTRAINT "SYS_C007561" CHECK ("PUBLISHER_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
