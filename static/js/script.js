import doors from './doors.js';

// All functions goes here

/**
 * 
 * @param {array} doors  - an array of all 24 doors
 * @returns {array} allowedDoors - an array of all doors
 * that are allowed to be opened according to todays date
 */
function allowedDoors(doors) {
    let allowedDoors = []
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    doors.forEach(door => {
        if (door.date <= today){
            allowedDoors.push(door);
        }
    });
    // Returns an array of door objects that are allowed to be opened
    return allowedDoors;
}


let doorsToOpen = allowedDoors(doors);


/**
 * 
 * @param {array} doors - an array of all doors that are allowed to be opened, 
 * returned from allowedDoors function
 * For each allowed door, this function adds the content to the door
 */
function addContentToDoors(doors){
    clickableDoors(doors)
    doors.forEach(door => {
        let targetDoor = document.getElementById(door.id)
        targetDoor.querySelector('.card-body').innerHTML = door.content.text;

        if(door.content.img !== ""){
            let doorImg = targetDoor.querySelector('.card-img-top');
            doorImg.src = door.content.img;
        }
    });
}

/**
 * 
 * @param {array} doors - an array of all doors that are allowed to be opened
 * creates an event listener for each door, so that when the door is clicked,
 * it toggles between the door being open (content displaying) 
 * and closed (default door displaying)
 */
function clickableDoors(doors){
    doors.forEach(door => {
        let targetDoor = document.getElementById(door.id);
        const children = targetDoor.querySelectorAll('.child');
        targetDoor.addEventListener('click', (e) => {
            children.forEach(child => {
                child.classList.toggle('hidden');
            });
            
        });
    });
}

/**
 * 
 * @param {array} doors - an array of all doors that are allowed to be opened
 * Highlights the door that corresponds to todays date
 */
function highlightToday(doors){
    const today = getTodayDate();
    let todaysDoor = {};
    doors.forEach(door => {
        let doorDate = door.date.toDateString();
        if(doorDate == today){
            todaysDoor = door;
        }
    });
    let targetDoor = document.getElementById(todaysDoor.id);
    let doorHeader = targetDoor.querySelector('.card-header');
    doorHeader.classList.add('todays-door');
}

function getTodayDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return today.toDateString();
}


highlightToday(doorsToOpen);
addContentToDoors(doorsToOpen);

/**
 * Starter function to allow the doors to flip when a user clicks on them.
 * doorsToFlip can be updated to allowedDoors. This is where we could
 * check the date and display a message to the user if they try to
 * open a door when it's not yet that date.
 * May have to create two separate css classes so that the front of the door
 * displays the number, then when the door is clicked to flip, the back displays
 * the door content listed in doors.js.
 */
function flipDoor(doors) {
    // Retrieve saved opened doors from LocalStorage (or use an empty array)
    let openedDoors = JSON.parse(localStorage.getItem('openedDoors')) || [];

    // Ensure doors are opened based on the stored state
    doors.forEach((door) => {
        if (openedDoors.includes(door.id)) {
            door.querySelector('.card').classList.add('card-flip');
        }

        // Add event listener for toggling door state
        door.addEventListener("click", function () {
            const card = this.querySelector('.card');
            card.classList.toggle('card-flip');

            // Update the openedDoors array
            if (card.classList.contains('card-flip')) {
                // Add door ID to openedDoors
                if (!openedDoors.includes(door.id)) {
                    openedDoors.push(door.id);
                }
            } else {
                // Remove door ID from openedDoors
                openedDoors = openedDoors.filter(id => id !== door.id);
            }

            // Save the updated state to LocalStorage
            localStorage.setItem('openedDoors', JSON.stringify(openedDoors));
        });
    });
}

// Select all doors by their containing elements (e.g., .col)
let doorsToFlip = document.querySelectorAll('[id^="door"]');

// Initialize the flip functionality
flipDoor(doorsToFlip);
