// Please implement exercise logic here
/*
** TIMER CONSTANTS AND VARIABLES
**
*/
const totalSeconds = 0;
let timer = totalSeconds;
const minutesInHour = 60;
const secondsInMinute = 60;
let hours;
let minutes;
let seconds;
// Timeouts and intervals
let startTimerInterval;

/*
** HELPER FUNCTIONS
**
*/

// set minutes and seconds in mm:ss format
const setHoursMinutesAndSeconds = () => {
  hours = Math.floor(timer / (secondsInMinute * minutesInHour));
  minutes = Math.floor((timer - hours * secondsInMinute * minutesInHour) / secondsInMinute);
  seconds = timer % secondsInMinute;
  if (hours.toString().length < 2) {
    hours = `0${hours}`;
  }
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }
  seconds = timer % secondsInMinute;
  if (seconds.toString().length < 2) {
    seconds = `0${seconds}`;
  }
};

const setAndDisplayTime = () => {
  const display = document.querySelector('.timerDisplayText');
  setHoursMinutesAndSeconds();
  display.innerText = `${hours}:${minutes}:${seconds}`;
};

/*
** CALLBACK FUNCTIONS
**
*/

const startTimerIntervalFn = () => {
  timer += 1;
  setAndDisplayTime();
};

const startButtonCallback = (e) => {
  e.preventDefault();
  startTimerInterval = setInterval(startTimerIntervalFn, 1000);
  const button = document.querySelector('.startButton');
  if (!button.disabled) {
    button.disabled = true;
  }
};

const pauseButtonCallback = (e) => {
  e.preventDefault();
  clearInterval(startTimerInterval);
  const button = document.querySelector('.startButton');
  if (button.disabled) {
    button.disabled = false;
  }
};

const stopButtonCallback = (e) => {
  e.preventDefault();
  clearInterval(startTimerInterval);
  timer = 0;
  setAndDisplayTime();
  const button = document.querySelector('.startButton');
  if (button.disabled) {
    button.disabled = false;
  }
};

/*
** TIMER UI DISPLAY
**
*/
const timerDisplayText = document.createElement('p');
timerDisplayText.classList.add('timerDisplayText');
document.body.appendChild(timerDisplayText);
setAndDisplayTime();

/*
** TIMER BUTTONS
**
*/
const startButton = document.createElement('button');
startButton.classList.add('startButton');
startButton.innerText = 'Start';
startButton.addEventListener('click', startButtonCallback);
document.body.appendChild(startButton);

const pauseButton = document.createElement('button');
pauseButton.classList.add('pauseButton');
pauseButton.innerText = 'Pause';
pauseButton.addEventListener('click', pauseButtonCallback);
document.body.appendChild(pauseButton);

const stopButton = document.createElement('button');
stopButton.classList.add('stopButton');
stopButton.innerText = 'Stop';
stopButton.addEventListener('click', stopButtonCallback);
document.body.appendChild(stopButton);
