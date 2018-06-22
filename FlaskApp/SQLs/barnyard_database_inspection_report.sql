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
-- Table structure for table `inspection_report`
--

DROP TABLE IF EXISTS `inspection_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inspection_report` (
  `report_ID` bigint(10) NOT NULL AUTO_INCREMENT,
  `pasture_ID` bigint(10) DEFAULT NULL,
  `general_appearance` varchar(45) DEFAULT NULL,
  `live_stock` varchar(45) DEFAULT NULL,
  `date` date NOT NULL,
  `animal_condition` varchar(45) DEFAULT NULL,
  `fencing` varchar(45) DEFAULT NULL,
  `access_to_food` varchar(45) DEFAULT NULL,
  `access_to_water` varchar(45) DEFAULT NULL,
  `cleaniness_of_water` varchar(45) DEFAULT NULL,
  `access_to_shelter` varchar(45) DEFAULT NULL,
  `comments` longtext,
  `pasture_major_deficiencies` longtext,
  `pasture_minor_deficiencies` longtext,
  `email_ID` varchar(45) DEFAULT NULL,
  `builinding_number` varchar(45) DEFAULT NULL,
  `lighting` varchar(45) DEFAULT NULL,
  `housekeeping` varchar(45) DEFAULT NULL,
  `head_catch_condition` varchar(45) DEFAULT NULL,
  `non-slip_surface_evidence` varchar(45) DEFAULT NULL,
  `Pen_condition` varchar(45) DEFAULT NULL,
  `container_disposal` varchar(45) DEFAULT NULL,
  `drug_storage` varchar(45) DEFAULT NULL,
  `building_minor_deficiencies` longtext,
  `building_major_deficiencies` longtext,
  PRIMARY KEY (`report_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspection_report`
--

LOCK TABLES `inspection_report` WRITE;
/*!40000 ALTER TABLE `inspection_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `inspection_report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-21 22:32:25
