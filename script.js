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

/*
** CALLBACK FUNCTIONS
**
*/

const startTimerIntervalFn = () => {
  timer += 1;
  setHoursMinutesAndSeconds();
  const timerDisplay = document.querySelector('.timerDisplayText');
  timerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
};

const startButtonCallback = (e) => {
  e.preventDefault();
  startTimerInterval = setInterval(startTimerIntervalFn, 1000);
};

const pauseButtonCallback = (e) => {
  e.preventDefault();
  clearInterval(startTimerInterval);
};

/*
** TIMER UI DISPLAY
**
*/
const timerDisplayText = document.createElement('p');
timerDisplayText.classList.add('timerDisplayText');
setHoursMinutesAndSeconds();
timerDisplayText.innerText = `${hours}:${minutes}:${seconds}`;
document.body.appendChild(timerDisplayText);

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
