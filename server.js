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

// Uses NPM package "mysql2" to create the connection to the MySQL database.
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