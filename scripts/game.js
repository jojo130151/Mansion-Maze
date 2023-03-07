window.alert("Welcome! This is a simple game where you can traverse between rooms and grab items. You have woken up in a strange mansion and you can hear howling wolves nearby. You run for the exits but no matter how hard you try, you can't escape the mansion. You can hear the door holding the wolves back start to break and you know that you need to prepare for the fight of your life. The goal of the game is to move about the rooms collecting items without running into the wolves scratching at the door of the cellar before you collect them all.");
let currentRoom = "Great Hall"; // Set the start room

let instructions = document.getElementById("instructions");
instructions.innerHTML = "Move commands are: &#39;go South&#39;, &#39;go North&#39;, &#39;go West&#39;, and &#39;go East&#39;<br>If the room has an item, you can grab the item and add it to the inventory by typing &#39;grab item&#39;<br>You can exit the game anytime by typing &#39;exit&#39;";

let inventory = []; // A list for inventory

let dictItems = {
    "Dining Room": "Serrated Knife",
    "Library": "Book on Wolves",
    "Kitchen": "Slabs of Meat",
    "Guest Bathroom": "Sleep Aids",
    "Master Bedroom": "Sword",
    "Sitting Room": "Curtains",
    "Private Study": "Glass of Whiskey",
    "Hallway": "Tape"
};

let dictRooms = {
    "Great Hall": {"south": "Hallway", "west": "Dining Room", "east": "Library", "north": "Ballroom"},
    "Hallway": {"north": "Great Hall", "east": "Cellar", "west": "Guest Bedroom", "south": "Guest Bathroom", "item": "Tape"},
    "Cellar": {"west": "Hallway"},
    "Dining Room": {"east": "Great Hall", "north": "Kitchen", "item": "Serrated Knife"},
    "Kitchen": {"south": "Dining Room", "east": "Ballroom", "item": "Slabs of Meat"},
    "Guest Bedroom": {"east": "Hallway"},
    "Guest Bathroom": {"north": "Hallway", "item": "Sleep Aids"},
    "Library": {"west": "Great Hall", "north": "Private Study", "item": "Book on Wolves"},
    "Private Study": {"south": "Library", "item": "Glass of Whiskey"},
    "Ballroom": {"south": "Great Hall", "west": "Kitchen", "north": "Sitting Room"},
    "Sitting Room": {"south": "Ballroom", "east": "Master Bedroom", "item": "Curtains"},
    "Master Bedroom": {"west": "Sitting Room", "south": "Private Study", "north": "Master Bathroom", "item": "Sword"},
    "Master Bathroom": {"south": "Master Bedroom"}
};

console.log(`${dictRooms["Great Hall"]["south"]}`);
console.log(`${dictItems["Master Bedroom"]}`);


let consoleDiv = document.getElementById("console");
let statusDiv = document.getElementById("status");
let cmdButton = document.getElementById("cmdSubmit");

statusDiv.innerHTML = statusMsg(currentRoom);

cmdBar = document.getElementById("command");
cmdBar.focus();

function statusMsg (currentRoom) {
    let statusMessage = `You are in the ${currentRoom}.<br>`;
    console.log(`inside statusMsg - dictItems[currentRoom] returns ${dictItems[currentRoom]}.`);
    console.log(`inside statusMsg - inventory returns ${inventory}`);
    if ((currentRoom in dictItems) && (!(inventory.includes(dictItems[currentRoom])))) {
        statusMessage += `In this room you see ${dictRooms[currentRoom]['item']}.<br>`;
    }
    statusMessage += `Inventory: ${inventory.join(', ')}`;
    return statusMessage;
};

function runAction() {
    cmdInput = document.getElementById("command");
    let cmd = cmdInput.value.toLowerCase();
    console.log(`In the runAction(), cmd is ${cmd}.`);

    // Use if, else-if, and else statements to control movement based on command
    let userCommand = cmd.split(" ");
    console.log(`In runAction(), userCommand is ${userCommand}`);
    console.log(`In runAction(), userCommand[1] is ${userCommand[1]}`);
    console.log(`dictRooms[currentRoom]["south"] returns ${dictRooms[currentRoom]["south"]}`);
    console.log(`${currentRoom.valueOf()}`);
    if (userCommand[0] == 'go') { // Move rooms or output invalid directions
        if (userCommand[1] in dictRooms[currentRoom]) {
            currentRoom = dictRooms[currentRoom][userCommand[1]];
            consoleDiv.innerHTML = "";
            if (currentRoom == "Cellar") {
                if (inventory.length == Object.keys(dictItems).length) {
                    winningMessage(); 
                }
                else {
                    losingMessage(inventory, dictItems); 
                }
                cmdInput.remove();
                cmdButton.remove();
                statusDiv.remove();
                instructions.innerHTML = "Thank you for playing!";
                return; //SEE ABOUT CLEARING OUT INPUT AND BUTTON FEATURES WHEN COMPLETE
            }
            console.log(`Made it through valid go if statement. currentRoom = ${currentRoom}`);
        }
        else if (!(userCommand[1] in dictRooms[currentRoom])) {
            consoleDiv.innerHTML = "Try a different direction.";
        }
    }
    else if (userCommand[0] == 'grab') {
        if (currentRoom in dictItems) {
            inventory.push(dictItems[currentRoom]);
        }
        else {
            consoleDiv.innerHTML = "There is no item in this room";
        }
    }
    else if (userCommand[0] == 'exit') {
        cmdInput.remove();
        cmdButton.remove();
        statusDiv.remove();
        instructions.innerHTML = "Thank you for playing!";
        return; //SEE ABOUT CLEARING OUT INPUT AND BUTTON FEATURES WHEN COMPLETE
    }
    else {
        consoleDiv.innerHTML = "Please enter a valid command.";
    }
    cmdInput.value = '';
    statusDiv.innerHTML = statusMsg(currentRoom);
}

function winningMessage() {
    window.alert("You cautiously approach the door leading to the cellar. You can hear the rustling of fur and the 'clink' sound of claws hitting hardwood floors. First, you take a minute to flip through the book you found, finding anything you can about the weaknesses of wolves. Next, you take a big gulp of whiskey to get some liquid courage because this fight is going to be rough. You stuff the sleep aids into the slabs of meat to use both a distraction and to *hopefully* knock a few wolves out. For protection, you tape portions of the curtains you found around your arms and legs for cushion. With your sword and knife in hand, you are as ready as you'll ever be. You descend the stairs...");
    window.alert('CLASH -- ');
    window.alert('GROWL -- ');
    window.alert('WHINE -- ');
    window.alert('AHHHHHHHHHHHH! -- ');
    window.alert('SQUELCH');
    window.alert(`You lay on the ground, breaths heavy and hard, blood seeping out from wounds on your right arm and across your ribs. There are the bodies of three wolves lying around you, not a one with a heartbeat. You are victorious. Now, if only you can figure out how to get out of this forsaken house...`);
}

function losingMessage(inventory, dictItems) {
    window.alert(`Well, you only found ${inventory.length} of ${Object.keys(dictItems).length} items. Without all of the items, you went into this arduous battle ill-prepared. The wolves tore your body into shreds and ate your corpse. Better luck next time.`);
}

// TAKEN FROM W3 https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Get the input field
var cmd = document.getElementById("command");

// Execute a function when the user presses a key on the keyboard
cmd.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("cmdSubmit").click();
  }
});

