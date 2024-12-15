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
 * @param {array} doors - array of all doors
 * @return {array} notAllowedDoors - an array of all doors that aren't allowed
 *  to be opened depending of todays date
 */
function notAllowedDoors(doors){
    let notAllowedDoors = []
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    doors.forEach(door =>{
        if (door.date > today){
            notAllowedDoors.push(door)
        }
    });
    // Returns an array of door objects that aren't allowed to be opened
    return notAllowedDoors
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
        targetDoor.addEventListener('click', () => {
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

/**
 * 
 * @returns {string} today - returns todays date in the format of a string
 */
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
            // Apply the "open" state for doors saved in LocalStorage
            // BUG: this is causing some of the doors to shake when the page is first opened
            // removing the 'card-shake' class stops that from happening but doesnt show an
            // 'open' door, so this needs fixing
            if (openedDoors.includes(door.id)) {
                doorElement.classList.add('card-shake'); // Keep door open
            }

            // Add click event listener to the door element
            doorElement.addEventListener("click", function () {
                // Add the card-shake class for the click effect
                this.classList.toggle('card-shake'); // Use toggle to open/close the door

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

// Initialize the flipDoor function
flipDoor(doorsToOpen);


/** 
 * @param {array} lookedDoors - an array of all closed doors
 * Add a click event listener to all closed doors to display a
 * image with a meesage that the door is not allowed to be opened
**/

function notAllowedDoorsWarning(lockedDoors) {
    // Variable to track the currently active door and its timeout
    let activeTimeout = null;
    let activeDoor = null;

    lockedDoors.forEach(door => {
        let lockedDoor = document.getElementById(door.id);
        if (lockedDoor) {
            // Add click event listener to the locked door
            lockedDoor.addEventListener('click', function() {
                const cardHeader = lockedDoor.querySelector('.card-header');
                const originalContent = cardHeader.innerHTML;

                // If another door is already active, clear its timeout and restore its content
                if (activeDoor && activeDoor !== lockedDoor) {
                    const prevCardHeader = activeDoor.querySelector('.card-header');
                    clearTimeout(activeTimeout);
                    prevCardHeader.innerHTML = prevCardHeader.dataset.originalContent; // Restore previous content
                }

                // Save original content to a dataset for safe restoration
                cardHeader.dataset.originalContent = originalContent;

                // Add the Grinch image to the inner HTML
                cardHeader.innerHTML = `<div id="grinch-${door.id}"><img src="../../images/grinch.png" alt="Grinch" style="max-width: 100%; max-height: 100%;"></div>`;

                // Update the active door and set a new timeout
                activeDoor = lockedDoor;
                activeTimeout = setTimeout(() => {
                    cardHeader.innerHTML = originalContent;
                    activeDoor = null;
                    activeTimeout = null;
                }, 1000);
            });
        }
    });
}
notAllowedDoorsWarning(lookedDoors);
