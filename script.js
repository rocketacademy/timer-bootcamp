// Please implement exercise logic here
// global variable
let millis = 0;
let canClick = true;
const delayInMilliseconds = 10;
let lapTime = null;
let previousLapTime = null;
let timeArray = [];
let numOfTimesLapClicked = 0;
let lapCount = 1;
let ref;

// helper function to convert mill to mins and sec
const millisToMinutesAndSeconds = (ms) => {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
// setting up of containers
const timerContainer = document.createElement('div');
timerContainer.classList.add('timerBox');

const lapData = document.createElement('div');
lapData.classList.add('lapdataBox');

const rightContainer = document.createElement('div');
rightContainer.classList.add('rightContainer');

const elaspedTime = document.createElement('div');
elaspedTime.classList.add('elaspedTimeBox');

// container for start/stop buttons
const startBtnContainer = document.createElement('div');
startBtnContainer.classList.add('buttonBox');

const startBtn = document.createElement('Button');
startBtn.innerHTML = 'Start';
startBtn.classList.add('button');

const stopBtn = document.createElement('button');
stopBtn.innerHTML = 'Stop';
stopBtn.classList.add('button');

// container for reset/lap
const resetBtnContainer = document.createElement('div');
resetBtnContainer.classList.add('buttonBox');

const resetBtn = document.createElement('Button');
resetBtn.innerHTML = 'Reset';
resetBtn.classList.add('button');

const lapBtn = document.createElement('button');
lapBtn.innerHTML = 'Lap';
lapBtn.classList.add('button');

const startTimer = () => {
  // set canClick to false prevents users from starting the timer again
  if (canClick === true) {
    canClick = false;
    ref = setInterval(() => {
    // insert timer into timeDiv
      const convertTime = millisToMinutesAndSeconds(millis);
      elaspedTime.innerText = `${convertTime}`;

      millis += 10;
    }, delayInMilliseconds);
  }
  return ref;
};
const stopTimer = () => {
  clearInterval(ref);
  canClick = true;
};

const resetTimer = () => {
  millis = 0;
  elaspedTime.innerText = '';
  lapData.innerText = '';
  numOfTimesLapClicked = 0;
  lapCount = 1;
  canClick = true;
  lapTime = null;
  previousLapTime = null;
  timeArray = [];
};

const lapCounter = () => {
  // push the time into array created
  timeArray.push(millis);

  // get the lap time, if its the first round
  if (previousLapTime === null) {
    lapTime = timeArray[numOfTimesLapClicked];
    previousLapTime = lapTime;
  } else if (previousLapTime !== null) {
  // from the second round lap time is current lapTime - previousLapTime
    lapTime = timeArray[numOfTimesLapClicked] - previousLapTime;
    previousLapTime = timeArray[numOfTimesLapClicked];
  }

  const displayLapTime = millisToMinutesAndSeconds(millis);

  // display time for the lap
  const displayTimeDiff = millisToMinutesAndSeconds(lapTime);

  const dataBox1 = document.createElement('div');
  const dataBox2 = document.createElement('div');
  const dataBox3 = document.createElement('div');

  dataBox1.innerText = `Lap No: ${lapCount}`;
  dataBox2.innerText = `Total Time: ${displayLapTime}`;
  dataBox3.innerText = `Lap Time: ${displayTimeDiff}`;
  const lineBreak = document.createElement('BR');

  lapData.appendChild(dataBox1);
  lapData.appendChild(dataBox2);
  lapData.appendChild(dataBox3);
  lapData.appendChild(lineBreak);

  // add 1 to the counter
  numOfTimesLapClicked += 1;
  lapCount += 1;
};

const init = () => {
// overall container
  document.body.appendChild(timerContainer);

  // container for lap data
  timerContainer.appendChild(lapData);
  timerContainer.appendChild(rightContainer);

  // container for elasped time
  rightContainer.appendChild(elaspedTime);

  startBtnContainer.appendChild(startBtn);
  startBtnContainer.appendChild(stopBtn);
  rightContainer.appendChild(startBtnContainer);

  resetBtnContainer.appendChild(resetBtn);
  resetBtnContainer.appendChild(lapBtn);
  rightContainer.appendChild(resetBtnContainer);

  // say which function to call *when* the user clicks the button
  startBtn.addEventListener('click', startTimer);
  stopBtn.addEventListener('click', stopTimer);
  resetBtn.addEventListener('click', resetTimer);
  lapBtn.addEventListener('click', lapCounter);
};

init();
