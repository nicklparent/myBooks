CREATE DATABASE IF NOT EXISTS my_books;
USE my_books;

CREATE TABLE `my_books`.`books` (
	`Id` INT UNIQUE NOT NULL,
	`Title` VARCHAR(45) NOT NULL,
  `Author` VARCHAR(45) NULL,
  `Genre` VARCHAR(45) NULL,
  `PageCount` INT NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `my_books`.`users` (
  `Id` INT UNIQUE NOT NULL,
  `Username` VARCHAR(100) UNIQUE NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Password` VARCHAR(100) NOT NULL,
PRIMARY KEY (`Id`));
