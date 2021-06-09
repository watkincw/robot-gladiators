// GAME FUNCTIONS

// function to generate random numeric value
var randomNumber = function(min, max) { 
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};


// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) { 
    while (playerInfo.Health > 0 && enemy.health > 0) { 
        // ask player if they's like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") { 
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) { 
                window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        // generate random damage calue based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );

        // check enemy's health
        if (enemy.health <= 0 ) { 
            window.alert(enemy.name + ' has died!');

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        } 
        else { 
            window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }

        // remove players's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.Health = Math.max(0, playerInfo.Health - damage);

        console.log(
            enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.Health + ' health remaining.'
        );

        // check players health
        if (playerInfo.Health <= 0) { 
            window.alert(playerInfo.name + ' has died!');
            // leave while() loop if player is dead
            break;
        } else { 
            window.alert(playerInfo.name + ' still has ' + playerInfo.Health + ' health left.');
        }
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    // fight each enemy-robot looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) { 
        // if player is still alive, keep fighting
        if (playerInfo.Health > 0) { 
            // let player know what round they are in, arrays start at 0 so it needs to have 1 added to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObject = enemyInfo[i];

            // reset the enemy's Health before starting new fight
            pickedEnemyObject.health = randomNumber(40, 60);

            // pass the pickedEnemyObject variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObject); 
                
                // if we're not at the last enemy in the array
            if (playerInfo.Health > 0 && i < enemyInfo.length - 1) { 
                // ask if the player wants to use the shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes, take them to the store() function
                if (storeConfirm) { 
                    shop();
                }
            }
        }
        // if player isnt alive, break out of the loop and let endGame function run
        else { 
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    // after the loop ends, the player is either out of health or eneimies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function() { 
    window.alert("The game has now ended. Let's see how you did!");
    // if player is still alive, player wins!
    if (playerInfo.Health > 0) { 
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else { 
        window.alert("You've lost your robot in battle.");
    }

    // ask the player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) { 
        // restart the game
        startGame();
    }
    else { 
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// go to shop between battles function
var shop = function() { 
    // ask the player what they'd like to do
    var shopOptionPromt = window.prompt(
        "Would you like to REFILL you health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or , 'LEAVE' to make a choice."
    );

    // using a 'switch' statment to carry out action
    switch(shopOptionPromt) {         
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
            
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store");
            // do nothing so function will end
            break;

        default: 
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// END GAME FUNCTIONS
// GAME INFORMATION / VARIABLES

// player information
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
            window.alert("Refilling player's health by 20 for $7.");
            this.health += 20;
            this.money -= 7;
        }
        else { 
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() { 
        if (this.money >= 7) { 
            window.alert("Upgrading player's attack by 6 for $7.");
            this.attack += 6;
            this.money -= 7;    
        }
        else { 
            window.alert("You don't have enough money!");
        }
    }
};

// // enemy information
// var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// var enemyHealth = 50;
// var enemyAttack = 12;
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
    },
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// END GAME INFORMATION / VARIABLES

// RUN GAME
startGame();