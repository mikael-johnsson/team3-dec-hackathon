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
 * @param{array} doors - array of all doors
 * @return {array} notAllowedDoors - an array of all doors that aren't allowed
 *  to be opened depending of todays date
 */
function notAllowedDoors(doors){
    let notAllowerDoors = []
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    doors.forEach(door =>{
        if (door.date > today){
            notAllowerDoors.push(door)
        }
    });
    // Returns an array of door objects that aren't allowed to be opened
    return notAllowerDoors
}

let lookedDoors = notAllowedDoors(doors);


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
            let targetDoor = document.getElementById(todaysDoor.id);
            let doorHeader = targetDoor.querySelector('.card-header');
            doorHeader.classList.add('todays-door');
        }
    });
}

function getTodayDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return today.toDateString();
}


highlightToday(doorsToOpen);
addContentToDoors(doorsToOpen);

/**
 * Starter function to allow the doors to  shake when clicked
 * doorsToFlip can be updated to allowedDoors. This is where we could
 * check the date and display a message to the user if they try to
 * open a door when it's not yet that date.
 * May have to create two separate css classes so that the front of the door
 * displays the number, then when the door is clicked to flip, the back displays
 * the door content listed in doors.js.
 */
function flipDoor(doorsToOpen) {
    // Retrieve saved opened doors from LocalStorage or initialize an empty array
    let openedDoors = JSON.parse(localStorage.getItem('openedDoors')) || [];

    // Iterate over the doorsToOpen array
    for (let i = 0; i < doorsToOpen.length; i++) {
        let door = doorsToOpen[i];
        let doorElement = document.getElementById(door.id);

        // Check if the door element exists in the DOM
        if (doorElement) {
            // Add click event listener to the door element
            doorElement.addEventListener("click", function () {
                // Add the card-shake class for the click effect
                this.classList.add('card-shake');

                // Remove the card-shake class after the animation completes
                setTimeout(() => {
                    this.classList.remove('card-shake');
                }, 500); // Match the duration of the animation

                // Update the openedDoors state
                if (this.classList.contains('card-shake')) {
                    // Add to opened doors if not already included
                    if (!openedDoors.includes(this.id)) {
                        openedDoors.push(this.id);
                    }
                } else {
                    // Remove from opened doors if it exists
                    openedDoors = openedDoors.filter(id => id !== this.id);
                }

                // Save the updated state to LocalStorage
                localStorage.setItem('openedDoors', JSON.stringify(openedDoors));
            });
        }
    }
}


flipDoor(doorsToOpen);

/** 
 * @param {array} lookedDoors - an array of all closed doors
 * Add a click event listener to all closed doors to display a
 * image with a meesage that the door is not allowed to be opened
**/

function notAllowedDoorsWarning(lookedDoors) {
    lookedDoors.forEach(door => {
        let lockedDoor = document.getElementById(door.id);
        if (lockedDoor) {
            lockedDoor.addEventListener('click', function() {
                lockedDoor.querySelector('.card-body').innerHTML = "This door is not allowed to be opened yet";
            });
        }
    });
}

notAllowedDoorsWarning(lookedDoors);