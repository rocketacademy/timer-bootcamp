let totalNumOfLapClick = 0;
let buttonValue;
let seconds = 0;
let minutes = 0;
let hours = 0;
const delayInseconds = 1000;
const elapsedTimeContainer = document.createElement('div');
elapsedTimeContainer.classList.add('elapsedtime');
elapsedTimeContainer.innerText = `${hours}: ${minutes} : ${seconds}`;
document.body.appendChild(elapsedTimeContainer);

const whenBtnClick = () => {
  startButton.disabled = true;
  const ref = setInterval(() => {
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    } else if (minutes === 60) {
      minutes = 0;
      hours += 1;
    }

    if (buttonValue === 'stop') {
      clearInterval(ref);
      console.log(clearInterval(ref));
      startButton.disabled = false;
      return buttonValue;
    }
    seconds += 1;
    elapsedTimeContainer.innerText = `${hours}: ${minutes} : ${seconds}`;
  }, delayInseconds);
};

const startButtonClick = () => {
  buttonValue = 'start';

  whenBtnClick();
};

const stopbuttonClick = () => {
  buttonValue = 'stop';
  console.log(buttonValue);
  whenBtnClick();
};

const resetbuttonClick = () => {
  console.log('reset');
  seconds = 0;
  minutes = 0;
  hours = 0;
  elapsedTimeContainer.innerText = `${hours}: ${minutes} : ${seconds}`;
  buttonValue = 'stop';
  stopbuttonClick();
  let i = 0;
  while (i < totalNumOfLapClick) {
    const elem = document.getElementById('timeLap');
    elem.parentNode.removeChild(elem);
    i += 1;
  }
};

// create container
const startContainer = document.createElement('div');
const resetBtnContainer = document.createElement('div');
const stopContainer = document.createElement('div');
const lapContainer = document.createElement('div');
const timeDataContainer = document.createElement('div');

// create button
const startButton = document.createElement('button');
const resetbuttom = document.createElement('button');
const stopbutton = document.createElement('button');
const lapbutton = document.createElement('button');

// add class for container
startContainer.classList.add('start');
resetBtnContainer.classList.add('reset');
stopContainer.classList.add('stop');
lapContainer.classList.add('lap');
timeDataContainer.classList.add('lapdata');

timeDataContainer.innerText = 'Lap Data';

// add class for buttons
startButton.classList.add('big-btn');
resetbuttom.classList.add('big-btn');
stopbutton.classList.add('big-btn');
lapbutton.classList.add('big-btn');

// add word for button
startButton.innerText = 'start';
resetbuttom.innerText = 'reset';
stopbutton.innerText = 'stop';
lapbutton.innerText = 'lap';

// appendchild container
document.body.appendChild(startContainer);
document.body.appendChild(resetBtnContainer);
document.body.appendChild(stopContainer);
document.body.appendChild(lapContainer);
document.body.appendChild(timeDataContainer);

// appeandchild buttons
startContainer.appendChild(startButton);
resetBtnContainer.appendChild(resetbuttom);
stopContainer.appendChild(stopbutton);
lapContainer.appendChild(lapbutton);

// lap button click
const lapbuttonClick = () => {
  const newLapData = document.createElement('div');
  newLapData.setAttribute('id', 'timeLap');
  newLapData.innerText = `${hours}: ${minutes} : ${seconds}`;
  timeDataContainer.appendChild(newLapData);
  totalNumOfLapClick += 1;
};

// if button click
startButton.addEventListener('click', startButtonClick);
stopbutton.addEventListener('click', stopbuttonClick);
resetbuttom.addEventListener('click', resetbuttonClick);
lapbutton.addEventListener('click', lapbuttonClick);
