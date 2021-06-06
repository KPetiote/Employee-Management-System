// DEPENDENCIES
// ---------------------------------------------------------------------------

const mysql2 = require("mysql2");
const figlet = require("figlet");
const inquirer = require("inquirer");
const consoleTable = require("console.table")

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
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add A New Department",
            "Add A New Role",
            "Add A New Employee",
            "Remove An Employee",
            "Update An Employee Role",
            "Exit"
        ]
    }).then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Employees By Department":
                viewAllEmployeesByDepartment();
                break;

            case "View All Employees By Manager":
                viewAllEmployeesByManager();
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

            case "Remove An Employee":
                removeEmployee();
                break;

            case "Update An Employee Role":
                updateEmployeeRole();
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
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", (err, data) => {
        if (err) throw err;
        console.log("Displaying All :");
        console.table(data);
        start();
    });
}

// Function to View All Employees by Department.
function viewAllEmployeesByDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", (err, data) => {
        if (err) throw err;
        console.log("Displaying All Departments:");
        console.table(data);
        start();
    });
}

// Function to View All Employees by Manager.
function viewAllEmployeesByManager() {
    connection.query("SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS 'employee name', CONCAT(m.first_name, ' ', m.last_name) AS 'manager' FROM employee e LEFT JOIN employee m ON e.manager_id = m.role_id JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;", (err, data) => {
        if (err) throw err;
        console.log("Displaying All Roles:");
        console.table(data);
        start();
    });
}

// FUNCTIONS TO ADD
// ---------------------------------------------------------------------------

// Function to add a new department.
function addNewDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the new department name?",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    console.log("Please enter a department name.");
                }
            }
        },
    ]).then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department
            },
            (err) => {
                if (err) throw err;
                console.log(`New department ${answer.department} has been added!`);
                start();
            }
        );
    });
}

// Function to add a  new role - then prompt role, salary and department.
function addNewRole() {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title for the new role?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the title.");
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: "What is this new role's salary",
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("Please enter a number");
                }
            },
            {
                name: "department",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    return choiceArray;
                },
                message: "What department is this new role under?",
            }
        ]).then(answer => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.department) {
                    chosenDept = results[i];
                }
            }

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: chosenDept.id
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New role ${answer.title} has been added!`);
                    start();
                }
            )
        });
    });
}

// Function to add a new employee.
function addNewEmployee() {
    const sql = "SELECT * FROM employee, role";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the first name.");
                    }
                }
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the last name.");
                    }
                }
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    //remove duplicates
                    let cleanChoiceArray = [...new Set(choiceArray)];
                    return cleanChoiceArray;
                },
                message: "What is the role?"
            }
        ]).then(answer => {
            let chosenRole;

            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: chosenRole.id,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New employee ${answer.firstName} ${answer.lastName} has been added! as a ${answer.role}`);
                    start();
                }
            )
        });
    });
}

// FUNCTIONS TO REMOVE
// ---------------------------------------------------------------------------

function removeEmployee() {
    console.log("Removing an employee");
    connection.query(`SELECT e.id, e.first_name, e.last_name FROM employee e`, (err, res) => {
        if (err) throw err;

        const removeEmployeeOptions = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
        }));

        console.table(res);
        console.log("Employee successfully removed");

        promptDelete(removeEmployeeOptions);
        });
    }
        function promptDelete(removeEmployeeOptions) {
            inquirer
                .prompt([
                {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to remove?",
                choices: removeEmployeeOptions
                }
            ])
        .then(function (answer) {
        connection.query(`DELETE FROM employee WHERE ?`, { id: answer.employeeId }, function (err, res) {
            if (err) throw err;
            start();
        });
    });
}

// FUNCTIONS TO UPDATE
// ---------------------------------------------------------------------------

// Function to update an employee role.
function updateEmployeeRole() {
    connection.query("SELECT * FROM employee, role", (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "employee",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].last_name);
                    }
                    //remove duplicates
                    let cleanChoiceArray = [...new Set(choiceArray)];
                    return cleanChoiceArray;
                },
                message: "Which employee would you like to update?"
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    //remove duplicates
                    let cleanChoiceArray = [...new Set(choiceArray)];
                    return cleanChoiceArray;
                },
                message: "What is the employee's new role?"
            }
        ]).then(answer => {
            let chosenEe;
            let chosenRole;

            for (let i = 0; i < results.length; i++) {
                if (results[i].last_name === answer.employee) {
                    chosenEe = results[i];
                }
            }

            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: chosenRole,
                    },
                    {
                        last_name: chosenEe,
                    }
                ],
                (err) => {
                    if (err) throw err;
                    console.log(`Role has been updated!`);
                    start();
                }
            )
        })
    })
}
