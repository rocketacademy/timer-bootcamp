// alert("hello!")

// ===================================================
//  Global Variables
// ===================================================
let timer;

// create a timer function globally to run the time 
let totalSeconds = 0;
const increaseInMilliseconds = 10;

// timer display functions 
// hr:min:sec (milsec)
// 00:00:00 (000) 
// e.g 
// split 1: 00:00:03 (361)

// select the respecitve span elements and assign to variables 
const milliSecondOutput = document.getElementById('milli-second')
const secondOutput = document.getElementById('second')
const minuteOutput = document.getElementById('minute')
const hourOutput = document.getElementById('hour')
const lapData = document.getElementById("lapdata-row")

// declare global variables 
let milliSecond = 0;
let second = 0; 
let minute = 0;
let hour = 0;

// ===================================================
//  Selection of buttons & addEventListeners 
// ===================================================

// set up for #start-btn
let startBtn = document.getElementById("start-btn")
// link button to call back function 
startBtn.addEventListener('click',()=> {
  timer = setInterval(() => {
  startBtn.disabled = true;

  milliSecond++; 
  // increament for milliSecond
  if (milliSecond <99) {
    milliSecondOutput.innerHTML = `${milliSecond}`
  }
  if (milliSecond >99) {
    second++;
    milliSecond = 0 
    secondOutput.innerHTML = `0${second}`
  }
  // increament for second
  if (second >10) {
    secondOutput.innerHTML = `${second}`
  }
  if (second >59) {
    minute++;
    second = 0
    minuteOutput.innerHTML = `0${minute}`
  }

   // increament for minute
  if (minute >10) {
    secondOutput.innerHTML = `${second}`
  }
  if (minute >59) {
    hour++;
    minute = 0;
    hourOutput.innerHTML = `0${hour}`
  }

  console.log('start timer');

  // enable startBtn again
  startBtn.disabled = false;
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

// // set up for #lap-btn
const lapBtn = document.getElementById("lap-btn")
// link button to call back function 
lapBtn.addEventListener('click',()=>lapTimer())



// ===================================================
//  helper functions
// ===================================================

// create a startTimer function 
// const startTimer = () => {}


// resetBtn callback function
const resetTimer=()=> {
  // lapBtn.disabled=true;
 milliSecond = 0;
 second = 0; 
 minute = 0;
 hour = 0;
 milliSecondOutput.innerHTML = '000'
 secondOutput.innerHTML = '00:'
 minuteOutput.innerHTML = '00:'
 hourOutput.innerHTML = '00:'
 lapData.innerHTML="";
}


// lapBtn callback functions 
const lapTimer =()=>{
  const lapList = document.createElement("li");
  lapList.innerHTML = `${hour}:${minute}:${second}:${milliSecond}`
  lapData.appendChild(lapList);
}