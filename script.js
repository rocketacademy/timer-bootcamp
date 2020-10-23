// Global setup ===========================================================
// object to store seconds, minutes and hour
const elapsedTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};
let timerId;
const SEC_PER_MIN = 3;
const MIN_PER_HR = 3;
const elapsedTimeOutput = () => `${elapsedTime.hours}:H ${elapsedTime.minutes}:M ${elapsedTime.seconds}:S`;

const elapsedTimeContainer = document.createElement('div');
const startButton = document.createElement('button');
const stopButton = document.createElement('button');
const resetButton = document.createElement('button');
const lapButton = document.createElement('button');

// Helper functions =======================================================
const countTime = () => {
  const countTimeId = setInterval(() => {
    elapsedTime.seconds += 1;

    // increase minutes and hours
    if (elapsedTime.seconds % SEC_PER_MIN === 0 && elapsedTime.seconds > 1) {
      // increase minutes by 1 if 60s passed
      elapsedTime.minutes += 1;
      elapsedTime.seconds = 0;

      // increase hours by 1 if 60mins passed
      if (elapsedTime.minutes % MIN_PER_HR === 0) {
        elapsedTime.hours += 1;
        elapsedTime.minutes = 0;
      }
    }

    // store current time
    // lapArray.push(elapsedTime);
    elapsedTimeContainer.innerText = elapsedTimeOutput();
  }, 1000);
  return countTimeId;
};

// Game initilization =====================================================
elapsedTimeContainer.innerText = elapsedTimeOutput();
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
  elapsedTime.seconds += 1;
  elapsedTime.seconds = 0;
  elapsedTime.minutes = 0;
  elapsedTime.hours = 0;

  elapsedTimeContainer.innerText = `${elapsedTimeOutput()}`;
});
// lapButton.addEventListener('click');
document.body.appendChild(startButton);
document.body.appendChild(stopButton);
document.body.appendChild(resetButton);
document.body.appendChild(lapButton);
