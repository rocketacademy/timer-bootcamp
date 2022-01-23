const dataSplit = document.createElement('div');
dataSplit.className = 'box';
const dataSplitHeader = document.createElement('span');
dataSplitHeader.className = 'header';
dataSplitHeader.innerText = 'Split Time';
dataSplit.appendChild(dataSplitHeader);
const dataSplitText = document.createElement('span');
dataSplitText.className = 'text';
dataSplit.appendChild(dataSplitText);

const dataLap = document.createElement('div');
dataLap.className = 'box';
const dataLapHeader = document.createElement('span');
dataLapHeader.className = 'header';
dataLapHeader.innerText = 'Lap Time';
dataLap.appendChild(dataLapHeader);
const dataLapText = document.createElement('span');
dataLapText.className = 'text';
dataLap.appendChild(dataLapText);

const timeElapsed = document.createElement('div');
timeElapsed.className = 'box';
timeElapsed.setAttribute('style', 'height:50px; width: 200px');
const timeElapsedHeader = document.createElement('span');
timeElapsedHeader.className = 'header';
timeElapsedHeader.innerText = 'Elapsed Time';
timeElapsed.appendChild(timeElapsedHeader);
const timeElapsedText = document.createElement('span');
timeElapsedText.className = 'text';
timeElapsed.appendChild(timeElapsedText);

const startButton = document.createElement('button');
startButton.className = 'button';
startButton.innerText = 'Start';
startButton.setAttribute('style', 'position: absolute; top: 170px; left: 370px');

const stopButton = document.createElement('button');
stopButton.className = 'button';
stopButton.innerText = 'Stop';
stopButton.setAttribute('style', 'position: absolute; top: 170px; left: 470px');

const resetButton = document.createElement('button');
resetButton.className = 'button';
resetButton.innerText = 'Reset';
resetButton.setAttribute('style', 'position: absolute; top: 220px; left: 370px');

const splitButton = document.createElement('button');
splitButton.className = 'button';
splitButton.innerText = 'Split';
splitButton.setAttribute('style', 'position: absolute; top: 220px; left: 470px');

document.body.appendChild(dataSplit);
document.body.appendChild(dataLap);
document.body.appendChild(timeElapsed);
document.body.appendChild(startButton);
document.body.appendChild(stopButton);
document.body.appendChild(resetButton);
document.body.appendChild(splitButton);

// ==========LOGIC=======================

let currentTime = 0; // in seconds
stopButton.disabled = true;
splitButton.disabled = true;
let timeFunction;
let splitTimes = [0];
let lapTimes = [];

const pad = (num, size) => {
  let newNum = num.toString();
  while (newNum.length < size) newNum = `0${num}`;
  return newNum;
};

const display = () => {
  const hours = pad(Math.floor(currentTime / 60 / 60), 2);
  const minutes = pad(Math.floor((currentTime / 60) % 60), 2);
  const seconds = pad(currentTime % 60, 2);
  timeElapsedText.innerText = `${hours}:${minutes}:${seconds}`;
};
display();

const timeRun = () => {
  currentTime += 1;
  display();
};

const timerStart = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  splitButton.disabled = false;
  timeFunction = setInterval(timeRun, 1000);
};
startButton.addEventListener('click', timerStart);

const timerStop = () => {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(timeFunction);
};
stopButton.addEventListener('click', timerStop);

const timerReset = () => {
  currentTime = 0;
  startButton.disabled = false;
  stopButton.disabled = true;
  splitButton.disabled = true;
  clearInterval(timeFunction);
  display();

  splitTimes = [0];
  lapTimes = [];
  dataSplitText.innerText = '';
  dataLapText.innerText = '';
};
resetButton.addEventListener('click', timerReset);

const timerSplit = () => {
  splitTimes.push(currentTime);
  const currentLap = currentTime - splitTimes[splitTimes.length - 2];
  lapTimes.push(currentLap);
  dataSplitText.innerText = '';
  dataLapText.innerText = '';
  for (let i = 0; i < lapTimes.length; i += 1) {
    const splitHours = pad(Math.floor(splitTimes[i + 1] / 60 / 60), 2);
    const splitMinutes = pad(Math.floor((splitTimes[i + 1] / 60) % 60), 2);
    const splitSeconds = pad(splitTimes[i + 1] % 60, 2);
    dataSplitText.innerHTML += `${i + 1}. ${splitHours}:${splitMinutes}:${splitSeconds}</br>`;

    const lapHours = pad(Math.floor(lapTimes[i] / 60 / 60), 2);
    const lapMinutes = pad(Math.floor((lapTimes[i] / 60) % 60), 2);
    const lapSeconds = pad(lapTimes[i] % 60, 2);
    dataLapText.innerHTML += `${i + 1}. ${lapHours}:${lapMinutes}:${lapSeconds}</br>`;
  }
};
splitButton.addEventListener('click', timerSplit);
