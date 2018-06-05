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
-- Table structure for table `formulary`
--

DROP TABLE IF EXISTS `formulary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulary` (
  `Med_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Animal_id` int(11) NOT NULL,
  `medication` varchar(45) NOT NULL,
  `quantity` float DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `purchasedate` date DEFAULT NULL,
  `expirydate` date DEFAULT NULL,
  `drug` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `roa` varchar(45) DEFAULT NULL,
  `vialsize` float DEFAULT NULL,
  `units` float DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Med_ID`),
  KEY `fk6_AID_idx` (`Animal_id`),
<<<<<<< HEAD
  KEY `fk7_EID_idx` (`email_id`)
=======
  KEY `fk7_EID_idx` (`email_id`),
  CONSTRAINT `fk6_AID` FOREIGN KEY (`Animal_id`) REFERENCES `cow_table` (`animal_id`),
  CONSTRAINT `fk7_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`)
>>>>>>> 48d581aeb5eb16d8f854a1945a0a2e499fde5119
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulary`
--

LOCK TABLES `formulary` WRITE;
/*!40000 ALTER TABLE `formulary` DISABLE KEYS */;
/*!40000 ALTER TABLE `formulary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< HEAD
-- Dump completed on 2018-06-05 23:55:01
=======
-- Dump completed on 2018-05-31 21:52:18
>>>>>>> 48d581aeb5eb16d8f854a1945a0a2e499fde5119
