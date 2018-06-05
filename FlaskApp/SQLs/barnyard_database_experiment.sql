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
-- Table structure for table `experiment`
--

DROP TABLE IF EXISTS `experiment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiment` (
  `Animal_id` int(11) NOT NULL,
  `expt_no` int(11) NOT NULL,
  `animaltype` varchar(45) DEFAULT NULL,
  `birthweight` float DEFAULT NULL,
  `birthweightadj` float DEFAULT NULL,
  `sireframescore` float DEFAULT NULL,
  `bcsrecent` float DEFAULT NULL,
  `bcsprevious` float DEFAULT NULL,
  `bcsdifference` float DEFAULT NULL,
  `damwtatwean` float DEFAULT NULL,
  `weanheight` float DEFAULT NULL,
  `weanweight` float DEFAULT NULL,
  `weandate` date DEFAULT NULL,
  `weangpd` varchar(45) DEFAULT NULL,
  `weanhipht` float DEFAULT NULL,
  `weanwda` float DEFAULT NULL,
  `weanweightdate` date DEFAULT NULL,
  `adj205w` float DEFAULT NULL,
  `adj205h` float DEFAULT NULL,
  `weanframescore` float DEFAULT NULL,
  `ageatwean` float DEFAULT NULL,
  `yearlingweight` float DEFAULT NULL,
  `yearlingheight` float DEFAULT NULL,
  `yearlingdate` date DEFAULT NULL,
  `adjyearlingw` float DEFAULT NULL,
  `adjyearlingh` float DEFAULT NULL,
  `yearlingframescore` float DEFAULT NULL,
  `ageatyearling` float DEFAULT NULL,
  `customweight` float DEFAULT NULL,
  `customweightdate` date DEFAULT NULL,
  `customheight` float DEFAULT NULL,
  `customheightdate` date DEFAULT NULL,
  `currentwtcow` varchar(45) DEFAULT NULL,
  `adj365dht` varchar(45) DEFAULT NULL,
  `currentwtheifer` varchar(45) DEFAULT NULL,
  `backfat` float DEFAULT NULL,
  `treatment` varchar(45) DEFAULT NULL,
  `blockpen` varchar(45) DEFAULT NULL,
  `replicate` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`expt_no`),
  KEY `fk2_AID_idx` (`Animal_id`),
  KEY `fk2_EID_idx` (`email_id`),
  CONSTRAINT `fk2_AID` FOREIGN KEY (`Animal_id`) REFERENCES `cow_table` (`animal_id`),
  CONSTRAINT `fk2_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiment`
--

LOCK TABLES `experiment` WRITE;
/*!40000 ALTER TABLE `experiment` DISABLE KEYS */;
/*!40000 ALTER TABLE `experiment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-31 21:52:18
