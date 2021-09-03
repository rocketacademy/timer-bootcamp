const countDown = 10;
let timeData = [];
let time = 0;
let hour = 0;
let minutes = 0;
let seconds = 0;
let milisec = 0;

// Data Display
const dataDisplay = document.createElement('div');
dataDisplay.classList.add('bigContainer');
document.body.appendChild(dataDisplay);

const lapDisplay = document.createElement('div');
lapDisplay.classList.add('display');
lapDisplay.innerHTML = 'Lap Time';
dataDisplay.appendChild(lapDisplay);

const splitDisplay = document.createElement('div');
splitDisplay.classList.add('display');
splitDisplay.innerHTML = 'Split Time';
dataDisplay.appendChild(splitDisplay);

// right container
const container = document.createElement('div');
container.classList.add('container');

container.innerHTML = '';
document.body.appendChild(container);

// Elapsed Time
const elapsedTime = document.createElement('div');
elapsedTime.classList.add('time');

container.appendChild(elapsedTime);

const HH = document.createElement('div');
HH.classList.add('timebox');
elapsedTime.appendChild(HH);
HH.innerHTML = '00h';

const MM = document.createElement('div');
MM.classList.add('timebox');
elapsedTime.appendChild(MM);
MM.innerHTML = '00m';

const SS = document.createElement('div');
SS.classList.add('timebox');
elapsedTime.appendChild(SS);
SS.innerHTML = '00s';

const MS = document.createElement('div');
MS.classList.add('timebox');
elapsedTime.appendChild(MS);
MS.innerHTML = '00';

// Start
const startButton = document.createElement('div');
startButton.classList.add('small');

startButton.innerHTML = 'Start';
container.appendChild(startButton);

// Stop
const stopButton = document.createElement('div');
stopButton.classList.add('small');

stopButton.innerHTML = 'Stop';
container.appendChild(stopButton);

// Reset
const resetButton = document.createElement('div');
resetButton.classList.add('small');

resetButton.innerHTML = 'Reset';
container.appendChild(resetButton);

// Lap
const lapButton = document.createElement('div');
lapButton.classList.add('small');

lapButton.innerHTML = 'Lap';
container.appendChild(lapButton);

let ref;

const startTimer = () => {
  ref = setInterval(() => {
    time += 1;
    milisec = time % 100;
    seconds = Math.floor(time / 100);
    minutes = Math.floor(time / (100 * 60));
    hour = Math.floor(time / (100 * 60 * 60));
    HH.innerHTML = `${hour}h`;
    MM.innerHTML = `${minutes}m`;
    SS.innerHTML = `${seconds}s`;
    MS.innerHTML = `${milisec}`;
  }, countDown);
};

const stopTimer = () => {
  clearInterval(ref);
};

const resetTimer = () => {
  stopTimer();
  HH.innerHTML = '00h';
  MM.innerHTML = '00m';
  SS.innerHTML = '00s';
  MS.innerHTML = '00';
  lapDisplay.innerHTML = 'Lap Data';
  splitDisplay.innerHTML = 'Split Data';
  timeData = [];
  time = 0;
};

const getTimeDisplay = (x) => {
  let myoutput = '';
  milisec = x % 100;
  seconds = Math.floor(x / 100);
  minutes = Math.floor(x / (100 * 60));
  hour = Math.floor(x / (100 * 60 * 60));
  myoutput = `${hour}h ${minutes}m ${seconds}s ${milisec}`;
  return myoutput;
};

const storeLapData = () => {
  let lap = time;
  if (timeData.length > 0) {
    lap = time - timeData[timeData.length - 1].ST;
  }
  const data = {
    ST: time,
    LT: lap,
  };
  timeData.push(data);

  let splitMessage = 'Split Time <br>';
  let lapMessage = 'Lap Time <br>';
  for (let i = 0; i < timeData.length; i += 1) {
    splitMessage += `${getTimeDisplay(timeData[i].ST)}<br>`;
    lapMessage += `${getTimeDisplay(timeData[i].LT)}<br>`;
  }
  splitDisplay.innerHTML = splitMessage;
  lapDisplay.innerHTML = lapMessage;
};

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', storeLapData);
