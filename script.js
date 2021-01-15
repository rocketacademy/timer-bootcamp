// Timer

// Set containers up
// LAP DATA
const lapDataDiv = document.createElement('div');
lapDataDiv.classList.add('lap-data');
lapDataDiv.innerText = 'Lap Data';
document.body.appendChild(lapDataDiv);

// ELAPSED TIME
const elapsedTime = document.createElement('div');
elapsedTime.innerText = 'Elapsed Time';
elapsedTime.classList.add('elapsed-time');
document.body.appendChild(elapsedTime);

// Timer for Minutes  => ELAPSED TIME
const timerCountMin = document.createElement('div');
timerCountMin.innerText = 0;
timerCountMin.classList.add('timer-min');
elapsedTime.appendChild(timerCountMin);

// Timer for Seconds => ELAPSED TIME
const timerCountSec = document.createElement('div');
timerCountSec.innerText = 0;
timerCountSec.classList.add('timer-sec');
elapsedTime.appendChild(timerCountSec);

// START
const startButton = document.createElement('button');
startButton.innerText = 'START';
startButton.classList.add('start-button');
document.body.appendChild(startButton);

// STOP
const stop = document.createElement('div');

// RESET
const reset = document.createElement('div');

// LAP
const lap = document.createElement('div');

// // Set timing for hours
// const delayForHour = delayForMin * 60;
// let hours = 0;

// // Output the Timer (min) container to DOM
// const timerHour = setInterval(() => {
//   timerCountMin.innerText = hours;

//   if (hours > 4) {
//     clearInterval(timerHour);
//   }

//   hours += 1;
// }, delayForHour);

// Set timing for minutes
const delayForMin = 1000;
let minutes = 1;

// Output the Timer (min) container to DOM
const timerMin = setInterval(() => {
  timerCountMin.innerText = minutes;

  if (minutes > 540) {
    clearInterval(timerMin);
  }

  minutes += 1;
}, delayForMin);

// Set timing for seconds
const delayForSec = 1000;
let seconds = 1;

// Output the Timer (sec) container to DOM
const timerSec = setInterval(() => {
  timerCountSec.innerText = seconds;

  if (seconds > 540) {
    clearInterval(timerSec);
  }

  seconds += 1;
}, delayForSec);
