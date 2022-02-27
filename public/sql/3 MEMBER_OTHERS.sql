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

 Date: 22/02/2022 20:41:55
*/


-- ----------------------------
-- Table structure for MEMBER_OTHERS
-- ----------------------------
--DROP TABLE "C##INSLIB"."MEMBER_OTHERS";
CREATE TABLE "C##INSLIB"."MEMBER_OTHERS" (
  "MEMBER_ID" NUMBER(10,0) VISIBLE NOT NULL,
  "ADDRESS" VARCHAR2(255 BYTE) VISIBLE,
  "DESIGNATION" VARCHAR2(255 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of MEMBER_OTHERS
-- ----------------------------

-- ----------------------------
-- Checks structure for table MEMBER_OTHERS
-- ----------------------------
ALTER TABLE "C##INSLIB"."MEMBER_OTHERS" ADD CONSTRAINT "SYS_C007581" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##INSLIB"."MEMBER_OTHERS" ADD CONSTRAINT "SYS_C007582" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table MEMBER_OTHERS
-- ----------------------------
ALTER TABLE "C##INSLIB"."MEMBER_OTHERS" ADD CONSTRAINT "OTH_MEM_FK" FOREIGN KEY ("MEMBER_ID") REFERENCES "C##INSLIB"."MEMBER" ("MEMBER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
