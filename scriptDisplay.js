const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];

  // exercise solution: include symbol. Same order as suit
  const symbol = ['♥', '♦', '♣', '♠'];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // exercise solution: Store the current suitSymbol in a variable
    const currentSuitSymbol = symbol[suitIndex];

    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    let suitColour = '';
    if (currentSuit == 'hearts' || currentSuit == 'diamonds') {
      suitColour = 'red';
    } else {
      suitColour = 'black';
    }
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // exercise solution : By default, the display name is the same as card name
      let cardDisplayName = `${cardName}`;
      // If cardName is ace, jack, queen, king, set displayName to a, j , q, k
      if (cardDisplayName === 'ace') {
        cardDisplayName = 'A';
      } else if (cardDisplayName === 'jack') {
        cardDisplayName = 'J';
      } else if (cardDisplayName === 'queen') {
        cardDisplayName = 'Q';
      } else if (cardDisplayName === 'king') {
        cardDisplayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        // exercise solution: add suitSymbol, displayName, colour
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: suitColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

const shuffleCards = function (cardDeck) {
  // Loop over the card deck array once for every card so every card position got shuffled once
  for (let cardIndex = 0; cardIndex < cardDeck.length; cardIndex += 1) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[cardIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[cardIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Create a visual card from sample card
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
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

// // build the container where all the timer elements will go in
// const timerContainer = document.createElement('div');

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
    // cardElement.classList.add('card');
    // cardElement.innerHTML = `${firstCard.name}<br>${firstCard.suitSymbol}`;
    // create card visually to show at clicked box
    cardDisplay = createCard(clickedCard);
    cardElement.appendChild(cardDisplay);

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
      // cardElement.classList.add('card');
      // cardElement.innerHTML = `${clickedCard.name}<br>${clickedCard.suitSymbol}`;
      // turn this card over
      // cardElement.innerText = clickedCard.name;
      // create card visually to show at clicked box
      cardDisplay = createCard(clickedCard);
      cardElement.appendChild(cardDisplay);
    } else {
      console.log('NOT a match');
      messageBoard.innerText = 'no match, try again';
      // cardElement.innerHTML = `${clickedCard.name}<br>${clickedCard.suitSymbol}`;
      // cardElement.classList.add('card');
      cardDisplay = createCard(clickedCard);
      cardElement.appendChild(cardDisplay);
      // turn both cards back over after 3 seconds
      // removing innerText and changing the css class back to square, returns it to it's original state
      setTimeout(() => {
        firstCardElement.innerText = '';
        firstCardElement.className = 'square';
        cardElement.innerText = '';
        cardElement.className = 'square';
      }, 1000);
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
  const boardElement = document.createElement('div'); // previously put as global

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
  let seconds = 20;
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
    seconds = 20;
    canStart = true;
    canClick = true;
    display.innerHTML = `${minutes} minutes ${seconds} seconds`;
    messageBoard.innerHTML = 'click start to begin';
  };

  // // build the container where all the timer elements will go in
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
  let randomIndex = getRandomIndex(104);
  console.log(`generated index`, randomIndex);
  if (randomIndex % 2 === 0) {
    randomIndex = randomIndex;
    console.log(`even index without fix`, randomIndex);
  } else {
    randomIndex = randomIndex + 1;
    console.log(`convert to even index`, randomIndex);
  }
  let lastCardIndex = randomIndex + boardSize * boardSize;
  console.log('lastCardIndex', lastCardIndex);
  let deckSubset = doubleDeck.slice(randomIndex, lastCardIndex);
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
