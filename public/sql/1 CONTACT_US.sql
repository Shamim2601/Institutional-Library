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

 Date: 22/02/2022 20:39:20
*/


-- ----------------------------
-- Table structure for CONTACT_US
-- ----------------------------
--DROP TABLE "C##INSLIB"."CONTACT_US";
CREATE TABLE "C##INSLIB"."CONTACT_US" (
  "NAME" VARCHAR2(255 BYTE) VISIBLE,
  "EMAIL" VARCHAR2(255 BYTE) VISIBLE,
  "PHONE_NUMBER" VARCHAR2(20 BYTE) VISIBLE,
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
-- Records of CONTACT_US
-- ----------------------------
INSERT INTO "C##INSLIB"."CONTACT_US" VALUES ('sajid', 'sajidulty7@gmail.com', '00128379', 'I want to be member.');
