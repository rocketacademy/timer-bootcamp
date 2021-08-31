// Timer V1

// Helper Functions
const customCreate = (tagType, className, text) => {
  const element = document.createElement(tagType);
  element.innerText = text;
  element.classList.add(className);

  return element;
};

// Globals
let setTimer;
let numLaps = 0;
let m = 0; let s = 0; let ms = 0;

const leftContainer = customCreate('div', 'left-container', '');
const rightContainer = customCreate('div', 'right-container', '');

const lapData = customCreate('div', 'lap-data', 'LAP DATA'); // Lap Data Header
const elapsedTime = customCreate('div', 'elapsed-time', 'ELAPSED TIME'); // Elapsed Time Header

// Timer & Laps
const timer = customCreate('div', 'timer', '00:00:00');
const laps = customCreate('div', 'laps', '0');

// Buttons
const startButton = customCreate('button', 'start-button', 'START'); // Start button
const stopButton = customCreate('button', 'stop-button', 'STOP'); // Stop button
const resetButton = customCreate('button', 'reset-button', 'RESET'); // Reset button
const lapButton = customCreate('button', 'lap-button', 'LAP'); // Reset button

// Render to the DOM
document.body.appendChild(leftContainer);
document.body.appendChild(rightContainer);
leftContainer.appendChild(lapData);
leftContainer.appendChild(laps);
rightContainer.appendChild(elapsedTime);
elapsedTime.appendChild(timer);
rightContainer.appendChild(startButton);
rightContainer.appendChild(stopButton);
rightContainer.appendChild(resetButton);
rightContainer.appendChild(lapButton);

// Callbacks
const startTime = () => {
  setTimer = setInterval(() => {
    // Only show a '0' as first digit if respective unit is less than 10.
    timer.innerHTML = `${m < 10 ? `0${m}` : `${m}`}:${s < 10 ? `0${s}` : `${s}`}:${ms < 10 ? `0${ms}` : `${ms}`}`;
    ms += 1;
    // Once milliseconds cross 100, reset back to 0 & plus 1 second.
    if (ms === 100) {
      ms = 0;
      s += 1;
    }
    // Once seconds cross 60, reset back to 0 & plus 1 min.
    if (s === 60) {
      s = 0;
      m += 1;
    }
    console.log('TIME STARTS');
  }, 10);
};

const stopTime = () => {
  console.log('TIME STOP');
  clearInterval(setTimer);
};

const resetTime = () => {
  console.log('TIME RESET');
  timer.innerText = '00:00:00';
};

const lapTime = () => {
  numLaps += 1;
  laps.innerText = `${numLaps}`;
};

startButton.addEventListener('click', startTime);
stopButton.addEventListener('click', stopTime);
resetButton.addEventListener('click', resetTime);
lapButton.addEventListener('click', lapTime);
