const lapDiv = document.createElement('div');
const stopwatchDiv = document.createElement('div');
const elapsedDiv = document.createElement('div');
let elapsedMs = 0;
let modeStop = false;
let timeOn = false; // to prevent multiple presses on start
let previousLap = 0;

const onClick = (buttonEl) => {
  buttonEl.style.background = 'grey';
  // eslint-disable-next-line
  const setColourWhite = setTimeout(() => {
    buttonEl.style.background = '#efefef';
  }, 200);
};

const secToHMS = (timeMs) => {
  const timeSec = Math.round(timeMs / 1000);
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
  elapsedDiv.style.backgroundColor = 'palegreen';
  modeStop = false;

  if (timeOn === false) {
    const countStopwatch = setInterval(() => {
      elapsedMs += 100;
      elapsedDiv.innerText = `${secToHMS(elapsedMs)}`;

      if (modeStop === true) {
        clearInterval(countStopwatch);
        elapsedDiv.style.backgroundColor = 'mistyrose';
        timeOn = false;
      }
    }, 100);
  }
};

const lapTiming = () => {
  const splitMs = elapsedMs - previousLap;
  lapDiv.innerHTML += `${secToHMS(elapsedMs)} (+${secToHMS(splitMs)}) <br>`;
  previousLap = elapsedMs;
};

const createStopwatch = () => {
  // lap times
  lapDiv.innerHTML = 'Lap Times: <br>';
  lapDiv.classList.add('lap-times');
  document.body.appendChild(lapDiv);

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
  startButton.addEventListener('click', (event) => {
    onClick(event.currentTarget);
    startStopwatch(); });
  swButton1.appendChild(startButton);

  const stopButton = document.createElement('button');
  stopButton.classList.add('stopwatch-button');
  stopButton.innerText = 'Stop';
  stopButton.addEventListener('click', (event) => { modeStop = true;
    onClick(event.currentTarget); });
  swButton1.appendChild(stopButton);

  const resetButton = document.createElement('button');
  resetButton.classList.add('stopwatch-button');
  resetButton.innerText = 'Reset';
  resetButton.addEventListener('click', (event) => { modeStop = true;
    elapsedMs = 0;
    previousLap = 0;
    lapDiv.innerHTML = 'Lap Times: <br>';
    elapsedDiv.innerText = `${secToHMS(elapsedMs)}`;
    onClick(event.currentTarget); });
  swButton2.appendChild(resetButton);

  const lapButton = document.createElement('button');
  lapButton.classList.add('stopwatch-button');
  lapButton.innerText = 'Lap';
  lapButton.addEventListener('click', (event) => {
    onClick(event.currentTarget);
    lapTiming(); });
  swButton2.appendChild(lapButton);

  stopwatchDiv.classList.add('container');
  document.body.appendChild(stopwatchDiv);
};

createStopwatch();
