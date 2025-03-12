CREATE DATABASE IF NOT EXISTS my_books;
USE my_books;

CREATE TABLE `my_books`.`books` (
	`Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
	`Title` VARCHAR(45) NOT NULL,
  `Author` VARCHAR(45) NULL,
  `Genre` VARCHAR(45) NULL,
  `PageCount` INT NULL,
  `Description` TEXT NULL,
  `CoverImageUrl` VARCHAR(255) NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`users` (
  `Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(100) UNIQUE NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Password` VARCHAR(100) NOT NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`preferences` (
  `UserId` INT UNIQUE NOT NULL,
  `Theme` VARCHAR(55) DEFAULT 'dark',
PRIMARY KEY(`UserId`));

CREATE TABLE `my_books`.`currently_reading` (
  `Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `BookId` INT NOT NULL,
  `CurrentPage` INT DEFAULT 0,
  `LastRead` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(Id),
  FOREIGN KEY (BookId) REFERENCES books(Id),
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`want_to_read` (
  `Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `BookId` INT NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(Id),
  FOREIGN KEY (BookId) REFERENCES books(Id),
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`completed_read` (
  `Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `BookId` INT NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(Id),
  FOREIGN KEY (BookId) REFERENCES books(Id),
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`ratings` (
  `Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `Rating` DECIMAL(10, 2) NOT NULL,
  `Review` TEXT NULL,
  `UserId` INT NOT NULL,
  `BookId` INT NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(Id),
  FOREIGN KEY (BookId) REFERENCES books(Id),
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`purchase_links` (
  `BookId` INT NOT NULL,
  `AmazonUrl` TEXT,
  `IndigoUrl` TEXT,
FOREIGN KEY (BookId) REFERENCES books(Id));