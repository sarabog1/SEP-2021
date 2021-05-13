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
  `username` varchar(128) DEFAULT NULL,
  `password_hash` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.appointment
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `appointment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `available_appointemt_id` int(10) unsigned NOT NULL,
  `customer_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `fk_appointment_available_appointment_id` (`available_appointemt_id`),
  KEY `fk_appointment_customer_appointment_id` (`customer_id`),
  KEY `fk_appointment_service_appointment_id` (`service_id`),
  CONSTRAINT `fk_appointment_available_appointment_id` FOREIGN KEY (`available_appointemt_id`) REFERENCES `available_appointment` (`available_appointment_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_appointment_customer_appointment_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_appointment_service_appointment_id` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.available_appointment
DROP TABLE IF EXISTS `available_appointment`;
CREATE TABLE IF NOT EXISTS `available_appointment` (
  `available_appointment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `timeFrom` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `timeTo` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `isAvailabe` bit(1) NOT NULL,
  `hair_styllist_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`available_appointment_id`),
  KEY `fk_appointment_styllist_appointment_id` (`hair_styllist_id`),
  CONSTRAINT `fk_appointment_styllist_appointment_id` FOREIGN KEY (`hair_styllist_id`) REFERENCES `hair_styllist` (`hair_styllist_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.customer
DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.hair_styllist
DROP TABLE IF EXISTS `hair_styllist`;
CREATE TABLE IF NOT EXISTS `hair_styllist` (
  `hair_styllist_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `salon_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`hair_styllist_id`),
  KEY `fk_hair_styllist_salon_hair_styllist_id` (`salon_id`),
  CONSTRAINT `fk_hair_styllist_salon_hair_styllist_id` FOREIGN KEY (`salon_id`) REFERENCES `salon` (`salon_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.location
DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(50) DEFAULT NULL,
  `number` int(10) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.salon
DROP TABLE IF EXISTS `salon`;
CREATE TABLE IF NOT EXISTS `salon` (
  `salon_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `location_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`salon_id`),
  KEY `fk_salon_location_salon_id` (`location_id`),
  CONSTRAINT `fk_salon_location_salon_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table salon_app.service
DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `service_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('haircut','blowdring','farbing') DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `salon_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`service_id`),
  KEY `fk_service_salon_service_id` (`salon_id`),
  CONSTRAINT `fk_service_salon_service_id` FOREIGN KEY (`salon_id`) REFERENCES `salon` (`salon_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
