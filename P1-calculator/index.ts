#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';


const sleep = () => {
    return new Promise((resolve)=> {
        setTimeout(resolve, 3000);
    })
}

async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('Lets start calculation');
    await sleep();
    rainbowTitle.stop();
        console.log(`
     _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `);



}
await welcome();


async function calculation() {
  const answers =  await inquirer.prompt([
        {
            type:"list",
            name:"operator",
            message:"Which operation you want to perform ? \n",
            choices:["Addition", "Subtraction","Multiplication","Division"]
        },
        {
            type:"number",
            name:"num1",
            message:"Enter Number 1\n",
        },
        {
            type:"number",
            name:"num2",
            message:"Enter Number 2\n",
        }
    ])
    
        
        if(answers.operator == "Addition")
        console.log(chalk.bgGrey(`${answers.num1} + ${answers.num2}  = ${answers.num1 + answers.num2}`));
        if(answers.operator == "Subtraction")
        console.log(chalk.bgGrey(`${answers.num1} + ${answers.num2}  = ${answers.num1 - answers.num2}`));
        if(answers.operator == "Multiplication")
        console.log(chalk.bgGrey(`${answers.num1} + ${answers.num2}  = ${answers.num1 * answers.num2}`));
        if(answers.operator == "Division")
        console.log(chalk.bgGrey(`${answers.num1} + ${answers.num2}  = ${answers.num1 / answers.num2}`));
        
        
    
}


AskQuestion();
async function AskQuestion() {
    
    let again : any;
    do {
        
        await calculation();
        
       again =  await inquirer.prompt(
            {
                type:"input",
                name:"restart",
                message:"Do you want to continue ? Press y or n \n",
                
            })
    }
    while(again.restart.toLowerCase() == 'y' || again.restart.toLowerCase() == 'yes')
     
}


