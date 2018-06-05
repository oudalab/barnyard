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
-- Table structure for table `reproduction`
--

DROP TABLE IF EXISTS `reproduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reproduction` (
  `Animal_id` int(11) NOT NULL,
  `breeding` varchar(45) DEFAULT NULL,
  `pregnancy` varchar(45) DEFAULT NULL,
  `siblingcode` varchar(45) DEFAULT NULL,
  `calfatside` varchar(45) DEFAULT NULL,
  `totalcalves` int(11) DEFAULT NULL,
  `previouscalf` varchar(45) DEFAULT NULL,
  `currentcalf` varchar(45) DEFAULT NULL,
  `calfsex` varchar(45) DEFAULT NULL,
  `calfbirthweight` float DEFAULT NULL,
  `calfdob` date DEFAULT NULL,
  `damageatbirth` varchar(45) DEFAULT NULL,
  `pasturenumberreproduction` varchar(45) DEFAULT NULL,
  `damcalvingdisposition` varchar(45) DEFAULT NULL,
  `calvingease` varchar(45) DEFAULT NULL,
  `udderscore` float DEFAULT NULL,
  `conditionscorecalving` float DEFAULT NULL,
  `hiphtweaning2015` float DEFAULT NULL,
  `hiphtweaning2016` float DEFAULT NULL,
  `hiphtbreeding2016` float DEFAULT NULL,
  `damdisposition` varchar(45) DEFAULT NULL,
  `cowframescore` float DEFAULT NULL,
  `cowwtbreeding` float DEFAULT NULL,
  `cowhtbreeding` float DEFAULT NULL,
  `cowwtweaning` float DEFAULT NULL,
  `cowhtweaning` float DEFAULT NULL,
  `cowwtcalving` float DEFAULT NULL,
  `cowhtcalving` float DEFAULT NULL,
  `bcsweaning` float DEFAULT NULL,
  `bcscalving` float DEFAULT NULL,
  `bcsbreeding` float DEFAULT NULL,
  `customcowwt` float DEFAULT NULL,
  `customcowht` float DEFAULT NULL,
  `bulldisposition` float DEFAULT NULL,
  `bullframescore` float DEFAULT NULL,
  `bullwtprebreeding` float DEFAULT NULL,
  `bullhtprebreeding` float DEFAULT NULL,
  `fertility` varchar(45) DEFAULT NULL,
  `mobility` varchar(45) DEFAULT NULL,
  `conc` varchar(45) DEFAULT NULL,
  `deadabnormal` float DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  KEY `fk1_AID_idx` (`Animal_id`),
  KEY `fk_EID_idx` (`email_id`),
  CONSTRAINT `fk1_AID` FOREIGN KEY (`Animal_id`) REFERENCES `cow_table` (`animal_id`),
  CONSTRAINT `fk_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reproduction`
--

LOCK TABLES `reproduction` WRITE;
/*!40000 ALTER TABLE `reproduction` DISABLE KEYS */;
/*!40000 ALTER TABLE `reproduction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-31 21:52:19
