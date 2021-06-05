// Global Variables defined

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// The above defines an [ARRAY] //
////////// How arrays work //////////
// console.log(enemyNames);
// console.log(enemyNames.length); //returns the # of elements inside enemyNames
// console.log(enemyNames.length-1); //returns the # of indexes
// console.log(enemyNames[0]); // returns 1st element inside array
// console.log(enemyNames[1]); // returns 2nd element inside array
// console.log(enemyNames[2]); // returns 3rd element inside array
// console.log(enemyNames[3]); //undefined if only 3 elements inside the enemyNames [array]
// for(var i=0; i < enemyNames.length; i ++) { 
//     console.log(enemyNames[i]);
//     console.log(i);
//     console.log(enemyNames[i] + " is at " + i + " index");
// }
var enemyHealth = 50;
var enemyAttack = 12;

// Global Variables END // Global Variables END // Global Variables END //
// ...


var fight = function(enemyName) { 
// fight() statements
    window.alert("The battle has started!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?Enter 'FIGHT' or 'SKIP' to choose.");

    // If the player shoses to fight, then fight:
    if (promptFight === "fight" || promptFight === "FIGHT") { 
        
        // player attacks opponent
        enemyHealth = enemyHealth - playerAttack;

        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // checking opponent's health:
        if (enemyHealth <=0) { 
            window.alert(enemyName + " has died!");
        }
        else { 
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // opponent attacks player
        playerHealth = playerHealth - enemyAttack

        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        )

        // check player's health
        if (playerHealth <=0) { 
            window.alert(playerName + " has died!");
        }
        else { 
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }

    // if the player chooses to skip, the skip
    else if (promptFight === "skip" || promptFight === "SKIP") { 
        window.alert(playerName + " has shosen to fkip the fight.");
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip) { 
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            playerMoney = playerMoney - 2;
        }
        else {
            fight();
        }
    }

    // if invalid entry, try again
    else {
        window.alert("You need to choose a valid option. Try again!");
    }
}

// Variables END // Variables END // Variables END // Variables END // Variables END // Variables END // Variables END // Variables END // Variables END // Variables END //


// Games States
// "WIN" - Player robot has defeated all enemy-robots
//      *Fight all enemy-robots
//      *Defeat each enemy-robot
// "LOSE" - Player robot's health is zer or less


//// Running Robot Gladiators ////

window.alert("Welcome to Robot Gladiators!");

for(var i=0; i <enemyNames.length; i++) { 
    fight(enemyNames[i]);
}

// fight();