import doors from "./doors.js";

let openedDoors = getCookie("openedDoors")
  ? getCookie("openedDoors").split(",")
  : [];

// All functions goes here

/**
 *
 * @param {array} doors  - an array of all 24 doors
 * @returns {array} allowedDoors - an array of all doors
 * that are allowed to be opened according to todays date
 */
function allowedDoors(doors) {
  let allowedDoors = [];
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  doors.forEach((door) => {
    if (door.date <= today) {
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
function notAllowedDoors(doors) {
  let notAllowedDoors = [];
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  doors.forEach((door) => {
    if (door.date > today) {
      notAllowedDoors.push(door);
    }
  });
  // Returns an array of door objects that aren't allowed to be opened
  return notAllowedDoors;
}

let lookedDoors = notAllowedDoors(doors);

/**
 *
 * @param {array} doors - an array of all doors that are allowed to be opened,
 * returned from allowedDoors function
 * For each allowed door, this function adds the content to the door
 */
function addContentToDoors(doors) {
  clickableDoors(doors);
  doors.forEach((door) => {
    let targetDoor = document.getElementById(door.id);
    targetDoor.querySelector(".card-body").innerHTML = door.content.text;

    if (door.content.img !== "") {
      let doorImg = targetDoor.querySelector(".card-img-top");
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
function hideChildren(targetDoor) {
  const children = targetDoor.querySelectorAll(".child");
  targetDoor.addEventListener("click", () => {
    children.forEach((child) => {
      child.classList.toggle("hidden");
    });
  });
}

function clickableDoors(doors) {
  doors.forEach((door) => {
    let targetDoor = document.getElementById(door.id);
    hideChildren(targetDoor);
  });
}

/**
 *
 * @param {array} doors - an array of all doors that are allowed to be opened
 * Highlights the door that corresponds to todays date
 */
function highlightToday(doors) {
  const today = getTodayDate();
  let todaysDoor = {};
  doors.forEach((door) => {
    let doorDate = door.date.toDateString();
    if (doorDate == today) {
      todaysDoor = door;
      let targetDoor = document.getElementById(todaysDoor.id);
      let doorHeader = targetDoor.querySelector(".card-header");
      doorHeader.classList.add("todays-door");
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


// Helper function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Helper function to get a cookie
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(name + "=") === 0) {
      return c.substring((name + "=").length, c.length);
    }
  }
  return null;
}

/**
 * @param {array} doorsToOpen - an array of all doors that are allowed to be opened
 */
function flipDoor(doorsToOpen) {
  // Retrieve saved opened doors from cookies
  let openedDoors = getCookie("openedDoors")
    ? getCookie("openedDoors").split(",")
    : [];

  // Iterate over the doorsToOpen array
  for (let i = 0; i < doorsToOpen.length; i++) {
    let door = doorsToOpen[i];
    let doorElement = document.getElementById(door.id);

    // Check if the door element exists in the DOM
    if (doorElement) {
      // Apply the "open" state for doors saved in cookies
      if (openedDoors.includes(door.id)) {
        doorElement.classList.add("card-shake"); // Keep door open
      }

      // Add click event listener to the door element
      doorElement.addEventListener("click", function () {
        // Toggle the card-shake class
        this.classList.toggle("card-shake");

        // Update the openedDoors array
        if (this.classList.contains("card-shake")) {
          // Add the door ID if not already included
          if (!openedDoors.includes(this.id)) {
            openedDoors.push(this.id);
          }
        } else {
          // Remove the door ID if it exists
          // openedDoors = openedDoors.filter(id => id !== this.id);
        }

        // Save the updated opened doors state in cookies
        setCookie("openedDoors", openedDoors.join(","), 7); // Save for 7 days
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

  lockedDoors.forEach((door) => {
    let lockedDoor = document.getElementById(door.id);
    let originalContent = "";

    if (lockedDoor) {
      // Add click event listener to the locked door
      lockedDoor.addEventListener("click", function () {
        const cardHeader = lockedDoor.querySelector(".front");

        //check for double clicks

        originalContent = doubleClickCheck(cardHeader, originalContent, door);

        // If another door is already active, clear its timeout and restore its content
        if (activeDoor && activeDoor !== lockedDoor) {
          const prevCardHeader = activeDoor.querySelector(".card-header");
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


function doubleClickCheck(cardHeader, originalContent, door) {
  if (
    cardHeader.innerHTML ===
    `<div id="grinch-${door.id}"><img src="../../images/grinch.png" alt="Grinch" style="max-width: 100%; max-height: 100%;"></div>`
  ) {
    return originalContent;
  } else {
    return cardHeader.innerHTML;
  }
}


function openOnLoad(element) {
  let elementId = document.getElementById(element);
  let children = elementId.querySelectorAll(".child");
  children.forEach((child) => {
    child.classList.toggle("hidden");
  });
}

window.onload = () => {
  openedDoors.forEach(openOnLoad);
};
