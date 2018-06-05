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
-- Table structure for table `animal_inventory`
--

DROP TABLE IF EXISTS `animal_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animal_inventory` (
  `Animal_id` int(11) NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `brandlocation` varchar(45) DEFAULT NULL,
  `tattooleft` int(11) DEFAULT NULL,
  `tattooright` int(11) DEFAULT NULL,
  `alternativeid` int(11) DEFAULT NULL,
  `registration` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `hornstatus` varchar(45) DEFAULT NULL,
  `dam` varchar(45) DEFAULT NULL,
  `sire` varchar(45) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `howacquired` varchar(45) DEFAULT NULL,
  `dateacquired` date DEFAULT NULL,
  `howdisposed` varchar(45) DEFAULT NULL,
  `datedisposed` date DEFAULT NULL,
  `disposalreason` varchar(45) DEFAULT NULL,
  `herdnumberlocation` varchar(45) DEFAULT NULL,
  `herdstatus` varchar(45) DEFAULT NULL,
  `howconceived` varchar(45) DEFAULT NULL,
  `managementcode` varchar(45) DEFAULT NULL,
  `ownerID` varchar(45) DEFAULT NULL,
  `springfall` varchar(8) DEFAULT NULL,
  `includeinlookups` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  KEY `fk_Amimal_id_idx` (`Animal_id`),
  KEY `fk1_email_id_idx` (`email_id`),
  CONSTRAINT `fk1_email_id` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`),
  CONSTRAINT `fk_Amimal_id` FOREIGN KEY (`Animal_id`) REFERENCES `cow_table` (`animal_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_inventory`
--

LOCK TABLES `animal_inventory` WRITE;
/*!40000 ALTER TABLE `animal_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `animal_inventory` ENABLE KEYS */;
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
