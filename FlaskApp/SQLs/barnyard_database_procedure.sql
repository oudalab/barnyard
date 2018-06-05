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
-- Table structure for table `procedure`
--

DROP TABLE IF EXISTS `procedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `procedure` (
  `procedure_id` int(11) NOT NULL AUTO_INCREMENT,
  `Animal_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `reasonforprocedure` varchar(45) DEFAULT NULL,
  `notificationofvmo` varchar(45) DEFAULT NULL,
  `recommendationofvmo` varchar(45) DEFAULT NULL,
  `treatmentprotocol` varchar(45) DEFAULT NULL,
  `animallocationpreresolution` varchar(45) DEFAULT NULL,
  `followupexam` varchar(45) DEFAULT NULL,
  `dateoffollowup` date DEFAULT NULL,
  `animallocation` varchar(45) DEFAULT NULL,
  `date_of_action` date DEFAULT NULL,
  `med_id` int(11) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`procedure_id`),
  KEY `fk3_AID_idx` (`Animal_id`),
  KEY `fk3_EID_idx` (`email_id`),
  KEY `fk3_MID_idx` (`med_id`),
  KEY `fk5_AID_idx` (`Animal_id`),
  CONSTRAINT `fk5_AID` FOREIGN KEY (`Animal_id`) REFERENCES `cow_table` (`animal_id`),
  CONSTRAINT `fk5_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`),
  CONSTRAINT `fk5_MID` FOREIGN KEY (`med_id`) REFERENCES `formulary` (`med_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedure`
--

LOCK TABLES `procedure` WRITE;
/*!40000 ALTER TABLE `procedure` DISABLE KEYS */;
/*!40000 ALTER TABLE `procedure` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-31 21:52:20
