// Create DOM
const createStopWatchDom = () => {
  // stop watch container (main)
  const stopwatchContainer = document.createElement('section');
  stopwatchContainer.classList.add('stopwatch-container');
  document.body.appendChild(stopwatchContainer);

  // lap data container
  const lapDataContainer = document.createElement('div');
  lapDataContainer.classList.add('lap-data-container');
  stopwatchContainer.appendChild(lapDataContainer);

  // lap container
  const lapContainer = document.createElement('div');
  lapContainer.classList.add('lap-container');
  lapDataContainer.appendChild(lapContainer);
  // lap Header
  const lapHeader = document.createElement('h4');
  lapHeader.innerText = 'LAP';
  lapContainer.appendChild(lapHeader);
  // lap UL
  const lapList = document.createElement('ul');
  lapList.classList.add('lap-list');
  lapContainer.appendChild(lapList);

  // split container
  const splitContainer = document.createElement('div');
  splitContainer.classList.add('split-container');
  lapDataContainer.appendChild(splitContainer);
  // split Header
  const splitHeader = document.createElement('h4');
  splitHeader.innerText = 'SPLIT';
  splitContainer.appendChild(splitHeader);
  // split UL
  const splitList = document.createElement('ul');
  splitList.classList.add('split-list');
  splitContainer.appendChild(splitList);

  // total cotainer
  const totalContainer = document.createElement('div');
  totalContainer.classList.add('total-container');
  lapDataContainer.appendChild(totalContainer);
  // total Header
  const totalHeader = document.createElement('h4');
  totalHeader.innerText = 'TOTAL';
  totalContainer.appendChild(totalHeader);
  // total UL
  const totalList = document.createElement('ul');
  totalList.classList.add('total-list');
  totalContainer.appendChild(totalList);

  // timer & buttons container
  const timerAndButtonsContainer = document.createElement('div');
  timerAndButtonsContainer.classList.add('timer-buttons-container');
  stopwatchContainer.appendChild(timerAndButtonsContainer);

  // elapsed time container
  const elapsedTimeContainer = document.createElement('div');
  elapsedTimeContainer.classList.add('elapsed-time-container');
  timerAndButtonsContainer.appendChild(elapsedTimeContainer);
  // elapsed time text
  const elapsedTimePara = document.createElement('p');
  elapsedTimePara.classList.add('elapsed-time');
  elapsedTimePara.innerText = '00:00:00:000';
  elapsedTimeContainer.appendChild(elapsedTimePara);

  // buttons container
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');
  timerAndButtonsContainer.appendChild(btnContainer);
  // buttons
  const btnMaker = (btnName, className, parent) => {
    const btn = document.createElement('button');
    btn.innerText = btnName;
    btn.classList.add(className);
    btn.setAttribute('type', 'button');
    parent.appendChild(btn);
  };
  btnMaker('START', 'start-btn', btnContainer);
  btnMaker('STOP', 'stop-btn', btnContainer);
  btnMaker('RESET', 'reset-btn', btnContainer);
  btnMaker('LAP', 'lap-btn', btnContainer);
};
createStopWatchDom();

// Selectors
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const elapsedTime = document.querySelector('.elapsed-time');
const lapDataContainer = document.querySelector('.lap-data-container');
const lapList = document.querySelector('.lap-list');
const splitList = document.querySelector('.split-list');
const totalList = document.querySelector('.total-list');

// timer logic
let id; // id for setInterval
let miliSecs = 0;
let secs = 0;
let mins = 0;
let hrs = 0;
let lapTime; //Str
let lapCounter = 0;

let lap = 0;
let split;
let total;

let splitId; // id for setInterval
let splitMiliSecs = 0;
let splitSecs = 0;
let splitMins = 0;
let splitHrs = 0;
let splitTime; //Str

// Helper functions

// function to always keep the hours/mins/secs as 2 or 3 digits 00, 000
const padTime = (num, padding) => (num + '').padStart(padding, '0');

const resetTimer = () => {
  miliSecs = 0;
  secs = 0;
  mins = 0;
  hrs = 0;
  lapTime = ''; //Str
  lapCounter = 0;
  lap = 0;
  split = 0;
  total = 0;
  elapsedTime.innerText = '00:00:00:000';
  console.log(lapList.children);
  for (value of lapList.children) {
    value.remove();
  }
  lapList.innerText = '';
  splitList.innerText = '';
  totalList.innerText = '';
};

const resetSplitTimer = () => {
  splitMiliSecs = 0;
  splitSecs = 0;
  splitMins = 0;
  splitHrs = 0;
  splitTime = ''; //Str
};

const createLap = () => {
  // create split li and add to list
  const liMaker = (text, parent) => {
    const makeLi = document.createElement('li');
    makeLi.innerText = text;
    parent.appendChild(makeLi);
  };
  liMaker(padTime(lapCounter, 2), lapList);
  liMaker(lapTime, totalList);
};

const createSplit = (text) => {
  const makeLi = document.createElement('li');
  makeLi.innerText = text;
  splitList.appendChild(makeLi);
};

const outputTime = () => {
  miliSecs += 1;
  if (miliSecs >= 1000) {
    secs += 1;
    miliSecs = 0;
  }

  if (secs >= 60) {
    mins += 1;
    secs = 0;
  }

  if (mins >= 60) {
    hrs += 1;
    mins = 0;
  }

  if (hrs >= 99) {
    clearInterval(id);
    resetTimer();
  }

  // pad time
  let padMiliSecs = padTime(miliSecs, 3);
  let padSecs = padTime(secs, 2);
  let padMins = padTime(mins, 2);
  let padHrs = padTime(hrs, 2);
  // display elasped time
  lapTime = `${padHrs}:${padMins}:${padSecs}:${padMiliSecs}`;
  elapsedTime.innerText = lapTime;
};

const outputTimeSplit = () => {
  splitMiliSecs += 1;
  if (splitMiliSecs >= 1000) {
    splitSecs += 1;
    splitMiliSecs = 0;
  }

  if (splitSecs >= 60) {
    splitMins += 1;
    splitSecs = 0;
  }

  if (splitMins >= 60) {
    splitHrs += 1;
    splitMins = 0;
  }

  if (splitHrs >= 99) {
    clearInterval(splitId);
    resetSplitTimer();
  }

  // pad time
  let padMiliSecs = padTime(splitMiliSecs, 3);
  let padSecs = padTime(splitSecs, 2);
  let padMins = padTime(splitMins, 2);
  let padHrs = padTime(splitHrs, 2);
  // display elasped time
  splitTime = `${padHrs}:${padMins}:${padSecs}:${padMiliSecs}`;
};

// create event listener for all btns
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  id = setInterval(outputTime, 1);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(id);
});

resetBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(id);
  resetTimer();
  resetSplitTimer();
});

lapBtn.addEventListener('click', () => {
  lapCounter += 1;
  createLap();
  // if first lap
  if (lapCounter === 1) {
    // display split value
    createSplit(lapTime);
    // start split timer
    splitId = setInterval(outputTimeSplit, 1);
    console.log('SPLIT TIMER STARTED FOR FIRST LAP');
  }
  // if subsequent lap
  if (lapCounter >= 2) {
    console.log('HERE');
    // stop timer
    clearInterval(splitId);
    // display split value
    createSplit(splitTime);
    // reset split timer
    resetSplitTimer();
    // start split timer
    splitId = setInterval(outputTimeSplit, 1);
  }
});
