// Global setup ===========================================================
// object to store seconds, minutes and hour
const elapsedTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

// number of seconds per minute
const SEC_PER_MIN = 3;
const MIN_PER_HR = 3;

// stores ID of CountTimeId function
let timerId;

// to store total number of seconds since timer started till end of previous lap.
let totalSecondsTillPrevLap = 0;
// to store total number of seconds since timer started.
let totalSeconds = 0;
// object to store current lap time
const lapTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};
// array to store lap times
const lapTimes = [];
// element to display heading for lap time container
let lapTimeContainerHeading;
// element to display current lap time
let lapTimeEl;
// container to display lap times
let lapTimeNumbersContainer;
// container to display all information related to lap time
let lapTimeContainer;

// container to display elapsed time
let elapsedTimeContainer;

// elements to display start, stop, reset and lap buttons
let startButton;
let stopButton;
let resetButton;
let lapButton;

// Helper functions =======================================================
// to create elements needed at game initialisation
const createStartingElements = () => {
  // container to display elapsed time
  elapsedTimeContainer = document.createElement('div');

  // start, stop, reset and lap button
  startButton = document.createElement('button');
  stopButton = document.createElement('button');
  resetButton = document.createElement('button');
  lapButton = document.createElement('button');

  // element to display heading for lap time container
  lapTimeContainerHeading = document.createElement('h2');
  // element to display current lap time
  lapTimeEl = document.createElement('p');
  // container to display all information related to lap time
  lapTimeNumbersContainer = document.createElement('div');
  // container to display all information related to lap time
  lapTimeContainer = document.createElement('div');
};

// to create a string about elapsed time in hours, minutes and seconds
const getElapsedTimeOutput = () => `${elapsedTime.hours}:H ${elapsedTime.minutes}:M ${elapsedTime.seconds}:S`;

// to start the time and keep track of it
const countTime = () => {
  const countTimeId = setInterval(() => {
    totalSeconds += 1;
    elapsedTime.seconds += 1;

    // increase minutes and hours
    if (elapsedTime.seconds % SEC_PER_MIN === 0 && elapsedTime.seconds > 1) {
      // increase minutes by 1 if 60s passed
      elapsedTime.minutes += 1;
      elapsedTime.seconds = 0;

      // increase hours by 1 if 60mins passed
      if (elapsedTime.minutes % MIN_PER_HR === 0) {
        elapsedTime.hours += 1;
        elapsedTime.minutes = 0;
      }
    }

    // store elapsed time output in container that displays elapsed time
    elapsedTimeContainer.innerText = getElapsedTimeOutput();
  }, 1000);
  return countTimeId;
};

// Game initilization =====================================================
createStartingElements();

elapsedTimeContainer.innerText = getElapsedTimeOutput();

lapTimeContainerHeading.innerText = 'Lap Times';

startButton.innerText = 'start';
stopButton.innerText = 'stop';
resetButton.innerText = 'reset';
lapButton.innerText = 'lap';
startButton.addEventListener('click', () => {
  // start or continue the timer
  timerId = countTime();
});
stopButton.addEventListener('click', () => {
  // stop the timer
  console.log('stop button pressed');
  clearInterval(timerId);
});
resetButton.addEventListener('click', () => {
  // stop the timer
  clearInterval(timerId);
  // reset elapsed time to zero
  elapsedTime.seconds = 0;
  elapsedTime.minutes = 0;
  elapsedTime.hours = 0;
  elapsedTimeContainer.innerText = getElapsedTimeOutput();

  // remove the display of all lap times
  lapTimeNumbersContainer.innerHTML = '';
});
lapButton.addEventListener('click', () => {
  if (lapTimes.length === 0) {
    // if it is the 1st lap, just display current elapsed time -------------------
    // store elapsed time as the 1st lap time
    lapTime.seconds = elapsedTime.seconds;
    lapTime.minutes = elapsedTime.minutes;
    lapTime.hours = elapsedTime.hours;

    // store 1st lap time to array of lap times
    lapTimes.push(lapTime);

    // create lap time element to display current lap time
    lapTimeEl = document.createElement('p');
    lapTimeEl.innerText = `${lapTime.hours}:H ${lapTime.minutes}:M ${lapTime.seconds}:S`;
    lapTimeNumbersContainer.appendChild(lapTimeEl);

    // store current total seconds for use as previous total seconds during next lap
    totalSecondsTillPrevLap = totalSeconds;
  } else if (lapTimes.length > 0) {
    // if it is the 2nd lap onwards: ----------------------------------------------
    // calculate current lap's total seconds by
    // subtracting current total seconds since timer started by previous total seconds
    const currentLapTotalSeconds = totalSeconds - totalSecondsTillPrevLap;

    // convert current lap's total seconds into seconds, min, hrs
    const currentLapSeconds = currentLapTotalSeconds % SEC_PER_MIN;
    let currentLapMinutes = 0;
    console.log('currentLapTotalSeconds' + currentLapTotalSeconds);
    if (currentLapTotalSeconds >= SEC_PER_MIN) {
      // only find lap mins if the lap's total seconds is more than a min's worth of seconds
      currentLapMinutes = Math.floor(currentLapTotalSeconds / SEC_PER_MIN) % MIN_PER_HR;
      console.log('count min' + Math.floor(currentLapTotalSeconds / SEC_PER_MIN));
    }
    let currentLapHours = 0;
    if (currentLapTotalSeconds >= (SEC_PER_MIN * MIN_PER_HR)) {
      // only find lap hrs if the lap's total seconds is more than an hr's worth of seconds
      currentLapHours = Math.floor(currentLapTotalSeconds / (SEC_PER_MIN * MIN_PER_HR));
      console.log('count hours' + currentLapHours);
    }

    // store converted current lap time format into current lap time
    lapTime.seconds = currentLapSeconds;
    lapTime.minutes = currentLapMinutes;
    lapTime.hours = currentLapHours;

    // store current lap time to array of lap times
    lapTimes.push(lapTime);

    // create lap time element to display current lap time
    lapTimeEl = document.createElement('p');
    lapTimeEl.innerText = `${lapTime.hours}:H ${lapTime.minutes}:M ${lapTime.seconds}:S`;
    lapTimeNumbersContainer.appendChild(lapTimeEl);

    // store current total seconds for use as previous total seconds during next lap
    totalSecondsTillPrevLap = totalSeconds;
  }
});

// append starting elements and containers
document.body.appendChild(elapsedTimeContainer);
document.body.appendChild(startButton);
document.body.appendChild(stopButton);
document.body.appendChild(resetButton);
document.body.appendChild(lapButton);
lapTimeContainer.appendChild(lapTimeContainerHeading);
lapTimeContainer.appendChild(lapTimeNumbersContainer);
document.body.appendChild(lapTimeContainer);
