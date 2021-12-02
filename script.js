/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
// Please implement exercise logic here

// <------- CREATE ELEMENTS ----------->
const stopwatchContainer = document.createElement('div');
stopwatchContainer.className = 'wrapper';
document.body.appendChild(stopwatchContainer);

const lapDataBox = document.createElement('div');
lapDataBox.className = 'lapdatabox';
stopwatchContainer.appendChild(lapDataBox);

const rightColumn = document.createElement('div');
rightColumn.className = 'rightcolumn';
stopwatchContainer.appendChild(rightColumn);

const elapsedTimeBox = document.createElement('div');
elapsedTimeBox.className = 'elapsedtimebox';
rightColumn.appendChild(elapsedTimeBox);

const buttonRowOne = document.createElement('div');
buttonRowOne.className = 'buttonrow';
rightColumn.appendChild(buttonRowOne);

const startButton = document.createElement('button');
startButton.className = 'button';
startButton.innerText = 'Start';
buttonRowOne.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.className = 'button';
stopButton.innerText = 'Stop';
buttonRowOne.appendChild(stopButton);

const buttonRowTwo = document.createElement('div');
buttonRowTwo.className = 'buttonrow';
rightColumn.appendChild(buttonRowTwo);

const resetButton = document.createElement('button');
resetButton.className = 'button';
resetButton.innerText = 'Reset';
buttonRowTwo.appendChild(resetButton);

const lapButton = document.createElement('button');
lapButton.className = 'button';
lapButton.innerText = 'Lap';
buttonRowTwo.appendChild(lapButton);

// <-------- GLOBAL VARIABLES ---------->
let time = 0;
let laps = [];
let stopped = true;
let timerInterval;

// <-------- HELPER FUNCTIONS -------->
const timeConverter = (time) => {
  let seconds = (time % 60).toString();
  let minutes = Math.floor(time / 60).toString();

  seconds = seconds.length < 2 ? `0${seconds}` : seconds;
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;

  return `${minutes}:${seconds}`;
};

const start = () => {
  stopped = false;
  elapsedTimeBox.innerText = timeConverter(time);
  timerInterval = setInterval(() => {
    time += 1;
    elapsedTimeBox.innerText = timeConverter(time);
  }, 1000);
};

const stop = () => {
  stopped = true;
  clearInterval(timerInterval);
};

const reset = () => {
  stopped = false;
  time = 0;
  laps = [];
  elapsedTimeBox.innerText = '';
  lapDataBox.innerHTML = '';
  clearInterval(timerInterval);
};

const lap = () => {
  if (stopped === false) {
    laps.push(time);
    const newLap = document.createElement('p');
    newLap.innerText = `Lap ${laps.length}: ${timeConverter(calcLapTime(time))}\nTotal time: ${timeConverter(time)}`;
    lapDataBox.appendChild(newLap);
  }
};

const calcLapTime = (time) => {
  if (laps.length === 1) {
    return time;
  }
  const lapTime = time - laps[laps.length - 2];
  return lapTime;
};

// <--------- CLICK EVENTS ----------->
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
