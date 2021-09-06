// Please implement exercise logic here

const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;

let stopCount;

const start = () => {
  stopCount = setInterval(setTime, 1000);
};

const stop = () => {
  clearInterval(stopCount);
};
let lapArray = [];
const reset = () => {
  clearInterval(stopCount);
  minutesLabel.innerHTML = '00';
  secondsLabel.innerHTML = '00';
  lapArray = [];
  const lapData = document.getElementById('lap_data');
  lapData.innerHTML = '';
  totalSeconds = 0;
};

const lap = () => {
  const minutesLabelCurrent = document.getElementById('minutes');
  const secondsLabelCurrent = document.getElementById('seconds');
  lapArray.push(`${minutesLabelCurrent.innerHTML} : ${secondsLabelCurrent.innerHTML}`);
  console.log(lapArray);
  const lapData = document.getElementById('lap_data');
  const lapDiv = document.createElement('div');
  lapDiv.innerHTML = lapArray[lapArray.length - 1];
  lapData.appendChild(lapDiv);
};

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  const valString = `${val}`;
  if (valString.length < 2) {
    return `0${valString}`;
  }

  return valString;
}
