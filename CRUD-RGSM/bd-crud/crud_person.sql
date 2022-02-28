/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.31 : Database - crud_person
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`crud_person` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `crud_person`;

/*Table structure for table `persons` */

CREATE TABLE `persons` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_name` varchar(255) NOT NULL,
  `person_age` int(11) NOT NULL,
  `person_single` tinyint(1) NOT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
