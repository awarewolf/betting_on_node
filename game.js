var prompt = require('sync-prompt').prompt;

var bankAccount = 100;
var betRange = [5,10];
var guessRange = [1,10];

var getBetInRange = function(bankAccount, rangeBottom, rangeTop) {

  message = '';

  var bet = prompt("Enter a bet between $" + betRange[0] + " and $" + betRange[1] + " >");

  if (bet <= bankAccount) {
    if (!(bet >= rangeBottom && bet <= rangeTop)) {
      console.log("The bet value is not between $" + rangeBottom + " and $" + rangeTop);
      return false;
    }
  } else {
    console.log("You don't have that amount of money in your bank account");
    return false;
  }

  return bet;
}

var getGuessNumberInRange = function(rangeBottom, rangeTop) {

  var guess = prompt("Enter a guess between " + guessRange[0] + " and " + guessRange[1] + " >");

  if (!(guess >= rangeBottom && guess <= rangeTop)) {
    console.log("Your guess is not between " + rangeBottom + " and " + rangeTop);
    return false;
  }
  return guess;
}

var getRandNumberInRange = function(rangeBottom, rangeTop) {
  return Math.floor((Math.random() * rangeTop) + rangeBottom);
}

var showBankAccount = function(bankAccount) {
  console.log("Your bank account balance is $" + bankAccount);
}

var stillAlive = function(bankAccount, betRangeBottom) {
  return (bankAccount >= betRangeBottom);
}

var play = function(betRange, guessRange) {

  showBankAccount(bankAccount);

  do {
    bet = getBetInRange(bankAccount, betRange[0], betRange[1]);
  } while (!bet)

  do {
    guess = getGuessNumberInRange(guessRange[0], guessRange[1]);
  } while (!guess)

  number = getRandNumberInRange(guessRange[0], guessRange[1]);

  console.log("The number is " + number)

  if (bet && guess) {
    if (number == guess) {
      bankAccount += 2 * bet;
      console.log("Bang on!");
    } else if (!(guess == number + 1 || guess == number - 1)) {
      bankAccount -= bet;
      console.log("Sorry, try again!");
    } else {
      console.log("Close but no cigar!");
    }
  }
}

do {
  play(betRange, guessRange);
} while (stillAlive(bankAccount, betRange[0]))

showBankAccount(bankAccount);
console.log("You ran out of money. Thanks for playing.");
