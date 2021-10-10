// Global variables
let time;
let mainClock = [0, 0, 0];
let lapClock = [0, 0, 0];
let isTimerOn = false;
let lapCount = 0;

// Initialise UI, create DOM elements
const container = document.createElement('div');
container.id = 'container';

const mainTimer = document.createElement('div');
mainTimer.classList.add('timer', 'main-timer');
mainTimer.innerText = '00:00:00';
container.appendChild(mainTimer);

const lapTimer = document.createElement('div');
lapTimer.classList.add('timer', 'lap-timer');
lapTimer.innerText = '00:00:00';
lapTimer.style.display = 'none';
container.appendChild(lapTimer);

const buttonContainer = document.createElement('div');
container.appendChild(buttonContainer);

const startButton = document.createElement('button');
startButton.innerText = 'Start';
buttonContainer.appendChild(startButton);

const lapButton = document.createElement('button');
lapButton.innerText = 'Lap';
lapButton.disabled = true;
buttonContainer.appendChild(lapButton);

const laps = document.createElement('table');
laps.style.display = 'none';
container.appendChild(laps);
const row = laps.insertRow();
const headings = ['Lap', 'Lap times', 'Overall time'];
for (let j = 0; j < headings.length; j += 1) {
  const cell = row.insertCell();
  cell.appendChild(document.createTextNode(headings[j]));
  cell.style.fontWeight = 'bold';
}

document.body.appendChild(container);

// Given an array of [hours, mins, secs], convert it to a string that can be displayed
const getFormattedTime = (clock) => {
  let [hoursLeft, minutesLeft, secondsLeft] = clock.map(String);

  hoursLeft = hoursLeft.length > 1 ? hoursLeft : `0${hoursLeft}`;
  minutesLeft = minutesLeft.length > 1 ? minutesLeft : `0${minutesLeft}`;
  secondsLeft = secondsLeft.length > 1 ? secondsLeft : `0${secondsLeft}`;

  return `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
};

// Called whenever user clicks on the start/stop/resume button
const startTimer = () => {
  if (!isTimerOn) {
    // if timer was off, then set to on and create a timer using setinterval
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
    // if timer was on, then set to off and use clearinterval on the previously created interval
    isTimerOn = false;
    startButton.innerText = 'Resume';
    lapButton.innerText = 'Reset';
    clearInterval(time);
  }
};

// Called when the user clicks on the Lap button
const onNewLap = () => {
  lapCount += 1;

  // Insert row into laps table, and create an array for the row data
  const newRow = laps.insertRow();
  const rowData = [lapCount];

  if (lapCount === 1) {
    // First time lapping, lap time is same as main time
    // Show lap timer and the laps table
    rowData.push(mainTimer.innerText);
    rowData.push(mainTimer.innerText);
    lapTimer.style.display = 'block';
    laps.style.display = 'table';
  } else {
    rowData.push(lapTimer.innerText);
    rowData.push(mainTimer.innerText);
    lapClock = [0, 0, 0];
    lapTimer.innerText = '00:00:00';
  }

  // Add row data to laps table
  for (let i = 0; i < headings.length; i += 1) {
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode(rowData[i]));
  }
};

// Called when user clicks on Reset button
const resetTimer = () => {
  // Reset global variables
  clearInterval(time);
  mainClock = [0, 0, 0];
  lapClock = [0, 0, 0];
  isTimerOn = false;
  lapCount = 0;

  // Reset UI
  mainTimer.innerText = '00:00:00';
  lapTimer.innerText = '00:00:00';
  startButton.innerText = 'Start';
  lapButton.innerText = 'Lap';
  lapButton.disabled = true;
  lapTimer.style.display = 'none';
  laps.style.display = 'none';

  while (laps.rows.length > 1) laps.rows[1].remove();
};

startButton.addEventListener('click', startTimer);
lapButton.addEventListener('click', () => {
  if (isTimerOn) onNewLap();
  else resetTimer();
});
