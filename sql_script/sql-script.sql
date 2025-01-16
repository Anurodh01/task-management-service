CREATE DATABASE taskdb;

USE taskdb;

CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('PENDING','IN_PROGRESS','COMPLETED') NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);