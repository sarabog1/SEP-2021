-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for salon_app
DROP DATABASE IF EXISTS `salon_app`;
CREATE DATABASE IF NOT EXISTS `salon_app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `salon_app`;

-- Dumping structure for table salon_app.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password_hash` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.admin: ~2 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `username`, `password_hash`, `created_at`) VALUES
	(1, 'sara', 'sara', '2021-05-26 10:54:57'),
	(2, 'nevena', 'nevena', '2021-05-26 10:54:57');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table salon_app.appointment
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `appointment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `available_appointment_id` int(10) unsigned NOT NULL,
  `customer_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `fk_appointment_available_appointment_id` (`available_appointment_id`) USING BTREE,
  KEY `fk_customer_appointment_id` (`customer_id`),
  CONSTRAINT `fk_available_appointment_appointment_id` FOREIGN KEY (`available_appointment_id`) REFERENCES `available_appointment` (`available_appointment_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_customer_appointment_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.appointment: ~3 rows (approximately)
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` (`appointment_id`, `available_appointment_id`, `customer_id`) VALUES
	(1, 4, 1),
	(2, 7, 1),
	(4, 2, 3);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;

-- Dumping structure for table salon_app.available_appointment
DROP TABLE IF EXISTS `available_appointment`;
CREATE TABLE IF NOT EXISTS `available_appointment` (
  `available_appointment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `starts_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `hair_styllist_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`available_appointment_id`),
  UNIQUE KEY `uq_available_appointment_starts_at_end_at` (`starts_at`,`end_at`),
  KEY `fk_styllist_appointment_id` (`hair_styllist_id`),
  CONSTRAINT `fk_styllist_appointment_id` FOREIGN KEY (`hair_styllist_id`) REFERENCES `hair_styllist` (`hair_styllist_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.available_appointment: ~4 rows (approximately)
/*!40000 ALTER TABLE `available_appointment` DISABLE KEYS */;
INSERT INTO `available_appointment` (`available_appointment_id`, `starts_at`, `end_at`, `is_available`, `hair_styllist_id`) VALUES
	(1, '2021-06-26 11:00:00', '2021-06-06 11:30:00', 1, 19),
	(2, '2021-05-28 10:56:16', '2021-05-28 11:30:00', 1, 17),
	(4, '2021-07-28 10:56:16', '2021-07-28 11:56:16', 1, 13),
	(7, '2021-07-28 11:56:16', '2021-07-28 12:56:16', 1, 13);
/*!40000 ALTER TABLE `available_appointment` ENABLE KEYS */;

-- Dumping structure for table salon_app.customer
DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.customer: ~2 rows (approximately)
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`customer_id`, `name`, `surname`, `phone`) VALUES
	(1, 'Milena', 'Ilic', '06555623'),
	(3, 'Sara', 'Bogi', '0694563432');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

-- Dumping structure for table salon_app.hair_styllist
DROP TABLE IF EXISTS `hair_styllist`;
CREATE TABLE IF NOT EXISTS `hair_styllist` (
  `hair_styllist_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `salon_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`hair_styllist_id`),
  KEY `fk_salon_hair_styllist_id` (`salon_id`),
  CONSTRAINT `fk_salon_hair_styllist_id` FOREIGN KEY (`salon_id`) REFERENCES `salon` (`salon_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.hair_styllist: ~4 rows (approximately)
/*!40000 ALTER TABLE `hair_styllist` DISABLE KEYS */;
INSERT INTO `hair_styllist` (`hair_styllist_id`, `name`, `surname`, `salon_id`) VALUES
	(13, 'Milica', 'Nikolic', 8),
	(14, 'Mara', 'NikMaric', 8),
	(17, 'Mara', 'NikMaric', 9),
	(19, 'Marija', 'Markic', 10);
/*!40000 ALTER TABLE `hair_styllist` ENABLE KEYS */;

-- Dumping structure for table salon_app.location
DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(50) NOT NULL,
  `number` int(10) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.location: ~5 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`location_id`, `street`, `number`) VALUES
	(1, 'Ladne vode', 122),
	(2, 'Marsala Tita', 223),
	(3, 'Cvijiceva', 134),
	(4, 'Dabovicka', 33),
	(6, 'Nikodima', 22);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table salon_app.salon
DROP TABLE IF EXISTS `salon`;
CREATE TABLE IF NOT EXISTS `salon` (
  `salon_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `location_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`salon_id`),
  KEY `fk_location_salon_id` (`location_id`),
  KEY `fk_service_salon_id` (`service_id`),
  CONSTRAINT `fk_location_salon_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_service_salon_id` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.salon: ~3 rows (approximately)
/*!40000 ALTER TABLE `salon` DISABLE KEYS */;
INSERT INTO `salon` (`salon_id`, `name`, `location_id`, `service_id`) VALUES
	(8, 'Nikodima', 6, 4),
	(9, 'Niki', 6, 4),
	(10, 'Centar', 6, 4);
/*!40000 ALTER TABLE `salon` ENABLE KEYS */;

-- Dumping structure for table salon_app.service
DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `service_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table salon_app.service: ~4 rows (approximately)
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` (`service_id`, `type`, `price`) VALUES
	(4, 'Haircut', 250),
	(5, 'Haistyle', 500),
	(6, 'Farbing', 1),
	(7, 'Cuting', 700);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
