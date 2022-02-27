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

 Date: 22/02/2022 20:42:46
*/


-- ----------------------------
-- Table structure for NEWS_AND_EVENTS
-- ----------------------------
--DROP TABLE "C##INSLIB"."NEWS_AND_EVENTS";
CREATE TABLE "C##INSLIB"."NEWS_AND_EVENTS" (
  "NEWS_DATE" DATE VISIBLE DEFAULT SYSDATE,
  "TITLE" VARCHAR2(255 BYTE) VISIBLE,
  "DESCRIPTION" VARCHAR2(3800 BYTE) VISIBLE,
  "IMAGE" VARCHAR2(255 BYTE) VISIBLE
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
-- Records of NEWS_AND_EVENTS
-- ----------------------------
INSERT INTO "C##INSLIB"."NEWS_AND_EVENTS" VALUES (TO_DATE('2022-02-12 10:54:01', 'SYYYY-MM-DD HH24:MI:SS'), 'HSC result published!', 'A total of 95.26 percent students passed 2021 Higher Secondary Certificate (HSC) and equivalent examinations across the country.

Education Minister Dipu Moni announced the results on behalf of Prime Minister Sheikh Hasina at the International Mother Language Institute in Dhaka today.

The pass rate of HSC is 95.57 percent, madrasa 95.49 percent and vocational 92.85 percent.

A total of 96.20 percent students passed the HSC exams under Dhaka Board, 89.39 percent under Chattogram, 97.49 percent in Cumilla, 95.76 percent in Barishal, 94.80 percent in Sylhet, 92.43 percent in Dinajpur, 98.11 percent in Jashore, 95.71 percent in Mymensingh, and 97.29 percent in Rajshahi Board.', 'https://images.thedailystar.net/sites/default/files/styles/very_big_1/public/images/2022/02/13/pass.jpg');
INSERT INTO "C##INSLIB"."NEWS_AND_EVENTS" VALUES (TO_DATE('2022-02-09 10:59:20', 'SYYYY-MM-DD HH24:MI:SS'), 'New books are coming!', 'Ekushey boimela is going on. Our library is going to be ornamented with new books very soon. Readers are requested to keep an eye on the new arrivals section.', 'https://thefinancialexpress.com.bd/uploads/1511016735.jpg');
INSERT INTO "C##INSLIB"."NEWS_AND_EVENTS" VALUES (TO_DATE('2022-02-11 11:03:37', 'SYYYY-MM-DD HH24:MI:SS'), 'Ekushey Boi Mela to be held from February 15-28', 'The 2022 edition of the Amar Ekushey Book Fair, which usually begins on the first day of February, will be held from February 15-28, subject to certain conditions regarding the Omicron situation amid the Covid-19 global pandemic.

The new date was stated in a letter issued by the Bangla Academy and signed by the secretary of the academy, AHM Lokman, on Sunday.

“Considering the current situation of Covid-19, the government has decided to hold Amar Ekushey Book Fair 2022 from February 15 to February 28, subject to certain conditions. Therefore, all staff involved in the book fair have been requested to take Covid-19 vaccines and booster doses as per the requirement of adults,” wrote Lokman.

The letter also stated that the academy has already sent a letter to the Directorate General of Health Services (DGHS) chief to set up a vaccination booth on the academy premises as per the instruction of the ministry.', 'https://new-media.dhakatribune.com/en/uploads/2022/02/01/book-fair-8-1582130905204.jpeg');
INSERT INTO "C##INSLIB"."NEWS_AND_EVENTS" VALUES (TO_DATE('2021-09-04 11:46:04', 'SYYYY-MM-DD HH24:MI:SS'), 'Teachers’ Day 2021: Importance, history and significance of Teachers’ Day', 'Dedicated to teachers and the role they play in shaping their students’ lives, every year September 5 is celebrated as Teachers’ Day. The day also commemorates the birth anniversary of scholar and Bharat Ratna recipient Dr Sarvepalli Radhakrishnan, who was born on the same day in 1888.', 'https://images.indianexpress.com/2021/09/teachers-day-feature1200.jpg');
