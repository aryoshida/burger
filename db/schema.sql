CREATE DATABASE burgers_db;
USE burgers_db;

-- CREATE TABLE(
--     id INT AUTO_INCREMENT,
--     burger_name VARCHAR(45) NOT NULL,
--     devoured BIT DEFAULT 0,
-- )



-- USE j2ad2goeznjc6588;
CREATE TABLE burgers(
    id INT AUTO_INCREMENT,
    burger_name VARCHAR(45) NOT NULL,
    devoured BIT DEFAULT 0,
    primary key(id)
)