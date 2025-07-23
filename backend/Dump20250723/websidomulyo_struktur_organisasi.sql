-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: websidomulyo
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `struktur_organisasi`
--

DROP TABLE IF EXISTS `struktur_organisasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struktur_organisasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jabatan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipe` enum('kepala_desa','sekretaris','kaur','kasi','kasun') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_struktur_tipe` (`tipe`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `struktur_organisasi`
--

LOCK TABLES `struktur_organisasi` WRITE;
/*!40000 ALTER TABLE `struktur_organisasi` DISABLE KEYS */;
INSERT INTO `struktur_organisasi` VALUES (1,'mulawdadw','Kepala Desa','/uploads/foto-1753271373564-102274900.png','kepala_desa','2025-07-20 15:49:55','2025-07-23 11:49:33'),(2,'afaefaefjaelfjlaflaelfaelflae','Sekretaris Desa','/uploads/foto-1753271213753-690914240.jpg','sekretaris','2025-07-20 15:49:55','2025-07-23 11:50:42'),(3,'M. Agus Wahyudi Z','Kasi Pemerintahan',NULL,'kasi','2025-07-20 15:49:55','2025-07-20 15:49:55'),(4,'Muhammad Rifai','Kasi Kesra',NULL,'kasi','2025-07-20 15:49:55','2025-07-20 15:49:55'),(5,'Subur','Kasi Pelayanan',NULL,'kasi','2025-07-20 15:49:55','2025-07-20 15:49:55'),(6,'Wahyu Nur H','Kaur TU & Umum',NULL,'kaur','2025-07-20 15:49:55','2025-07-20 15:49:55'),(7,'Titin Juharnani','Kaur Keuangan',NULL,'kaur','2025-07-20 15:49:55','2025-07-20 15:49:55'),(8,'Rachmad Irvan N.I','Kaur Perencanaan',NULL,'kaur','2025-07-20 15:49:55','2025-07-20 15:49:55'),(9,'M. Jamhuri','Kasun Bareng',NULL,'kasun','2025-07-20 15:49:55','2025-07-20 15:49:55'),(10,'Fathul Mu\'in','Kasun Tebelo',NULL,'kasun','2025-07-20 15:49:55','2025-07-20 15:49:55'),(11,'Eko Hendri S','Kasun Mangunrejo',NULL,'kasun','2025-07-20 15:49:55','2025-07-20 15:49:55'),(12,'Saparu','Kasun Sumberkreco',NULL,'kasun','2025-07-20 15:49:55','2025-07-20 15:49:55');
/*!40000 ALTER TABLE `struktur_organisasi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-23 22:06:27
