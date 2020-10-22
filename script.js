
// text to be displayed

const displayTextEl = document.createElement('div')
displayTextEl.innerHTML = `0:0: 0`
const buttonEl = document.createElement('button')
buttonEl.innerText = 'Start'
const resetButtonEl = document.createElement('button')
resetButtonEl.innerText = 'Reset'

document.body.appendChild(displayTextEl)
document.body.appendChild(buttonEl)
document.body.appendChild(resetButtonEl)

const minutes = 0;
let currentTime = minutes * 60;

// check if timer is running
let checkTimer = -1;

//displaying the different hours and seconds 
const timer = () => {
  const minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  let hours = Math.floor(currentTime / 360)
  displayTextEl.innerHTML = `${hours}:${minutes}:${seconds}`
  currentTime += 1
};
buttonEl.addEventListener('click', () => {
  // if pause, restart 
  if (checkTimer == -1) {
    checkTimer = setInterval(timer, 1000)
    buttonEl.innerText = 'Pause'
  } else {
    clearInterval(checkTimer);
    checkTimer = -1;
    buttonEl.innerText = 'Start'
  }

});

resetButtonEl.addEventListener('click', () => {
  location.reload()
});
