// laps are saved as values within a 1D array
// elapsed time must start from 0a nd count up
let currentElapsedTime = 0;
let stopped = true;
let timerInterval;

const showTime = function (element, elapsedTime) {
  let tempTime = elapsedTime;

  let seconds = tempTime % 1000; // get the remainder of 1000 ms which can go to second
  tempTime = Math.floor(tempTime / 1000); //to get seconds
  let minutes = tempTime % 60; // get the remainder of 60s which can go to minutes
  tempTime = Math.floor(tempTime / 60); // to get minutes
  let hours = tempTime % 60; // get the remainder of 60mins which can go to hours

  let timeStr = "";
  timeStr += hours.toString().padStart(2, "0") + " : ";
  timeStr += minutes.toString().padStart(2, "0") + " : ";
  timeStr += seconds.toString().padStart(2, "0");
  element.innerHTML = timeStr;
  return element.innerHTML;
};

const startButtonFunction = function () {
  stopped = false;
  timerInterval = setInterval(() => {
    currentElapsedTime += 1;
    showTime(document.getElementById("elapsedTime"), currentElapsedTime);
  }, 1000);
};

const stopButtonFunction = function () {
  clearInterval(timerInterval);
};

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");

// Setting Event Listeners
window.onload = function () {
  startButton.addEventListener("click", () => {
    startButtonFunction();
  });
  stopButton.addEventListener("click", () => {
    // call a fuction to stop the countdown
    stopButtonFunction();
  });
  resetButton.addEventListener("click", () => {
    // call a function to set elapsed time and lap data to zero
  });
  lapButton.addEventListener("click", () => {
    // call a fuction to lap and append the current lap time to the lap data div
  });
};
