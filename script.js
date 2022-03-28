// Please implement exercise logic here

//timer display container
let timeDisplay = document.createElement("div");
timeDisplay.classList.add("display");
document.body.appendChild(timeDisplay);

//default time display
let hour = 00;
let minute = 00;
let second = 00;
timeDisplay.innerHTML = timeDisplay.innerHTML =
  "Time Elapsed: " +
  ("0" + `${hour}`).slice(-2) +
  ":" +
  ("0" + `${minute}`).slice(-2) +
  ":" +
  ("0" + `${second}`).slice(-2);

let totalTime = 0;

//default ending time is 3 mins
const endTimeInMillisec = 180000;
let timeInterval;

// display the timer each second
const displaySec = 1000;

//Start button
let startButton = document.createElement("button");
startButton.classList.add("button", "green");
startButton.innerHTML = "Start";
document.body.appendChild(startButton);

//resume the timer once clicked
startButton.addEventListener("click", () => {
  console.log("START BUTTON PRESSED");
  // clearing time interval everytime when the button gets clicked
  clearInterval(timeInterval);
  // updateClock();
  timeInterval = setInterval(updateClock, displaySec);
});

//Stop button
let stopButton = document.createElement("button");
stopButton.classList.add("button", "red");
stopButton.innerHTML = "Stop";
document.body.appendChild(stopButton);

// pause the timer once clicked
stopButton.addEventListener("click", () => {
  console.log("STOP BUTTON PRESSED");

  //record the paused time in case we need to resume it later
  let pausedTime = totalTime;
  console.log(pausedTime);
  clearInterval(timeInterval);
});

//reset button
let resetButton = document.createElement("button");
resetButton.classList.add("button", "yellow");
resetButton.innerHTML = "Reset";
document.body.appendChild(resetButton);

resetButton.addEventListener("click", () => {
  console.log("RESET BUTTON PRESSED");
  totalTime = 0;
  clearInterval(timeInterval);
  updateClock();
});

function updateClock() {
  let hour = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
  let minute = Math.floor((totalTime / 1000 / 60) % 60);
  let second = Math.floor((totalTime / 1000) % 60);

  timeDisplay.innerHTML =
    "Time Elapsed: " +
    ("0" + `${hour}`).slice(-2) +
    ":" +
    ("0" + `${minute}`).slice(-2) +
    ":" +
    ("0" + `${second}`).slice(-2);

  if (totalTime >= endTimeInMillisec) {
    clearInterval(timeInterval);
  }

  totalTime += 1000;
  console.log(totalTime);
}
