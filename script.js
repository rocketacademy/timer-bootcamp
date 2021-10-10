let time;
let clock = [0, 0, 0];
let isTimerOn = false;

const container = document.createElement('div');
container.id = 'container';

const timer = document.createElement('div');
timer.id = 'timer';
timer.innerText = '00:00:00';
container.appendChild(timer);

const startButton = document.createElement('button');
startButton.id = 'start-button';
startButton.innerText = 'Start / Stop';
container.appendChild(startButton);

const lapButton = document.createElement('button');
lapButton.id = 'lap-button';
lapButton.innerText = 'Lap';
container.appendChild(lapButton);

const resetButton = document.createElement('button');
resetButton.id = 'reset-button';
resetButton.innerText = 'Reset';
container.appendChild(resetButton);

// const laps = document.createElement('div');
// laps.id = 'laps';
// container.appendChild(laps);
// const lapsHeader = document.body.appendChild(container);

const getFormattedTime = () => {
  let [hoursLeft, minutesLeft, secondsLeft] = clock.map(String);

  hoursLeft = hoursLeft.length > 1 ? hoursLeft : `0${hoursLeft}`;
  minutesLeft = minutesLeft.length > 1 ? minutesLeft : `0${minutesLeft}`;
  secondsLeft = secondsLeft.length > 1 ? secondsLeft : `0${secondsLeft}`;

  return `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
};

const startTimer = () => {
  if (!isTimerOn) {
    isTimerOn = true;
    time = setInterval(() => {
      clock[2] += 1;
      if (clock[2] > 59) {
        clock[1] += 1;
        clock[2] = 0;
      }
      if (clock[1] > 59) {
        clock[0] += 1;
        clock[1] = 0;
      }

      timer.innerText = getFormattedTime();
    }, 1000);
  } else {
    isTimerOn = false;
    clearInterval(time);
  }
};

const lapTimer = () => {

};

const resetTimer = () => {
  clearInterval(time);
  clock = [0, 0, 0];
  timer.innerText = '00:00:00';
  isTimerOn = false;
};

startButton.addEventListener('click', startTimer);
lapButton.addEventListener('click', lapTimer);
resetButton.addEventListener('click', resetTimer);
