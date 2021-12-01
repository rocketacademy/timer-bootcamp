// Please implement exercise logic here
// overall container
const timerContainer = document.createElement("div")
timerContainer.classList.add("timerBox")
document.body.appendChild(timerContainer)

// container for lap data
const lapData = document.createElement ("div");
lapData.classList.add("lapdataBox");
timerContainer.appendChild(lapData);

// container for elasped time
const elaspedTime = document.createElement("div");
elaspedTime.classList.add("elaspedTimeBox")
timerContainer.appendChild(elaspedTime);


// container for start/stop buttons
const startBtnContainer = document.createElement("div");
startBtnContainer.classList.add("buttonBox")

const startBtn = document.createElement("Button");
startBtn.innerHTML = "Start";
startBtn.classList.add("button")
startBtnContainer.appendChild(startBtn);

const stopBtn = document.createElement("button");
stopBtn.innerHTML = "Stop";
stopBtn.classList.add("button")
startBtnContainer.appendChild(stopBtn)

timerContainer.appendChild(startBtnContainer)

// container for reset/lap
const resetBtnContainer = document.createElement("div");
resetBtnContainer.classList.add("buttonBox")

const resetBtn = document.createElement("Button");
resetBtn.innerHTML = "Reset";
resetBtn.classList.add("button")
resetBtnContainer.appendChild(resetBtn);

const lapBtn = document.createElement("button");
lapBtn.innerHTML = "Lap";
lapBtn.classList.add("button")
resetBtnContainer.appendChild(lapBtn);

timerContainer.appendChild(resetBtnContainer);


