CREATE DATABASE Groupomania CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'adminOC' IDENTIFIED BY 'devweb';
GRANT ALL ON Groupomania.* TO 'adminOC';

USE Groupomania;

CREATE TABLE User (
	userID SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	email VARCHAR(60) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	avatarUrl VARCHAR(150) NOT NULL DEFAULT 'http://localhost:3000/images/avatar.png',
	dateCreation DATETIME NOT NULL,
	PRIMARY KEY (userID)
)
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;