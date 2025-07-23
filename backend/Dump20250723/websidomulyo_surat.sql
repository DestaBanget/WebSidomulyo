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
-- Table structure for table `surat`
--

DROP TABLE IF EXISTS `surat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nik` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat_lahir` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `pekerjaan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kewarganegaraan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agama` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_hp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_ktp` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_sekarang` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_surat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text COLLATE utf8mb4_unicode_ci,
  `tanggal_pengajuan` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_selesai` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_surat_user_id` (`user_id`),
  KEY `idx_surat_status` (`status`),
  KEY `idx_surat_tanggal_pengajuan` (`tanggal_pengajuan`),
  KEY `idx_surat_jenis_surat` (`jenis_surat`),
  CONSTRAINT `surat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surat`
--

LOCK TABLES `surat` WRITE;
/*!40000 ALTER TABLE `surat` DISABLE KEYS */;
INSERT INTO `surat` VALUES (1,2,'adwadwd','3573030709040001','Laki-laki','Malang','2025-07-10','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Kelahiran','Menunggu',NULL,'2025-07-23 12:34:11',NULL,'2025-07-23 12:34:11','2025-07-23 12:34:11'),(2,2,'adwadwd','3573030709040001','Laki-laki','Malang','2025-07-10','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','mk','Surat Keterangan Usaha','Menunggu',NULL,'2025-07-23 12:52:12',NULL,'2025-07-23 12:52:12','2025-07-23 12:52:12'),(3,2,'MUHAMMAD RIDZKY ABIDZAR YAHYA','3573030709040001','Laki-laki','a','2025-07-01','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','KTP Baru / Perubahan','Menunggu',NULL,'2025-07-23 12:57:41',NULL,'2025-07-23 12:57:41','2025-07-23 12:57:41'),(4,2,'a','3573030709040001','Laki-laki','Malang','2025-07-10','tentara','Indonesia','Katolik','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Usaha','Menunggu',NULL,'2025-07-23 13:00:52',NULL,'2025-07-23 13:00:52','2025-07-23 13:00:52'),(5,2,'a','3573030709040001','Laki-laki','Malang','2025-07-02','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Usaha','Menunggu',NULL,'2025-07-23 13:03:47',NULL,'2025-07-23 13:03:47','2025-07-23 13:03:47'),(6,2,'a','3573030709040001','Laki-laki','Malang','2025-07-02','tentara','Indonesia','Kristen','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Usaha','Diproses',NULL,'2025-07-23 13:04:32',NULL,'2025-07-23 13:04:32','2025-07-23 13:15:14'),(7,3,'a','3573030709040001','Laki-laki','Malang','2025-07-02','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','mk','Surat Keterangan Domisili','Diproses',NULL,'2025-07-23 13:17:43',NULL,'2025-07-23 13:17:43','2025-07-23 13:18:13'),(8,3,'Admin_Muhammad Ridzky Abidzar Yahya','3573030709040001','Laki-laki','Malang','2025-07-23','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Domisili','Menunggu',NULL,'2025-07-23 13:53:06',NULL,'2025-07-23 13:53:06','2025-07-23 14:02:27'),(10,3,'JL TELUK CENDRAWASIH 144B, KOTA MALANG','3573030709040001','Laki-laki','Malang','2025-07-10','tentara','Indonesia','Kristen','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Usaha','Diproses',NULL,'2025-07-23 13:58:39',NULL,'2025-07-23 13:58:39','2025-07-23 14:00:19'),(11,3,'a','3573030709040001','Laki-laki','Malang','2025-04-29','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','KTP Baru / Perubahan',NULL,NULL,'2025-07-23 14:04:04',NULL,'2025-07-23 14:04:04','2025-07-23 14:04:04'),(12,3,'a','3573030709040001','Laki-laki','Malang','2025-07-08','tentara','Indonesia','Islam','0821144252','JL TELUK CENDRAWASIH 144B, KOTA MALANG','qdqwwadwad','Surat Keterangan Usaha',NULL,NULL,'2025-07-23 14:08:31',NULL,'2025-07-23 14:08:31','2025-07-23 14:08:31');
/*!40000 ALTER TABLE `surat` ENABLE KEYS */;
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
