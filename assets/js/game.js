// Global Variables defined

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Global Variables END // Global Variables END // Global Variables END //
// ...

// shop
var shop = function() { 
    window.alert("You have entered the shop");
    // ask the player what they'd like to do
    var shopOptionPromt = window.prompt("Would you like to REFILL you health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or , 'LEAVE' to make a choice.");
    // using a 'switch' statment to carry out action
    switch(shopOptionPromt) {         
        case "REFILL":
        case "refill":
            if(playerMoney >= 7) { 
                window.alert("Refilling player's health by 20 for $7.");
                // increase health and decrese money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else { 
                window.alert("You don't have enough money!");
            }
            break;
            
        case "UPGRADE":
        case "upgrade":
            if(playerMoney >= 7) { 
                window.alert("Upgrading player's attack by 6 for $7.");
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else { 
                window.alert("You don't have enough money!");
            }
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


// fight function (now with parameter for enemy's name)
var fight = function(enemyName) { 
    while (playerHealth > 0 && enemyHealth > 0) { 
        // ask player if they's like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
        // if tplayer picks "skip" conforim and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") { 
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) { 
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerAttack var
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
        );

        // check enemy's health
        if (enemyHealth <= 0 ) { 
            window.alert(enemyName + ' has died!');

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        } 
        else { 
            window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }

        // remove player's health by subtracting the amount set in the enemyAttack var
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
        );

        // check players health
        if (playerHealth <= 0) { 
            window.alert(playerName + ' has died!');
            // leave while() loop if player is dead
            break;
        } 
        else { 
            window.alert(playerName + ' still has ' + playerHealth + ' health left.');
        }
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    // fight each enemy-robot looping over them and fighting them one at a time
    for (var i = 0; i < enemyNames.length; i++) { 
        // if player is still alive, keep fighting
        if (playerHealth > 0) { 
            // let player know what round they are in, remember that arrays start at 0 so it need to
            // have 1 added to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50;

            // use debugger to pause script from running and check what's going on at that moment in
            // the code debugger;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume

            // the value of the enemyName parameter
            fight(pickedEnemyName); { 
                // ask if the player wants to use the shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store beforethe next round?");
                
                // if we're not at the last enemy in the array
                if (playerHealth > 0 && i < enemyNames.length - 1) { 
                    shop();
                }
            }
        }
        // if player isnt alive, stop the game
        else { 
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    // after the loop ends, the player is either out of health or eneimies to fight, 
    // so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function() { 
    window.alert("The game has now ended. Let's see how you did!");
    // if player is still alive, player wins!
    if (playerHealth > 0) { 
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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

startGame();

// Wrap the game in logic in a startGame() function
// When the player is defeated or there are no more enemies, call an endGame() function that:
    // Alerts the player's total stats
    // Asks the player if they want to play again
    // If yes, call startGame() to restart the game
// After the player skips or ddefeats an enemy(and there are still more robots to fight):
    // Ask the player if they want to "shop"
    // If no, continue as normal
    // If yes, call the shop() function
    // In the shop() function, ask the player if they want to "refill" health, "upgrade", attack, or "leave" the shop
    // If refill, subtract money from player and increse health
    // If upgrade, subtract money from player and increase attack power
    // If leave, alert goobye and exit the function
    // If any other invalid option, call shop() again