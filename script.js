// Please implement exercise logic here
let seconds=0;
let min=0;
let hours=0;
let timer;
let lapsSeconds=[];
let lapDiffs=[];

const lapDatas= document.createElement('div');
const elapsedTime=document.createElement('div');   
const buttons= document.createElement('div');

const startButton= document.createElement('button');
const stopButton= document.createElement('button');
const resetButton= document.createElement('button');
const lapButton= document.createElement('button');

startButton.innerText='start';
stopButton.innerText='stop';
resetButton.innerText='reset';
lapButton.innerText='lap';

buttons.appendChild(startButton);
buttons.appendChild(stopButton);
buttons.appendChild(resetButton);
buttons.appendChild(lapButton);


document.body.appendChild(elapsedTime);
document.body.appendChild(buttons);
document.body.appendChild(lapDatas);



const twoDigitFormat=(number)=>{
  if(number<10){
    return `0${number}`;
  }
  else{
    return number;
  }
}
const timeFormat=(h, m, s)=>{
  return `${twoDigitFormat(h)}:${twoDigitFormat(m)}:${twoDigitFormat(s)}`
}
const calHourMinSec=(sec)=>
{
  hours=Math.floor(sec/3600);
  min = Math.floor((sec-hours*3600)/60);
  let s= sec-hours*3600-min*60;   
  return [hours, min, s];
}

const startTimer=()=>{
    timer = setInterval(
    ()=>{
    [hours,min,sec]=calHourMinSec(seconds);
    elapsedTime.innerText= timeFormat(hours, min, sec);
    seconds++;
  }, 100);
}

const stopTimer=()=>{
  clearInterval(timer);
  elapsedTime.innerText= timeFormat(hours, min, sec);
}
const resetTimer=()=>{
  seconds=0;
  min=0;
  hours=0;
  lapsSeconds=[];
  lapDiffs=[];
  lapDatas.innerHTML='';
  startTimer();
}

const logLapData=()=>{

  lapsSeconds.unshift(seconds);
  let lapDiff = 0;
  if(lapsSeconds.length>1){
    lapDiff=lapsSeconds[0]-lapsSeconds[1];
   }
  lapDiffs.unshift(lapDiff);
  
  //redraw lap data
}
const updateLaps=()=>{
  lapDatas.innerHTML='';
  const oneLap=document.createElement('div'); 
  

  for(let i=0; i<lapsSeconds.length; i++){
    const lapHeader= document.createElement('h1');
    const lap=document.createElement('p');

    let hourDiff, hourMin, hourSec, hour, min, sec;
    const secDiff=lapDiffs[i];

    [hourDiff, hourMin, hourSec]= calHourMinSec(Math.abs(secDiff));
    let lapDiffString = secDiff >= 0 ? timeFormat(hourDiff, hourMin, hourSec): `-${timeFormat(hourDiff, hourMin, hourSec)}`;
    console.log(`${hourMin} ${hourSec}sec `);
     console.log(`${lapDiffString} diff `);

    lapHeader.innerText=`Lap: ${lapsSeconds.length-i}  Diff: ${lapDiffString}`;

    [hour, min, sec]= calHourMinSec(lapsSeconds[i]);
    lap.innerText=timeFormat(hour, min, sec);

    oneLap.appendChild(lapHeader);
    oneLap.appendChild(lap);
  }
  lapDatas.appendChild(oneLap);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', ()=>{
  logLapData();
  updateLaps();
});

elapsedTime.innerText= timeFormat(0, 0, 0);

