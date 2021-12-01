let seconds = 0;
const delayInMilliseconds = 1000;
let timeInterval;

const convertSecondsToFullTime = (secs) => new Date(secs * 1000).toISOString().substr(11, 8);

const startStopwatch = (elapsedTimeElement) => {
  const elapsedTime = elapsedTimeElement;

  timeInterval = setInterval(() => {
    elapsedTime.innerText = convertSecondsToFullTime(seconds);
    seconds += 1;
  }, delayInMilliseconds);
};

const stopStopwatch = () => {
  clearInterval(timeInterval);
};

const resetStopwatch = () => {

};

const recordLap = () => {

};

const buildUI = () => {
  const uiElement = document.createElement('div');

  const lapsElement = document.createElement('div');
  lapsElement.classList.add('laps');
  lapsElement.innerText = 'Lap data';
  uiElement.appendChild(lapsElement);

  const elapsedTimeElement = document.createElement('div');
  elapsedTimeElement.classList.add('laps');
  elapsedTimeElement.innerText = convertSecondsToFullTime(0);
  uiElement.appendChild(elapsedTimeElement);

  const buttonsElement = document.createElement('div');

  const startButtonElement = document.createElement('button');
  startButtonElement.classList.add('button');
  startButtonElement.innerText = 'Start';
  startButtonElement.addEventListener('click', () => startStopwatch(elapsedTimeElement));
  buttonsElement.appendChild(startButtonElement);

  const stopButtonElement = document.createElement('button');
  stopButtonElement.classList.add('button');
  stopButtonElement.innerText = 'Stop';
  stopButtonElement.addEventListener('click', () => stopStopwatch());
  buttonsElement.appendChild(stopButtonElement);

  const resetButtonElement = document.createElement('button');
  resetButtonElement.classList.add('button');
  resetButtonElement.innerText = 'Reset';
  resetButtonElement.addEventListener('click', () => resetStopwatch());
  buttonsElement.appendChild(resetButtonElement);

  const lapButtonElement = document.createElement('button');
  lapButtonElement.classList.add('button');
  lapButtonElement.innerText = 'Lap';
  lapButtonElement.addEventListener('click', () => recordLap());
  buttonsElement.appendChild(lapButtonElement);

  uiElement.appendChild(buttonsElement);

  return uiElement;
};

const initStopwatch = () => {
  const ui = buildUI();

  document.body.appendChild(ui);
};
initStopwatch();
