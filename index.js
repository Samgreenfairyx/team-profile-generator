const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const render = require('./src/page-template');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const teamMembers = [];

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the manager\'s name:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter a name.';
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the manager\'s employee ID:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an employee ID.';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the manager\'s email address:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an email address.';
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter the manager\'s office number:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an office number.';
        }
    }
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the engineer\'s name:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter a name.';
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the engineer\'s employee ID:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an employee ID.';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the engineer\'s email address:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an email address.';
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the engineer\'s GitHub username:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter a GitHub username.';
        }
    }
];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the intern\'s name:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter a name.';
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the intern\'s employee ID:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an employee ID.';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the intern\'s email address:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter an email address.';
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the intern\'s school:',
        validate: (input) => {
            return input !== '' ? true : 'Please enter a school name.';
        }
    }
];

const menuQuestion = [
    {
        type: 'list',
        name: 'menuOption',
        message: 'Select an option:',
        choices: [
            'Add an engineer',
            'Add an intern',
            'Finish building the team'
        ]
    }
];

async function promptManager() {
    console.log('Please enter the manager\'s information:');
    const answers = await inquirer.prompt(managerQuestions);
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    console.log('Manager added successfully!\n');
}

async function promptEngineer() {
    console.log('Please enter the engineer\'s information:');
    const answers = await inquirer.prompt(engineerQuestions);
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    console.log('Engineer added successfully!\n');
}

async function promptIntern() {
    console.log('Please enter the intern\'s information:');
    const answers = await inquirer.prompt(internQuestions);
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    console.log('Intern added successfully!\n');
}

async function promptMenu() {
    const answer = await inquirer.prompt(menuQuestion);
    return answer.menuOption;
}

async function init() {
    try {
        await promptManager();
        let menuOption = await promptMenu();
        while (menuOption !== 'Finish building the team') {
            switch (menuOption) {
                case 'Add an engineer':
                    await promptEngineer();
                    break;
                case 'Add an intern':
                    await promptIntern();
                    break;
            }
            menuOption = await promptMenu();
        }
        const html = render(teamMembers);
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, html);
        console.log('Team profile successfully generated!');
    } catch (error) {
        console.error('Error:', error);
    }
}

init();
