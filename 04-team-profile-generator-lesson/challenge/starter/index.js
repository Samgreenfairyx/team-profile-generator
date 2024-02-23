const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Check if the output directory exists, if not, create it
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
    console.log("Output directory created:", OUTPUT_DIR);
}

// Function to prompt user for manager information
function promptManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the manager's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the manager's employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the manager's email address:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the manager's office number:"
        }
    ]);
}

// Function to prompt user for engineer information
function promptEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the engineer's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the engineer's employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the engineer's email address:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter the engineer's GitHub username:"
        }
    ]);
}

// Function to prompt user for intern information
function promptIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the intern's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the intern's employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the intern's email address:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter the intern's school:"
        }
    ]);
}

// Function to prompt user for adding additional team members or finishing
function promptMenu() {
    return inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Select an option:",
            choices: ["Add an engineer", "Add an intern", "Finish building the team"]
        }
    ]);
}

// Function to initialize the application
async function init() {
    try {
        // Prompt user for manager information
        const managerData = await promptManager();
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        teamMembers.push(manager);

        // Prompt user for additional team members
        let done = false;
        while (!done) {
            const menuChoice = await promptMenu();
            switch (menuChoice.option) {
                case "Add an engineer":
                    // Prompt user for engineer information
                    const engineerData = await promptEngineer();
                    const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
                    teamMembers.push(engineer);
                    break;
                case "Add an intern":
                    // Prompt user for intern information
                    const internData = await promptIntern();
                    const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
                    teamMembers.push(intern);
                    break;
                case "Finish building the team":
                    // Generate HTML using the team members array and write to file
                    const html = render(teamMembers);
                    fs.writeFileSync(outputPath, html);
                    console.log("Team profile successfully generated!");
                    done = true;
                    break;
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call init function to start the application
init();
