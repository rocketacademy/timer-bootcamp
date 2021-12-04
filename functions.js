/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
// Please implement exercise logic here

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
