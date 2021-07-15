let time = 0;
let ref;

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
lapData.innerText = 'Lap Data';
lapData.className = 'lapdata';

// create timer display
const timer = document.createElement('div');
timer.innerHTML = `Elapsed Time <br> ${Math.floor(time / (60 * 60))}:${Math.floor((time / 60) % 60)}:${Math.floor(time / 10 % 6)}${Math.floor(time % 10)}`;
timer.classList.add('timer');

// create div to hold the different buttons of timer
const div1 = document.createElement('div');
div1.className = 'div';

const div2 = document.createElement('div');
div2.className = 'div';

const div3 = document.createElement('div');
div3.className = 'div';

const div4 = document.createElement('div');
div4.className = 'div';

document.body.appendChild(startButton);
document.body.appendChild(stopButton);
document.body.appendChild(resetButton);
document.body.appendChild(lapButton);
document.body.appendChild(lapData);
document.body.appendChild(timer);
document.body.appendChild(div1);
document.body.appendChild(div2);
document.body.appendChild(div3);
document.body.appendChild(div4);
div1.appendChild(lapData);
div2.appendChild(timer);
div3.appendChild(startButton);
div3.appendChild(stopButton);
div4.appendChild(resetButton);
div4.appendChild(lapButton);

const startTimer = () => {
  ref = setInterval(() => {
    time += 1;
    timer.innerHTML = `Elapsed Time <br> ${Math.floor(time / (60 * 60))}:${Math.floor((time / 60) % 60)}:${Math.floor(time / 10 % 6)}${Math.floor(time % 10)}`;
  }, 1000);
  startButton.disabled = true;
};

const stopTimer = () => {
  clearInterval(ref);
  startButton.disabled = false;
};

const resetTimer = () => {
  time = 0;
  timer.innerHTML = `Elapsed Time <br> ${Math.floor(time / (60 * 60))}:${Math.floor((time / 60) % 60)}:${Math.floor(time / 10 % 6)}${Math.floor(time % 10)}`;
};
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
