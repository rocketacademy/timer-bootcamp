import {
  createMainDiv,
  createRightDiv,
  createButtonsDiv,
  createLapDataDiv,
  createElapsedTimeDiv,
  createStartButton,
  createStopButton,
  createResetBtn,
  createLapBtn,
} from "./create.js";

let interval;
let min = 0,
  sec = 0;
let timerRunning = false;
let lapTimeClicked = []; // store time differences as seconds

//////////////////////
// helper function //
/////////////////////

const formatTimer = (m, s) => {
  // format time to mm:ss
  let minStr = m.toString();
  let secStr = s.toString();
  secStr = secStr.length > 1 ? secStr : "0" + secStr;
  minStr = minStr.length > 2 ? minStr : "0" + minStr;
  return `${minStr}:${secStr}`;
};

const convertSecToMinSec = (s) => {
  const minute = Math.floor(s / 60); // integer division
  const second = s > 60 ? Math.abs(s - 60) : s;
  return { minute, second };
};

///////////////////////////
// button functionality //
/////////////////////////

const startTimer = () => {
  const elapsedTimeDiv = document.getElementById("elapsed-time-div");
  console.log("start");

  interval = setInterval(() => {
    elapsedTimeDiv.innerHTML = `Elapsed Time </br> ${formatTimer(min, sec)}`;
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
  }, 1000);

  timerRunning = true;
  document.getElementById("start-button").disabled = true;
};

const stopTimer = () => {
  console.log("stop");
  clearInterval(interval);
  timerRunning = false;
};

const resetTimer = () => {
  console.log("reset");
  // check if timer is still running
  if (timerRunning) {
    stopTimer();
  }
  // reset vars
  min = 0;
  sec = 0;

  // reset elapsed time, lap data
  const elapsedTimeDiv = document.getElementById("elapsed-time-div");
  elapsedTimeDiv.innerHTML = `Elapsed Time </br> ${formatTimer(min, sec)}`;
  document.getElementById("start-button").disabled = false;

  const pNodes = document.querySelectorAll(".p-lap");
  if (pNodes != null) {
    pNodes.forEach((e) => e.remove());
  }
};

const onLapClick = () => {
  let timeElapsedSecs = 0;
  minClicked = min;
  secClicked = sec;
  console.log("lap");

  if (timerRunning) {
    // append time difference
    const timeClicked = minClicked * 60 + secClicked;
    if (lapTimeClicked.length === 0) {
      timeElapsedSecs = timeClicked; //time elapsed in secs
    } else {
      timeElapsedSecs = timeClicked - lapTimeClicked[lapTimeClicked.length - 1]; // curT - prevT
    }

    lapTimeClicked.push(timeElapsedSecs);
    // console.log(lapTimeClicked);
    const t = convertSecToMinSec(timeElapsedSecs);
    // console.log(t);

    const lapDataDiv = document.getElementById("lap-data-div");
    const newLap = document.createElement("p");
    newLap.className = "p-lap";
    newLap.innerHTML = `${formatTimer(t.minute, t.second)}`;
    lapDataDiv.appendChild(newLap);
  } else {
    // start timer
    startTimer();
  }
};

const main = () => {
  // create parent divs
  const mainDiv = createMainDiv();
  const rightDiv = createRightDiv();
  const buttonsDiv = createButtonsDiv();
  const leftDiv = createLapDataDiv(); // left div (on its own)

  // create child elements
  const et = createElapsedTimeDiv();
  const start = createStartButton();
  const stop = createStopButton();
  const reset = createResetBtn();
  const lap = createLapBtn();

  // set initial states & button functionality
  et.innerHTML = `Elapsed Time </br> ${formatTimer(0, 0)}`;
  lap.addEventListener("click", () => onLapClick());
  reset.addEventListener("click", () => resetTimer());
  stop.addEventListener("click", () => stopTimer());
  start.addEventListener("click", () => startTimer());

  const buttonNodes = [start, stop, reset, lap];
  for (let i = 0; i < buttonNodes.length; i++) {
    buttonsDiv.appendChild(buttonNodes[i]);
  }

  const rightNodes = [et, buttonsDiv];
  for (let i = 0; i < rightNodes.length; i++) {
    rightDiv.appendChild(rightNodes[i]);
  }

  const mainNodes = [leftDiv, rightDiv];
  for (let i = 0; i < mainNodes.length; i++) {
    mainDiv.appendChild(mainNodes[i]);
  }

  document.body.appendChild(mainDiv);
};

main();
