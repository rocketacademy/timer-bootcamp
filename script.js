/**
 * Timer app
 * It shows the total elapsed time in HH:MM:SS.<counter>
 */

// Global Variables
const hourInMinutes = 60;
const minutesInSeconds = 60;
const secondsInMilliSeconds = 1000;

// Elapsed Time element
const timeDisplayElement = document.createElement('p');
// Container to show the laps and splits to user
const divLapsSplitsDataContainer = document.createElement('div');
// List to show the data of Laps & Splits
const listLapsSplitData = document.createElement('ol');
// Reference to setInterval function
let timerIncrementReference = null;
// Variables to be displayed as timer
let totalHoursPassed = 0;
let totalMinutesPassed = 0;
let totalSecondsPassed = 0;

// Variables to hold the last lap time
let lastLapHours = 0;
let lastLapMinutes = 0;
let lastLapSeconds = 0;

// This set of functions calculcates the second, minutes and hours
// As this function is invoked repeatedly after every specific amount of time,
// it is counted to be a second.
// ASSUMPTION: It assumes, the interval time will be 1 sec
const calculateElapsedTime = () => {
  totalSecondsPassed += 1;
  // Check if 60 seconds passed. If yes, increment minute
  if (minutesInSeconds === totalSecondsPassed)
  {
    totalMinutesPassed += 1;
    totalSecondsPassed = 0;
  }
  // Check if 60 minutes passed, increment hour by 1
  if (hourInMinutes === totalMinutesPassed)
  {
    totalHoursPassed += 1;
    totalMinutesPassed = 0;
  }
};

// Helper function to format timer string : 00:00:00
const getFormattedTime = (seconds, minutes, hours) => {
  // Checks whether to add a preceding zero for times
  const hourString = (hours > 9) ? `${hours}` : `0${hours}`;
  const minuteString = (minutes > 9) ? `${minutes}` : `0${minutes}`;
  const secondString = (seconds > 9) ? `${seconds}` : `0${seconds}`;
  return (`${hourString}:${minuteString}:${secondString}`);
};

const updateTimerDisplay = () => {
  timeDisplayElement.innerHTML = getFormattedTime(totalSecondsPassed,
    totalMinutesPassed, totalHoursPassed); };

const startTimer = () => {
  // Can change the waiting time if needed by multiplying the below with the needed value
  const timerInterval = secondsInMilliSeconds;
  timerIncrementReference = setInterval(() => {
    // After calculating the elapsed time, display the time
    calculateElapsedTime();
    updateTimerDisplay();
  }, timerInterval);
};

// When stop button is pressed, stop the interval function and update the current time
const onClickStop = () => {
  if (timerIncrementReference !== null)
  {
    clearInterval(timerIncrementReference);
    updateTimerDisplay();
  }
};

// When Reset is pressed, reset the time to 00:00:00 and update the display
const onClickReset = () => {
  totalHoursPassed = 0;
  totalMinutesPassed = 0;
  totalSecondsPassed = 0;
  lastLapHours = 0;
  lastLapMinutes = 0;
  lastLapSeconds = 0;
  updateTimerDisplay();
  listLapsSplitData.innerHTML = '';
};

// The Lap data is displayed in a list
// Whenever a new lap is taken, add an item into the list.
// It is added as the first item in the list
const updateLapsDisplay = (currentLapTime, currentSplitTime) => {
  const newLapItem = document.createElement('li');
  newLapItem.innerHTML = currentLapTime + `<br/><sub>${currentSplitTime}</sub>`;
  listLapsSplitData.insertBefore(newLapItem, listLapsSplitData.firstChild);
};

