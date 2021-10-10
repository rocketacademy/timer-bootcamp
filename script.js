let time;
let mainClock = [0, 0, 0];
let lapClock = [0, 0, 0];
let isTimerOn = false;
let lapCount = 0;

const container = document.createElement('div');
container.id = 'container';

const mainTimer = document.createElement('div');
mainTimer.classList.add('timer', 'main-timer');
mainTimer.innerText = '00:00:00';
container.appendChild(mainTimer);

const lapTimer = document.createElement('div');
lapTimer.classList.add('timer', 'lap-timer');
lapTimer.innerText = '00:00:00';
container.appendChild(lapTimer);

const startButton = document.createElement('button');
startButton.id = 'start-button';
startButton.innerText = 'Start';
container.appendChild(startButton);

const lapButton = document.createElement('button');
lapButton.id = 'lap-button';
lapButton.innerText = 'Lap';
lapButton.disabled = true;
container.appendChild(lapButton);

const laps = document.createElement('table');
laps.id = 'laps';
container.appendChild(laps);
const row = laps.insertRow();
const headings = ['Lap', 'Lap times', 'Overall time'];
for (let j = 0; j < headings.length; j += 1) {
  const cell = row.insertCell();
  cell.appendChild(document.createTextNode(headings[j]));
}

document.body.appendChild(container);

const getFormattedTime = (clock) => {
  let [hoursLeft, minutesLeft, secondsLeft] = clock.map(String);

  hoursLeft = hoursLeft.length > 1 ? hoursLeft : `0${hoursLeft}`;
  minutesLeft = minutesLeft.length > 1 ? minutesLeft : `0${minutesLeft}`;
  secondsLeft = secondsLeft.length > 1 ? secondsLeft : `0${secondsLeft}`;

  return `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
};

const startTimer = () => {
  if (!isTimerOn) {
    isTimerOn = true;
    startButton.innerText = 'Stop';
    lapButton.innerText = 'Lap';
    lapButton.disabled = false;

    time = setInterval(() => {
      mainClock[2] += 1;
      if (mainClock[2] > 59) {
        mainClock[1] += 1;
        mainClock[2] = 0;
      }
      if (mainClock[1] > 59) {
        mainClock[0] += 1;
        mainClock[1] = 0;
      }

      mainTimer.innerText = getFormattedTime(mainClock);

      if (lapCount > 0) {
        lapClock[2] += 1;
        if (lapClock[2] > 59) {
          lapClock[1] += 1;
          lapClock[2] = 0;
        }
        if (lapClock[1] > 59) {
          lapClock[0] += 1;
          lapClock[1] = 0;
        }

        lapTimer.innerText = getFormattedTime(lapClock);
      }
    }, 1000);
  } else {
    isTimerOn = false;
    startButton.innerText = 'Resume';
    lapButton.innerText = 'Reset';
    clearInterval(time);
  }
};

const onNewLap = () => {
  lapCount += 1;
  const newRow = laps.insertRow();
  const rowData = [lapCount];
  if (lapCount === 1) {
    rowData.push(mainTimer.innerText);
    rowData.push(mainTimer.innerText);
  } else {
    rowData.push(lapTimer.innerText);
    rowData.push(mainTimer.innerText);
    lapClock = [0, 0, 0];
    lapTimer.innerText = '00:00:00';
  }

  for (let i = 0; i < headings.length; i += 1) {
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode(rowData[i]));
  }
};

const resetTimer = () => {
  clearInterval(time);
  mainClock = [0, 0, 0];
  lapClock = [0, 0, 0];
  mainTimer.innerText = '00:00:00';
  lapTimer.innerText = '00:00:00';
  isTimerOn = false;
  lapCount = 0;

  startButton.innerText = 'Start';
  lapButton.innerText = 'Lap';
  lapButton.disabled = true;
};

startButton.addEventListener('click', startTimer);
lapButton.addEventListener('click', () => {
  if (isTimerOn) onNewLap();
  else resetTimer();
});
