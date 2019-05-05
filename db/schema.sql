DROP DATABASE IF EXISTS note_taker_DB;

CREATE DATABASE note_taker_DB;

USE note_taker_DB;

CREATE TABLE notes (
   id INT(11) NOT NULL AUTO_INCREMENT,
   title VARCHAR (30) NOT NULL,
   body TEXT(255),
   created_at DATETIME default NOW(),
   PRIMARY KEY (id) 
);

