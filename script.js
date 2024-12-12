import doors from './doors.js';

// All functions goes here

/**
 * 
 * @param {array} doors  - an array of all 24 doors
 * @returns {array} allowedDoors - an array of all doors
 * that are allowed to be opened according to todays date
 */
function allowedDoors(doors){
    let allowedDoors = []
    let todaysDoor = {}
    let today = new Date();
    today.setHours(0,0,0,0);

    doors.forEach(door => {
        if (door.date < today){
            allowedDoors.push(door);
        } else if (door.date.toDateString() === today.toDateString()){
            todaysDoor = door;
        } else {
            console.log('Error in allowedDays function');
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
    doors.forEach(door => {
        document.getElementById(door.id).innerHTML = door.content;
    });
}

addContentToDoors(doorsToOpen);