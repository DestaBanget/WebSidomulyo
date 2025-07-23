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
-- Table structure for table `lembaga_desa`
--

DROP TABLE IF EXISTS `lembaga_desa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lembaga_desa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_lembaga` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tentang` text COLLATE utf8mb4_unicode_ci,
  `visi` text COLLATE utf8mb4_unicode_ci,
  `misi` text COLLATE utf8mb4_unicode_ci,
  `ketua` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_hp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nama_lembaga` (`nama_lembaga`),
  KEY `idx_lembaga_nama` (`nama_lembaga`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lembaga_desa`
--

LOCK TABLES `lembaga_desa` WRITE;
/*!40000 ALTER TABLE `lembaga_desa` DISABLE KEYS */;
INSERT INTO `lembaga_desa` VALUES (1,'BPD','Badan Permusyawaratan Desa (BPD) adalah lembaga yang melaksanakan fungsi pemerintahan yang anggotanya merupakan wakil dari penduduk desa berdasarkan keterwakilan wilayah dan ditetapkan secara demokratis.','Terwujudnya Badan Permusyawaratan Desa yang profesional, transparan, dan akuntabel dalam melaksanakan fungsi legislasi, anggaran, dan pengawasan untuk mewujudkan desa yang mandiri dan sejahtera.','1. Melaksanakan fungsi legislasi dalam pembentukan peraturan desa\n2. Melaksanakan fungsi anggaran dalam penyusunan dan penetapan APBDes\n3. Melaksanakan fungsi pengawasan terhadap pelaksanaan peraturan desa dan APBDes\n4. Menampung dan menyalurkan aspirasi masyarakat desa','Budi Santoso','081234567890','Kantor Desa Sidomulyo',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(2,'LPM','Lembaga Pemberdayaan Masyarakat (LPM) adalah lembaga yang dibentuk oleh masyarakat sesuai kebutuhan dan merupakan mitra pemerintah desa dalam memberdayakan masyarakat.','Terwujudnya masyarakat desa yang mandiri, berdaya saing, dan sejahtera melalui pemberdayaan yang berkelanjutan.','1. Mendorong partisipasi masyarakat dalam pembangunan desa\n2. Mengembangkan potensi ekonomi masyarakat\n3. Meningkatkan kualitas sumber daya manusia\n4. Memperkuat kelembagaan masyarakat','Siti Aminah','081234567891','Balai Desa Sidomulyo',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(3,'PKK','Pemberdayaan Kesejahteraan Keluarga (PKK) adalah organisasi kemasyarakatan yang memberdayakan wanita untuk turut berpartisipasi dalam pembangunan desa.','Terwujudnya keluarga yang sehat, cerdas, dan sejahtera menuju keluarga berkualitas.','1. Meningkatkan kualitas hidup keluarga\n2. Mengembangkan program kesehatan keluarga\n3. Meningkatkan pendidikan dan keterampilan\n4. Mengembangkan ekonomi keluarga','Nurul Hidayah','081234567892','Kantor PKK Desa Sidomulyo',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(4,'Karang Taruna','Karang Taruna adalah organisasi kepemudaan di Indonesia yang dibentuk oleh masyarakat sebagai wadah generasi muda untuk mengembangkan diri, tumbuh, dan berkembang atas dasar kesadaran dan tanggung jawab sosial.','Terwujudnya generasi muda yang beriman, bertaqwa, mandiri, dan berkualitas untuk membangun desa yang maju dan sejahtera.','1. Mengembangkan kreativitas dan inovasi pemuda\n2. Meningkatkan keterampilan dan wawasan pemuda\n3. Mengembangkan kegiatan sosial kemasyarakatan\n4. Mendorong partisipasi pemuda dalam pembangunan','Joko Widodo','081234567893','Sekretariat Karang Taruna',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(5,'Kelompok Tani','Kelompok Tani adalah kumpulan petani/peternak/pekebun yang dibentuk atas dasar kesamaan kepentingan, kesamaan kondisi lingkungan (sosial, ekonomi, sumberdaya) dan keakraban untuk meningkatkan dan mengembangkan usaha anggota.','Terwujudnya petani yang mandiri, sejahtera, dan berkelanjutan dalam pengelolaan pertanian modern.','1. Meningkatkan produksi pertanian\n2. Mengembangkan teknologi pertanian modern\n3. Meningkatkan kesejahteraan petani\n4. Mengembangkan pemasaran hasil pertanian','Sukarno','081234567894','Kantor Kelompok Tani',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(6,'Koperasi Wanita','Koperasi Wanita adalah koperasi yang anggotanya terdiri dari wanita yang bertujuan untuk meningkatkan kesejahteraan ekonomi anggotanya.','Terwujudnya koperasi wanita yang mandiri dan mampu meningkatkan kesejahteraan ekonomi anggotanya.','1. Meningkatkan peran wanita dalam ekonomi\n2. Mengembangkan usaha produktif wanita\n3. Meningkatkan akses modal usaha\n4. Mengembangkan jaringan pemasaran','Sri Wahyuni','081234567895','Kantor Koperasi Wanita',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(7,'Dharma Wanita','Dharma Wanita adalah organisasi yang beranggotakan istri dari pegawai negeri sipil yang bertujuan untuk meningkatkan kesejahteraan keluarga PNS.','Terwujudnya keluarga PNS yang harmonis, sejahtera, dan berkualitas.','1. Meningkatkan kesejahteraan keluarga PNS\n2. Mengembangkan keterampilan wanita\n3. Meningkatkan pendidikan keluarga\n4. Mengembangkan kegiatan sosial','Dewi Sartika','081234567896','Kantor Dharma Wanita',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(8,'LINMAS','LINMAS adalah Perlindungan Masyarakat yang berperan dalam menjaga keamanan dan ketertiban di desa.','Menjadi garda terdepan dalam perlindungan masyarakat dan penanggulangan bencana di desa.','1. Meningkatkan kesiapsiagaan masyarakat terhadap bencana dan gangguan keamanan\n2. Mendorong partisipasi aktif warga dalam menjaga ketertiban\n3. Membangun sinergi dengan aparat keamanan dan lembaga desa lainnya.','Rudi Hartono','081234567895','Jl. Linmas No. 34',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(9,'Bhabinkamtibmas','Bhabinkamtibmas adalah Bhayangkara Pembina Keamanan dan Ketertiban Masyarakat yang membina keamanan dan ketertiban di desa.','Menjadi mitra masyarakat dalam menciptakan lingkungan desa yang aman dan kondusif.','1. Meningkatkan kesadaran hukum dan keamanan di masyarakat\n2. Membangun komunikasi yang baik antara polisi dan warga\n3. Mencegah terjadinya tindak kriminalitas di desa.','Ahmad Hidayat','081234567893','Jl. Keamanan No. 89',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(10,'Babinsa','Babinsa adalah Bintara Pembina Desa yang membina pertahanan dan keamanan di desa.','Menjadi pelindung dan pembina masyarakat desa dalam bidang pertahanan dan keamanan.','1. Meningkatkan kesadaran bela negara di masyarakat\n2. Membangun kemitraan dengan warga dalam menjaga keamanan\n3. Mendukung ketahanan dan kemandirian desa.','Surya Pratama','081234567894','Jl. Babinsa No. 12',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55'),(11,'Poskesdes','Poskesdes (Pos Kesehatan Desa) adalah fasilitas pelayanan kesehatan tingkat desa yang memberikan pelayanan kesehatan dasar bagi masyarakat.','Menjadi pusat pelayanan kesehatan masyarakat desa yang profesional dan terjangkau.','1. Meningkatkan akses dan mutu pelayanan kesehatan di desa\n2. Mendorong perilaku hidup bersih dan sehat\n3. Mendukung program kesehatan pemerintah di tingkat desa.','dr. Sarah Putri','081234567896','Jl. Kesehatan No. 56',NULL,NULL,NULL,'2025-07-20 15:49:55','2025-07-20 15:49:55');
/*!40000 ALTER TABLE `lembaga_desa` ENABLE KEYS */;
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
