// Please implement exercise logic here
let totalSeconds = 0;
let lapSeconds = 0;
let lapData = [];
/**
 *
 * id: 1
 * lapTime: 00:00:00:000
 * totalTime: 00:00:00:000
 */
let timer;

document.getElementById("start-button").addEventListener("click", () => {
  toggleDisabled("start-button", true);
  toggleDisabled("reset-button", true);
  toggleDisabled("stop-button", false);
  toggleDisabled("lap-button", false);
  timer = setInterval(function () {
    addTimer();
    updateElapsedTime();
  }, 100);
});

document.getElementById("stop-button").addEventListener("click", () => {
  toggleDisabled("stop-button", true);
  toggleDisabled("start-button", false);
  toggleDisabled("reset-button", false);
  toggleDisabled("lap-button", true);
  clearInterval(timer);
});

document.getElementById("reset-button").addEventListener("click", () => {
  totalSeconds = 0;
  lapSeconds = 0;
  lapData = [];
  document.getElementById("lap-data-times").innerHTML = "";
  updateElapsedTime();
});

document.getElementById("lap-button").addEventListener("click", () => {
  let lapObject = {};
  lapObject.id = lapData.length + 1;
  lapObject.lapTime = milliSecondsToString(lapSeconds);
  lapObject.totalTime = milliSecondsToString(totalSeconds);

  lapData.push(lapObject);

  document.getElementById("lap-data-times").innerHTML = `<li>Lap ${
    lapObject.id
  } ${lapObject.lapTime} (${lapObject.totalTime})</li>${
    document.getElementById("lap-data-times").innerHTML
  }`;

  lapSeconds = 0;
});

const toggleDisabled = (buttonId, status) => {
  document.getElementById(buttonId).disabled = status;
};

const addTimer = () => {
  lapSeconds += 100;
  totalSeconds += 100;
};

const updateElapsedTime = () => {
  document.getElementById("elapsed-time").innerHTML =
    milliSecondsToString(totalSeconds);
};

const milliSecondsToString = (duration) => {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
};
