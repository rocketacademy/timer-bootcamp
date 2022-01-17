// create stopwatch face
const stopwatchContainer = document.createElement('div');
stopwatchContainer.id = 'stopwatchContainer';
document.body.append(stopwatchContainer);

// create display
const leftOuter = document.createElement('div');
leftOuter.classList.add('outer');
stopwatchContainer.appendChild(leftOuter);

const lapTime = document.createElement('span');
lapTime.classList.add('center');
leftOuter.appendChild(lapTime);
lapTime.innerText = 'lap time';

const rightOuter = document.createElement('div');
rightOuter.classList.add('outer');
stopwatchContainer.appendChild(rightOuter);

// timer output
const display = document.createElement('div');
display.id = 'display';
rightOuter.appendChild(display);

// create buttons
const buttons = document.createElement('div');
buttons.id = 'buttons';
rightOuter.appendChild(buttons);

const topButtons = document.createElement('div');
buttons.appendChild(topButtons);

const startButton = document.createElement('button');
startButton.innerText = 'start';
startButton.classList.add('left');
topButtons.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.innerText = 'stop';
stopButton.classList.add('right');
topButtons.appendChild(stopButton);

const bottomButtons = document.createElement('div');
buttons.appendChild(bottomButtons);

const resetButton = document.createElement('button');
resetButton.innerText = 'reset';
resetButton.classList.add('left');
bottomButtons.appendChild(resetButton);

const lapButton = document.createElement('button');
lapButton.innerText = 'lap';
lapButton.classList.add('right');
bottomButtons.appendChild(lapButton);

// //show timer output
// const output = document.createElement('div');
// output.classList.add("display")
// output.id = 'center'
// document.body.appendChild(output);

// declare variables
let milliseconds = 1000;
const delayInMilliseconds = 1000;
display.innerText = '00:00:00';

let ref = null;

const start = () => {
  // output.innerText = `00:00:00`;
  if (ref === null) {
    ref = setInterval(() => {
      stopButton.addEventListener('click', () => { clearInterval(ref);
        ref = null; });

      const totalSeconds = Math.floor(milliseconds / 1000);
      const totalMinutes = Math.floor((milliseconds / 1000) / 60);
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes - hours * 60;
      let seconds = totalSeconds - hours * 60 * 60 - minutes * 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      display.innerText = `${hours}:${minutes}:${seconds} `;
      console.log(milliseconds);

      milliseconds += 1000;
    }, delayInMilliseconds);
  }
};

// add event listeners

startButton.addEventListener('click', start);
resetButton.addEventListener('click', () => window.location.reload());

// how to make it reset
