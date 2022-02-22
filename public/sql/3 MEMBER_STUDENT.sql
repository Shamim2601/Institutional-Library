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

 Date: 22/02/2022 20:42:11
*/


-- ----------------------------
-- Table structure for MEMBER_STUDENT
-- ----------------------------
DROP TABLE "C##INSLIB"."MEMBER_STUDENT";
CREATE TABLE "C##INSLIB"."MEMBER_STUDENT" (
  "STUDENT_ID" NUMBER VISIBLE,
  "RESIDENCE" VARCHAR2(255 BYTE) VISIBLE,
  "MEMBER_ID" NUMBER(10,0) VISIBLE NOT NULL
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
-- Records of MEMBER_STUDENT
-- ----------------------------
INSERT INTO "C##INSLIB"."MEMBER_STUDENT" VALUES ('1245', 'RBH', '3');
INSERT INTO "C##INSLIB"."MEMBER_STUDENT" VALUES ('8475', 'KNH', '1');
INSERT INTO "C##INSLIB"."MEMBER_STUDENT" VALUES ('4878', 'attached', '2');

-- ----------------------------
-- Checks structure for table MEMBER_STUDENT
-- ----------------------------
ALTER TABLE "C##INSLIB"."MEMBER_STUDENT" ADD CONSTRAINT "SYS_C007576" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##INSLIB"."MEMBER_STUDENT" ADD CONSTRAINT "SYS_C007679" CHECK ("MEMBER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table MEMBER_STUDENT
-- ----------------------------
ALTER TABLE "C##INSLIB"."MEMBER_STUDENT" ADD CONSTRAINT "STU_MEM_FK" FOREIGN KEY ("MEMBER_ID") REFERENCES "C##INSLIB"."MEMBER" ("MEMBER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
