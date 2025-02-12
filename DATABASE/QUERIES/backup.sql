-- MySQL dump 10.13  Distrib 8.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: recycle_x
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Rajvardhan','Patil','raj2003@gmail.com','$2a$10$Asy8pvEv9BTv90SnBhOLX.CxRaieLH28NpU8JL3zjEoE.NllyRVXC',1,'2025-02-11 03:18:16','2025-02-11 03:18:16'),(2,'Dhanashri','Bhosale','dhanashribhosale2002@gmail.com','$2a$10$BTmj8UX8PtB5XHe9xoCl8uKXcBRA2s7zhP03zg78t.2gMmupE/Doa',1,'2025-02-11 03:19:08','2025-02-11 03:19:08');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumer`
--

DROP TABLE IF EXISTS `consumer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumer` (
  `consumer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `imageName` varchar(50) DEFAULT 'default.jpg',
  `pincode` varchar(20) NOT NULL,
  `consumer_type` enum('Individual','Organization','Government') NOT NULL DEFAULT 'Individual',
  `consumer_status` enum('Active','InActive') NOT NULL DEFAULT 'Active',
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_by` varchar(255) DEFAULT (current_user()) /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`consumer_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_consumer_first_name` (`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumer`
--

LOCK TABLES `consumer` WRITE;
/*!40000 ALTER TABLE `consumer` DISABLE KEYS */;
INSERT INTO `consumer` (`consumer_id`, `first_name`, `last_name`, `email`, `mobile_number`, `password`, `state`, `city`, `imageName`, `pincode`, `consumer_type`, `consumer_status`, `registered_at`, `last_modified_at`, `last_modified_by`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,'Rajvardhan','Patil','raj@example.com','9075857927','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1','Maharashtra','Kolhapur','Uploads/Consumer_Images/Final Day Recipet.jpeg','416114','Individual','Active','2025-02-08 09:10:28','2025-02-09 01:02:15','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(2,'Dhanu','Patil','dhanashribhosale2002@gmail.com','9476583210','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1','MH','Kodoli','default.jpg','560001','Individual','Active','2025-02-09 10:05:49','2025-02-09 10:05:49','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(4,'Rajvardhan','Patil','raj2003patil@gmail.com','9075857927','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1','Maharashtra','Kolhapur','default.jpg','416116','Individual','Active','2025-02-10 09:59:11','2025-02-10 09:59:11','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `consumer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `consumer_v`
--

DROP TABLE IF EXISTS `consumer_v`;
/*!50001 DROP VIEW IF EXISTS `consumer_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consumer_v` AS SELECT 
 1 AS `consumer_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `email`,
 1 AS `mobile_number`,
 1 AS `password`,
 1 AS `state`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `imageName`,
 1 AS `consumer_type`,
 1 AS `consumer_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `consumercart`
--

DROP TABLE IF EXISTS `consumercart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumercart` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `subcategory_id` int DEFAULT NULL,
  `consumer_id` int NOT NULL,
  `quantity_kg` float NOT NULL,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`item_id`),
  KEY `subcategory_id` (`subcategory_id`),
  KEY `consumer_id` (`consumer_id`),
  CONSTRAINT `consumercart_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `recyclingsubcategories` (`subcategory_id`) ON DELETE SET NULL,
  CONSTRAINT `consumercart_ibfk_2` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`),
  CONSTRAINT `consumercart_chk_1` CHECK ((`quantity_kg` > 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumercart`
--

LOCK TABLES `consumercart` WRITE;
/*!40000 ALTER TABLE `consumercart` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumercart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `consumercart_v`
--

DROP TABLE IF EXISTS `consumercart_v`;
/*!50001 DROP VIEW IF EXISTS `consumercart_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consumercart_v` AS SELECT 
 1 AS `item_id`,
 1 AS `subcategory_id`,
 1 AS `quantity_kg`,
 1 AS `consumer_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `consumerorderitems`
--

DROP TABLE IF EXISTS `consumerorderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumerorderitems` (
  `item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `subcategory_id` int DEFAULT NULL,
  `quantity_kg` float NOT NULL,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`item_id`,`order_id`),
  KEY `order_id` (`order_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `consumerorderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `consumerorders` (`order_id`),
  CONSTRAINT `consumerorderitems_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `recyclingsubcategories` (`subcategory_id`) ON DELETE SET NULL,
  CONSTRAINT `consumerorderitems_chk_1` CHECK ((`quantity_kg` >= 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumerorderitems`
--

LOCK TABLES `consumerorderitems` WRITE;
/*!40000 ALTER TABLE `consumerorderitems` DISABLE KEYS */;
INSERT INTO `consumerorderitems` (`item_id`, `order_id`, `subcategory_id`, `quantity_kg`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,2,1,2,NULL,NULL,NULL,NULL,NULL),(1,3,1,5,NULL,NULL,NULL,NULL,NULL),(1,7,5,1.5,NULL,NULL,NULL,NULL,NULL),(1,8,1,1.5,NULL,NULL,NULL,NULL,NULL),(2,3,1,5,NULL,NULL,NULL,NULL,NULL),(2,6,1,8,NULL,NULL,NULL,NULL,NULL),(3,6,2,8,NULL,NULL,NULL,NULL,NULL),(4,6,5,8,NULL,NULL,NULL,NULL,NULL),(6,1,3,2,NULL,NULL,NULL,NULL,NULL),(7,6,1,1.25,NULL,NULL,NULL,NULL,NULL),(8,6,2,2,NULL,NULL,NULL,NULL,NULL),(9,6,3,1.5,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `consumerorderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `consumerorderitems_v`
--

DROP TABLE IF EXISTS `consumerorderitems_v`;
/*!50001 DROP VIEW IF EXISTS `consumerorderitems_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consumerorderitems_v` AS SELECT 
 1 AS `item_id`,
 1 AS `order_id`,
 1 AS `subcategory_id`,
 1 AS `quantity_kg`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `consumerorders`
--

DROP TABLE IF EXISTS `consumerorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumerorders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `consumer_id` int DEFAULT NULL,
  `order_date` date NOT NULL DEFAULT (curdate()),
  `order_time` time NOT NULL DEFAULT (curtime()),
  `delivery_id` int DEFAULT NULL,
  `order_status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`order_id`),
  KEY `consumer_id` (`consumer_id`),
  KEY `delivery_id` (`delivery_id`),
  CONSTRAINT `consumerorders_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`),
  CONSTRAINT `consumerorders_ibfk_2` FOREIGN KEY (`delivery_id`) REFERENCES `deliveryaddress` (`delivery_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumerorders`
--

LOCK TABLES `consumerorders` WRITE;
/*!40000 ALTER TABLE `consumerorders` DISABLE KEYS */;
INSERT INTO `consumerorders` (`order_id`, `consumer_id`, `order_date`, `order_time`, `delivery_id`, `order_status`, `created_at`, `updated_at`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,'2025-02-09','06:23:54',1,'pending','2025-02-09 00:53:54','2025-02-09 00:53:54',NULL,NULL,NULL,NULL,NULL),(2,1,'2025-02-09','06:24:35',1,'pending','2025-02-09 00:54:35','2025-02-09 00:54:35',NULL,NULL,NULL,NULL,NULL),(3,1,'2025-02-09','06:26:45',1,'pending','2025-02-09 00:56:45','2025-02-09 00:56:45',NULL,NULL,NULL,NULL,NULL),(4,1,'2025-02-09','06:29:34',2,'pending','2025-02-09 00:59:34','2025-02-09 00:59:34',NULL,NULL,NULL,NULL,NULL),(5,1,'2025-02-09','06:45:31',2,'pending','2025-02-09 01:15:31','2025-02-09 01:15:31',NULL,NULL,NULL,NULL,NULL),(6,2,'2025-02-11','00:03:08',8,'pending','2025-02-10 18:33:08','2025-02-10 18:33:08',NULL,NULL,NULL,NULL,NULL),(7,2,'2025-02-11','00:17:22',8,'pending','2025-02-10 18:47:22','2025-02-10 18:47:22',NULL,NULL,NULL,NULL,NULL),(8,4,'2025-02-11','00:51:01',9,'pending','2025-02-10 19:21:01','2025-02-10 19:21:01',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `consumerorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `consumerorders_v`
--

DROP TABLE IF EXISTS `consumerorders_v`;
/*!50001 DROP VIEW IF EXISTS `consumerorders_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consumerorders_v` AS SELECT 
 1 AS `order_id`,
 1 AS `consumer_id`,
 1 AS `order_date`,
 1 AS `order_time`,
 1 AS `delivery_id`,
 1 AS `order_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `consumerselections`
--

DROP TABLE IF EXISTS `consumerselections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumerselections` (
  `selection_id` int NOT NULL AUTO_INCREMENT,
  `consumer_id` int DEFAULT NULL,
  `rp_category_id` int DEFAULT NULL,
  PRIMARY KEY (`selection_id`),
  KEY `consumer_id` (`consumer_id`),
  KEY `rp_category_id` (`rp_category_id`),
  CONSTRAINT `consumerselections_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`),
  CONSTRAINT `consumerselections_ibfk_2` FOREIGN KEY (`rp_category_id`) REFERENCES `recyclingcategories` (`rp_category_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumerselections`
--

LOCK TABLES `consumerselections` WRITE;
/*!40000 ALTER TABLE `consumerselections` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumerselections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `consumerselections_v`
--

DROP TABLE IF EXISTS `consumerselections_v`;
/*!50001 DROP VIEW IF EXISTS `consumerselections_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `consumerselections_v` AS SELECT 
 1 AS `selection_id`,
 1 AS `consumer_id`,
 1 AS `rp_category_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `deliveryaddress`
--

DROP TABLE IF EXISTS `deliveryaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryaddress` (
  `delivery_id` int NOT NULL AUTO_INCREMENT,
  `consumer_id` int DEFAULT NULL,
  `consumer_name` varchar(255) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`delivery_id`),
  KEY `consumer_id` (`consumer_id`),
  CONSTRAINT `deliveryaddress_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryaddress`
--

LOCK TABLES `deliveryaddress` WRITE;
/*!40000 ALTER TABLE `deliveryaddress` DISABLE KEYS */;
INSERT INTO `deliveryaddress` (`delivery_id`, `consumer_id`, `consumer_name`, `state`, `city`, `pincode`, `street_name`, `landmark`, `created_at`, `updated_at`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,'Raj','Maharashtra','guhahati','500001','barshi','solapur','2025-02-08 09:10:28','2025-02-08 17:47:46',NULL,NULL,NULL,NULL,NULL),(2,1,'Aditi Sharma','Maharashtra','Mumbai','400001','Marine Drive','Near Nariman Point','2025-02-08 17:46:57','2025-02-08 17:46:57',NULL,NULL,NULL,NULL,NULL),(3,1,'Rohan Patil','Maharashtra','Nagpur','440001','Wardha Road','Opposite Big Bazaar','2025-02-08 17:46:57','2025-02-08 17:46:57',NULL,NULL,NULL,NULL,NULL),(4,1,'Priya Deshmukh','Maharashtra','Thane','400601','Ghodbunder Road','Near Hypercity Mall','2025-02-08 17:46:57','2025-02-08 17:46:57',NULL,NULL,NULL,NULL,NULL),(5,1,'Siddharth Kulkarni','Maharashtra','Aurangabad','431001','Jalna Road','Near Prozone Mall','2025-02-08 17:46:57','2025-02-08 17:46:57',NULL,NULL,NULL,NULL,NULL),(7,1,'sam','asam','guhahati','500001','barshi','solapur','2025-02-08 17:47:36','2025-02-08 17:47:36',NULL,NULL,NULL,NULL,NULL),(8,2,'Dhanu Patil','MH','Kodoli','560001','','','2025-02-09 10:05:49','2025-02-09 10:05:49',NULL,NULL,NULL,NULL,NULL),(9,4,'Rajvardhan Patil','Maharashtra','Kolhapur','416116','','','2025-02-10 09:59:11','2025-02-10 09:59:11',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `deliveryaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `deliveryaddress_v`
--

DROP TABLE IF EXISTS `deliveryaddress_v`;
/*!50001 DROP VIEW IF EXISTS `deliveryaddress_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `deliveryaddress_v` AS SELECT 
 1 AS `delivery_id`,
 1 AS `consumer_id`,
 1 AS `consumer_name`,
 1 AS `state`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `street_name`,
 1 AS `landmark`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pickupaddress`
--

DROP TABLE IF EXISTS `pickupaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pickupaddress` (
  `pickup_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`pickup_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `pickupaddress_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickupaddress`
--

LOCK TABLES `pickupaddress` WRITE;
/*!40000 ALTER TABLE `pickupaddress` DISABLE KEYS */;
INSERT INTO `pickupaddress` (`pickup_id`, `supplier_id`, `supplier_name`, `state`, `city`, `pincode`, `street_name`, `landmark`, `created_at`, `updated_at`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,'Dhanashri','Maharastra','Satara','53459','ShivajiChowk','Near Shivaji Park1','2025-02-09 01:03:14','2025-02-09 01:14:11',NULL,NULL,NULL,NULL,NULL),(2,1,'Dhanu','Maharastra','Satara','53423','ShivajiChowk','Near Shivaji Park','2025-02-09 01:14:01','2025-02-09 01:14:01',NULL,NULL,NULL,NULL,NULL),(3,2,'Rakesh Gupta','Uttar Pradesh','Kanpur','208001','','','2025-02-09 08:14:31','2025-02-09 08:14:31',NULL,NULL,NULL,NULL,NULL),(5,3,'Dhanu','Maharastra','Satara1','53423','ShivajiChowk','Near Shivaji Park','2025-02-10 06:16:14','2025-02-10 06:16:14',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `pickupaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pickupaddress_v`
--

DROP TABLE IF EXISTS `pickupaddress_v`;
/*!50001 DROP VIEW IF EXISTS `pickupaddress_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pickupaddress_v` AS SELECT 
 1 AS `pickup_id`,
 1 AS `supplier_id`,
 1 AS `supplier_name`,
 1 AS `state`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `street_name`,
 1 AS `landmark`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `recyclingcategories`
--

DROP TABLE IF EXISTS `recyclingcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recyclingcategories` (
  `rp_category_id` int NOT NULL AUTO_INCREMENT,
  `rp_category_name` varchar(255) NOT NULL,
  `rp_category_image` varchar(50) NOT NULL,
  `category_description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_by` varchar(255) NOT NULL DEFAULT (current_user()) /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`rp_category_id`),
  UNIQUE KEY `rp_category_name` (`rp_category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recyclingcategories`
--

LOCK TABLES `recyclingcategories` WRITE;
/*!40000 ALTER TABLE `recyclingcategories` DISABLE KEYS */;
INSERT INTO `recyclingcategories` (`rp_category_id`, `rp_category_name`, `rp_category_image`, `category_description`, `created_at`, `last_modified_at`, `last_modified_by`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,'Plastic Recycling','plastic_recycling.jpg','Collection and Sorting, Cleaning and Preparation, Reprocessing, Forming New Products, Advanced Techniques','2025-02-10 06:35:56','2025-02-10 06:35:56','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(2,'Metal Recycling','metal_recycling.jpg','Collection & Sorting, Cleaning, Shredding/Crushing, Melting, Refining, Casting, Cooling & Solidifying, Forming New Products','2025-02-10 06:35:56','2025-02-10 06:35:56','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(3,'Paper Recycling','paper_recycling.jpg','Collection & Sorting, Shredding, Pulping, Screening & Cleaning, De-Inking, Bleaching, Refining & Mixing, Forming New Paper','2025-02-10 06:35:56','2025-02-10 06:35:56','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(4,'Electronics Recycling','electronics_recycling.jpg','Collection & Sorting, Dismantling, Shredding, Separation, Extraction, Purification, Reforming, Forming New Products','2025-02-10 06:35:56','2025-02-10 06:35:56','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(5,'Glass Recycling','glass_recycling.jpg','Collection & Sorting, Cleaning, Crushing, Melting, Refining, Forming, Cooling & Solidifying','2025-02-10 06:35:56','2025-02-10 06:35:56','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `recyclingcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `recyclingcategories_v`
--

DROP TABLE IF EXISTS `recyclingcategories_v`;
/*!50001 DROP VIEW IF EXISTS `recyclingcategories_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `recyclingcategories_v` AS SELECT 
 1 AS `rp_category_id`,
 1 AS `rp_category_name`,
 1 AS `rp_category_image`,
 1 AS `category_description`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `recyclingsubcategories`
--

DROP TABLE IF EXISTS `recyclingsubcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recyclingsubcategories` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `rp_category_id` int DEFAULT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `subcategory_image` varchar(50) NOT NULL,
  `price_per_kg` float NOT NULL,
  `category_description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_by` varchar(255) NOT NULL DEFAULT (current_user()) /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`subcategory_id`),
  UNIQUE KEY `subcategory_name` (`subcategory_name`),
  KEY `rp_category_id` (`rp_category_id`),
  CONSTRAINT `recyclingsubcategories_ibfk_1` FOREIGN KEY (`rp_category_id`) REFERENCES `recyclingcategories` (`rp_category_id`) ON DELETE SET NULL,
  CONSTRAINT `recyclingsubcategories_chk_1` CHECK ((`price_per_kg` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recyclingsubcategories`
--

LOCK TABLES `recyclingsubcategories` WRITE;
/*!40000 ALTER TABLE `recyclingsubcategories` DISABLE KEYS */;
INSERT INTO `recyclingsubcategories` (`subcategory_id`, `rp_category_id`, `subcategory_name`, `subcategory_image`, `price_per_kg`, `category_description`, `created_at`, `updated_at`, `last_modified_by`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,'Plastic Granules','plastic_granules.jpg',40,'Recycled plastic converted into granules or pellets, used for manufacturing new plastic products.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(2,1,'Plastic Powder','plastic_powder.jpg',35,'Recycled plastic ground into fine powder for industrial applications like coating and fabrication.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(3,2,'Metal Sheets','metal_sheets.jpg',120,'Recycled metal converted into sheets for manufacturing vehicles, appliances, and construction materials.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(4,2,'Metal Ingots','metal_ingots.jpg',150,'Pure metal blocks created from recycled metals, used in various industrial processes.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(5,3,'Recycled Pulp','recycled_pulp.jpg',8,'Recycled paper processed into pulp for producing new paper and packaging materials.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(6,3,'Recycled Cardboard','recycled_cardboard.jpg',10,'Processed cardboard sheets for packaging and shipping industries.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(7,4,'Recovered Precious Metals','recovered_precious_metals.jpg',3000,'Metals like gold, silver, and platinum extracted from electronic waste for industrial and jewelry purposes.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(8,4,'Recycled Electronic Components','recycled_electronic_components.jpg',500,'Components like capacitors, chips, and circuits reclaimed from electronics for reuse.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(9,5,'Crushed Glass (Cullet)','crushed_glass.jpg',12,'Crushed glass particles used in manufacturing new glass products and construction materials.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(10,5,'Recycled Glass Powder','recycled_glass_powder.jpg',15,'Finely ground glass used in applications like road materials and decorative products.','2025-02-10 06:37:08','2025-02-10 06:37:08','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `recyclingsubcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `recyclingsubcategories_v`
--

DROP TABLE IF EXISTS `recyclingsubcategories_v`;
/*!50001 DROP VIEW IF EXISTS `recyclingsubcategories_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `recyclingsubcategories_v` AS SELECT 
 1 AS `subcategory_id`,
 1 AS `rp_category_id`,
 1 AS `subcategory_name`,
 1 AS `price_per_kg`,
 1 AS `subcategory_image`,
 1 AS `category_description`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `servicezones`
--

DROP TABLE IF EXISTS `servicezones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicezones` (
  `pincode` varchar(10) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `service_type` enum('Delivery','Pickup','Both') NOT NULL,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`pincode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicezones`
--

LOCK TABLES `servicezones` WRITE;
/*!40000 ALTER TABLE `servicezones` DISABLE KEYS */;
INSERT INTO `servicezones` (`pincode`, `state`, `city`, `district`, `service_type`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES ('110001','Delhi','New Delhi','Central Delhi','Pickup',NULL,NULL,NULL,NULL,NULL),('143001','Punjab','Amritsar','Amritsar','Pickup',NULL,NULL,NULL,NULL,NULL),('226001','Uttar Pradesh','Lucknow','Lucknow','Both',NULL,NULL,NULL,NULL,NULL),('302001','Rajasthan','Jaipur','Jaipur','Delivery',NULL,NULL,NULL,NULL,NULL),('400001','Maharashtra','Mumbai','Mumbai City','Delivery',NULL,NULL,NULL,NULL,NULL),('411001','Maharashtra','Pune','Pune','Delivery',NULL,NULL,NULL,NULL,NULL),('500001','Telangana','Hyderabad','Hyderabad','Delivery',NULL,NULL,NULL,NULL,NULL),('560001','Karnataka','Bangalore','Bangalore Urban','Both',NULL,NULL,NULL,NULL,NULL),('600001','Tamil Nadu','Chennai','Chennai','Pickup',NULL,NULL,NULL,NULL,NULL),('700001','West Bengal','Kolkata','Kolkata','Both',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `servicezones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `servicezones_v`
--

DROP TABLE IF EXISTS `servicezones_v`;
/*!50001 DROP VIEW IF EXISTS `servicezones_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `servicezones_v` AS SELECT 
 1 AS `pincode`,
 1 AS `state`,
 1 AS `city`,
 1 AS `district`,
 1 AS `service_type`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `imageName` varchar(50) DEFAULT 'default.jpg',
  `pincode` char(6) NOT NULL,
  `supplier_type` enum('Individual','Organization','Government') NOT NULL DEFAULT 'Individual',
  `supplier_status` enum('Active','InActive') NOT NULL DEFAULT 'Active',
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_by` varchar(255) DEFAULT (current_user()) /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `mobile_number` (`mobile_number`),
  KEY `idx_supplier_first_name` (`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` (`supplier_id`, `first_name`, `last_name`, `mobile_number`, `password`, `state`, `city`, `imageName`, `pincode`, `supplier_type`, `supplier_status`, `registered_at`, `last_modified_at`, `last_modified_by`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,'Rajvardhan','Patil','7758067094','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1','Maharashtra','Satara','default.jpg','415116','Individual','Active','2025-02-09 01:03:14','2025-02-09 01:04:04','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(2,'Rakesh','Gupta','8858623471','34caf25ba6f154dae7bcdde0b49efbe7920f63af25e6e6c876890e83e1dd8bed','Uttar Pradesh','Kanpur','default.jpg','208001','Individual','Active','2025-02-09 08:14:30','2025-02-09 08:14:30','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(3,'Rajvardhan','Patil','9075857927','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1','Maharashtra','Kolhapur','default.jpg','416116','Individual','Active','2025-02-09 10:55:46','2025-02-10 02:35:09','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `supplier_v`
--

DROP TABLE IF EXISTS `supplier_v`;
/*!50001 DROP VIEW IF EXISTS `supplier_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `supplier_v` AS SELECT 
 1 AS `supplier_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `mobile_number`,
 1 AS `password`,
 1 AS `state`,
 1 AS `city`,
 1 AS `pincode`,
 1 AS `imageName`,
 1 AS `supplier_type`,
 1 AS `supplier_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `suppliercart`
--

DROP TABLE IF EXISTS `suppliercart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliercart` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `subcategory_id` int DEFAULT NULL,
  `supplier_id` int NOT NULL,
  `quantity_kg` float NOT NULL,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`item_id`),
  KEY `subcategory_id` (`subcategory_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `suppliercart_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `trashsubcategories` (`subcategory_id`) ON DELETE SET NULL,
  CONSTRAINT `suppliercart_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `suppliercart_chk_1` CHECK ((`quantity_kg` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliercart`
--

LOCK TABLES `suppliercart` WRITE;
/*!40000 ALTER TABLE `suppliercart` DISABLE KEYS */;
INSERT INTO `suppliercart` (`item_id`, `subcategory_id`, `supplier_id`, `quantity_kg`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,1,5,NULL,NULL,NULL,NULL,NULL),(9,12,3,1.5,NULL,NULL,NULL,NULL,NULL),(10,1,3,1.5,NULL,NULL,NULL,NULL,NULL),(11,2,3,2.5,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `suppliercart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `suppliercart_v`
--

DROP TABLE IF EXISTS `suppliercart_v`;
/*!50001 DROP VIEW IF EXISTS `suppliercart_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `suppliercart_v` AS SELECT 
 1 AS `item_id`,
 1 AS `subcategory_id`,
 1 AS `quantity_kg`,
 1 AS `supplier_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplierorderitems`
--

DROP TABLE IF EXISTS `supplierorderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplierorderitems` (
  `item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `subcategory_id` int DEFAULT NULL,
  `quantity_kg` float NOT NULL,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`item_id`,`order_id`),
  KEY `order_id` (`order_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `supplierorderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `supplierorders` (`order_id`),
  CONSTRAINT `supplierorderitems_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `trashsubcategories` (`subcategory_id`) ON DELETE SET NULL,
  CONSTRAINT `supplierorderitems_chk_1` CHECK ((`quantity_kg` >= 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierorderitems`
--

LOCK TABLES `supplierorderitems` WRITE;
/*!40000 ALTER TABLE `supplierorderitems` DISABLE KEYS */;
INSERT INTO `supplierorderitems` (`item_id`, `order_id`, `subcategory_id`, `quantity_kg`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (2,1,1,5,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `supplierorderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `supplierorderitems_v`
--

DROP TABLE IF EXISTS `supplierorderitems_v`;
/*!50001 DROP VIEW IF EXISTS `supplierorderitems_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `supplierorderitems_v` AS SELECT 
 1 AS `item_id`,
 1 AS `order_id`,
 1 AS `subcategory_id`,
 1 AS `quantity_kg`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplierorders`
--

DROP TABLE IF EXISTS `supplierorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplierorders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `order_date` date NOT NULL DEFAULT (curdate()),
  `order_time` time NOT NULL DEFAULT (curtime()),
  `pickup_id` int DEFAULT NULL,
  `order_status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`order_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `pickup_id` (`pickup_id`),
  CONSTRAINT `supplierorders_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `supplierorders_ibfk_2` FOREIGN KEY (`pickup_id`) REFERENCES `pickupaddress` (`pickup_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierorders`
--

LOCK TABLES `supplierorders` WRITE;
/*!40000 ALTER TABLE `supplierorders` DISABLE KEYS */;
INSERT INTO `supplierorders` (`order_id`, `supplier_id`, `order_date`, `order_time`, `pickup_id`, `order_status`, `created_at`, `updated_at`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,'2025-02-09','06:45:01',1,'pending','2025-02-09 01:15:01','2025-02-09 01:15:01',NULL,NULL,NULL,NULL,NULL),(2,1,'2025-02-09','06:45:53',1,'pending','2025-02-09 01:15:53','2025-02-09 01:15:53',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `supplierorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `supplierorders_v`
--

DROP TABLE IF EXISTS `supplierorders_v`;
/*!50001 DROP VIEW IF EXISTS `supplierorders_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `supplierorders_v` AS SELECT 
 1 AS `order_id`,
 1 AS `supplier_id`,
 1 AS `order_date`,
 1 AS `order_time`,
 1 AS `pickup_id`,
 1 AS `order_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplierselections`
--

DROP TABLE IF EXISTS `supplierselections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplierselections` (
  `selection_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`selection_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `supplierselections_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `supplierselections_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `trashcategories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierselections`
--

LOCK TABLES `supplierselections` WRITE;
/*!40000 ALTER TABLE `supplierselections` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplierselections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `supplierselections_v`
--

DROP TABLE IF EXISTS `supplierselections_v`;
/*!50001 DROP VIEW IF EXISTS `supplierselections_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `supplierselections_v` AS SELECT 
 1 AS `selection_id`,
 1 AS `supplier_id`,
 1 AS `category_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `trashcategories`
--

DROP TABLE IF EXISTS `trashcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trashcategories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_image` varchar(50) NOT NULL,
  `category_description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_by` varchar(255) NOT NULL DEFAULT (current_user()) /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trashcategories`
--

LOCK TABLES `trashcategories` WRITE;
/*!40000 ALTER TABLE `trashcategories` DISABLE KEYS */;
INSERT INTO `trashcategories` (`category_id`, `category_name`, `category_image`, `category_description`, `created_at`, `last_modified_at`, `last_modified_by`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,'PLASTIC','plastic.jpg','Waste material that includes synthetic or semi-synthetic organic compounds.','2025-02-09 13:30:18','2025-02-09 13:30:18','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(2,'METAL','metal.jpg','Waste material that consists of metallic substances.','2025-02-09 13:30:18','2025-02-09 13:30:18','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(3,'PAPER','paper.jpg','Waste material that consists of paper products.','2025-02-09 13:30:18','2025-02-09 13:30:18','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(4,'GLASS','glass.jpg','Waste material made up of glass products.','2025-02-09 13:30:18','2025-02-09 13:30:18','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(5,'MIX WASTE','mix_waste.jpg','A category for waste materials that include a combination of plastic, metal, paper, electronics, glass, biodegradable, and rubber waste. This category contains a variety of waste types that are collected together and require specialized processing for recycling and disposal.','2025-02-09 13:30:18','2025-02-09 13:30:18','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `trashcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `trashcategories_v`
--

DROP TABLE IF EXISTS `trashcategories_v`;
/*!50001 DROP VIEW IF EXISTS `trashcategories_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `trashcategories_v` AS SELECT 
 1 AS `category_id`,
 1 AS `category_name`,
 1 AS `category_image`,
 1 AS `category_description`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `trashsubcategories`
--

DROP TABLE IF EXISTS `trashsubcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trashsubcategories` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `price_per_kg` float NOT NULL,
  `subcategory_image` varchar(50) NOT NULL,
  `category_description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /*!80023 INVISIBLE */,
  `last_modified_by` varchar(255) NOT NULL DEFAULT (current_user()) /*!80023 INVISIBLE */,
  `extra_col1` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col2` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col3` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col4` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  `extra_col5` varchar(255) DEFAULT NULL /*!80023 INVISIBLE */,
  PRIMARY KEY (`subcategory_id`),
  UNIQUE KEY `subcategory_name` (`subcategory_name`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `trashsubcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `trashcategories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trashsubcategories`
--

LOCK TABLES `trashsubcategories` WRITE;
/*!40000 ALTER TABLE `trashsubcategories` DISABLE KEYS */;
INSERT INTO `trashsubcategories` (`subcategory_id`, `category_id`, `subcategory_name`, `price_per_kg`, `subcategory_image`, `category_description`, `created_at`, `last_modified_at`, `last_modified_by`, `extra_col1`, `extra_col2`, `extra_col3`, `extra_col4`, `extra_col5`) VALUES (1,1,'Hard Plastics',12,'hard_plastics.jpg','Hard plastics, including HDPE and PET plastics, are processed by shredding, cleaning, and melting them into usable raw plastic pellets. These can be reused for manufacturing containers, packaging, and products like toys, reducing the need for virgin plastic.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(2,1,'Soft Plastics',10,'soft_plastics.jpg','Soft plastics are cleaned and shredded before being processed into pellets. These materials are used for packaging, consumer products, and textiles. They are recycled into flexible films, plastic bags, and other useful items.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(3,1,'Mixed Plastics',12,'mixed_plastics.jpg','Mixed plastics include a combination of soft and hard plastics, often found in packaging and household waste. These materials are sorted, shredded, and recycled into pellets for new products.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(4,2,'Iron-Based Metals',18,'iron_metals.jpg','Iron and steel are magnetically separated, cleaned, and melted down to form new ingots or billets for manufacturing construction materials, vehicles, and machinery.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(5,2,'Copper',25,'copper.jpg','Copper is separated, cleaned, and melted into ingots, which are commonly used for electrical wiring, plumbing, and electronics.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(6,2,'Brass',22,'brass.jpg','Brass is separated by type, cleaned, and melted into ingots for use in decorative items, musical instruments, and industrial components.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(7,2,'Mixed Metals',20,'mixed_metals.jpg','Mixed metals consist of both iron-based and non-iron-based waste, such as coated wires or multi-metal components. These are separated magnetically and melted down for reuse.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(8,3,'Newspapers',4,'newspapers.jpg','Newspapers are shredded, cleaned, and processed into pulp, which is then used to produce recycled paper products like packaging materials and insulation.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(9,3,'High-Quality Paper',6,'high_quality_paper.jpg','High-quality paper is cleaned and processed into pulp, which can then be reused to make new paper products such as stationery, office supplies, and packaging materials.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(10,3,'Mixed Paper',5,'mixed_paper.jpg','Mixed paper includes a variety of paper products such as newspapers, cardboard, and office paper. These materials are processed into pulp to create recycled paper products.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(11,4,'Flat Glass',10,'flat_glass.jpg','Flat glass is cleaned, crushed, and melted down to form raw glass material that can be reused in the construction industry for windows, mirrors, and other products.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(12,4,'Glass Bottles and Jars',15,'glass_bottles_jars.jpg','Glass bottles and jars are cleaned, crushed, and melted down into raw glass material that is used to make new containers, jars, and other packaging products.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(13,4,'Decorative Glass',12,'decorative_glass.jpg','Decorative glass is sorted, cleaned, and processed into usable raw materials, which are then reused in the production of new glassware and decorative items.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(14,4,'Mixed Glass',10,'mixed_glass.jpg','Mixed glass includes different types of glass, such as flat glass and bottles, often mixed with other materials. These are cleaned, crushed, and melted into new glass products.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL),(15,5,'Mixed Waste',8,'mixed_waste.jpg','Mixed waste includes a combination of plastic, metal, paper, electronics, glass, biodegradable, and rubber waste. This category contains a variety of waste types that are collected together and require specialized processing for recycling and disposal.','2025-02-09 13:32:29','2025-02-09 13:32:29','W2_87325_Rajvardhan@localhost',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `trashsubcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `trashsubcategories_v`
--

DROP TABLE IF EXISTS `trashsubcategories_v`;
/*!50001 DROP VIEW IF EXISTS `trashsubcategories_v`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `trashsubcategories_v` AS SELECT 
 1 AS `subcategory_id`,
 1 AS `category_id`,
 1 AS `subcategory_name`,
 1 AS `price_per_kg`,
 1 AS `subcategory_image`,
 1 AS `category_description`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `consumer_v`
--

/*!50001 DROP VIEW IF EXISTS `consumer_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consumer_v` AS select `consumer`.`consumer_id` AS `consumer_id`,`consumer`.`first_name` AS `first_name`,`consumer`.`last_name` AS `last_name`,`consumer`.`email` AS `email`,`consumer`.`mobile_number` AS `mobile_number`,`consumer`.`password` AS `password`,`consumer`.`state` AS `state`,`consumer`.`city` AS `city`,`consumer`.`pincode` AS `pincode`,`consumer`.`imageName` AS `imageName`,`consumer`.`consumer_type` AS `consumer_type`,`consumer`.`consumer_status` AS `consumer_status` from `consumer` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `consumercart_v`
--

/*!50001 DROP VIEW IF EXISTS `consumercart_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consumercart_v` AS select `consumercart`.`item_id` AS `item_id`,`consumercart`.`subcategory_id` AS `subcategory_id`,`consumercart`.`quantity_kg` AS `quantity_kg`,`consumercart`.`consumer_id` AS `consumer_id` from `consumercart` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `consumerorderitems_v`
--

/*!50001 DROP VIEW IF EXISTS `consumerorderitems_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consumerorderitems_v` AS select `consumerorderitems`.`item_id` AS `item_id`,`consumerorderitems`.`order_id` AS `order_id`,`consumerorderitems`.`subcategory_id` AS `subcategory_id`,`consumerorderitems`.`quantity_kg` AS `quantity_kg` from `consumerorderitems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `consumerorders_v`
--

/*!50001 DROP VIEW IF EXISTS `consumerorders_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consumerorders_v` AS select `consumerorders`.`order_id` AS `order_id`,`consumerorders`.`consumer_id` AS `consumer_id`,`consumerorders`.`order_date` AS `order_date`,`consumerorders`.`order_time` AS `order_time`,`consumerorders`.`delivery_id` AS `delivery_id`,`consumerorders`.`order_status` AS `order_status` from `consumerorders` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `consumerselections_v`
--

/*!50001 DROP VIEW IF EXISTS `consumerselections_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `consumerselections_v` AS select `consumerselections`.`selection_id` AS `selection_id`,`consumerselections`.`consumer_id` AS `consumer_id`,`consumerselections`.`rp_category_id` AS `rp_category_id` from `consumerselections` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `deliveryaddress_v`
--

/*!50001 DROP VIEW IF EXISTS `deliveryaddress_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `deliveryaddress_v` AS select `deliveryaddress`.`delivery_id` AS `delivery_id`,`deliveryaddress`.`consumer_id` AS `consumer_id`,`deliveryaddress`.`consumer_name` AS `consumer_name`,`deliveryaddress`.`state` AS `state`,`deliveryaddress`.`city` AS `city`,`deliveryaddress`.`pincode` AS `pincode`,`deliveryaddress`.`street_name` AS `street_name`,`deliveryaddress`.`landmark` AS `landmark` from `deliveryaddress` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pickupaddress_v`
--

/*!50001 DROP VIEW IF EXISTS `pickupaddress_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pickupaddress_v` AS select `pickupaddress`.`pickup_id` AS `pickup_id`,`pickupaddress`.`supplier_id` AS `supplier_id`,`pickupaddress`.`supplier_name` AS `supplier_name`,`pickupaddress`.`state` AS `state`,`pickupaddress`.`city` AS `city`,`pickupaddress`.`pincode` AS `pincode`,`pickupaddress`.`street_name` AS `street_name`,`pickupaddress`.`landmark` AS `landmark` from `pickupaddress` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `recyclingcategories_v`
--

/*!50001 DROP VIEW IF EXISTS `recyclingcategories_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `recyclingcategories_v` AS select `recyclingcategories`.`rp_category_id` AS `rp_category_id`,`recyclingcategories`.`rp_category_name` AS `rp_category_name`,`recyclingcategories`.`rp_category_image` AS `rp_category_image`,`recyclingcategories`.`category_description` AS `category_description` from `recyclingcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `recyclingsubcategories_v`
--

/*!50001 DROP VIEW IF EXISTS `recyclingsubcategories_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `recyclingsubcategories_v` AS select `recyclingsubcategories`.`subcategory_id` AS `subcategory_id`,`recyclingsubcategories`.`rp_category_id` AS `rp_category_id`,`recyclingsubcategories`.`subcategory_name` AS `subcategory_name`,`recyclingsubcategories`.`price_per_kg` AS `price_per_kg`,`recyclingsubcategories`.`subcategory_image` AS `subcategory_image`,`recyclingsubcategories`.`category_description` AS `category_description` from `recyclingsubcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `servicezones_v`
--

/*!50001 DROP VIEW IF EXISTS `servicezones_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `servicezones_v` AS select `servicezones`.`pincode` AS `pincode`,`servicezones`.`state` AS `state`,`servicezones`.`city` AS `city`,`servicezones`.`district` AS `district`,`servicezones`.`service_type` AS `service_type` from `servicezones` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supplier_v`
--

/*!50001 DROP VIEW IF EXISTS `supplier_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supplier_v` AS select `supplier`.`supplier_id` AS `supplier_id`,`supplier`.`first_name` AS `first_name`,`supplier`.`last_name` AS `last_name`,`supplier`.`mobile_number` AS `mobile_number`,`supplier`.`password` AS `password`,`supplier`.`state` AS `state`,`supplier`.`city` AS `city`,`supplier`.`pincode` AS `pincode`,`supplier`.`imageName` AS `imageName`,`supplier`.`supplier_type` AS `supplier_type`,`supplier`.`supplier_status` AS `supplier_status` from `supplier` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `suppliercart_v`
--

/*!50001 DROP VIEW IF EXISTS `suppliercart_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `suppliercart_v` AS select `suppliercart`.`item_id` AS `item_id`,`suppliercart`.`subcategory_id` AS `subcategory_id`,`suppliercart`.`quantity_kg` AS `quantity_kg`,`suppliercart`.`supplier_id` AS `supplier_id` from `suppliercart` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supplierorderitems_v`
--

/*!50001 DROP VIEW IF EXISTS `supplierorderitems_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supplierorderitems_v` AS select `supplierorderitems`.`item_id` AS `item_id`,`supplierorderitems`.`order_id` AS `order_id`,`supplierorderitems`.`subcategory_id` AS `subcategory_id`,`supplierorderitems`.`quantity_kg` AS `quantity_kg` from `supplierorderitems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supplierorders_v`
--

/*!50001 DROP VIEW IF EXISTS `supplierorders_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supplierorders_v` AS select `supplierorders`.`order_id` AS `order_id`,`supplierorders`.`supplier_id` AS `supplier_id`,`supplierorders`.`order_date` AS `order_date`,`supplierorders`.`order_time` AS `order_time`,`supplierorders`.`pickup_id` AS `pickup_id`,`supplierorders`.`order_status` AS `order_status` from `supplierorders` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supplierselections_v`
--

/*!50001 DROP VIEW IF EXISTS `supplierselections_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supplierselections_v` AS select `supplierselections`.`selection_id` AS `selection_id`,`supplierselections`.`supplier_id` AS `supplier_id`,`supplierselections`.`category_id` AS `category_id` from `supplierselections` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `trashcategories_v`
--

/*!50001 DROP VIEW IF EXISTS `trashcategories_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `trashcategories_v` AS select `trashcategories`.`category_id` AS `category_id`,`trashcategories`.`category_name` AS `category_name`,`trashcategories`.`category_image` AS `category_image`,`trashcategories`.`category_description` AS `category_description` from `trashcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `trashsubcategories_v`
--

/*!50001 DROP VIEW IF EXISTS `trashsubcategories_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`W2_87325_Rajvardhan`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `trashsubcategories_v` AS select `trashsubcategories`.`subcategory_id` AS `subcategory_id`,`trashsubcategories`.`category_id` AS `category_id`,`trashsubcategories`.`subcategory_name` AS `subcategory_name`,`trashsubcategories`.`price_per_kg` AS `price_per_kg`,`trashsubcategories`.`subcategory_image` AS `subcategory_image`,`trashsubcategories`.`category_description` AS `category_description` from `trashsubcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11  9:07:22
