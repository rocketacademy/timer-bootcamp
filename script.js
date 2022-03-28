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

//when start button is triggered
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

// when stop button is triggered
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

  //clearing the lap display
  lapDisplay.innerHTML = "";

  //clearing laptimes array
  lapTimes = [];
  counter = 1;

  //clearing split records
  splitDisplay.innerHTML = "";
  splitTimesRecord = [];
});

//lap button
let lapButton = document.createElement("button");
lapButton.classList.add("button", "blue");
lapButton.innerHTML = "Lap";
document.body.appendChild(lapButton);

//lap display container
let lapDisplay = document.createElement("div");
lapDisplay.classList.add("display");
document.body.appendChild(lapDisplay);

//lap counter
let counter = 1;
let lapTimes = [];

//when lap button is triggered
lapButton.addEventListener("click", () => {
  // minus 1000ms as laptime is always 1s ahead

  let lapTime = totalTime - 1000;
  let hour = convertTime(lapTime)[0];
  let minute = convertTime(lapTime)[1];
  let second = convertTime(lapTime)[2];
  lapTimes.push(lapTime);
  console.log(lapTimes);

  lapDisplay.innerHTML +=
    "Lap No." +
    `${counter}` +
    ": " +
    ("0" + `${hour}`).slice(-2) +
    ":" +
    ("0" + `${minute}`).slice(-2) +
    ":" +
    ("0" + `${second}`).slice(-2) +
    "<br>";

  counter += 1;

  // displaying split times
  split(lapTimes);
});

//lap display container
let splitDisplay = document.createElement("div");
splitDisplay.classList.add("display");
document.body.appendChild(splitDisplay);

//split time calc
let splitTime;
let splitCounter = 1;
let splitTimesRecord = [];

function split(lapTimes) {
  // empty the display everytime
  splitDisplay.innerHTML = "";

  // if there is more than 1 laps
  if (lapTimes.length > 1) {
    // loop over lapTimes.length
    splitCounter = 1;
    for (i = 0; i < lapTimes.length - 1; i++) {
      splitTime = lapTimes[i + 1] - lapTimes[i];

      // converting them to proper time format
      let hour = convertTime(splitTime)[0];
      let minute = convertTime(splitTime)[1];
      let second = convertTime(splitTime)[2];

      splitTimesRecord.push([hour, minute, second]);
      // console.log(splitTimesRecord);

      splitDisplay.innerHTML +=
        "Split No." +
        `${splitCounter}` +
        ": " +
        ("0" + `${hour}`).slice(-2) +
        ":" +
        ("0" + `${minute}`).slice(-2) +
        ":" +
        ("0" + `${second}`).slice(-2) +
        "<br>";
      splitCounter += 1;
    }
  }
}

function updateClock() {
  let hour = convertTime(totalTime)[0];
  let minute = convertTime(totalTime)[1];
  let second = convertTime(totalTime)[2];

  // let hour = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
  // let minute = Math.floor((totalTime / 1000 / 60) % 60);
  // let second = Math.floor((totalTime / 1000) % 60);

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

//convert millisecs to hours, minutes, seconds
function convertTime(totalTime) {
  let hour = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
  let minute = Math.floor((totalTime / 1000 / 60) % 60);
  let second = Math.floor((totalTime / 1000) % 60);

  return [hour, minute, second];
}
