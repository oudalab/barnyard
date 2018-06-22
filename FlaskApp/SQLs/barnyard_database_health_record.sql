-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: barnyard_database
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `health_record`
--

DROP TABLE IF EXISTS `health_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `health_record` (
  `Animal_id` bigint(10) NOT NULL,
  `Type` varchar(45) DEFAULT NULL,
  `Documents` varchar(45) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `email_id` varchar(45) NOT NULL,
  `reasonforprocedure` varchar(45) DEFAULT NULL,
  `notificationofvmo` varchar(45) DEFAULT NULL,
  `recommendationofvmo` varchar(45) DEFAULT NULL,
  `followupexam` varchar(45) DEFAULT NULL,
  `followupexamdate` date DEFAULT NULL,
  `animallocation` varchar(45) DEFAULT NULL,
  `date_of_action` date DEFAULT NULL,
  `Record_ID` bigint(10) NOT NULL AUTO_INCREMENT,
  `Procedure_ID` bigint(10) NOT NULL,
  `quantity` float DEFAULT NULL,
  `Medicine_ID` bigint(10) DEFAULT NULL,
  PRIMARY KEY (`Record_ID`),
  KEY `F_AID_idx` (`Animal_id`),
  KEY `F_EID_idx` (`email_id`),
  KEY `FK_ProcID_idx` (`Procedure_ID`),
  KEY `FK_MID_idx` (`Medicine_ID`),
  CONSTRAINT `FK_MID` FOREIGN KEY (`Medicine_ID`) REFERENCES `formulary` (`medicine_id`),
  CONSTRAINT `FK_ProcID` FOREIGN KEY (`Procedure_ID`) REFERENCES `procedures` (`procedure_id`),
  CONSTRAINT `F_AID` FOREIGN KEY (`Animal_id`) REFERENCES `animal_table` (`animal_id`),
  CONSTRAINT `F_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health_record`
--

LOCK TABLES `health_record` WRITE;
/*!40000 ALTER TABLE `health_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `health_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-21 22:32:57
