// Please implement exercise logic here
/* ####################
## HELPER FUNCTIONS ##
#################### */
const makeDeck = (cardAmount) => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
    } else {
      currentSymbol = '♦️';
    }

    // set the color of the card (used later to determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // make a single card object variable
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
      };

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(cardInfo); // add double the cardInfos to the deck
      newDeck.push(cardInfo);
    }
  }

  return newDeck;
};

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

/* #######################
## GLOBAL VARIABLES #####
####################### */
// boardSize has to be an even number
const boardSize = 4;
const board = [];
let firstCard = null;
let firstCardElement;
let deck;
// this is used in the timer component, where canClick = true when the user click on the start button,
// starting the game
let canClick = false;

/* ###########################
## PLAYER ACTION CALLBACKS ##
########################### */
const squareClick = (messageBoard, cardElement, column, row) => {
  console.log(cardElement);
  console.log('FIRST CARD DOM ELEMENT', firstCard);
  console.log('BOARD CLICKED CARD', board[column][row]);
  const clickedCard = board[column][row];
  if (canClick === false) {
    return;
  }

  // the user already clicked on this square
  if (cardElement.innerText !== '') {
    return;
  }

  // first turn
  if (firstCard === null) {
    console.log('first turn');
    firstCard = clickedCard;
    // turn this card over
    cardElement.classList.add('card');
    cardElement.innerHTML = `${firstCard.name}<br>${firstCard.suitSymbol}`;
    messageBoard.innerText = 'click on another square';
    // hold onto this for later when it may not match
    firstCardElement = cardElement;

    // second turn
  } else {
    console.log('second turn');
    // condition is met, first card matches second card
    if (
      clickedCard.name === firstCard.name &&
      clickedCard.suit === firstCard.suit
    ) {
      console.log('match');
      // display match message
      messageBoard.innerText = "it's a match!";
      // apply css class and card's name and suit to cardElement so that it looks like the card has been turned over
      cardElement.classList.add('card');
      cardElement.innerHTML = `${clickedCard.name}<br>${clickedCard.suitSymbol}`;
    } else {
      console.log('NOT a match');
      messageBoard.innerText = 'no match, try again';
      cardElement.innerHTML = `${clickedCard.name}<br>${clickedCard.suitSymbol}`;
      cardElement.classList.add('card');

      // turn both cards back over after 3 seconds
      // removing innerText and changing the css class back to square, returns it to it's original state
      setTimeout(() => {
        firstCardElement.innerText = '';
        firstCardElement.className = 'square';
        cardElement.innerText = '';
        cardElement.className = 'square';
      }, 3000);
    }

    // reset the first card
    firstCard = null;
  }
};

/* ########################
## GAME INITIALISATION ###
######################## */
// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (messageBoard, board) => {
  // create the element that everything will go inside of
  const boardElement = document.createElement('div');

  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // use the board data structure we passed in to create the correct size board
  for (let i = 0; i < board.length; i += 1) {
    // make a var for just this row of cards
    const row = board[i];

    // make an element for this row of cards
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // make all the squares for this row
    for (let j = 0; j < row.length; j += 1) {
      // create the square element
      const square = document.createElement('div');

      // set a class for CSS purposes
      square.classList.add('square');

      // set the click event
      // eslint-disable-next-line
      square.addEventListener('click', (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        squareClick(messageBoard, event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }
  return boardElement;
};

const buildTimerElements = (messageBoard) => {
  let ref;
  let minutes = 0;
  let seconds = 10;
  let canStart = true;

  const startTimer = () => {
    const delayInMilliseconds = 1000;
    if (canStart === false) {
      return;
    }
    messageBoard.innerText = 'click on a square';
    // enabling the squares to be clicked here
    canClick = true;

    ref = setInterval(() => {
      display.innerHTML = `${minutes} minutes ${seconds} seconds`;
      if (seconds === 0) {
        minutes -= 1;
        seconds = 60;
      }

      if (minutes < 0) {
        clearInterval(ref);
        canStart = true;
        canClick = false;
        messageBoard.innerHTML = 'Times up! click the reset button to restart';
      }

      seconds -= 1;
    }, delayInMilliseconds);

    // this is to prevent user from clicking on the start button multiple times
    canStart = false;
  };

  const stopTimer = () => {
    clearInterval(ref);
    canStart = true;
    // prevents user from clicking on the squares when timer is paused
    canClick = false;
    messageBoard.innerText = 'click start to resume game';
  };

  const resetTimer = () => {
    minutes = 0;
    seconds = 10;
    canStart = true;
    canClick = true;
    display.innerHTML = `${minutes} minutes ${seconds} seconds`;
    messageBoard.innerHTML = 'click start to begin';
  };

  // build the container where all the timer elements will go in
  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer-container');

  // the timer's display and the container which it will go in
  const timerTop = document.createElement('div');
  timerContainer.appendChild(timerTop);
  const display = document.createElement('div');
  display.classList.add('timer-display');
  display.innerHTML = `${minutes} minutes ${seconds} seconds`;
  timerTop.appendChild(display);

  // the timer's buttons and the container which it will go in
  const timerBottom = document.createElement('div');
  timerContainer.appendChild(timerBottom);
  const startButton = document.createElement('button');
  startButton.classList.add('btn');
  startButton.innerText = 'START';
  // start button functionality to be initialised here
  startButton.addEventListener('click', startTimer);
  timerBottom.appendChild(startButton);
  const stopButton = document.createElement('button');
  stopButton.classList.add('btn');
  stopButton.innerText = 'STOP';
  // stop button functionality to be initialised here
  stopButton.addEventListener('click', stopTimer);
  timerBottom.appendChild(stopButton);
  const resetButton = document.createElement('button');
  resetButton.classList.add('btn');
  resetButton.innerText = 'RESET';
  // reset button functionality to be initialised here
  resetButton.addEventListener('click', resetTimer);
  timerBottom.appendChild(resetButton);

  return timerContainer;
};

const initGame = () => {
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  const doubleDeck = makeDeck();
  const deckSubset = doubleDeck.slice(0, boardSize * boardSize);
  deck = shuffleCards(deckSubset);

  // deal the cards out to the board data structure
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push(deck.pop());
    }
  }

  // create the div where messages will be shown to the user
  const messageBoard = document.createElement('div');
  messageBoard.classList.add('messages');
  messageBoard.innerText = 'click start to begin';
  document.body.appendChild(messageBoard);

  // messageBoard is passed into builBoardElements and buildTimerElements
  // so that it can be accessed within those functions
  const boardEl = buildBoardElements(messageBoard, board);
  document.body.appendChild(boardEl);

  const timerEl = buildTimerElements(messageBoard);
  document.body.appendChild(timerEl);
};

// #########################################
// initialise game by calling initGame function
initGame();
