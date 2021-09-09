/*GLOBAL VARIABLES*/
// boardSize has to be an even number
const boardSize = 2;
let board = [];
let firstCard = null;
let firstCardElement;
let deck;
let isNewRound = true;
let userName = "";
let boardEl;
let milliSecs = 0;
let isStopPressed = false;

const resetGame = () => {
  firstCard = null;
  isNewRound = true;
  userName = "";
  milliseconds = 60 * 3 * 1;
  boardEl.class = "board";
  document.querySelector(".board").remove();
  board = [];
  boardEl.innerHTML = "";
  initGame();
  elementReset.innerHTML = "";
  elementReset.appendChild(resetButton);
};

//create element that displays the state of game
const stateElement = document.createElement("p");

//create input field for user name
const inputField = document.createElement("input");
document.body.appendChild(inputField);

//create submit button for user name
const submitButton = document.createElement("button");
submitButton.innerText = "submit your name";
submitButton.addEventListener("click", () => {
  userName = inputField.value;
  stateElement.innerText = `Welcome ${userName}! You have 3 minutes to match all cards, your time starts once your click your first card!`;
});

document.body.appendChild(submitButton);

//create timer element
const timer = document.createElement("p");

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let currentSuitIcon;

    if (currentSuit === "hearts") {
      currentSuitIcon = "♥️";
    } else if (currentSuit === "diamonds") {
      currentSuitIcon = "♦️";
    } else if (currentSuit === "clubs") {
      currentSuitIcon = "♣️";
    } else if (currentSuit === "spades") {
      currentSuitIcon = "♠️";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitIcon: currentSuitIcon,
      };

      // Add the new card to the deck
      newDeck.push(card); // add double the cards to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/*GAMEPLAY LOGIC*/
const squareClick = (cardElement, column, row) => {
  //start the timer only when it is new round
  if (isNewRound) {
    displayTimer();

    //remove all board elements once 3 mins is up
    setTimeout(
      () =>
        (boardEl.innerText =
          "Oh no, 3 mins is up! You didnt complete the game in time :("),
      1000 * 3 * 60
    );

    isNewRound = false;
  }

  console.log(cardElement);

  console.log("FIRST CARD DOM ELEMENT", firstCard);

  console.log("BOARD CLICKED CARD", board[column][row]);

  const clickedCard = board[column][row];

  // the user already clicked on this square
  if (cardElement.innerText !== "") {
    return;
  }

  // first turn
  if (firstCard === null) {
    console.log("first turn");
    stateElement.innerText =
      "You clicked your first card. Please click your second card.";
    firstCard = clickedCard;
    // turn this card over
    cardElement.innerText = `${firstCard.name} ${firstCard.suitIcon}`;

    // hold onto this for later when it may not match
    firstCardElement = cardElement;

    // second turn
  } else {
    console.log("second turn");
    stateElement.innerText = "You clicked your second card.";
    if (
      clickedCard.name === firstCard.name &&
      clickedCard.suit === firstCard.suit
    ) {
      console.log("match");

      stateElement.innerText =
        "You clicked your second card. Yay, it was a match!";

      //Remove the match message after 3 seconds
      setTimeout(() => {
        stateElement.innerText = "Click another card to start matching again.";
      }, 1000);

      // turn this card over
      cardElement.innerText = `${clickedCard.name} ${clickedCard.suitIcon}`;
    } else {
      console.log("NOT a match");
      stateElement.innerText +=
        " Oh no, it was not a match! Click another card to restart the matching.";

      //show both cards first
      firstCardElement.innerText = `${firstCard.name} ${firstCard.suitIcon}`;
      cardElement.innerText = `${clickedCard.name} ${clickedCard.suitIcon}`;

      //show cards for only 1 second, then turn both cards over
      setTimeout(() => {
        firstCardElement.innerText = "";
        cardElement.innerText = "";
      }, 1000);
    }

    // reset the first card
    firstCard = null;
  }
};

// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (board) => {
  // create the element that everything will go inside of
  const boardElement = document.createElement("div");

  // give it a class for CSS purposes
  boardElement.classList.add("board");

  boardElement.appendChild(stateElement);
  boardElement.appendChild(timer);

  // use the board data structure we passed in to create the correct size board
  for (let i = 0; i < board.length; i += 1) {
    // make a var for just this row of cards
    const row = board[i];

    // make an element for this row of cards
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // make all the squares for this row
    for (let j = 0; j < row.length; j += 1) {
      // create the square element
      const square = document.createElement("div");

      // set a class for CSS purposes
      square.classList.add("square");

      // set the click event
      // eslint-disable-next-line
      square.addEventListener("click", (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        squareClick(event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }

  return boardElement;
};

let milliseconds = 1 * 3 * 60;

//display the Timer
const displayTimer = () => {
  timer.innerText = `${milliseconds} seconds`;
  let delayInMilliseconds = 1000;
  const ref = setInterval(() => {
    timer.innerText = `${milliseconds} seconds`;

    if (milliseconds <= 0) {
      clearInterval(ref);
    }

    milliseconds -= 1;
  }, delayInMilliseconds);
};

const initGame = () => {
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  let doubleDeck = makeDeck();
  let deckSubset = doubleDeck.slice(0, boardSize * boardSize);
  deck = shuffleCards(deckSubset);

  // deal the cards out to the board data structure
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push(deck.pop());
    }
  }

  boardEl = buildBoardElements(board);
  document.body.appendChild(boardEl);
};

initGame();

//create reset Button
const resetButton = document.createElement("button");
resetButton.innerText = "Reset Game";
resetButton.addEventListener("click", resetGame);
resetButton.class = "reset";

//create element for reset button
const elementReset = document.createElement("div");
elementReset.appendChild(resetButton);
document.body.appendChild(elementReset);

//function to display stopwatch time in hour, mins, sec
const displayHMS = (millSecs) => {
  const timeSecs = millSecs / 1000;
  let minutes = Math.floor(timeSecs / 60);
  const seconds = timeSecs % 60;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;
  const padSeconds = String(seconds).padStart(2, 0);
  const padMinutes = String(minutes).padStart(2, 0);
  const padHours = String(hours).padStart(2, 0);
  return `${padHours}:${padMinutes}:${padSeconds}`;
};

//funtion to control the elapsed time
const runStopWatch = () => {
  const stopwatchCount = setInterval(() => {
    stopwatchTime.innerHTML = `${displayHMS(milliSecs)}`;
    if (isStopPressed) {
      clearInterval(stopwatchCount);
      milliSecs -= 1000;
    }
    milliSecs += 1000;
  }, 1000);
};

//create Stopwatch elements
const stopwatchTime = document.createElement("div");
stopwatchTime.innerHTML = "00:00:00";
stopwatchTime.classList.add("elapsedTime");
document.body.appendChild(stopwatchTime);

const stopwatchButtons1 = document.createElement("div");
const stopwatchButtons2 = document.createElement("div");

const stopwatchStart = document.createElement("button");
stopwatchStart.innerHTML = "START";
stopwatchButtons1.appendChild(stopwatchStart);
stopwatchStart.classList.add("stopwatchButton");
stopwatchStart.addEventListener("click", runStopWatch);

const stopwatchStop = document.createElement("button");
stopwatchStop.innerHTML = "STOP";
stopwatchButtons1.appendChild(stopwatchStop);
stopwatchStop.classList.add("stopwatchButton");
stopwatchStop.addEventListener("click", () => {
  isStopPressed = true;
  runStopWatch();
});

const stopwatchReset = document.createElement("button");
stopwatchReset.innerHTML = "RESET";
stopwatchButtons2.appendChild(stopwatchReset);
stopwatchReset.classList.add("stopwatchButton");
stopwatchReset.addEventListener("click", () => {
  milliSecs = 0;
  isStopPressed = true;
  runStopWatch();
});

const displayLapDiv = document.createElement("div");
document.body.appendChild(displayLapDiv);

const stopwatchLap = document.createElement("button");
stopwatchLap.innerHTML = "LAP";
stopwatchButtons2.appendChild(stopwatchLap);
stopwatchLap.classList.add("stopwatchButton");
stopwatchLap.addEventListener("click", () => {
  const displayLap = document.createElement("p");
  displayLap.innerHTML = `${displayHMS(milliSecs)}`;
  displayLap.classList.add("lapTimes");
  displayLapDiv.appendChild(displayLap);
});

document.body.appendChild(displayLapDiv);
document.body.appendChild(stopwatchButtons1);
document.body.appendChild(stopwatchButtons2);
