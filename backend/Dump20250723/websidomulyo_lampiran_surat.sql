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
-- Table structure for table `lampiran_surat`
--

DROP TABLE IF EXISTS `lampiran_surat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lampiran_surat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `surat_id` int NOT NULL,
  `nama_file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_persyaratan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `surat_id` (`surat_id`),
  CONSTRAINT `lampiran_surat_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surat` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lampiran_surat`
--

LOCK TABLES `lampiran_surat` WRITE;
/*!40000 ALTER TABLE `lampiran_surat` DISABLE KEYS */;
INSERT INTO `lampiran_surat` VALUES (1,1,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753274051072-761116584.jpg','Fotokopi KK dan KTP orang tua','2025-07-23 12:34:11'),(2,1,'pexels-soundarapandian-ms-150090807-17469096 (1).jpg','/uploads/files-1753274051094-234077610.jpg','Surat keterangan lahir dari bidan/rumah sakit','2025-07-23 12:34:11'),(3,1,'pexels-soundarapandian-ms-150090807-17469096.jpg','/uploads/files-1753274051100-115748989.jpg','Pas foto 4x6 (2 lembar, warna sesuai tanggal lahir: merah untuk ganjil, biru untuk genap)','2025-07-23 12:34:11'),(4,2,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753275132443-546291442.jpg','Fotokopi KK dan KTP','2025-07-23 12:52:12'),(5,2,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753275132475-372345900.jpg','Foto kegiatan usaha','2025-07-23 12:52:12'),(6,3,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753275461219-687039552.jpg','Fotokopi KK','2025-07-23 12:57:41'),(7,3,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753275461235-950100185.jpg','KTP asli (jika ada)','2025-07-23 12:57:41'),(8,4,'Twibbon.png','/uploads/files-1753275652309-749931322.png','Fotokopi KK dan KTP','2025-07-23 13:00:52'),(9,4,'OIP.jpg','/uploads/files-1753275652414-710418221.jpg','Foto kegiatan usaha','2025-07-23 13:00:52'),(10,5,'BD12 - Pemrograman Aplikasi Java, Reporting-Basis Data.pdf','/uploads/files-1753275827094-783430273.pdf','Fotokopi KK dan KTP','2025-07-23 13:03:47'),(11,5,'BD13 - Transaction.pdf','/uploads/files-1753275827122-302780417.pdf','Foto kegiatan usaha','2025-07-23 13:03:47'),(12,6,'COM60052-Etika-Profesi-Bab5-v1.0[1].pdf','/uploads/files-1753275872312-750203761.pdf','Fotokopi KK dan KTP','2025-07-23 13:04:32'),(13,6,'BD-02 Enhanced Entity Relationship Model (2).pdf','/uploads/files-1753275872312-358257751.pdf','Foto kegiatan usaha','2025-07-23 13:04:32'),(14,7,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753276663866-175235608.jpg','Fotokopi KK dan KTP','2025-07-23 13:17:43'),(15,7,'8. Javascript Intro- coret A.pdf','/uploads/files-1753276663886-92728988.pdf','Jika penduduk luar desa, wajib membawa identitas asli','2025-07-23 13:17:43'),(16,8,'pexels-achi-murusidze-2064615248-33123272.jpg','/uploads/files-1753278786786-744213425.jpg','Fotokopi KK dan KTP','2025-07-23 13:53:06'),(19,10,'pexels-soundarapandian-ms-150090807-17469096 (1).jpg','/uploads/files-1753279119761-481347740.jpg','Fotokopi KK dan KTP','2025-07-23 13:58:39'),(20,10,'Twibbon.png','/uploads/files-1753279119783-331383520.png','Foto kegiatan usaha','2025-07-23 13:58:39'),(21,11,'pexels-soundarapandian-ms-150090807-17469096 (1).jpg','/uploads/files-1753279444066-969662767.jpg','Fotokopi KK','2025-07-23 14:04:04'),(22,12,'pexels-soundarapandian-ms-150090807-17469096.jpg','/uploads/files-1753279711612-266607274.jpg','Fotokopi KK dan KTP','2025-07-23 14:08:31'),(23,12,'pexels-soundarapandian-ms-150090807-17469096 (1).jpg','/uploads/files-1753279711658-585064550.jpg','Foto kegiatan usaha','2025-07-23 14:08:31');
/*!40000 ALTER TABLE `lampiran_surat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-23 22:06:28
