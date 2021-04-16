// Create DOM
const createStopWatchDOM = () => {
  // stop watch container (main)
  const stopwatchContainer = document.createElement('section');
  stopwatchContainer.classList.add('stopwatch-container');
  document.body.appendChild(stopwatchContainer);

  // lap data container
  const lapDataContainer = document.createElement('div');
  lapDataContainer.classList.add('lap-data-container');
  stopwatchContainer.appendChild(lapDataContainer);

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
createStopWatchDOM();

//Selectors
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const elapsedTime = document.querySelector('.elapsed-time');

//timer logic
let id;
let currentTime = 0;

const outputTime = () => {
  currentTime += 1;
  // units
  let miliSecs;
  let secs;
  let mins;
  let hrs;
  //conver num to string
  currentTimeString = String(currentTime);
  // add padding
  currentTimeString = currentTimeString.padStart(9, '0');
  miliSecs = currentTimeString.slice(-3);
  secs = currentTimeString.slice(4, 6);
  mins = currentTimeString.slice(2, 4);
  hrs = currentTimeString.slice(0, 2);
  output = `${hrs}:${mins}:${secs}:${miliSecs}`;
  elapsedTime.innerText = output;
};

//create event listener for all btns
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
  currentTime = 0;
  elapsedTime.innerText = '00:00:00:000';
});
