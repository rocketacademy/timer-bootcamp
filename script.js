// Please implement exercise logic here

// Notes:
// # to indicate for Base exercises

// # Base: Match Game Stopwatch
// 1. Use buildBoard function to create the boards first
// 2. Build and test the stopwatch in stages
// 2.1 counts up seconds, minutes and hours
// 2.2 stopwatch can be stopped

// ===================================================
//  Global Variables
// ===================================================

// boardSize has to be an even number
const boardSize = 4;
const board = [];
// let messageBoard;
let firstCard = null;
let firstCardElement;
let deck;
let secondCard;
let secondCardElement;
let userName = '';
const boardElement = document.createElement('div');

// ===================================================
//  Gameplay Logic
// ===================================================

const squareClick = (messageBoard, cardElement, column, row) => {
  console.log(cardElement);

  console.log('FIRST CARD DOM ELEMENT', firstCard);

  console.log('BOARD CLICKED CARD', board[column][row]);

  // console.log to show the column and row

  console.log(column);
  console.log(row);

  const clickedCard = board[column][row];
  console.log(userName);

  // create default messages for messageBoard when its a match
  // messageBoard.innerText = 'Its a match!';
  // console.log(messageBoard.innerText);

  // the user already clicked on this square
  if (cardElement.innerText !== '') {
    return;
  }

  // first turn
  if (firstCard === null) {
    console.log('first turn');
    firstCard = clickedCard;

    // turn this card over
    // !!! reference codes to add both suitSymbol and displayName details
    cardElement.classList.add('card');
    cardElement.innerHTML = `${firstCard.suitSymbol}<br>${firstCard.displayName}`;
    // cardElement.innerText = firstCard.name;

    // hold onto this for later when it may not match
    firstCardElement = cardElement;
    // !!! display message when user open the first card
    messageBoard.innerText = `You opened ${firstCard.displayName} of ${firstCard.suitSymbol}. Click on another card and see if it matches!`;

    // second turn
  } else {
    console.log('second turn');
    if (
      // clickedCard here refers to the second card clicked
      clickedCard.name === firstCard.name &&
      clickedCard.suit === firstCard.suit
    ) {
      console.log('match');
      console.log(clickedCard);
      console.log(firstCard);

      // !!! reference codes to add cardDisplay details
      cardElement.innerHTML = `${clickedCard.suitSymbol}<BR>${clickedCard.displayName}`;
      // !!! display message when user open the second card
      messageBoard.innerText = `You opened ${clickedCard.displayName} of ${clickedCard.suitSymbol}. Click on another card and see if it matches!`;

      // display match meesage
      messageBoard.innerText = 'Congrats! Its a match!';

      //  add setTimeout to display the match message and disappear after 3s
      setTimeout(() => {
        messageBoard.innerText = '';
      }, 3000);

      // turn this card over
      cardElement.innerText = clickedCard.name;
    } else {
      secondCard = clickedCard;
      cardElement.innerText = secondCard.name;
      secondCardElement = cardElement;
      console.log('NOT a match');

      // !!! reference codes to add cardDisplay details
      cardElement.innerHTML = `${clickedCard.suitSymbol}<BR>${clickedCard.displayName}`;
      //  display not-match meesage
      messageBoard.innerText = 'Sorry! Its not a match!';

      // add setTimeout function to turn both cards over when they are not a match
      setTimeout(() => {
        // both functions inside setTimeout are to turn the cards back over
        firstCardElement.innerText = '';
        secondCardElement.innerText = '';
        // no-match message to disappear after 3s
        messageBoard.innerText = '';
      }, 3000);
      // reset the first card
      firstCard = null;
    }
  }
};

// ===================================================
//  Helper Functions
// ===================================================

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

// ===================================================
//  New Make Deck
// ===================================================

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥', '♦️', '♣', '♠'];
  const suitColours = ['red', 'red', 'black', 'black'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);
    const currentSuitSymbol = suitSymbols[suitIndex];
    const currentColour = suitColours[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;
      // following code will keep display heart suits
      // let suitSymbol = `${currentSuitSymbol}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        colour: currentColour,
        displayName,
        suitSymbol: currentSuitSymbol,
      };

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card); // add double the cards to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

// ===================================================
//  Game Initialisation Logic
// ===================================================

