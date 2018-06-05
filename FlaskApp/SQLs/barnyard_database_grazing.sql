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
-- Table structure for table `grazing`
--

DROP TABLE IF EXISTS `grazing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grazing` (
  `Animal_id` int(11) NOT NULL,
  `pastureacres` varchar(45) DEFAULT NULL,
  `animalspresent` int(11) DEFAULT NULL,
  `datein` date DEFAULT NULL,
  `dateout` date DEFAULT NULL,
  `stockingrate` varchar(45) DEFAULT NULL,
  `pasturenumbergrazing` varchar(45) DEFAULT NULL,
  `sample` varchar(45) DEFAULT NULL,
  `biomass` varchar(45) DEFAULT NULL,
  `DMavailable` varchar(45) DEFAULT NULL,
  `cp` varchar(45) DEFAULT NULL,
  `cp1` varchar(45) DEFAULT NULL,
  `cp2` varchar(45) DEFAULT NULL,
  `cp3` varchar(45) DEFAULT NULL,
  `cp4` varchar(45) DEFAULT NULL,
  KEY `fk1_animal_id_idx` (`Animal_id`),
  KEY `fk_pasture_no_idx` (`pasturenumbergrazing`),
  CONSTRAINT `fk1_P-no` FOREIGN KEY (`pasturenumbergrazing`) REFERENCES `pasture` (`pasturenumbergrazing`),
  CONSTRAINT `fk1_animal_id` FOREIGN KEY (`Animal_id`) REFERENCES `cow_table` (`animal_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grazing`
--

LOCK TABLES `grazing` WRITE;
/*!40000 ALTER TABLE `grazing` DISABLE KEYS */;
/*!40000 ALTER TABLE `grazing` ENABLE KEYS */;
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
