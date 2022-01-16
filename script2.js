// alert("hello!")

// ===================================================
//  Global Variables
// ===================================================
let timer;

// create a timer function globally to run the time 
let totalSeconds = 0;
const increaseInMilliseconds = 1000;

// timer display functions 
// hr:min:sec (milsec)
// 00:00:00 (000) 
// e.g 
// split 1: 00:00:03 (361)
// 



// ===================================================
//  Selection of buttons & addEventListeners 
// ===================================================

// set up for #start-btn
let startBtn = document.getElementById("start-btn")
// link button to call back function 
startBtn.addEventListener('click',()=> {
  timer = setInterval(() => {
  startBtn.disabled = true;
  // resetBtn.disabled = true;
  document.getElementById("lapse-time").innerHTML =`Time: ${totalSeconds} seconds`;
  console.log('start timer');

  // emable startBtn again
  startBtn.disabled = false;
  totalSeconds += 1;
}, increaseInMilliseconds);
})

// set up for #stop-btn
const stopBtn = document.getElementById("stop-btn")
// clear the timer when the button is clicked
stopBtn.addEventListener('click',()=>clearInterval(timer))

// set up for #reset-btn
const resetBtn = document.getElementById("reset-btn")
// link button to call back function 
resetBtn.addEventListener('click',()=>resetTimer())

// set up for #lap-btn
const lapBtn = document.getElementById("lap-btn")
// link button to call back function 
resetBtn.addEventListener('click',()=>lapTimer())



// ===================================================
//  helper functions
// ===================================================



// resetBtn callback functions 
const resetTimer=()=> {
  // lapBtn.disabled=true;
  document.getElementById("lapse-time").innerHTML = "00:00"
  totalSeconds = 0;
}


// lapBtn callback functions 
