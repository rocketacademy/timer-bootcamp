// This thing mainly uses JS to generate and add HTML elements, as opposed to directly creating HTML elements in the index file

// Global Variables
// boardSize has to be an even number
const boardSize = 4;
const board = [];
let firstCard = null;
let firstCardElement;
let deck;
const gameInfo = document.createElement("div");
gameInfo.id = "gameInfo";
gameInfo.classList.add("gluten");
let currentScore = 0;
const maxScore = boardSize * 2;
let canCLick = false;
// const gameTime = 180; // time in seconds
let timeLeft = 180;
let timeInterval;

const cardRankEmojiMap = {
  1: "🅰",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
  11: "👑👶",
  12: "👑👩",
  13: "👑👨",
};

const cardNameMap = {
  1: "A",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "J",
  12: "Q",
  13: "K",
};

// HTML Element Creation
// Win Message
const winMessage = document.createElement("div");
winMessage.id = "winMessage";
winMessage.classList.add("gluten", "winMessage");
winMessage.innerText = "You've Won!\nCongratulations!";
// i can't actually figure out how to make this look more like an annoying popup message
// but whatever

// Time Div
const timeSection = document.createElement("div");
timeSection.id - "timeSection";
timeSection.classList.add("timeSection");

// Timer Display
const timeDisplay = document.createElement("h1");
timeDisplay.id = "timeDisplay";
timeDisplay.classList.add("gluten", "timeDisplay");
timeDisplay.innerText = "3:00";
timeSection.appendChild(timeDisplay);

// Start Button
const startButton = document.createElement("button");
startButton.id = "startButton";
startButton.classList.add("gluten", "button");
startButton.innerText = "Start";
startButton.addEventListener("click", () => {
  startRound();
});
timeSection.appendChild(startButton);

// Reset Button
const resetButton = document.createElement("button");
resetButton.id = "resetButton";
resetButton.classList.add("gluten", "button");
resetButton.innerText = "Reset";
resetButton.addEventListener("click", () => {
  resetRound();
});
timeSection.appendChild(resetButton);

document.body.appendChild(timeSection);

const refreshTimer = function () {
  if (timeLeft > 0) {
    timeLeft -= 1;
    const secondsDisplay = ("0" + (timeLeft % 60)).slice(-2);
    const minutesDisplay = Math.floor(timeLeft / 60);

    document.getElementById(
      "timeDisplay"
    ).innerText = `${minutesDisplay}:${secondsDisplay}`;
  } else {
    document.getElementById(
      "gameInfo"
    ).innerText = `Time's UP!\nYou did not manage to match all the cards. Your score was ${currentScore}.\n\nReset the game to play again.`;
    canCLick = false;
    setInterval(() => {
      resetRound();
    });
  }
};

// Gameplay Logic
const squareClick = (cardElement, column, row) => {
  // console.log(cardElement);
  // console.log("FIRST CARD DOM ELEMENT", firstCard);
  // console.log("BOARD CLICKED CARD", board[column][row]);
  const clickedCard = board[column][row];

  // the user already clicked on this square
  if (cardElement.innerText !== "") {
    return;
  }

  // first turn
  if (firstCard === null) {
    firstCard = clickedCard;
    // turn this card over
    cardElement.innerText = firstCard.name;
    // hold onto this for later when it may not match
    firstCardElement = cardElement;
    canCLick = true;

    // second turn
  } else {
    if (
      clickedCard.name === firstCard.name &&
      clickedCard.suit === firstCard.suit
    ) {
      currentScore++;
      gameInfo.innerText = `A Match! Continue opening your cards.\nYour current score is ${currentScore}. `;
      setTimeout(() => {
        gameInfo.innerText = '"Pick a card, any (closed) card..."';
      }, 1000);
      cardElement.innerText = clickedCard.name;
      canCLick = true;
    } else {
      // show card to user for 1 second before turning over
      gameInfo.innerText =
        "Not a Match - Cards will be turned over again in 1 second!";
      cardElement.innerText = clickedCard.name;
      canCLick = false;
      setTimeout(() => {
        // turn both cards back over
        firstCardElement.innerText = "";
        cardElement.innerText = "";
        gameInfo.innerText = "Pick a card, any (closed) card...";
        canCLick = true;
      }, 1000);
    }
    // reset the first card
    firstCard = null;
  }

  if (currentScore == maxScore) {
    gameInfo.innerText = "Well done! You've completed the game.";
    document.body.appendChild(winMessage);
    setTimeout(() => {
      const elementsToRemove = document.getElementById("winMessage");
      elementsToRemove.remove();
      resetRound();
    }, 5000);
  }
};

const startRound = function () {
  canCLick = true;
  timeInterval = setInterval(() => {
    refreshTimer();
  }, 1000);
};

const resetRound = function () {
  firstCard = null;
  canCLick = false;

  board.length = 0;
  deck.length = 0;
  currentScore = 0;
  timeLeft = 180;
  clearInterval(timeInterval);
  document.getElementById("timeDisplay").innerText = "3:00";

  document.getElementById("boardElement").remove();
  initGame();
};

// Game Initialization Logic
// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (board) => {
  // create the element that everything will go inside of
  const boardElement = document.createElement("div");

  // give it a class for CSS purposes
  boardElement.classList.add("board");
  boardElement.id = "boardElement";

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
      square.classList.add("square", "gluten");

      // set the click event
      // eslint-disable-next-line
      square.addEventListener("click", (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        if (canCLick) {
          squareClick(event.currentTarget, i, j);
        }
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }

  return boardElement;
};

const makeDeck = function () {
  const cardDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    let rankCounter = 1;
    while (rankCounter <= 13) {
      const cardName = cardNameMap[rankCounter];
      const cardRankEmojiTemp = cardRankEmojiMap[rankCounter];

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardRankEmoji: cardRankEmojiTemp,
      };
      cardDeck.push(card);
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

const shuffleCards = function (array) {
  // based on Durstenfeld shuffle
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
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

  const boardEl = buildBoardElements(board);
  document.body.appendChild(boardEl);

  gameInfo.innerText = "Welcome to Match Game - Click Start to begin~";
  gameInfo.classList.add("game-info");
  document.body.appendChild(gameInfo);
};

// Main Function
initGame();
