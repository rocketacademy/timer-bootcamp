/* eslint-disable no-use-before-define */
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = 0;
let timerInterval;
let splitSec = 0;
let splitMin = 0;
let splitHr = 0;
let prevSec = 0;
let prevMin = 0;
let prevHr = 0;
let prevTime = 0;

const setTimer = () => {
  seconds = timer % 60;
  if (seconds.toString().length < 2) {
    seconds = `0${seconds}`;
  }
  minutes = Math.floor(timer / 60);
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }
  hours = Math.floor((timer / 60) / 60);
  if (hours.toString().length < 2) {
    hours = `0${hours}`;
  }
};

const initTimer = () => {
  stopTimer();
  // add if stop is clicked to clear setinterval
  timerInterval = setInterval(() => { timer += 1;
    console.log(seconds);
    setTimer();
    elapsedTime.innerText = `${hours}:${minutes}:${seconds}`; }, 1000);
};

const resetTimer = () => {
  timer = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  elapsedTime.innerText = `0${hours}:0${minutes}:0${seconds}`;
};

const stopTimer = () => { clearInterval(timerInterval);
};

const lapStop = () => {
  stopTimer();
  splitCalc();
  lapDataDiv.innerHTML += `<br/>${hours}:${minutes}:${seconds}`;
  resetTimer();
  initTimer();
};

const splitCalc = () => {
  if (prevTime === 0) {
    prevTime = timer;
    prevSec = seconds;
    prevMin = minutes;
    prevHr = hours;
  }
  else {
    splitSec = Math.abs(seconds - prevSec);
    if (splitSec.toString().length < 2) {
      splitSec = `0${splitSec}`;
    }
    splitMin = Math.abs(prevMin - minutes);
    if (splitMin.toString().length < 2) {
      splitMin = `0${splitMin}`;
    }
    splitHr = Math.abs(prevHr - hours);
    if (splitHr.toString().length < 2) {
      splitHr = `0${splitHr}`;
    }
    // better timing
    if (timer - prevTime < 0) {
      // add a - in front of text
      lapDataDiv.innerHTML += `<br/> -${splitHr}:${splitMin}:${splitSec}`;
    }
    // slower timing
    else if (timer - prevTime > 0) {
      // add a + in front of text
      lapDataDiv.innerHTML += `<br/> +${splitHr}:${splitMin}:${splitSec}`;
    }
    prevTime = timer;
    prevSec = seconds;
    prevMin = minutes;
    prevHr = hours;
  }
};

// ****Page Layout****
document.body.style.display = 'flex';

const mainDiv = document.createElement('div');
mainDiv.style.display = 'inline-block';
const sideDiv = document.createElement('div');
sideDiv.style.display = 'inline-block';
sideDiv.style.width = '500px';

const lapDataDiv = document.createElement('div');
lapDataDiv.innerHTML = 'LAP TIMING';
lapDataDiv.style.backgroundColor = '#87848c';
lapDataDiv.style.borderRadius = '5px';
lapDataDiv.style.marginBottom = '100px';
lapDataDiv.style.marginTop = '100px';
lapDataDiv.style.height = '100%';
lapDataDiv.style.overflow = 'hidden';

const elapsedTime = document.createElement('div');
elapsedTime.style.backgroundColor = '#d295eb';
elapsedTime.style.marginLeft = '40%';
elapsedTime.style.marginTop = '100px';
elapsedTime.style.width = '50%';
elapsedTime.style.borderRadius = '5px';
elapsedTime.innerText = `0${hours}:0${minutes}:0${seconds}`;

const startButton = document.createElement('button');
startButton.innerText = 'Start';
startButton.style.marginLeft = '35%';
startButton.style.marginTop = '5%';
startButton.addEventListener('click', initTimer);

const stopButton = document.createElement('button');
stopButton.innerText = 'Stop';
stopButton.style.marginLeft = '44%';
stopButton.style.marginTop = '5%';
stopButton.addEventListener('click', stopTimer);

const resetButton = document.createElement('button');
resetButton.innerText = 'Reset';
resetButton.style.marginLeft = '35%';
resetButton.style.marginTop = '15%';
resetButton.addEventListener('click', resetTimer);

const lapButton = document.createElement('button');
lapButton.innerText = 'Lap';
lapButton.style.backgroundColor = '#e3dfff';
lapButton.style.marginLeft = '220px';
lapButton.style.marginBottom = '10%';
lapButton.style.borderRadius = '10%';
lapButton.style.display = 'inline-flex';
lapButton.style.overflow = 'hidden';
lapButton.addEventListener('click', lapStop);

document.body.appendChild(mainDiv);
document.body.appendChild(sideDiv);
mainDiv.appendChild(lapDataDiv);
sideDiv.appendChild(elapsedTime);
sideDiv.appendChild(startButton);
sideDiv.appendChild(stopButton);
sideDiv.appendChild(resetButton);
sideDiv.appendChild(lapButton);
