const startTimer = () => {
  // set canClick to false prevents users from starting the timer again
  if (canClick === true) {
    canClick = false;
    ref = setInterval(() => {
    // insert timer into timeDiv
      const convertTime = millisToMinutesAndSeconds(millis);
      elaspedTime.innerText = `${convertTime}`;

      millis += 10;
    }, delayInMilliseconds);
  }
  return ref;
};
const stopTimer = () => {
  clearInterval(ref);
  canClick = true;
};

const resetTimer = () => {
  millis = 0;
  elaspedTime.innerText = '';
  lapData.innerText = '';
  numOfTimesLapClicked = 0;
  lapCount = 1;
  canClick = true;
  lapTime = null;
  previousLapTime = null;
  timeArray = [];
};

const lapCounter = () => {
  // push the time into array created
  timeArray.push(millis);

  // get the lap time, if its the first round
  if (previousLapTime === null) {
    lapTime = timeArray[numOfTimesLapClicked];
    previousLapTime = lapTime;
  } else if (previousLapTime !== null) {
  // from the second round lap time is current lapTime - previousLapTime
    lapTime = timeArray[numOfTimesLapClicked] - previousLapTime;
    previousLapTime = timeArray[numOfTimesLapClicked];
  }

  const displayLapTime = millisToMinutesAndSeconds(millis);

  // display time for the lap
  const displayTimeDiff = millisToMinutesAndSeconds(lapTime);

  const dataBox1 = document.createElement('div');
  const dataBox2 = document.createElement('div');
  const dataBox3 = document.createElement('div');

  dataBox1.innerText = `Lap No: ${lapCount}`;
  dataBox2.innerText = `Total Time: ${displayLapTime}`;
  dataBox3.innerText = `Lap Time: ${displayTimeDiff}`;
  const lineBreak = document.createElement('BR');

  lapData.appendChild(dataBox1);
  lapData.appendChild(dataBox2);
  lapData.appendChild(dataBox3);
  lapData.appendChild(lineBreak);

  // add 1 to the counter
  numOfTimesLapClicked += 1;
  lapCount += 1;
};
