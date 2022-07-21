const inquirer = require('inquirer');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const fs = require('fs');
const generateHtml = require('../util/generateHtml');

const employeeArray = []

const addManager = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the team manager's name",
                name: "name",
            },
            {
                type: "input",
                message: "Enter employee ID",
                name: "id",
            },
            {
                type: "input",
                message: "Enter the email address",
                name: "email",
            },
            {
                type: "input",
                message: "Enter the office number",
                name: "officeNum",
            },

        ])
        .then((ans) => {
            const name = ans.name
            const id = ans.id
            const email = ans.email
            const officeNum = ans.officeNum
            const manager = new Manager(name, id, email, officeNum)
            employeeArray.push(manager)
            console.log(employeeArray)
        })
}

const addMore = () => {
    inquirer
        .prompt([
            {
                type: "list",
                choices: ["engineer", "intern", "finish building team"],
                message: "Selected",
                name: "selection",
            },
        ])
        .then((ans) => {
            if (ans.selection === "engineer") {
                addEngineer()
            } else if (ans.selection === "intern") {
                addIntern()
            } else {
                console.log("Generating HTML...")
                console.log(employeeArray)
                .then((employeeArray) => {
                    generateHtml(employeeArray)
                })
                .then((response) => {
                    return writeFile(response)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
}

const addEngineer = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the engineer name",
                name: "name",
            },
            {
                type: "input",
                message: "Enter employee ID",
                name: "id",
            },
            {
                type: "input",
                message: "Enter the email address",
                name: "email",
            },
            {
                type: "input",
                message: "Enter github username",
                name: "github",
            },
        ])
        .then((ans) => {
            const name = ans.name
            const id = ans.id
            const email = ans.email
            const github = ans.github
            const engineer = new Engineer(name, id, email, github)
            employeeArray.push(engineer)
            .then(addMore()) 
            console.log(employeeArray)
        })
}

const addIntern = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the intern name",
                name: "name",
            },
            {
                type: "input",
                message: "Enter employee ID",
                name: "id",
            },
            {
                type: "input",
                message: "Enter the email address",
                name: "email",
            },
            {
                type: "input",
                message: "Enter school",
                name: "school",
            },
        ])
        .then((ans) => {
            const name = ans.name
            const id = ans.id
            const email = ans.email
            const school = ans.school
            const intern = new Intern(name, id, email, school)
            employeeArray.push(intern)
            .then(addMore())
            console.log(employeeArray)
        })
}

const writeFile = (data) => {
    fs.writeFile('./index.html', data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

const init = () => {
    addManager().then(addMore)
}

init();
