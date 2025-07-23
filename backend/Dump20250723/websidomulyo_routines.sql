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
-- Temporary view structure for view `v_agenda_akan_datang`
--

DROP TABLE IF EXISTS `v_agenda_akan_datang`;
/*!50001 DROP VIEW IF EXISTS `v_agenda_akan_datang`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_agenda_akan_datang` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `deskripsi`,
 1 AS `tanggal`,
 1 AS `waktu`,
 1 AS `lokasi`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_berita_terbaru`
--

DROP TABLE IF EXISTS `v_berita_terbaru`;
/*!50001 DROP VIEW IF EXISTS `v_berita_terbaru`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_berita_terbaru` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `content`,
 1 AS `kategori`,
 1 AS `img`,
 1 AS `tanggal`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_statistik_penduduk`
--

DROP TABLE IF EXISTS `v_statistik_penduduk`;
/*!50001 DROP VIEW IF EXISTS `v_statistik_penduduk`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_statistik_penduduk` AS SELECT 
 1 AS `kategori`,
 1 AS `nilai`,
 1 AS `satuan`,
 1 AS `deskripsi`,
 1 AS `tahun`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_agenda_akan_datang`
--

/*!50001 DROP VIEW IF EXISTS `v_agenda_akan_datang`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_agenda_akan_datang` AS select `agenda`.`id` AS `id`,`agenda`.`title` AS `title`,`agenda`.`deskripsi` AS `deskripsi`,`agenda`.`tanggal` AS `tanggal`,`agenda`.`waktu` AS `waktu`,`agenda`.`lokasi` AS `lokasi`,`agenda`.`status` AS `status` from `agenda` where ((`agenda`.`tanggal` >= curdate()) and (`agenda`.`status` = 'Akan Datang')) order by `agenda`.`tanggal`,`agenda`.`waktu` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_berita_terbaru`
--

/*!50001 DROP VIEW IF EXISTS `v_berita_terbaru`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_berita_terbaru` AS select `berita`.`id` AS `id`,`berita`.`title` AS `title`,`berita`.`content` AS `content`,`berita`.`kategori` AS `kategori`,`berita`.`img` AS `img`,`berita`.`tanggal` AS `tanggal` from `berita` order by `berita`.`tanggal` desc,`berita`.`created_at` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_statistik_penduduk`
--

/*!50001 DROP VIEW IF EXISTS `v_statistik_penduduk`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_statistik_penduduk` AS select `statistik`.`kategori` AS `kategori`,`statistik`.`nilai` AS `nilai`,`statistik`.`satuan` AS `satuan`,`statistik`.`deskripsi` AS `deskripsi`,`statistik`.`tahun` AS `tahun` from `statistik` where (`statistik`.`tahun` = (select max(`statistik`.`tahun`) from `statistik`)) */;
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

-- Dump completed on 2025-07-23 22:06:28
