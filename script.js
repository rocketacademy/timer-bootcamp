let time = 0;
let lapTime = 0;
let ref;
let ref2;
let lapCount = 0;

// create 6 buttons of stopwatch
// create start button
const startButton = document.createElement('button');
startButton.innerText = 'Start';
startButton.className = 'button';

// create stop button
const stopButton = document.createElement('button');
stopButton.innerText = 'Stop';
stopButton.className = 'button';

// create reset button
const resetButton = document.createElement('button');
resetButton.innerText = 'Reset';
resetButton.className = 'button';

// create lap button
const lapButton = document.createElement('button');
lapButton.innerText = 'Lap';
lapButton.className = 'button';

const lapData = document.createElement('div');
lapData.innerHTML = 'Lap Data <br>';
lapData.className = 'lapdata';

// create timer display
const timer = document.createElement('div');
timer.innerHTML = `Elapsed Time <br> ${Math.floor(time / (60 * 60))}:${Math.floor((time / 60) % 60)}:${Math.floor(time / 10 % 6)}${Math.floor(time % 10)}`;
timer.classList.add('timer');

// create current lap display
const currentLapTime = document.createElement('div');
currentLapTime.innerHTML = `Current Lap Time <br> ${Math.floor(lapTime / (60 * 60))}:${Math.floor((lapTime / 60) % 60)}:${Math.floor(lapTime / 10 % 6)}${Math.floor(lapTime % 10)}`;
currentLapTime.classList.add('timer');

// create div to hold the different buttons of timer
const div1 = document.createElement('div');
div1.className = 'div';

const div2 = document.createElement('div');
div2.className = 'div';

const div3 = document.createElement('div');
div3.className = 'div';

const div4 = document.createElement('div');
div4.className = 'div';

const div5 = document.createElement('div');
div5.className = 'div';

div1.appendChild(lapData);
div2.appendChild(timer);
div3.appendChild(currentLapTime);
div4.appendChild(startButton);
div4.appendChild(stopButton);
div5.appendChild(resetButton);
div5.appendChild(lapButton);

document.body.appendChild(div1);
document.body.appendChild(div2);
document.body.appendChild(div3);
document.body.appendChild(div4);
document.body.appendChild(div5);

const startTimer = () => {
  ref = setInterval(() => {
    time += 1;
    timer.innerHTML = `Elapsed Time <br> ${Math.floor(time / (60 * 60))}:${Math.floor((time / 60) % 60)}:${Math.floor(time / 10 % 6)}${Math.floor(time % 10)}`;
  }, 1000);
  startButton.disabled = true;
};

const resetTimer = () => {
  time = 0;
  timer.innerHTML = `Elapsed Time <br> ${Math.floor(time / (60 * 60))}:${Math.floor((time / 60) % 60)}:${Math.floor(time / 10 % 6)}${Math.floor(time % 10)}`;

  lapTime = 0;
  currentLapTime.innerHTML = `Current Lap Time <br> ${Math.floor(lapTime / (60 * 60))}:${Math.floor((lapTime / 60) % 60)}:${Math.floor(lapTime / 10 % 6)}${Math.floor(lapTime % 10)}`;

  lapData.innerHTML = 'Lap Data <br>';

  lapCount = 0;
};

const lapTimer = () => {
  ref2 = setInterval(() => {
    lapTime += 1;
    currentLapTime.innerHTML = `Current Lap Time <br> ${Math.floor(lapTime / (60 * 60))}:${Math.floor((lapTime / 60) % 60)}:${Math.floor(lapTime / 10 % 6)}${Math.floor(lapTime % 10)}`;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(ref);
  clearInterval(ref2);
  startButton.disabled = false;
};

// create lap function
const lapClicked = () => {
  lapCount += 1;
  const lapRecord = document.createElement('span');
  lapRecord.innerHTML = `Lap ${lapCount}. ${Math.floor(lapTime / (60 * 60))}:${Math.floor((lapTime / 60) % 60)}:${Math.floor(lapTime / 10 % 6)}${Math.floor(lapTime % 10)}<br>`;
  lapRecord.className = 'laptiming';
  lapData.appendChild(lapRecord);
  lapTime = 0;
  clearInterval(ref2);
  lapTimer();
};

// every lap button clicked create a lap record at lap data
// current lap time reset to zero
startButton.addEventListener('click', startTimer);
startButton.addEventListener('click', lapTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapClicked);
