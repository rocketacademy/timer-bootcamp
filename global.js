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
