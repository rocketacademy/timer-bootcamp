// Please implement exercise logic here
const stopwatchContainer = document.createElement("div");
stopwatchContainer.classList.add("stopwatch-container");
document.body.appendChild(stopwatchContainer);

const lapData = document.createElement("div");
lapData.classList.add("lap-data");
stopwatchContainer.appendChild(lapData);

const controlContainer = document.createElement("div");
controlContainer.classList.add("control-container");
stopwatchContainer.appendChild(controlContainer);

const elapsedTime = document.createElement("p");
elapsedTime.classList.add("elapsed-time");
elapsedTime.innerText = 0;
controlContainer.appendChild(elapsedTime);

const startButton = document.createElement("button");
startButton.classList.add("start-button");
startButton.innerText = "START";
controlContainer.appendChild(startButton);

const stopButton = document.createElement("button");
stopButton.classList.add("stop-button");
stopButton.innerText = "STOP";
controlContainer.appendChild(stopButton);

const resetButton = document.createElement("button");
resetButton.classList.add("reset-button");
resetButton.innerText = "Reset";
controlContainer.appendChild(resetButton);

const lapButton = document.createElement("button");
lapButton.classList.add("lap-button");
lapButton.innerText = "Lap";
controlContainer.appendChild(lapButton);
let id = null;
let currentTime = 0;
let lapsData = "";
let lapCounter = 0;

const outputTime = () => {
  currentTime += 1;
  elapsedTime.innerText = currentTime;
  return currentTime;
};

startButton.addEventListener("click", () => {
  id = setInterval(outputTime, 1000);
});
stopButton.addEventListener("click", () => {
  clearInterval(id);
});

resetButton.addEventListener("click", () => {
  clearInterval(id);
  elapsedTime.innerText = 0;
});

lapButton.addEventListener("click", () => {
  lapCounter = lapCounter + 1;
  lapsData = lapsData + `\nLap ${lapCounter}: ${currentTime}`;
  lapData.innerText = lapsData;
});
