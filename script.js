// Please implement exercise logic here
//### DOM SELECTORS ###
const mainTimer =  document.getElementById('main-timer')
const lapTimer = document.getElementById('lap-timer')
const actionButtons = document.querySelectorAll('.btn')
const container = document.getElementById('lap-data')

const laps = document.createElement('table');
laps.style.display = 'none';
container.appendChild(laps);
const row = laps.insertRow();
const headings = ['Lap', 'Lap times', 'Overall time'];
for (let j = 0; j < headings.length; j += 1) {
  const cell = row.insertCell();
  cell.appendChild(document.createTextNode(headings[j]));
  cell.style.fontWeight = 'bold';
}

// GLOBAL VARIABLES
let counter
let mainTime = [0,0,0,0]
let lapTime = [0,0,0,0]
let noOfLaps = 0

// ### HELPER FUNCTION ###
const formatClock = (timeArray) => {
  let [hours, minutes, seconds, miliseconds] = timeArray.map(String)
  hours = hours.length > 1 ? hours : `0${hours}`
  minutes = minutes.length > 1 ? minutes : `0${minutes}`
  seconds = seconds.length > 1 ? seconds : `0${seconds}`
  miliseconds = miliseconds.length > 1 ? miliseconds : `0${miliseconds}`

  return `${hours}:${minutes}:${seconds}:${miliseconds}`
}

// ### MAIN FUNCTION ###
const startTimer = () => {
  const interval = setInterval(() => {
    mainTime[3] += 1;
      if (mainTime[3] > 99) {
        mainTime[2] += 1;
        mainTime[3] = 0;
      }
      if (mainTime[2] > 59) {
        mainTime[1] += 1;
        mainTime[2] = 0;
      }
      if (mainTime[1] > 59) {
        mainTime[0] += 1;
        mainTime[1] = 0;
      }

      mainTimer.innerText = formatClock(mainTime)

      if (noOfLaps > 0) {
      lapTime[3] += 1;
      if (lapTime[3] > 99) {
        lapTime[2] += 1;
        lapTime[3] = 0;
      }
      if (lapTime[2] > 59) {
        lapTime[1] += 1;
        lapTime[2] = 0;
      }
      if (lapTime[1] > 59) {
        lapTime[0] += 1;
        lapTime[1] = 0;
      }

      lapTimer.innerText = formatClock(lapTime)
    }
  }, 10)

  // EVENT LISTENERS
  actionButtons[1].onclick = () => {
    clearInterval(interval)
  }

  actionButtons[0].onclick =() => {
    clearInterval(interval)
    startTimer()
  }

  actionButtons[3].onclick =() => {
    clearInterval(interval)
    mainTime = [0,0,0,0]
    lapTime = [0,0,0,0]
    noOfLaps = 0
    container.innerText = ''
    mainTimer.innerText = '00:00:00:00'
    lapTimer.innerText = '00:00:00:00'
  }
}

const newLap = () => {
  noOfLaps += 1
  const newRow = laps.insertRow();
  const rowData = [noOfLaps];

  if (noOfLaps == 1) {
    rowData.push(mainTimer.innerText);
    rowData.push(mainTimer.innerText);
    lapTimer.style.display='block'
    laps.style.display = 'table'
  } else {
    rowData.push(lapTimer.innerText)
    rowData.push(mainTimer.innerText)
    lapClock = [0, 0, 0]
    lapTimer.innerText = '00:00:00'
  }

  for (let i = 0; i < headings.length; i += 1) {
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode(rowData[i]));
  }
}


actionButtons[0].onclick =() => {
  startTimer()
}

actionButtons[2].onclick =() => {
  lapClock = [0, 0, 0]
  newLap()
  console.log(noOfLaps)
}