// create all the board elements that will go on the screen
// return the built board
//  for comfortable qns > create a messageboard element
const buildBoardElements = (board) => {
  // create the boardElement that everything will go inside of
  const boardElement = document.createElement('div');

  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // //  create a element for player to enter the name
  // const inputMessage = document.createElement('box');
  // inputMessage.classList.add('input');
  // inputMessage.innerText = 'Please enter your name: ';
  // boardElement.appendChild(inputMessage);

  // //  create an input box for userName
  // const userName = document.createElement('input');
  // userName.classList.add('name');
  // boardElement.appendChild(userName);

  // //  create a button to store the userName
  // // user input the name and press the button to store the name into the userName global variable
  // const storeNameBtn = document.createElement('button');
  // storeNameBtn.innerText = 'Submit';
  // boardElement.appendChild(storeNameBtn);
  // // add eventListener to store the name when button is clicked

  //  create a messageboard element
  const messageBoard = document.createElement('div');
  messageBoard.classList.add('messageBoard');
  messageBoard.innerText =
    'Click on the boxes to play the game. You have 3 minutes for the game!';
  boardElement.appendChild(messageBoard);

  // === # Time functions!

  // startTimer function

  // create a 3 minutes timer element
  let milliseconds = 1800000;
  const delayInMilliseconds = 1000;
  const output = document.createElement('div');
  output.innerText = milliseconds;
  boardElement.appendChild(output);

  // use the timer functions
  const ref = setInterval(() => {
    output.innerText = milliseconds;

    if (milliseconds === 0) {
      // remove all the boxes when time is up
      boardElement.innerText = '';
      clearInterval(ref);
      output.innerText = 'Time is Up!';
    }
    milliseconds -= 1;
  }, delayInMilliseconds);

  // # create timerElement where all the timer related elements will go inside
  const timerElement = document.createElement('div');
  // # give it a class for CSS purposes
  timerElement.classList.add('timer');

  // create a lap data element
  const lapDataBoard = document.createElement('div');
  // give it a class for CSS purposes
  lapDataBoard.classList.add('lapData');
  lapDataBoard.innerText = 'Lap Data';
  timerElement.appendChild(lapDataBoard);

  // create Elapsed Time element
  const elapTimeBoard = document.createElement('div');
  elapTimeBoard.classList.add('elapTime');
  const timerBoard = document.createElement('div');
  // create a timerBoard to show the minutes and seconds on the timer
  timerBoard.classList.add('timer-board');
  timerBoard.innerText = 'Elapsed Time';
  elapTimeBoard.appendChild(timerBoard);
  timerElement.appendChild(elapTimeBoard);

  // create start, stop, reset, lap elements
  const startButton = document.createElement('button');
  startButton.classList.add('btn');
  startButton.innerText = 'Start';
  // need to create a startTimer function
  // startButton.addEventListener('click', startTimer);
  // create an internal div
  timerElement.appendChild(startButton);

  // stop element
  const stopButton = document.createElement('button');
  stopButton.classList.add('btn');
  stopButton.innerText = 'Stop';
  // need to create a stopTimer function
  stopButton.addEventListener('click', stopButton);
  timerElement.appendChild(stopButton);

  // reset element
  const resetButton = document.createElement('button');
  resetButton.classList.add('btn');
  resetButton.innerText = 'Reset';
  // need tp create a resetTimer function
  // resetButton.addEventListener('click', resetTimer);
  timerElement.appendChild(resetButton);

  // lap element
  const lapBoard = document.createElement('button');
  lapBoard.classList.add('btn');
  lapBoard.innerText = 'Lap';
  timerElement.appendChild(lapBoard);

  // append the timerElement into the boardElement
  boardElement.appendChild(timerElement);

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

        // ~~~ .currentTarget refers to the particular element
        // box at the moment out of the entire 16 element boxes
        squareClick(messageBoard, event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }
  return boardElement;
};

// ===================================================
//  Initiate the game
// ===================================================
const initGame = () => {
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  const doubleDeck = makeDeck();

  // to get 16 cards (boardSize * boardSize) out of the deck
  const deckSubset = doubleDeck.slice(0, boardSize * boardSize);
  deck = shuffleCards(deckSubset);

  // deal the cards out to the board data structure
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push(deck.pop());
    }
  }

  const boardEl = buildBoardElements(board);

  document.body.appendChild(boardEl);
};

// initiate the gameplay
initGame();

// ===================================================
//  Main Functions
// ===================================================
