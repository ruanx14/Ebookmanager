CREATE SCHEMA IF NOT EXISTS `ebookmanager` DEFAULT CHARACTER SET utf8 ;
USE `ebookmanager` ;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(80) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `levelUser` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Genres` (
  `idGenres` INT NOT NULL AUTO_INCREMENT,
  `genres` VARCHAR(45) NULL,
  PRIMARY KEY (`idGenres`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Books` (
  `idBooks` INT NOT NULL AUTO_INCREMENT,
  `idUsers` INT NOT NULL,
  `idGenres` INT NOT NULL,
  `pathCover` VARCHAR(100) NULL,
  `title` VARCHAR(70) NULL,
  `titleOriginal` VARCHAR(70) NULL,
  `publisher` VARCHAR(45) NULL,
  `author` VARCHAR(40) NULL,
  `yearPublic` VARCHAR(400) NULL,
  `pagesBook` INT NULL,
  `synopsis` VARCHAR(700) NULL,
  `aboutAuthor` VARCHAR(1000) NULL,
  `clickedCount` INT NULL,
  `statusBook` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idBooks`),
    FOREIGN KEY (`idUsers`)
    REFERENCES `ebookmanager`.`Users` (`idUsers`),
    FOREIGN KEY (`idGenres`)
    REFERENCES `ebookmanager`.`Genres` (`idGenres`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Managers` (
  `idManagers` INT NOT NULL AUTO_INCREMENT,
  `idUsers` INT NOT NULL,
  `title` VARCHAR(100) NULL,
  `author` VARCHAR(100) NULL,
  `sizeEpub` VARCHAR(100) NULL,
  `pathEpub` VARCHAR(45) NULL,
  `statusVisible` VARCHAR(45) NULL,
  PRIMARY KEY (`idManagers`),
    FOREIGN KEY (`idUsers`)
    REFERENCES `ebookmanager`.`Users` (`idUsers`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Tags` (
  `idTags` INT NOT NULL AUTO_INCREMENT,
  `tags` VARCHAR(45) NULL,
  PRIMARY KEY (`idTags`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Books_Tags` (
  `idBooks_Tags` INT NOT NULL AUTO_INCREMENT,
  `idBooks` INT NOT NULL,
  `idTags` INT NOT NULL,
  PRIMARY KEY (`idBooks_Tags`),
    FOREIGN KEY (`idBooks`)
    REFERENCES `ebookmanager`.`Books` (`idBooks`),
    FOREIGN KEY (`idTags`)
    REFERENCES `ebookmanager`.`Tags` (`idTags`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Comments` (
  `idComments` INT NOT NULL AUTO_INCREMENT,
  `idUsers` INT NOT NULL,
  `idBooks` INT NOT NULL,
  `textComment` VARCHAR(500) NULL,
  `datePublic` VARCHAR(45) NULL,
  `statusComment` VARCHAR(45) NULL,
  PRIMARY KEY (`idComments`),
    FOREIGN KEY (`idUsers`)
    REFERENCES `ebookmanager`.`Users` (`idUsers`),
    FOREIGN KEY (`idBooks`)
    REFERENCES `ebookmanager`.`Books` (`idBooks`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Reviews` (
  `idReviews` INT NOT NULL AUTO_INCREMENT,
  `idUsers` INT NOT NULL,
  `idBooks` INT NOT NULL,
  `title` VARCHAR(200) NULL,
  `textReviews` VARCHAR(200) NULL,
  `datePost` VARCHAR(200) NULL,
  PRIMARY KEY (`idReviews`),
   FOREIGN KEY (`idBooks`)
    REFERENCES `ebookmanager`.`Books` (`idBooks`),
    FOREIGN KEY (`idUsers`)
    REFERENCES `ebookmanager`.`Users` (`idUsers`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ebookmanager`.`Highlights` (
  `idHighlights` INT NOT NULL AUTO_INCREMENT,
  `idBooks` VARCHAR(45) NULL,
  `dateChange` DATE NULL,
  PRIMARY KEY (`idHighlights`))
ENGINE = InnoDB;
