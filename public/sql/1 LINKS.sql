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

 Date: 22/02/2022 20:40:17
*/


-- ----------------------------
-- Table structure for LINKS
-- ----------------------------
--DROP TABLE "C##INSLIB"."LINKS";
CREATE TABLE "C##INSLIB"."LINKS" (
  "LINK_NAME" VARCHAR2(255 BYTE) VISIBLE,
  "LINK_TEXT" VARCHAR2(255 BYTE) VISIBLE,
  "ADD_DATE" DATE VISIBLE DEFAULT SYSDATE NOT NULL
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
-- Records of LINKS
-- ----------------------------
INSERT INTO "C##INSLIB"."LINKS" VALUES ('10 minute school', 'www.10minuteschool.com', TO_DATE('2022-02-08 14:44:04', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##INSLIB"."LINKS" VALUES ('Ministry of Education', 'http://www.moedu.gov.bd/', TO_DATE('2022-02-08 14:34:54', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##INSLIB"."LINKS" VALUES ('Sikkhok.com', ' www.shikkhok.com', TO_DATE('2022-02-08 14:36:45', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##INSLIB"."LINKS" VALUES ('Onnorokom Pathshala', 'http://onnorokompathshala.com/', TO_DATE('2022-02-08 14:37:46', 'SYYYY-MM-DD HH24:MI:SS'));

-- ----------------------------
-- Checks structure for table LINKS
-- ----------------------------
ALTER TABLE "C##INSLIB"."LINKS" ADD CONSTRAINT "SYS_C007809" CHECK ("ADD_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
