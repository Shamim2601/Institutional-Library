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

 Date: 22/02/2022 20:35:37
*/


-- ----------------------------
-- Table structure for APPLICANT
-- ----------------------------
--DROP TABLE "C##INSLIB"."APPLICANT";
CREATE TABLE "C##INSLIB"."APPLICANT" (
  "NAME" VARCHAR2(255 BYTE) VISIBLE,
  "TYPE" VARCHAR2(255 BYTE) VISIBLE,
  "DEPT" VARCHAR2(255 BYTE) VISIBLE,
  "ID" VARCHAR2(255 BYTE) VISIBLE,
  "DATE_OF_BIRTH" DATE VISIBLE,
  "ADDRESS" VARCHAR2(255 BYTE) VISIBLE,
  "EMAIL" VARCHAR2(255 BYTE) VISIBLE,
  "PHONE_NUMBER" NUMBER(11,0) VISIBLE,
  "BLOOD_GROUP" VARCHAR2(255 BYTE) VISIBLE,
  "RESIDENCE" VARCHAR2(255 BYTE) VISIBLE,
  "DESIGNATION" VARCHAR2(255 BYTE) VISIBLE,
  "PASSWORD" VARCHAR2(255 BYTE) VISIBLE
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
-- Records of APPLICANT
-- ----------------------------
INSERT INTO "C##INSLIB"."APPLICANT" VALUES ('Khairul', 'student', 'science', '48795', TO_DATE('2003-06-05 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), 'Tangail', NULL, '13684765', 'B-', 'MH', NULL, '456kjh');
INSERT INTO "C##INSLIB"."APPLICANT" VALUES ('mamun', 'other', 'administration', 'staff34', TO_DATE('1995-07-23 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), 'Sherpur, Mymensing', 'mamun345@yahoo.com', '1748983459', 'AB+', NULL, NULL, 'iu5ht85');
INSERT INTO "C##INSLIB"."APPLICANT" VALUES ('nilima rayhan', 'teacher', 'commerce', 'nira', TO_DATE('1980-09-06 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), 'Gopalpur', 'nr465@gmail.com', '15559839', 'B-', NULL, 'Lecturer', '8urihi6');
INSERT INTO "C##INSLIB"."APPLICANT" VALUES ('Akash rahman', 'teacher', 'humanities', 'AKR', TO_DATE('1993-05-03 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), 'Dhaka', 'sky45@gmail.com', '4859187', 'O-', NULL, 'Lecturer', 'djglkfjg7');
