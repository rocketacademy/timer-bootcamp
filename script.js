// Please implement exercise logic here

let time = 0
let laps = []
let timerInterval 
let stopped = true


const timeConverter = (time) => {
  let seconds = (time%60).toString()
  let minute = Math.floor(time/60).toString()

  seconds = seconds.length < 2 ? `0${seconds}` : seconds
  minute = minute.length < 2 ? `0${minute}` : minute

  return `${minute}:${seconds}`
}

const ui = document.createElement('div')
ui.classList.add('ui')

document.body.appendChild(ui)


const lapDataColumn = document.createElement('div')
lapDataColumn.classList.add('column')
ui.appendChild(lapDataColumn)

const timerColumn = document.createElement('div')
timerColumn.classList.add('column')
ui.appendChild(timerColumn)

const timer = document.createElement('div')
timer.classList.add('timer')
timer.innerText = timeConverter(time)
timerColumn.appendChild(timer)



const start = ()=> {
  stopped = false
  timerInterval = setInterval(() => {
    time += 1
    timer.innerText = timeConverter(time)
  }, 1000)
}

const stop = () => {
  stopped = true
  clearInterval(timerInterval)
}

const calculateLapTime = (time) => {
  if (laps.length  === 1){
    return time
  }
  const lapTime = time - laps[laps.length -2]
  return lapTime

}

const lap =  () => {
  if (!stopped){
      laps.push(time)
  const newLap = document.createElement('p')
  newLap.innerText = `Lap ${laps.length} - ${timeConverter(calculateLapTime(time))}(SPLIT) - ${timeConverter(time)}`
  newLap.style.color = "white"
  lapDataColumn.appendChild(newLap)
  }
}

const reset = () => {
  time = 0
  laps = 0
  clearInterval(timerInterval)
  timer.innerText = timeConverter(time)
  lapDataColumn.innerHTML = ""
}

const startButton = document.createElement('button')
startButton.classList.add('button')
startButton.innerHTML="start"
startButton.addEventListener("click", start)
timerColumn.appendChild(startButton)

const stopButton = document.createElement('button')
stopButton.classList.add('button')
stopButton.innerHTML="stop"
stopButton.addEventListener("click", stop)
timerColumn.appendChild(stopButton)

const lapButton = document.createElement('button')
lapButton.classList.add('button')
lapButton.innerHTML="lap"
lapButton.addEventListener("click", lap)
timerColumn.appendChild(lapButton)

const resetButton = document.createElement('button')
resetButton.classList.add('button')
resetButton.innerHTML="reset"
resetButton.addEventListener("click", reset)
timerColumn.appendChild(resetButton)




