const timeElement = document.getElementById("currentTime");

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the string with leading zeroes
    const clockStr = `Current time ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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
   const clockStr = `Time left to next door: ${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
   timeToNextDoor.innerText = clockStr;
}

remainingTimeForNextDoor();
setInterval(remainingTimeForNextDoor, -1000);

const timeToChrismas = document.getElementById("timeToChrismas");

function timeLeftToChrismas() {
    const now = new Date();
    const chrismassTime = new Date(2024, 11, 25); 
    const daysLeftToChrismas = chrismassTime.getDate() - now.getDate();
    const hoursLeftToChrismas = (now.getHours() - 24) * -1;
    const minutesLeftToChrismas = (now.getMinutes() - 60) * -1;
    const secondsLeftToChrismas = (now.getSeconds() - 60) * -1;

    // Format the string with leading zeroes
   const clockStr = `Time for Chrismas: ${daysLeftToChrismas.toString().padStart(2, '0')} days ${hoursLeftToChrismas.toString().padStart(2, '0')}:${minutesLeftToChrismas.toString().padStart(2, '0')}:${secondsLeftToChrismas.toString().padStart(2, '0')}`;
   timeToChrismas.innerText = clockStr;
}

timeLeftToChrismas();
setInterval(timeLeftToChrismas, -1000);