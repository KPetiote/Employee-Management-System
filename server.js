// DEPENDENCIES
// ---------------------------------------------------------------------------
const mysql2 = require("mysql2");
const figlet = require("figlet");
const inquirer = require("inquirer");

// Uses NPM package "figlet" to create text banner.
figlet("Employee \n \n Management \n \n System", (err, data) => {
    if (err) throw err;
    console.log(data);
})

// Uses NPM package "mysql2" to create the connection to the MySQL database, then confirms that the connection is live.
const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "newuser",
    password: "password",
    database: "employee_management_system_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connection successfully established!');
    start();
});

// FUNCTIONS TO START
// ---------------------------------------------------------------------------

function start() {
    // Uses NPM package "inquire" to help with prompting user.
    // Options to View All Employees, Employees by Departments, and Employees by Manager.
    // Options to Add New Departments, New Roles, and Add Employees.
    // Options to Update An Existing Employee Role or Manager.
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add A New Department",
            "Add A New Role",
            "Add A New Employee",
            "Update An Existing Employee Role",
            "Exit"
        ]
    }).then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Employees by Department":
                viewAllEmployeesByDepartment();
                break;

            case "View All Employees by Manager":
                viewAllEmployeesbyManager();
                break;

            case "Add A New Department":
                addNewDepartment();
                break;

            case "Add A New Role":
                addNewRole();
                break;

            case "Add A New Employee":
                addNewEmployee();
                break;

            case "Update An Existing Employee Role":
                updateEmployee();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

// FUNCTIONS TO VIEW
// ---------------------------------------------------------------------------

// Function to View All Employees.
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", (err, data) => {
        if (err) throw err;
        console.log("Displaying All :");
        console.table(data);
        start();
    });
}

// Function to View All Employees by Department.
function viewAllEmployeesByDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", (err, data) => {
        if (err) throw err;
        console.log("Displaying All Departments:");
        console.table(data);
        start();
    });
}

// Function to View All Employees by Manager.
function viewAllEmployeesbyManager() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("Displaying All Roles:");
        console.table(data);
        start();
    });
}