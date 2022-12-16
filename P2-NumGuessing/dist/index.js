#! /usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
let minRequiredScore = 20;
let totalRound = 3;
let pointPerRound = 10;
let winningRound = [];
let chalk;
async function playGame() {
    let playAgian;
    do {
        chalk = chalkAnimation.glitch(`3 Round will be played !`).start();
        await sleep();
        await GuessGame();
        playAgian = await playAgain();
    } while (playAgian.restart.toLowerCase() == "y" ||
        playAgian.restart.toLowerCase() == "yes");
}
async function GuessGame() {
    chalk.stop();
    let round = 1;
    while (round <= totalRound) {
        let randomNumber = Math.floor(Math.random() * 6);
        const guessNum = await InputFromUser();
        if (guessNum < 0 || guessNum > 10) {
            console.log(`guess number must between 0 to 5, both are inclusive.`);
            console.log("");
        }
        if (guessNum != randomNumber) {
            console.log(`Oh Sad ! you Lost round ${round}, Guess Number was ${randomNumber}`);
            console.log("");
        }
        else {
            winningRound.push(round);
            console.log(`Congratulations ! you won round ${round}, Guess Number was ${randomNumber}`);
            console.log("");
        }
        if (round == totalRound)
            getScore() < minRequiredScore
                ? chalk = chalkAnimation.neon(`Final Result : You've Lost this game, You scored ${getScore()}`).start()
                : chalk = chalkAnimation.neon(`Congratulations! You've won this game, You scored ${getScore()}`).start();
        console.log("");
        round++;
    }
    await sleep();
    chalk.stop();
}
async function InputFromUser() {
    const { guessNum } = await inquirer.prompt({
        type: "number",
        name: "guessNum",
        message: "Enter the guess Number between 0 to 5  (inclusive)\n",
    });
    return guessNum;
}
async function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
}
function getScore() {
    return winningRound.length * pointPerRound;
}
async function playAgain() {
    return await inquirer.prompt({
        type: "input",
        name: "restart",
        message: "Do you want to continue ? Press y or n \n",
    });
}
await playGame();
//# sourceMappingURL=index.js.map