export const createMainDiv = () => {
  const mainDiv = document.createElement("div");
  mainDiv.id = "main-div";
  mainDiv.className = "main";
  return mainDiv;
};

export const createRightDiv = () => {
  const rightDiv = document.createElement("div");
  rightDiv.id = "right-div";
  rightDiv.className = "right";
  return rightDiv;
};

export const createButtonsDiv = () => {
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "buttons-div";
  buttonsDiv.className = "buttons";
  return buttonsDiv;
};

export const createLapDataDiv = () => {
  const lapDataDiv = document.createElement("div");
  lapDataDiv.id = "lap-data-div";
  lapDataDiv.className = "lap-data";
  lapDataDiv.innerHTML = "Lap Data";
  return lapDataDiv;
};

export const createElapsedTimeDiv = () => {
  const elapsedTimeDiv = document.createElement("div");
  elapsedTimeDiv.id = "elapsed-time-div";
  elapsedTimeDiv.className = "elapsed-time";
  return elapsedTimeDiv;
};

export const createStartButton = () => {
  const startBtn = document.createElement("button");
  startBtn.id = "start-button";
  startBtn.className = "button";
  startBtn.innerHTML = "Start";
  return startBtn;
};

export const createStopButton = () => {
  const stopBtn = document.createElement("button");
  stopBtn.id = "stop-button";
  stopBtn.className = "button";
  stopBtn.innerHTML = "Stop";
  return stopBtn;
};

export const createResetBtn = () => {
  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-button";
  resetBtn.className = "button";
  resetBtn.innerHTML = "Reset";
  return resetBtn;
};

export const createLapBtn = () => {
  const lapBtn = document.createElement("button");
  lapBtn.id = "lap-button";
  lapBtn.className = "button";
  lapBtn.innerHTML = "Lap";
  return lapBtn;
};
