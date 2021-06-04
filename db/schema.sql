-- Drops the "employee_management_system_db" if it currenlty exits.
DROP DATABASE IF EXISTS employee_management_system_db;

-- Create the "employee_management_system_db" database.
CREATE DATABASE employee_management_system_db;

-- Makes it so all of the following code will affect the "employee_management_system_db" database.
USE employee_management_system_db;

-- Creates a new table named "department" with a primary key that auto-increments, and a name field.
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- Makes a string column called "name" which cannot contain null.
    name VARCHAR(30) NOT NULL
);

-- Creates a new table name "role" with a primary key that auto-increments, a title, salary and department id fields.
CREATE TABLE role (
    -- Primary key that auto-increments.
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- Makes a string column called "title" which cannot contain null.
    title VARCHAR(30) NOT NULL,
    -- Makes an numeric column called "salary" with decimal location.
    salary DECIMAL(9,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Creates a new table name "employee" with a primary key that auto-increments, a first name, last name and role id, and manager id fields.
CREATE TABLE employee (
    -- Primary key that auto-increments.
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- Makes a sting column called "first_name".
    first_name VARCHAR(30),
    -- Makes a sting column called "last_name".
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    -- Makes an numeric column called "manager_id".
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES role(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);