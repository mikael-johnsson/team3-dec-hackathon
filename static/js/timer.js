const timeElement = document.getElementById("currentTime");

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the string with leading zeroes
    const clockStr = `Current time ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    timeElement.innerText = clockStr;
}

updateTime();
setInterval(updateTime, 1000);

const timeToNextDoor = document.getElementById("timeToNextDoor");

function remainingTimeForNextDoor() {
   const now = new Date();
   const hoursLeft = (now.getHours() - 24) * -1;
   const minutesLeft = (now.getMinutes() - 60) * -1;
   const secondsLeft = (now.getSeconds() - 60) * -1;

   // Format the string with leading zeroes
   const clockStr = `Time left to next door: ${hoursLeft.toString().padStart(2, '0')}h ${minutesLeft.toString().padStart(2, '0')}min`;
   timeToNextDoor.innerText = clockStr;
}

remainingTimeForNextDoor();
setInterval(remainingTimeForNextDoor, -1000);

const timeToChristmas = document.getElementById("timeToChristmas");

function timeLeftToChristmas() {
    const now = new Date();
    const christmasTime = new Date(2024, 11, 25); 
    const daysLeftToChristmas = christmasTime.getDate() - now.getDate();
    const hoursLeftToChristmas = (now.getHours() - 24) * -1;
    const minutesLeftToChristmas = (now.getMinutes() - 60) * -1;
    const secondsLeftToChristmas = (now.getSeconds() - 60) * -1;

    // Format the string with leading zeroes
   const clockStr = `Time until Christmas: ${daysLeftToChristmas.toString().padStart(2, '0')} days ${hoursLeftToChristmas.toString().padStart(2, '0')}h ${minutesLeftToChristmas.toString().padStart(2, '0')}min`;
   timeToChristmas.innerText = clockStr;
}

timeLeftToChristmas();
setInterval(timeLeftToChristmas, -1000);