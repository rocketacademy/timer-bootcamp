// GLOBAL VARIABLES
let seconds = 0;
let minutes = 0;
let hours = 0;
let stopTimerValue = false;

// QUERY DOM ELEMENTS
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const displaySecondsOnScreen = document.getElementById("show-seconds");
const displayMinuteOnScreen = document.getElementById("show-minute");
const displayHourOnScreen = document.getElementById("show-hour");

// FUNCTION TO START TIMER
const startTimer = () => {
  stopTimerValue === true ? (stopTimerValue = false) : true;
  const toStartTimer = setInterval(() => {
    displaySecondsOnScreen.innerText = seconds;
    displayMinuteOnScreen.innerText = minutes;
    displayHourOnScreen.innerText = hours;
    seconds += 1;
    if (stopTimerValue === true) {
      console.log("STOP CLICKED", stopTimerValue);
      console.log("Value of stopTimerValue", stopTimerValue);
      clearInterval(toStartTimer);
    } else if (seconds === 60) {
      minutes += 1;
      console.log("minute ", minutes);
      seconds = 0;
      console.log("second ", minutes);
      //IF MINUTES == 60 ? HOURS === +=1 MINUTES === 0
    } else if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }
  }, 1000);
};

// FUNCTION TO STOP TIMER
const stopTimer = () => {
  console.log("Change value to true");
  stopTimerValue = true;
};

// FUNCTION TO RESET TIMER
const resetTimer = () => {
  console.log("RESET WAS CLICKED");
  // Stop timer
  stopTimer();
  // Reset timings to 0
  seconds = 0;
  minutes = 0;
  hours = 0;
};

// USER CLICK LISTENER
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
