// <------- CREATE ELEMENTS ----------->
const stopwatchContainer = document.createElement('div');
stopwatchContainer.className = 'wrapper';
document.body.appendChild(stopwatchContainer);

const lapDataBox = document.createElement('div');
lapDataBox.className = 'lapdatabox';
stopwatchContainer.appendChild(lapDataBox);

const rightColumn = document.createElement('div');
rightColumn.className = 'rightcolumn';
stopwatchContainer.appendChild(rightColumn);

const elapsedTimeBox = document.createElement('div');
elapsedTimeBox.className = 'elapsedtimebox';
rightColumn.appendChild(elapsedTimeBox);

const buttonRowOne = document.createElement('div');
buttonRowOne.className = 'buttonrow';
rightColumn.appendChild(buttonRowOne);

const startButton = document.createElement('button');
startButton.className = 'button';
startButton.innerText = 'Start';
buttonRowOne.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.className = 'button';
stopButton.innerText = 'Stop';
buttonRowOne.appendChild(stopButton);

const buttonRowTwo = document.createElement('div');
buttonRowTwo.className = 'buttonrow';
rightColumn.appendChild(buttonRowTwo);

const resetButton = document.createElement('button');
resetButton.className = 'button';
resetButton.innerText = 'Reset';
buttonRowTwo.appendChild(resetButton);

const lapButton = document.createElement('button');
lapButton.className = 'button';
lapButton.innerText = 'Lap';
buttonRowTwo.appendChild(lapButton);
