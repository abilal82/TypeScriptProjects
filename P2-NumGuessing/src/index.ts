#! /usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";


// Variable Declaration
let minRequiredScore: number = 20;
let totalRound: number = 3;
let pointPerRound: number = 10;
let winningRound: number[] = [];
let chalk: any;

// This method will work as starting point of the game program.
async function playGame(): Promise<void> {
  let playAgian: any;
  do {
    chalk = chalkAnimation.glitch(`3 Round will be played !`).start();
    await sleep();
    await GuessGame();

    playAgian = await playAgain();
  } while (
    playAgian.restart.toLowerCase() == "y" ||
    playAgian.restart.toLowerCase() == "yes"
  );
}

// Actuall logic goes into this method
async function GuessGame(): Promise<void> {

  chalk.stop(); // To stop animation which is started before calling this method.
  let round: number = 1;

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
  await sleep(); // calling, just to wait for completing Final result output animation, Just to beautify output.
  chalk.stop(); // To stop animation which is started in while loop 
}

// This method is used to take input from the player
async function InputFromUser(): Promise<number> {
  const { guessNum } = await inquirer.prompt({
    type: "number",
    name: "guessNum",
    message: "Enter the guess Number between 0 to 5  (inclusive)\n",
  });

  return guessNum;
}

async function sleep(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}
// It will calculate the score 
function getScore(): number {
  
  return  winningRound.length * pointPerRound;
}

// It will take input for play again 

async function playAgain(): Promise<any> {
  return await inquirer.prompt({
    type: "input",
    name: "restart",
    message: "Do you want to continue ? Press y or n \n",
  });
}

// calling this method to run game 
await playGame();
