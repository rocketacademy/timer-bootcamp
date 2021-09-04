const stopwatchDiv = document.createElement('div');
const elapsedDiv = document.createElement('div');
let elapsedMs = 0;
let stopwatchStop = false;
let swOn = false;

const secToHMS = (timeMs) => {
  const timeSec = timeMs / 1000;
  let minutes = Math.floor(timeSec / 60);
  const seconds = timeSec % 60;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;
  const padSeconds = String(seconds).padStart(2, 0);
  const padMinutes = String(minutes).padStart(2, 0);
  const padHours = String(hours).padStart(2, 0);
  return `${padHours}:${padMinutes}:${padSeconds}`;
};

const startStopwatch = () => {
  if (swOn === false) {
    const countStopwatch = setInterval(() => { elapsedDiv.innerText = `${secToHMS(elapsedMs)}`;

      if (stopwatchStop === true) {
        clearInterval(countStopwatch);
        stopwatchStop = false;
        swOn = false;
      }

      elapsedMs += 1000;
    }, 1000);
    swOn = true;
  }
};

// BUG! after reset, stopwatch doesn't start when press start button again (need to press twice)

const createStopwatch = () => {
  // elapsedTime
  elapsedDiv.classList.add('elapsed-time');
  elapsedDiv.innerText = '00:00:00';
  stopwatchDiv.appendChild(elapsedDiv);

  // create start, stop, reset, lap buttons
  const swButton1 = document.createElement('div');
  const swButton2 = document.createElement('div');
  stopwatchDiv.appendChild(swButton1);
  stopwatchDiv.appendChild(swButton2);

  const startButton = document.createElement('button');
  startButton.classList.add('stopwatch-button');
  startButton.innerText = 'Start';
  startButton.addEventListener('click', startStopwatch);
  swButton1.appendChild(startButton);

  const stopButton = document.createElement('button');
  stopButton.classList.add('stopwatch-button');
  stopButton.innerText = 'Stop';
  stopButton.addEventListener('click', () => { stopwatchStop = true; });
  swButton1.appendChild(stopButton);

  const resetButton = document.createElement('button');
  resetButton.classList.add('stopwatch-button');
  resetButton.innerText = 'Reset';
  resetButton.addEventListener('click', () => { stopwatchStop = true;
    elapsedMs = 0;
    elapsedDiv.innerText = `${secToHMS(elapsedMs)}`; });
  swButton2.appendChild(resetButton);

  const lapButton = document.createElement('button');
  lapButton.classList.add('stopwatch-button');
  lapButton.innerText = 'Lap';
  lapButton.addEventListener('click', null);
  swButton2.appendChild(lapButton);
};

createStopwatch();
stopwatchDiv.classList.add('container');
document.body.appendChild(stopwatchDiv);
