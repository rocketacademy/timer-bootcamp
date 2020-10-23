// Global setup ===========================================================
let elapsedTimeArray = [0, 0, 0];
let timerId;

const elapsedTimeContainer = document.createElement('div');
const startButton = document.createElement('button');
const stopButton = document.createElement('button');
const resetButton = document.createElement('button');
const lapButton = document.createElement('button');

// Helper functions =======================================================
const countTime = () => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  elapsedTimeArray = [0, 0, 0];

  const countTimeId = setInterval(() => {
    seconds += 1;

    // increase minutes and hours
    if (seconds % 3 === 0 && seconds > 1) {
      // increase minutes by 1 if 60s passed
      minutes += 1;
      seconds = 0;

      // increase hours by 1 if 60mins passed
      if (minutes % 3 === 0) {
        hours += 1;
        minutes = 0;
      }
    }

    // store current time
    elapsedTimeArray.splice(0, 0, seconds, minutes, hours);
    elapsedTimeContainer.innerText = `${elapsedTimeArray[2]}:H ${elapsedTimeArray[1]}:M ${elapsedTimeArray[0]}:S`;
  }, 1000);
  return countTimeId;
};

// Game initilization =====================================================
elapsedTimeContainer.innerText = '0:H 0:M 0:S';
document.body.appendChild(elapsedTimeContainer);

startButton.innerText = 'start';
stopButton.innerText = 'stop';
resetButton.innerText = 'reset';
lapButton.innerText = 'lap';
startButton.addEventListener('click', () => {
  console.log('start button pressed');
  timerId = countTime();
});
stopButton.addEventListener('click', () => {
  console.log('stop button pressed');
  clearInterval(timerId);
});
resetButton.addEventListener('click', () => {
  console.log('reset button pressed');
  clearInterval(timerId);
  elapsedTimeContainer.innerText = '0:H 0:M 0:S';
});
// lapButton.addEventListener('click');
document.body.appendChild(startButton);
document.body.appendChild(stopButton);
document.body.appendChild(resetButton);
document.body.appendChild(lapButton);
