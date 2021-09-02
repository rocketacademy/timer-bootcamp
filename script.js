// Please implement exercise logic here

// ========== DOM ELEMENTS =============
const container = document.createElement('div');
container.classList.add('wrapper');
document.body.appendChild(container);

const firstCol = document.createElement('div');
firstCol.classList.add('first');

const secondCol = document.createElement('div');
secondCol.classList.add('second');
container.appendChild(secondCol);
container.appendChild(firstCol);

const row1 = document.createElement('div');
row1.classList.add('row', 'wrapper');
secondCol.appendChild(row1);

const row2 = document.createElement('div');
row2.classList.add('row', 'wrapper');
secondCol.appendChild(row2);

const row3 = document.createElement('div');
row3.classList.add('row', 'wrapper');
secondCol.appendChild(row3);

const timerCon = document.createElement('div');
timerCon.classList.add('top');
row1.appendChild(timerCon);

const startButton = document.createElement('button');
startButton.classList.add('button');
startButton.innerText = 'START';
row2.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.classList.add('button');
stopButton.innerText = 'STOP';
row2.appendChild(stopButton);

const resetButton = document.createElement('button');
resetButton.classList.add('button');
resetButton.innerText = 'RESET';
row3.appendChild(resetButton);

const lapButton = document.createElement('button');
lapButton.classList.add('button');
lapButton.innerText = 'LAP';
row3.appendChild(lapButton);

const timerDisplay = document.createElement('div');
timerDisplay.classList.add('timer');
timerCon.appendChild(timerDisplay);

const userMsg = document.createElement('div');
userMsg.innerText = '';
userMsg.classList.add('message');
secondCol.appendChild(userMsg);

// =============== GLOBAL VARIABLES ======================
const delayMs = 1000;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
let output = `${hours}:${minutes}:${seconds}
`;
timerDisplay.innerHTML = '00:00:00';
let canClickStartButton = true;
let canClickResetButton = true;
let canClickLapButton = false;
let lapEventCounter = 1;
let timerCounter = 0;
let lastTimerCounter = 0;

// =============== HELPER FUNCTION ======================
// to append first digit with zero if counter is less than 10 to achieve double digit timer look
const firstDigit = (a) => {
  if (a < 10) {
    return 0;
  } return '';
};

// =============== CLICK EVENTS ======================

const startEvent = () => {
  if (canClickStartButton === true) {
    canClickResetButton = false;
    timer = setInterval(() => {
      seconds += 1;
      timerCounter += 1;
      output = `${firstDigit(hours)}${hours}:${firstDigit(minutes)}${minutes}:${firstDigit(seconds)}${seconds}`;
      timerDisplay.innerHTML = output;

      if (seconds === 61) {
        seconds = 0;
        minutes += 1;
        output = `${firstDigit(hours)}${hours}:${firstDigit(minutes)}${minutes}:${firstDigit(seconds)}${seconds}`; timerDisplay.innerHTML = output;

        if (minutes === 61) {
          minutes = 0;
          hours += 1;
          output = `${firstDigit(hours)}${hours}:${firstDigit(minutes)}${minutes}:${firstDigit(seconds)}${seconds}`; timerDisplay.innerHTML = output;
        }
      }
    }, delayMs);
    canClickStartButton = false;
    canClickLapButton = true; }
};

const stopEvent = () => {
  clearInterval(timer);
  canClickStartButton = true;
  canClickResetButton = true;
  canClickLapButton = false;
};

const resetEvent = () => {
  if (canClickResetButton === true) {
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerCounter = 0;
    firstCol.innerHTML = '';
    firstCol.style = 'display:none';
    timerDisplay.innerHTML = '00:00:00';
    canClickLapButton = false;
  }
  else { userMsg.innerText = 'Reset timer is available once timer has stopped.';
    setInterval(() => { userMsg.innerHTML = ''; }, 5000); }
};

const lapEvent = () => {
  if (canClickLapButton === true) {
    firstCol.style = 'display:yes';
    let elementName = `lap${lapEventCounter}`;
    elementName = document.createElement('div');
    const timeDiff = timerCounter - lastTimerCounter;
    let spanName = `span${lapEventCounter}`;
    spanName = document.createElement('span');
    spanName.classList.add('split');
    spanName.innerHTML = ` (+ ${timeDiff}s)`;
    const lapOutput = `Lap ${lapEventCounter}<br>${firstDigit(hours)}${hours}:${firstDigit(minutes)}${minutes}:${firstDigit(seconds)}${seconds}`;
    elementName.innerHTML = lapOutput;
    elementName.classList.add('lap');
    firstCol.appendChild(elementName);
    elementName.appendChild(spanName);
    lapEventCounter += 1;
    lastTimerCounter = timerCounter; }
  else { userMsg.innerText = 'Lap function is available when timer is running.';
    setInterval(() => { userMsg.innerHTML = ''; }, 5000); }
};

// =============== INITIALISE WINDOW ================

firstCol.style = 'display:none';
startButton.addEventListener('click', startEvent);
stopButton.addEventListener('click', stopEvent);
resetButton.addEventListener('click', resetEvent);
lapButton.addEventListener('click', lapEvent);
