// Create displays for the different segments of the timer
const displayContainer = document.createElement('div');
displayContainer.classList.add('container');

const lapDataDivTag = document.createElement('div');
lapDataDivTag.classList.add('lapdata');

const rightDisplay = document.createElement('div');
rightDisplay.classList.add('rightDisplay');

const elapsedTimeDisplay = document.createElement('div');
elapsedTimeDisplay.classList.add('elapsed');

const row1ButtonDivTag = document.createElement('div');
row1ButtonDivTag.classList.add('row1');

const row2ButtonDivTag = document.createElement('div');
row2ButtonDivTag.classList.add('row2');

// Create individual listing for split timings:

// Create buttons
const startButton = document.createElement('button');
startButton.innerHTML = 'Start';
startButton.classList.add = 'start';

const stopButton = document.createElement('button');
stopButton.innerHTML = 'Stop';
startButton.classList.add = 'stop';

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset';
startButton.classList.add = 'reset';

const lapButton = document.createElement('button');
lapButton.innerHTML = 'Lap';
startButton.classList.add = 'lap';

// Append all elements at the end
// Append laplist to ElapsedTimeDisplay

// elapsedTimeDisplay.appendChild(lapTimeList);
// Append buttons to row1
row1ButtonDivTag.appendChild(startButton);
row1ButtonDivTag.appendChild(stopButton);

// Append buttons to row2
row2ButtonDivTag.appendChild(resetButton);
row2ButtonDivTag.appendChild(lapButton);

rightDisplay.appendChild(elapsedTimeDisplay);
rightDisplay.appendChild(row1ButtonDivTag);
rightDisplay.appendChild(row2ButtonDivTag);

displayContainer.appendChild(lapDataDivTag);
displayContainer.appendChild(rightDisplay);

document.body.appendChild(displayContainer);

// create countUp timer
const intervalInMS = 4;
// Store MS for lap calculation
let storeMS = 0;
// Creating an array to store the current splitTime corresponding to the splitCount
const storeMSArray = [];

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timerRef = 0;
let lapCount = 0;

startButton.addEventListener('click', () => {
  timerRef = setInterval(() => {
    // Note that the minimum delay is 4ms for HTML5
    milliseconds += 4;
    storeMS += 4;

    if (milliseconds % 1000 === 0) {
      seconds += 1;
      milliseconds = 0;
    }

    if (seconds % 60 === 0 && seconds > 0) {
      minutes += 1;
      seconds = 0;
    }

    if (minutes % 60 === 0 && minutes > 0) {
      hours += 1;
      minutes = 0;
    }

    elapsedTimeDisplay.innerHTML = `Elapsed Time:<br>${hours}H: ${minutes}m : ${seconds}s : ${milliseconds}`;
  }, intervalInMS);
});

stopButton.addEventListener('click', () => {
  clearInterval(timerRef);
});

resetButton.addEventListener('click', () => {
  clearInterval(timerRef);
  lapCount = 0;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  storeMSArray.length = 0;
  storeMS = 0;
  elapsedTimeDisplay.innerHTML = `Elapsed Time <br> ${hours}H: ${minutes}m : ${seconds}s : ${milliseconds}`;
  lapDataDivTag.innerHTML = '';
});

lapButton.addEventListener('click', () => {
  lapCount += 1;
  const currentElapsedTime = storeMS;
  storeMSArray.push(currentElapsedTime);
  const splitTimeList = document.createElement('li');
  const lapTimeList = document.createElement('li');
  const breakElement = document.createElement('br');

  splitTimeList.innerText = `Split ${lapCount}: ${hours}H: ${minutes}m : ${seconds}s : ${milliseconds}`;
  lapTimeList.innerText = getLapTime();
  console.log(getLapTime(), 'get lap time');
  lapDataDivTag.appendChild(splitTimeList);
  lapDataDivTag.appendChild(lapTimeList);
  lapDataDivTag.appendChild(breakElement);
});

const convertMStoTime = (timeInMS) => {
  const newMilliSeconds = timeInMS % 1000;
  // 70000-70000%1000 = 10 000 / 1000 = 10
  const MSToSeconds = ((timeInMS - (timeInMS % 1000)) / 1000);
  const displaySeconds = (MSToSeconds % 60).toFixed(0);

  const displayMinutes = (MSToSeconds / 60).toFixed(0);

  const displayHours = (MSToSeconds / 3600).toFixed(0);

  const outputValue = `Lap ${lapCount}: ${displayHours}H: ${displayMinutes}m : ${displaySeconds}s : ${newMilliSeconds}`;
  return outputValue;
};

const getLapTime = () => {
  let lapTimeInMS = 0;
  if (lapCount == 1) {
    lapTimeInMS = storeMSArray[lapCount - 1];
  } else {
    lapTimeInMS = storeMSArray[lapCount - 1] - storeMSArray[lapCount - 2];
  }
  return convertMStoTime(lapTimeInMS);
};
// laptime = split 2 - split 1
// convert split2's time into MS  - split1's time in MS
