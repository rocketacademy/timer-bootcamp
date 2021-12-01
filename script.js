// Please implement exercise logic here
// global variable
let millis = 0;
const delayInMilliseconds = 10;

// helper function to convert mill to mins and sec
const millisToMinutesAndSeconds = (ms) => {
    let milliseconds = Math.floor((ms % 1000) / 100);
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

const startTimer = () => {
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

const stopTimer =() => {
  clearInterval(ref)
}

const resetTimer = () => {
  millis = 0;
  elaspedTime.innerHTML = millisToMinutesAndSeconds(millis);
}
// say which function to call *when* the user clicks the button
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);


