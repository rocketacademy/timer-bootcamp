// Global variables
let minutes = 0;
let hours = 0;
let clock;
let seconds = 0;
let displaySeconds;
let displayMinutes;
let isTimeRunning = true;

// Create stopwatch display
const stopwatch = document.createElement('div');

// Create start button
const start = document.createElement('button');
start.innerHTML = 'Start';
document.body.appendChild(start);
start.addEventListener('click', () => startTimer());

// Create stop button
const stopButton = document.createElement('button');
stopButton.innerHTML = 'Stop';
document.body.appendChild(stopButton);
stopButton.addEventListener('click', () => stopTimer());

// Create lap button
const lapButton = document.createElement('button');
lapButton.innerHTML = 'Lap';
document.body.appendChild(lapButton);
lapButton.addEventListener('click', () => showLapTime(seconds));

// Create reset button
const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset';
document.body.appendChild(resetButton);
resetButton.addEventListener('click', () => resetTimer());

// Callback function for timer
const startTimer = () => {
  isTimeRunning = true;
  // Create counter
  const timer = setInterval(() => {
    stopwatch.innerHTML = `Timer: ${showAsClock(seconds)}`;

    if (isTimeRunning === false) {
      clearInterval(timer);
    }
    seconds += 1;
  }, 1000);
  // Append timer to document
  document.body.appendChild(stopwatch);
};

// Ensure that displayed seconds resets after 59sec
const showSeconds = (seconds) => {
  if (seconds > 59) {
    displaySeconds = seconds - 60 * (Math.floor(seconds / 60));
  } else { displaySeconds = seconds; }
  return displaySeconds;
};

// Ensure that displayed minutes resets after 59min
const showMinutes = (seconds) => {
  minutes = Math.floor(seconds / 60);
  if (minutes > 59) {
    displayMinutes = minutes - 60 * (Math.floor(minutes / 60));
  } else { displayMinutes = minutes; }
  return displayMinutes;
};

// Convert seconds to hr, min, sec
const showAsClock = (seconds) => {
  hours = Math.floor(minutes / 60);
  clock = `${hours}: ${showMinutes(seconds)}: ${showSeconds(seconds)} `;
  return clock;
};

// Callback function for stop event
const stopTimer = () => {
  // This will cause clearInterval() to be run at line 32
  isTimeRunning = false;
};

// Callback function for lap event
const showLapTime = (seconds) => {
  const lap = document.createElement('div');
  document.body.appendChild(lap);
  const lapTime = showAsClock(seconds);
  lap.innerText = `${lapTime}`;
};

// // Callback function to reset Timer
const resetTimer = () => {
  seconds = 0;
};
