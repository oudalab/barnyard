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
-- Table structure for table `cow_table`
--

DROP TABLE IF EXISTS `cow_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cow_table` (
  `Animal_ID` int(11) NOT NULL,
  `eartag` int(11) NOT NULL,
  `eid` float NOT NULL,
  `sex` varchar(15) NOT NULL,
  `pasturenumber` varchar(45) NOT NULL,
  `breed` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `current_expt_no` int(11) NOT NULL,
  `herdcow_tablecol` varchar(45) NOT NULL,
  `animaltype` varchar(15) NOT NULL,
  `animalname` varchar(45) NOT NULL,
  `breeder` varchar(45) DEFAULT NULL,
  `currentframescore` varchar(45) DEFAULT NULL,
  `damframescore` varchar(45) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `species` varchar(45) DEFAULT NULL,
  `height` float NOT NULL,
  `weight` float NOT NULL,
  `gender` varchar(8) NOT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Animal_ID`),
  UNIQUE KEY `eartag_UNIQUE` (`eartag`),
  KEY `fk_email_id_idx` (`email_id`),
  KEY `fk_PNO_idx` (`pasturenumber`),
  KEY `fk_ExptNO_idx` (`current_expt_no`),
  CONSTRAINT `fk_ExptNO` FOREIGN KEY (`current_expt_no`) REFERENCES `experiment` (`expt_no`),
  CONSTRAINT `fk_PNO` FOREIGN KEY (`pasturenumber`) REFERENCES `pasture` (`pasturenumbergrazing`),
  CONSTRAINT `fk_email_id` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cow_table`
--

LOCK TABLES `cow_table` WRITE;
/*!40000 ALTER TABLE `cow_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `cow_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-31 21:52:17
