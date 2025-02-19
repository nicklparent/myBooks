CREATE DATABASE IF NOT EXISTS my_books;
USE my_books;

CREATE TABLE `my_books`.`books` (
	`id` INT NOT NULL,
	`Title` VARCHAR(45) NULL,
    `Author` VARCHAR(45) NULL,
    `Genre` VARCHAR(45) NULL,
PRIMARY KEY (`id`));

CREATE TABLE `my_books`.`users` (
  `Id` INT NOT NULL,
  `Email` VARCHAR(100) NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Password` VARCHAR(100) NULL,
  PRIMARY KEY (`Id`));
