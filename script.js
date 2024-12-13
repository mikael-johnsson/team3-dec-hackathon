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
    let today = new Date();
    today.setHours(0,0,0,0);

    doors.forEach(door => {
        if (door.date <= today){
            allowedDoors.push(door);
        } else {
            console.log('This door is locked: ', door.date);
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
        targetDoor.querySelector('p').innerHTML = door.content.text

        if(door.content.img !== ""){
            let doorImg = targetDoor.querySelector('img');
            doorImg.src = door.content.img;
        }
    });
}

function clickableDoors(doors){
    // console.log("clickable doors: ", doors);
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


addContentToDoors(doorsToOpen);