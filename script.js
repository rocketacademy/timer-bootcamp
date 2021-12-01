let seconds = 0;
const delayInMilliseconds = 1000;
let timeInterval;
const splitTimes = [];

const convertSecondsToFullTime = (secs) => new Date(secs * 1000).toISOString().substr(11, 8);
const convertFullTimeToSeconds = (fullTime) => {
  const time = fullTime.split(':');
  return parseInt(((time[0] * 60 * 60) + (time[1] * 60) + time[2]), 10);
};

/**
 * Start stopwatch.
 * @param {*} elapsedTimeElement Elapsed time element
 */
const startStopwatch = (elapsedTimeElement) => {
  const elapsedTime = elapsedTimeElement;

  timeInterval = setInterval(() => {
    elapsedTime.innerText = convertSecondsToFullTime(seconds);
    seconds += 1;
  }, delayInMilliseconds);

  document.querySelector('.start').disabled = 'disabled';
  document.querySelector('.stop').disabled = '';
  document.querySelector('.reset').disabled = 'disabled';
  document.querySelector('.lap').disabled = '';
};

/**
 * Stop stopwatch.
 */
const stopStopwatch = () => {
  clearInterval(timeInterval);

  document.querySelector('.start').disabled = '';
  document.querySelector('.stop').disabled = 'disabled';
  document.querySelector('.reset').disabled = '';
  document.querySelector('.lap').disabled = 'disabled';
};

/**
 * Reset stopwatch.
 * @param {*} elapsedTimeElement Elapsed time element
 * @param {*} lapsListElement Lap data element
 */
const resetStopwatch = (elapsedTimeElement, lapsListElement) => {
  const elapsedTime = elapsedTimeElement;
  const lapsListData = lapsListElement;

  elapsedTime.innerText = convertSecondsToFullTime(0);
  seconds = 0;
  splitTimes.length = 0;
  lapsListData.innerHTML = '';

  document.querySelector('.start').disabled = '';
  document.querySelector('.stop').disabled = 'disabled';
  document.querySelector('.reset').disabled = 'disabled';
  document.querySelector('.lap').disabled = 'disabled';
};

/**
 * Record laps and splits.
 * @param {*} elapsedTimeElement Elapsed time element
 * @param {*} lapsListElement Lap data element
 */
const recordLapAndSplit = (elapsedTimeElement, lapsListElement) => {
  const elapsedTime = elapsedTimeElement;
  const lapsListData = lapsListElement;

  splitTimes.push(convertFullTimeToSeconds(elapsedTime.innerText));

  const lapTime = (splitTimes.length === 1)
    ? splitTimes[0] : (splitTimes[splitTimes.length - 1] - splitTimes[splitTimes.length - 2]);

  lapsListData.innerHTML
    += `<ul>Lap ${splitTimes.length} ${convertSecondsToFullTime(lapTime)} (${elapsedTime.innerText})</ul>`;
};

/**
 * Build the UI elements.
 * @returns UI element
 */
const buildUI = () => {
  const uiElement = document.createElement('div');

  const lapsElement = document.createElement('div');
  lapsElement.classList.add('laps');

  const lapsListElement = document.createElement('ol');
  lapsListElement.classList.add('laps-list');
  lapsElement.appendChild(lapsListElement);

  uiElement.appendChild(lapsElement);

  const elapsedTimeElement = document.createElement('div');
  elapsedTimeElement.classList.add('laps');
  elapsedTimeElement.innerText = convertSecondsToFullTime(0);
  uiElement.appendChild(elapsedTimeElement);

  const buttonsElement = document.createElement('div');

  const startButtonElement = document.createElement('button');
  startButtonElement.classList.add('button');
  startButtonElement.classList.add('start');
  startButtonElement.innerText = 'Start';
  startButtonElement.addEventListener('click', () => startStopwatch(elapsedTimeElement));
  buttonsElement.appendChild(startButtonElement);

  const stopButtonElement = document.createElement('button');
  stopButtonElement.classList.add('button');
  stopButtonElement.classList.add('stop');
  stopButtonElement.innerText = 'Stop';
  stopButtonElement.addEventListener('click', () => stopStopwatch());
  stopButtonElement.disabled = 'disabled';
  buttonsElement.appendChild(stopButtonElement);

  const resetButtonElement = document.createElement('button');
  resetButtonElement.classList.add('button');
  resetButtonElement.classList.add('reset');
  resetButtonElement.innerText = 'Reset';
  resetButtonElement.addEventListener('click', () => resetStopwatch(elapsedTimeElement, lapsListElement));
  resetButtonElement.disabled = 'disabled';
  buttonsElement.appendChild(resetButtonElement);

  const lapButtonElement = document.createElement('button');
  lapButtonElement.classList.add('button');
  lapButtonElement.classList.add('lap');
  lapButtonElement.innerText = 'Lap';
  lapButtonElement.addEventListener('click', () => recordLapAndSplit(elapsedTimeElement, lapsListElement));
  lapButtonElement.disabled = 'disabled';
  buttonsElement.appendChild(lapButtonElement);

  uiElement.appendChild(buttonsElement);

  return uiElement;
};

/**
 * Initialize stop watch.
 */
const initStopwatch = () => {
  const ui = buildUI();

  document.body.appendChild(ui);
};
initStopwatch();
