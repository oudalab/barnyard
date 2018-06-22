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
-- Table structure for table `pasture`
--



DROP TABLE IF EXISTS `pasture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pasture` (
  `pasturenumberburning` varchar(45) DEFAULT NULL,
  `dateburned` date DEFAULT NULL,
  `qualityofburn` varchar(45) DEFAULT NULL,
  `pasturenumberpesticide` varchar(45) DEFAULT NULL,
  `chemicalname` varchar(45) DEFAULT NULL,
  `applicationrate` varchar(45) DEFAULT NULL,
  `applicationdate` date DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `pasturenumber` varchar(45) NOT NULL,
  `pasture_ID` bigint(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pasture_ID`),
  INDEX `fk4_EID_idx` (`email_id`),
  CONSTRAINT `fk4_EID` FOREIGN KEY (`email_id`) REFERENCES `login` (`email_id`)  ON DELETE NO ACTION
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasture`
--

LOCK TABLES `pasture` WRITE;
/*!40000 ALTER TABLE `pasture` DISABLE KEYS */;
INSERT INTO `pasture` VALUES (NULL,'0000-00-00',NULL,NULL,NULL,NULL,'0000-00-00','test','0',0),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','6',1),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','9',2),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','10',3),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','11',4),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','13',5),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','14',6),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','20',7),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','51',8),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','56',9),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','65',10),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','77',11),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','78',12),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','88',13),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','12E',14),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','7 North',15),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','7 South',16),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','C1',17),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','C2',18),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','Quarantine 1',19),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','Ra',20),('null','0000-00-00',NULL,'null','null','null','0000-00-00','test','Rb',21);
/*!40000 ALTER TABLE `pasture` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-21 22:33:08
