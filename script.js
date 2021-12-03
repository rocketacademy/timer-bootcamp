// Please implement exercise logic here
//### DOM SELECTORS ###
const timerSelector = document.querySelectorAll('.timer')
const actionButtons = document.querySelectorAll('.btn')

// GLOBAL VARIABLES
let counter

// ### HELPER FUNCTIONS ###
const getHours = () => {
  counter = parseInt(timerSelector[0].innerHTML)
  counter += 1
  timerSelector[0].innerHTML = counter < 10 ? `0${counter}:` : `${counter}:`
}

const getMinutes = () => {
  counter = parseInt(timerSelector[1].innerHTML)
  counter += 1

  timerSelector[1].innerHTML = counter < 10 ? `0${counter}:` : `${counter}:`

  if (counter == 60) {
    timerSelector[1].innerHTML = '00:';
    getHours()
  }
}

const getSeconds = () => {
  counter= parseInt(timerSelector[2].innerHTML)
  counter += 1

  timerSelector[2].innerHTML = counter < 10 ? `0${counter}` : counter

  if (counter == 60) {
    timerSelector[2].innerHTML = '00';
    getMinutes()
  }
}

// ### MAIN FUNCTION ###
const startTimer = () => {
  const interval = setInterval(() => {
    counter = parseInt(timerSelector[3].innerHTML)
    counter += 1

    timerSelector[3].innerHTML = counter < 10 ? `0${counter}` : counter

    if (counter == 100) {
      timerSelector[3].innerHTML = '00'
      getSeconds()
    }

  }, 10)

  // ### EVENT LISTENERS
  actionButtons[1].onclick = () => {
    clearInterval(interval)
  }

  actionButtons[0].onclick =() => {
    clearInterval(interval)
    startTimer()
  }

  actionButtons[3].onclick =() => {
    for (let i = 0; i< timerSelector.length; i +=1) {
      clearInterval(interval)
      timerSelector[i].innerHTML = "00"
    }
  }
}

actionButtons[0].onclick =() => {
    startTimer()
  }

