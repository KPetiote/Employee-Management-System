-- Makes it so all of the following code will affect the employee_management_system_db" database.
USE employee_management_system_db;

-- DEPARTMENTS
-- Inserts department information into department table. 
INSERT INTO department (name) VALUES
    (Accessioning) /*1*/
    (Accounting) /*2*/
    (Billing) /*3*/
    (Laboratory) /*4*/
    (Human Resources) /*5*/
    (Information Technology) /*6*/
    (Management) /*7*/
    (Phlebotomy) /*8*/
    (Sales) /*9*/

-- ROLES
-- Inserts role information into role table. 
INSERT INTO role (title, salary, department_id) VALUES
    ("Accountant", 50000, 2),
    ("Billing Specialist", 50000, 3),
    ("Billing Manager", 90000, 3),
    ("Client Services", 50000, 9),
    ("Medical Technologists", 50000, 4),
    ("HR Manager", 1000000, 5),
    ("IT Manager", 90000, 6,),
    ("IT Technician", 65000, 6),
    ("Laboratory Director", 200000, 7),
    ("Laboratory Manager", 90000, 7),
    ("Laboratory Supervisor", 75000, 4),
    ("Phlebotomist," 35000, 8),
    ("Phlebotomy Manager", 60000, 8),
    ("Sales Representative", 55000, 9),
    ("Specimen Accessioner", 30000, 1),




