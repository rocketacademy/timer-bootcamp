// Please implement exercise logic here
let hrs = 0;
let minute = 0;
let sec = 0;
let milisec = 0;

let displayHrs = hrs;
let displayMin = minute;
let displaySec = sec;
let displayMilisec = milisec;

let x = "stopped";
let interval = null;
let lapNow = null;

 const start = ()=>{
   
  milisec+=1;
  if(milisec / 100 ==1){
    sec+=1;
    milisec = 0
    if(sec / 60 ==1){
      minute+=1;
      sec = 0;
      if(minute/60 ==1){
        hrs+=1;
        hrs = 0;
      }
    }
  }
  if(milisec<10){
    displayMilisec = "0" + milisec;
  } else {
    displayMilisec = milisec;
  }
  if(sec<10){
    displaySec = "0" + sec;
  } else{
      displaySec = sec;
    }
  if(minute <10){
    displayMin = "0" + minute;
  } else{
    displayMin = minute;
  }
  if(hrs <10){
  displayHrs = "0" + hrs;
  } else{
    displayHrs = hrs;
  }

  document.getElementById('timerHrs').innerHTML = `${displayHrs}`;
  document.getElementById('timerMin').innerHTML = `${displayMin}`;
  document.getElementById('timerSec').innerHTML = `${displaySec}`;
  document.getElementById('timerMilisec').innerHTML = `${displayMilisec}`;
};

const startStop =()=>{
  if(x ==="stopped"){
    interval = window.setInterval(start, 10);
    x = "started";
    document.getElementById('startBtn').innerHTML = "Stop"; 
  }
  else {
    window.clearInterval(interval);
    x = "stopped";
    document.getElementById('startBtn').innerHTML = "Start";

  }
};

const reset =()=>{
  window.clearInterval(interval);
  hrs = 0;
  min = 0;
  sec = 0;
  milisec = 0;
  
  displayHrs = 0;
  displayMin = 0;
  displaySec = 0;
  displayMilisec = 0;
  
  status = "stopped";
  document.getElementById('timerHrs').innerHTML = "00";
  document.getElementById('timerMin').innerHTML = "00";
  document.getElementById('timerSec').innerHTML = "00";
  document.getElementById('timerMilisec').innerHTML = "00";
  document.getElementById('lapRecord').innerHTML = "";
};

const lap =()=>{
  lapNow = displayHrs + " : " + displayMin + " : " + displaySec + " : " + displayMilisec; 
  document.getElementById('lapRecord').innerHTML = document.getElementById('lapRecord').innerHTML + "<p>" + lapNow + "</p>";  
};