// When laps is pressed, display laps - the time elapsed from the last request
// Also, displays the split - time at which the laps is requested
const onClickLap = () => {
  // Store the current time. This will be displayed as Split
  const currentLapHours = totalHoursPassed;
  const currentLapMinutes = totalMinutesPassed;
  const currentLapSeconds = totalSecondsPassed;

  // Calculate the lapsed time.
  // convert time to seconds and do calculation
  const lastLapInSeconds = (lastLapHours * hourInMinutes * minutesInSeconds)
  + (lastLapMinutes * minutesInSeconds) + lastLapSeconds;
  const currentLapInSeconds = (currentLapHours * hourInMinutes * minutesInSeconds)
  + (currentLapMinutes * minutesInSeconds) + currentLapSeconds;

  // First get the hours. Then cut it from the total to get minutes.
  // Similarly for minutes and seconds
  let diff = currentLapInSeconds - lastLapInSeconds;
  const lapsedHours = Math.floor(diff / hourInMinutes / minutesInSeconds);
  diff -= lapsedHours * hourInMinutes * minutesInSeconds;
  const lapsedMin = Math.floor(diff / minutesInSeconds);
  diff -= lapsedMin * minutesInSeconds;
  const lapsedSec = diff;

  const currentSplitTime = getFormattedTime(currentLapSeconds, currentLapMinutes, currentLapHours);
  const currentLapTime = getFormattedTime(lapsedSec, lapsedMin, lapsedHours);

  // console.log(`Lap time: ${String(currentLapInSeconds - lastLapInSeconds)} seconds`);
  // console.log('Last Split Time:'+getFormattedTime(lastLapSeconds, lastLapMinutes, lastLapHours));
  // console.log('Lap: ' + currentLapTime);
  // console.log('Current Split Time: ' + currentSplitTime);

  updateLapsDisplay(currentLapTime, currentSplitTime);

  lastLapHours = currentLapHours;
  lastLapMinutes = currentLapMinutes;
  lastLapSeconds = currentLapSeconds;
};

// Function to initialize the dom elements in the app
const timerInit = () => {
  // Elapsed Time element
  timeDisplayElement.classList.add('time');
  const divElapsedTimeDisplayContainer = document.createElement('div');
  divElapsedTimeDisplayContainer.innerHTML = 'Elapsed Time:';
  updateTimerDisplay();
  divElapsedTimeDisplayContainer.appendChild(timeDisplayElement);

  // Container to hold the Start & Stop buttons
  const divStartStopContainer = document.createElement('div');
  // Start & Stop buttons section
  divStartStopContainer.classList.add('buttons');
  const startButton = document.createElement('button');
  startButton.classList.add('single-button');
  startButton.innerText = 'Start';
  const stopButton = document.createElement('button');
  stopButton.innerText = 'Stop';
  startButton.addEventListener('click', startTimer);
  stopButton.addEventListener('click', onClickStop);
  divStartStopContainer.appendChild(startButton);
  divStartStopContainer.appendChild(stopButton);

  // Lap & Reset buttons
  // Container to hold the Lap and Reset buttons
  const divLapResetContainer = document.createElement('div');
  divLapResetContainer.classList.add('buttons');
  const resetButton = document.createElement('button');
  resetButton.classList.add('single-button');
  resetButton.innerText = 'Reset';
  resetButton.addEventListener('click', onClickReset);
  divLapResetContainer.appendChild(resetButton);

  const lapButton = document.createElement('button');
  lapButton.innerText = 'Lap';
  lapButton.addEventListener('click', onClickLap);
  divLapResetContainer.appendChild(lapButton);

  // Display Laps and Splits
  divLapsSplitsDataContainer.classList.add('laps-splits');
  listLapsSplitData.reversed = true;
  divLapsSplitsDataContainer.innerHTML = 'Laps<br/><sub>Splits</sub>';
  divLapsSplitsDataContainer.appendChild(listLapsSplitData);

  // Append the elements to the document
  document.body.appendChild(divElapsedTimeDisplayContainer);
  document.body.appendChild(divStartStopContainer);
  document.body.appendChild(divLapResetContainer);
  document.body.appendChild(divLapsSplitsDataContainer);
};

timerInit();
