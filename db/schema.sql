CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE(
    id INT AUTO_INCREMENT,
    burger_name VARCHAR(45) NOT NULL,
    devoured BIT DEFAULT 0,
)