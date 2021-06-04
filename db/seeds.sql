-- Makes it so all of the following code will affect the employee_management_system_db" database.
USE employee_management_system_db;

-- DEPARTMENTS
-- Inserts department information into department table. 
INSERT INTO department (department) VALUES
    ("Accessioning"), 
    ("Accounting"), 
    ("Billing"), 
    ("Laboratory"),
    ("Human Resources"), 
    ("Information Technology"), 
    ("Management"), 
    ("Phlebotomy"), 
    ("Sales"); 

-- ROLES
-- Inserts role information into role table. 
INSERT INTO role (title, salary, department_id) VALUES
	("Chief Executive Officer", 6000000, 7),
    ("Chief Operating Officer", 3000000, 7),
    ("Chief Information Officer", 2500000, 7),
    ("Chief Compliance Officer", 2000000, 7),
    ("Accountant", 50000, 2),
    ("Billing Manager", 90000, 3),
    ("Billing Specialist", 50000, 3),
    ("Client Services", 50000, 9),
    ("Medical Technologists", 50000, 4),
    ("HR Manager", 1000000, 5),
    ("IT Manager", 90000, 6),
    ("IT Technician", 65000, 6),
    ("Laboratory Director", 200000, 7),
    ("Laboratory Manager", 90000, 7),
    ("Laboratory Supervisor", 75000, 4),
    ("Phlebotomy Manager", 60000, 8),
    ("Phlebotomist", 35000, 8),
    ("Sales Representative", 55000, 9),
    ("Specimen Accessioner", 30000, 1);

-- EMPLOYEES
-- Inserts employee information into employee table.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Kenneth", "Petiote", 1, NULL),
    ("Nikola", "Tesla", 2, 1),
    ("Albert", "Einstein", 3, 1),
    ("Marie", "Currie", 4, 1),
    ("Richard", "Feynman", 5, 2),
    ("Charles", "Darwin", 6, 5),
    ("Alfred", "Nobel", 7, 6),
    ("Galileo", "Galilei", 8, 4),
    ("Ada", "Lovelace", 9, 4),
    ("Carl", "Linnaeus", 10, 1),
    ("Rosalind", "Franklin", 11, 3),
    ("Isaac", "Asimov", 12, 11),
    ("Isaac", "Newton", 13, 1),
    ("Robert", "FitzRoy", 14, 13),
    ("Jean-Baptiste", "Lamarck", 15, 14),
    ("Katharine", "McCormick", 16, 4),
    ("John", "Muir", 17, 16),
    ("Richard", "Dawkins", 18, 5),
    ("Bill", "Nye", 19, 16);