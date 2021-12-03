const init = () => {
// overall container
  document.body.appendChild(timerContainer);

  // container for lap data
  timerContainer.appendChild(lapData);
  timerContainer.appendChild(rightContainer);

  // container for elasped time
  rightContainer.appendChild(elaspedTime);

  startBtnContainer.appendChild(startBtn);
  startBtnContainer.appendChild(stopBtn);
  rightContainer.appendChild(startBtnContainer);

  resetBtnContainer.appendChild(resetBtn);
  resetBtnContainer.appendChild(lapBtn);
  rightContainer.appendChild(resetBtnContainer);

  // say which function to call *when* the user clicks the button
  startBtn.addEventListener('click', startTimer);
  stopBtn.addEventListener('click', stopTimer);
  resetBtn.addEventListener('click', resetTimer);
  lapBtn.addEventListener('click', lapCounter);
};

init();