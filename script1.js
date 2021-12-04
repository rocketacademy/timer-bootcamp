// Please implement exercise logic here
// Please implement exercise logic here
const grid = [
  ['A', 'B'],
  ['Y', 'Z'],
];

const upperLeftPosition = grid[0][0]; // 'A'
const upperRightPosition = grid[0][1]; // 'B'
const lowerLeftPosition = grid[1][0]; // 'Y'
const lowerRightPosition = grid[1][1]; // 'Z'

// Header to put in Player name
// const intro = document.createTextNode(' Welcome to Match Card Game. ');
// document.body.appendChild(intro);
// const gamerName = document.createElement('input');
// gamerName.setAttribute('type', 'text');
// gamerName.setAttribute('name', 'username');
// gamerName.setAttribute('placeholder', "Put in Gamer's name");
// document.body.appendChild(gamerName);

const boardSize = 4;
let board = [];
let firstCard = null;
let firstCardElement;
let deck;
let wins = 0;
// this is used in the timer component, where canClick = true when the user click on the start button,
// starting the game
let canClick = false;
// create the element that everything will go inside of
const boardElement = document.createElement('div');
// delay or sleep function
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const announcement = document.createElement('h2');
document.body.appendChild(announcement);

// Timer to count dowm
// const clockTimer = document.createTextNode('CountDown Timer:');
// const clockSpace = document.createElement('div')
// document.body.appendChild(clockSpace);
// const clockTimer = document.createElement('label');
// clockTimer.innerHTML = "CountDown "
// clockSpace.appendChild(clockTimer);
// const clockWords = document.createTextNode(' CountDown : ');
const clockWords = document.createElement('div');
clockWords.innerText = 'CountDown';
document.body.appendChild(clockWords);
const clock = document.createElement('h3');
document.body.appendChild(clock);
// clockTimer.clockSpace.insertBefore(clock, clockTimer.nextSibling);
clock.innerText = '';

const congrats = document.createElement('h2');
document.body.appendChild(congrats);

// Reset Game Button
const resetbutton = document.createElement('button');
resetbutton.innerText = 'reset game';
// resetbutton.type = "reset"
resetbutton.onclick = function () {
  // existingBoard.innerHTML = '';
  // existingBoard = null;
  // board = [];
  gamerName.value = '';
  congrats.innerText = '';

  initGame();
  // return counter
};
document.body.appendChild(resetbutton);

// Gameplay Logic
const squareClick = async (cardElement, column, row) => {
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
    cardElement.innerText = firstCard.name;
    // create card visually to show at clicked box
    cardDisplay = createCard(clickedCard);
    cardElement.appendChild(cardDisplay);

    // hold onto this for later when it may not match
    firstCardElement = cardElement;

    console.log(`firstCardElement`, firstCardElement);

    // second turn
  } else {
    console.log('second turn');
    if (
      clickedCard.name === firstCard.name &&
      clickedCard.suit === firstCard.suit
    ) {
      console.log('match');
      announcement.innerText = 'There is a match.';
      setTimeout(() => {
        // remove announcement
        announcement.innerText = '';
      }, 2000);

      // turn this card over
      cardElement.innerText = clickedCard.name;
      // create card visually to show at clicked box
      cardDisplay = createCard(clickedCard);
      cardElement.appendChild(cardDisplay);
      wins += 1;
      if (wins === (boardSize * boardSize) / 2) {
        congrats.innerText = 'Congratulations ' + gamerName.value;
        counter = '';
        clockWords.innerText = '';
      }
      // else if () {
      //   congrats.innerText = 'Sorry ' + gamerName.value + " Game over";
      // }
    } else {
      console.log('NOT a match');

      // turn this card over
      cardElement.innerText = clickedCard.name;
      // create card visually to show at clicked box
      cardDisplay = createCard(clickedCard);
      cardElement.appendChild(cardDisplay);
      // cardElement.innerHTML = createCard(clickedCard);

      // delay time to turn over the 2 exposed wrong cards
      setTimeout(() => {
        // turn this card back over
        firstCardElement.innerText = '';
        cardElement.innerText = '';
      }, 800);

      // await sleep(1000);

      // // turn this card back over
      // firstCardElement.innerText = '';
      // cardElement.innerText = '';
    }

    // reset the first card
    firstCard = null;
  }
};

console.log('starting...');

const delayInMilliseconds = 180000; // 3 mins to complete
let counter = delayInMilliseconds;

const ref = setInterval(() => {
  clock.innerText = counter;
  counter -= 1;

  if (counter === -1) {
    clearInterval(ref);
    announcement.innerText = 'stop playing. game over';
    boardElement.innerText = '';
  }
}, 1);

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

// Game Initialisation Logic
// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (board) => {
  // // create the element that everything will go inside of
  // const boardElement = document.createElement('div');

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
        squareClick(event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }

  return boardElement;
};

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
  let existingBoard = document.querySelector('#game-board');
  // to reset the board to empty
  if (existingBoard) {
    existingBoard.innerHTML = '';
    existingBoard = null;
    board = [];
  }
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  let doubleDeck = makeDeck();
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
      // console.log(deck.pop())
    }
  }

  const boardEl = buildBoardElements(board);
  boardEl.id = 'game-board';

  document.body.appendChild(boardEl);
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

initGame();
