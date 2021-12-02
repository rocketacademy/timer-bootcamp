// Please implement exercise logic here
// global variable
let millis = 0;
let canClick = true;
const delayInMilliseconds = 10;
let lapTime = null;
let previousLapTime = null;
let timeArray = [];
let numOfTimesLapClicked = 0;
let lapCount = 1;

// helper function to convert mill to mins and sec
const millisToMinutesAndSeconds = (ms) => {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
 return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
};

// overall container
const timerContainer = document.createElement("div")
timerContainer.classList.add("timerBox")
document.body.appendChild(timerContainer)

// container for lap data
const lapData = document.createElement ("div");
lapData.classList.add("lapdataBox");
timerContainer.appendChild(lapData);

const rightContainer = document.createElement("div");
rightContainer.classList.add("rightContainer")
timerContainer.appendChild(rightContainer)

// container for elasped time
const elaspedTime = document.createElement("div");
elaspedTime.classList.add("elaspedTimeBox")
rightContainer.appendChild(elaspedTime);


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

rightContainer.appendChild(startBtnContainer)

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

rightContainer.appendChild(resetBtnContainer);

const startTimer = () => {
  // set canClick to false prevents users from starting the timer again
  if (canClick === true) {
  canClick = false;
  ref = setInterval(() => {
    // insert timer into timeDiv
    const convertTime = millisToMinutesAndSeconds(millis);
    elaspedTime.innerText = `${convertTime}`;

    millis += 10;
    // if (milliseconds <= 0) {
    //   clearInterval(ref);
    // }
  }, delayInMilliseconds);

  return ref;
};
};

const stopTimer =() => {
  clearInterval(ref)
  canClick = true;
}

const resetTimer = () => {
  millis = 0;
  elaspedTime.innerText = '';
  lapData.innerText = '';
  numOfTimesLapClicked = 0;
  lapCount = 1;
  canClick = true;
}

const lapCounter = () => {

  // push the time into array created
  timeArray.push(millis);

  // get the lap time, if its the first round
  if (previousLapTime === null) {
    lapTime = timeArray[numOfTimesLapClicked];
    previousLapTime = timeArray[numOfTimesLapClicked];
  }

  if (previousLapTime !== null) {
  // from the second round lap time is current lapTime - previousLapTime
    lapTime = timeArray[numOfTimesLapClicked] - previousLapTime;
    previousLapTime = timeArray[numOfTimesLapClicked]
  }

  const displayLapTime = millisToMinutesAndSeconds(millis);

  // display time difference between laps
  let displayTimeDiff = millisToMinutesAndSeconds(previousLapTime - lapTime);

  const dataBox1 = document.createElement('div');
  const dataBox2 = document.createElement('div');
  const dataBox3 = document.createElement('div');
  
  dataBox1.innerText = `Lap No: ${lapCount}`
  dataBox2.innerText = `Lap Time: ${displayLapTime}`
  dataBox3.innerText = `Lap Diff: ${displayTimeDiff}`
  const lineBreak = document.createElement('BR');

  lapData.appendChild(dataBox1);
  lapData.appendChild(dataBox2);
  lapData.appendChild(dataBox3);
  lapData.appendChild(lineBreak);

  // add 1 to the counter
  numOfTimesLapClicked += 1;
  lapCount +=1;
}

// say which function to call *when* the user clicks the button
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapCounter);


