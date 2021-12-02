let seconds = 0;
const delayInMilliseconds = 1000;
let timeInterval;
const splitTimes = [];

/**
 * Convert seconds to full hh:mm:ss time.
 * @param {*} secs Seconds
 * @returns Full hh:mm:ss time string
 */
const convertSecondsToFullTime = (secs) => new Date(secs * 1000).toISOString().substr(11, 8);

/**
 * Convert full hh:mm:ss time string into seconds.
 * @param {*} fullTime Full hh:mm:ss time string
 * @returns Seconds
 */
const convertFullTimeToSeconds = (fullTime) => {
  const time = fullTime.split(':');
  return parseInt(((time[0] * 60 * 60) + (time[1] * 60) + time[2]), 10);
};

/**
 * Adjust whether buttons should be enabled.
 * @param {*} startButton Start button
 * @param {*} stopButton Stop button
 * @param {*} resetButton Reset button
 * @param {*} lapButton Lap button
 */
const adjustButtons = (startButton, stopButton, resetButton, lapButton) => {
  document.querySelector('.start').disabled = (startButton) ? '' : 'disabled';
  document.querySelector('.stop').disabled = (stopButton) ? '' : 'disabled';
  document.querySelector('.reset').disabled = (resetButton) ? '' : 'disabled';
  document.querySelector('.lap').disabled = (lapButton) ? '' : 'disabled';
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

  adjustButtons(false, true, false, true);
};

/**
 * Stop stopwatch.
 */
const stopStopwatch = () => {
  clearInterval(timeInterval);

  adjustButtons(true, false, true, false);
};

/**
 * Reset stopwatch.
 * @param {*} elapsedTimeElement Elapsed time element
 * @param {*} lapsListElement Lap data element
 */
const resetStopwatch = (elapsedTimeElement, lapsListElement) => {
  const elapsedTime = elapsedTimeElement;
  const lapsListData = lapsListElement;

  // reset vars
  elapsedTime.innerText = convertSecondsToFullTime(0);
  seconds = 0;
  splitTimes.length = 0;
  lapsListData.innerHTML = '';

  adjustButtons(true, false, false, false);
};

/**
 * Record laps and splits.
 * @param {*} elapsedTimeElement Elapsed time element
 * @param {*} lapsListElement Lap data element
 */
const recordLapAndSplit = (elapsedTimeElement, lapsListElement) => {
  const elapsedTime = elapsedTimeElement;
  const lapsListData = lapsListElement;

  // record split time
  splitTimes.push(convertFullTimeToSeconds(elapsedTime.innerText));

  // calculate lap time
  const lapTime = (splitTimes.length === 1)
    ? splitTimes[0] : (splitTimes[splitTimes.length - 1] - splitTimes[splitTimes.length - 2]);

  lapsListData.innerHTML = `<ul>Lap ${splitTimes.length}\u00A0\u00A0${convertSecondsToFullTime(lapTime)} (${elapsedTime.innerText})</ul>${lapsListData.innerHTML}`;
};

/**
 * Build the UI elements.
 * @returns UI element
 */
const buildUI = () => {
  const uiElement = document.createElement('div');
  uiElement.classList.add('grid-container');

  // lap data box element
  const lapsElement = document.createElement('div');
  lapsElement.classList.add('laps');

  // list of lap times
  const lapsListElement = document.createElement('ol');
  lapsListElement.classList.add('laps-list');
  lapsElement.appendChild(lapsListElement);

  uiElement.appendChild(lapsElement);

  // elapsed time element
  const elapsedTimeElement = document.createElement('div');
  elapsedTimeElement.classList.add('elapsed-time');
  elapsedTimeElement.innerText = convertSecondsToFullTime(0);
  uiElement.appendChild(elapsedTimeElement);

  // start button
  const startButtonElement = document.createElement('button');
  startButtonElement.classList.add('button');
  startButtonElement.classList.add('start');
  startButtonElement.innerText = 'Start';
  startButtonElement.addEventListener('click', () => startStopwatch(elapsedTimeElement));
  uiElement.appendChild(startButtonElement);

  // stop button
  const stopButtonElement = document.createElement('button');
  stopButtonElement.classList.add('button');
  stopButtonElement.classList.add('stop');
  stopButtonElement.innerText = 'Stop';
  stopButtonElement.addEventListener('click', () => stopStopwatch());
  stopButtonElement.disabled = 'disabled';
  uiElement.appendChild(stopButtonElement);

  // reset button
  const resetButtonElement = document.createElement('button');
  resetButtonElement.classList.add('button');
  resetButtonElement.classList.add('reset');
  resetButtonElement.innerText = 'Reset';
  resetButtonElement.addEventListener('click', () => resetStopwatch(elapsedTimeElement, lapsListElement));
  resetButtonElement.disabled = 'disabled';
  uiElement.appendChild(resetButtonElement);

  // lap button
  const lapButtonElement = document.createElement('button');
  lapButtonElement.classList.add('button');
  lapButtonElement.classList.add('lap');
  lapButtonElement.innerText = 'Lap';
  lapButtonElement.addEventListener('click', () => recordLapAndSplit(elapsedTimeElement, lapsListElement));
  lapButtonElement.disabled = 'disabled';
  uiElement.appendChild(lapButtonElement);

  return uiElement;
};

/**
 * Initialize stop watch.
 */
const initStopwatch = () => {
  document.body.appendChild(buildUI());
};
initStopwatch();
