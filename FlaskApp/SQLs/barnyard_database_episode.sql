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
-- Table structure for table `episode`
--

DROP TABLE IF EXISTS `episode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `episode` (
  `Episode_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Animal_id` bigint(10) NOT NULL,
  `Type` varchar(45) DEFAULT NULL,
  `Documents` varchar(45) NOT NULL,
  `start_date` varchar(45) DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `procedure_id` int(11) DEFAULT NULL,
  `Med_ID` int(11) DEFAULT NULL,
  `expt_no` int(11) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Episode_ID`),
  KEY `fk8_AID_idx` (`Animal_id`),
  KEY `fk8_EID_idx` (`email_id`),
  KEY `fk8_PID_idx` (`procedure_id`),
  KEY `fk8_MID_idx` (`Med_ID`),
  KEY `fk8_EptID_idx` (`expt_no`),
  CONSTRAINT `fk8_AID` FOREIGN KEY (`Animal_id`) REFERENCES `animal_table` (`Animal_ID`),
  CONSTRAINT `fk8_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`),
  CONSTRAINT `fk8_EptID` FOREIGN KEY (`expt_no`) REFERENCES `experiment` (`expt_no`),
  CONSTRAINT `fk8_MID` FOREIGN KEY (`Med_ID`) REFERENCES `formulary` (`med_id`),
  CONSTRAINT `fk8_PID` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`procedure_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episode`
--

LOCK TABLES `episode` WRITE;
/*!40000 ALTER TABLE `episode` DISABLE KEYS */;
/*!40000 ALTER TABLE `episode` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-07 19:39:59
