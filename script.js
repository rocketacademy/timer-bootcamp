// Please implement exercise logic here
let handle = null; // for setInterval and clearInterval
let handle2 = null;
let start = true;
let prevTime = 0; // for Date.now() difference with elapsedTime
let elapsedTime = 0;
let firstSplit = true;
let split = false;
let prevSplitTime = 0;
let elapsedSplitTime = 0;

//build stopwatch elapsed time
const stopWatch = document.createElement("div");
stopWatch.classList.add("elapsed");
stopWatch.innerHTML = `00 : 00 : 00 : 0000`;
document.body.appendChild(stopWatch);

// build interactive buttons
const imgContainer = document.createElement("div");
imgContainer.classList.add("image-container");
document.body.appendChild(imgContainer);
const goStart = document.createElement("img");
goStart.classList.add("img", "start");
goStart.src = "/assets/play.png";
imgContainer.appendChild(goStart);
const goStop = document.createElement("img");
goStop.classList.add("img", "stop");
goStop.src = "/assets/stop.png";
goStop.classList.add("disabled");
imgContainer.appendChild(goStop);
const goReset = document.createElement("img");
goReset.classList.add("img", "reset");
goReset.src = "/assets/reset.png";
goReset.classList.add("disabled");
imgContainer.appendChild(goReset);
const goSplit = document.createElement("img");
goSplit.classList.add("img", "split");
goSplit.src = "/assets/split.png";
goSplit.classList.add("disabled");
imgContainer.appendChild(goSplit);

// build split container to record lap
const splitContainer = document.createElement("div");
splitContainer.classList.add("split-container");
document.body.appendChild(splitContainer);
let splitWatch;

// stopwatch time display
const renderTime = (element, elapsed) => {
  let tempTime = elapsed;
  let milliseconds = tempTime % 1000; // get the remainder of 1000 ms which can go to second
  tempTime = Math.floor(tempTime / 1000); //to get seconds
  let seconds = tempTime % 60; // get the remainder of 60s which can go to minutes
  tempTime = Math.floor(tempTime / 60); // to get minutes
  let minutes = tempTime % 60; // get the remainder of 60mins which can go to hours
  tempTime = Math.floor(tempTime / 60); // to get hours
  let hours = tempTime % 60; //to get the remaider of hours

  //concat all the units above
  let text = "";
  text += hours.toString().padStart(2, "0") + " : ";
  text += minutes.toString().padStart(2, "0") + " : ";
  text += seconds.toString().padStart(2, "0") + " : ";
  text += milliseconds.toString().padStart(4, "0");
  element.innerHTML = text;
  return element.innerHTML;
};

//start stopwatch for start and split
const startStopwatch = () => {
  if (handle) return; //check flag
  //console.log("This 1 line");
  if (start && !split) {
    start = false;
    handle = setInterval(function () {
      if (!prevTime) {
        prevTime = Date.now(); //to set the initial value of the time
      }
      elapsedTime += Date.now() - prevTime; //to get the difference between elapsed and 0;
      prevTime = Date.now();
      renderTime(stopWatch, elapsedTime);
    }, 100);
    split = true;
  }
};

//pause the stopwatch
const pauseStopwatch = () => {
  clearInterval(handle);
  handle = null;
  prevTime = 0;
};

//reset the stopwatch
const resetStopwatch = () => {
  pauseStopwatch();
  elapsedTime = 0;
  prevTime = 0;
  start = true;
  split = false;
  prevSplitTime = 0;
  elapsedSplitTime = 0;
  firstSplit = true;
  renderTime(stopWatch, elapsedTime);
  splitContainer.innerHTML = "";
};

//split the stopwatch
const splitStopwatch = () => {
  if (split && !start && handle !== null) {
    if (!firstSplit) {
      console.log("not first split");
      splitWatch = document.createElement("div");
      splitContainer.appendChild(splitWatch);
      renderTime(splitWatch, elapsedSplitTime);
      elapsedSplitTime = 0;
    }
    if (firstSplit) {
      firstSplit = false;
      console.log("first split");
      splitWatch = document.createElement("div");
      splitContainer.appendChild(splitWatch);
      handle2 = setInterval(function () {
        if (!prevSplitTime) {
          prevSplitTime = Date.now(); //to set the initial value of the time
        }
        elapsedSplitTime += Date.now() - prevSplitTime; //to get the difference between elapsed and 0;
        prevSplitTime = Date.now();
      }, 100);
      renderTime(splitWatch, elapsedTime);
      elapsedSplitTime = 0;
    }
  }
};

//add event listener to each button
goStart.addEventListener("click", function () {
  startStopwatch();
  goStart.classList.add("disabled");
  goSplit.classList.remove("disabled");
  goStop.classList.remove("disabled");
  goReset.classList.remove("disabled");
});
goStop.addEventListener("click", function () {
  pauseStopwatch();
  goSplit.classList.add("disabled");
  goStop.classList.add("disabled");
});
goReset.addEventListener("click", function () {
  resetStopwatch();
  goStart.classList.remove("disabled");
  goSplit.classList.add("disabled");
  goStop.classList.add("disabled");
  goReset.classList.add("disabled");
});
goSplit.addEventListener("click", function () {
  splitStopwatch();
});
