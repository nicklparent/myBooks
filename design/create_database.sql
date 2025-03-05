CREATE DATABASE IF NOT EXISTS my_books;
USE my_books;

CREATE TABLE `my_books`.`books` (
	`Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
	`Title` VARCHAR(45) NOT NULL,
  `Author` VARCHAR(45) NULL,
  `Genre` VARCHAR(45) NULL,
  `PageCount` INT NULL,
  `Description` TEXT NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`users` (
  `Id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(100) UNIQUE NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Password` VARCHAR(100) NOT NULL,
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
  `IndigoUrl` VARCHAR(255),
  `AmazonUrl` VARCHAR(255),
  `BookId` INT NOT NULL,
FOREIGN KEY (BookId) REFERENCES book(Id));