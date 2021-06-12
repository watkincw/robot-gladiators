/* GAME FUNCTIONS */

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fightOrSkip = function() { 
    // ask the player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) { 
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") { 
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) { 
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subrtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if player wants to leave
            return true;
        }
        else { 
            return false;
        }
    }
}
// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
    //  Keep track of who goes first
    var isPlayerTurn = true;
    // randomly change turn order
    if (Math.random() > 0.5) { 
        isPlayerTurn = false;
    }

    // fight loop starts
    while (playerInfo.health > 0 && enemy.health > 0) {
        // If it is the player-robot's turn:
        if (isPlayerTurn) { 
            // // The following 5 lines code were removed because, if the enemy attacked first, the player would not get a chance to choose to fight or skip before dealing damage to the player
            // // This was fixed by moving the fightOrSkip() call to the startGame() function, right before fight(pickedEnemyObject)
            // Prompt the fight or skip request
            // if (fightOrSkip()) { 
            //     // if true, leave fight by breaking loop
            //     break;
            // } 

            // If player chose to fight, remove damage from enemy-robot's health; reduce enemy.health by damage dealt
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);

            // Print how much health the enemy has remaining
            console.log(
                playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
            );
        
            // Check if the enemy-robot has enough health to continue fighting
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');
        
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
        
                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
            }
        }
        // player gets attacked first
        else { 
            // If player chose to fight, remove damage from player-robot's health; reduce player.health by damage dealt
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Print how much health the enemy has remaining
            console.log(
                enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                // leave while() loop if player is dead
                break;
            }
            else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
    // In this case, "!" switches who's turn it is. (switches boolean to opposit result(true --> false/false --> true))
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fight next enemy
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
    
            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];
    
            // set health for picked enemy
            pickedEnemyObj.health = randomNumber(40, 60);
            
            // **OLD CODE**
            //// pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
            // fight(pickedEnemyObj);
            // **OLD CODE END**
            // **NEW CODE**
            // *****There was an issue where, if the enemy attacks first, he would attack before the player had the option to fight/skip the battle *****
            // *****Some code was moved around so, if the enemy attacks first, the player gets still gets to decide wheather or not to skip the fight BEFORE the enemy attacks *****
            if (fightOrSkip()) { 
                //// if true, leave fight by breaking loop
                // break;
            } 
            else { 
                fight(pickedEnemyObj);
            }
            // fight(pickedEnemyObj);
            // **NEW CODE END**
    
            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            
                // if yes(true), take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // if player is not alive, break out of the loop and let endGame function run
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        // When the game has ended AND we've survived facing all the robots:
        window.alert("Great job, you've survived the game! You ended the game with a score of " + playerInfo.money + '.');
        // declare high score var; retrieve the current high score from localStorage, if it's not there, use 0
        var highScore = localStorage.getItem("highScore");
        if (highScore === null) { 
            highScore = 0;
        }
        //// Compare the player-robot score with the current high score by comparing playerInfo.money with current high score ////
        // If the new score is higher:
        if (playerInfo.money > highScore) {
            // Set new high score object into localStorage 
            localStorage.setItem("highScore", playerInfo.money);
            // Set new player-robot's name object into localStorage
            localStorage.setItem("name", playerInfo.name);
            // Send player the message that they beat the high score
            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        }
        // If the old high score is higher:
        else { 
            // send player the message that the player did not beat the high score
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
    }
    else {
        window.alert("You've lost your robot in battle!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm('Would you like to play again?');

    if (playAgainConfirm) {
        startGame();
    } 
    else {
        window.alert('Thank you for playing Robot Gladiators! Come back soon!');
    }
};

// go to shop between battles function
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? You get to pick one option: 1 to REFILL(20 health), 2 for UPGRADE(+6 attack), or 3 to LEAVE the store.'
    );
    
    // parseInt() converts string into integers,, Here, we are converting the input given in the window.prompt(above), to an integer if possible.
    // If not possible, a window.prompt will ask us to re-enter the input
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch case to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            window.alert(playerInfo.name + " now has " + playerInfo.health + " health remaining.")
            break;
        case 2:
            playerInfo.upgradeAttack();
            window.alert(playerInfo.name + " can now deal a maximum of " + playerInfo.attack + " damage.")
            break;
        case 3:
            window.alert('Leaving the store.');
            break;
        default:
            window.alert('You did not pick a valid option. Try again.');
            shop();
            break;
    }
};


/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */

// function to set name
var getPlayerName = function() { 
    var name = ""

    while (name === "" || name === null) { 
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

// player information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// enemy information
var enemyInfo = [
    {
        name: 'Roborto',
        attack: randomNumber(10, 14)
    },
    {
        name: 'Amy Android',
        attack: randomNumber(10, 14)
    },
    {
        name: 'Robo Trumble',
        attack: randomNumber(10, 14)
    }
];

//   console.log(enemyInfo);
//   console.log(enemyInfo[0]);
//   console.log(enemyInfo[0].name);
//   console.log(enemyInfo[0]['attack']);

/* END GAME INFORMATION / VARIABLES */

/* RUN GAME */
startGame();  