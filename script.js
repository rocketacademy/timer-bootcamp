// GLOBAL
const boardSize = 4; // boardSize has to be an even number
const board = [];
const delayInMilliseconds = 3000; 
let firstCard = null;
let firstCardElement;
let deck;

// GAMEPLAY LOGIC
const squareClick = (cardElement, column, row) => {

    console.log(cardElement);
    
    console.log('FIRST CARD DOM ELEMENT', firstCard);
    
    console.log('BOARD CLICKED CARD', board[column][row]);
    
    const clickedCard = board[column][row];   
    
    
// OUTPUT MESSAGE

// MOVE LATER
let cardContainer;
cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);

    // the user already clicked on this square
    if( cardElement.innerText !== '' ){
        return;
    }

    // first turn
    if (firstCard === null) {
      console.log('first turn');
      console.log(firstCard);
      firstCard = clickedCard;
      cardElement.classList.add('card');
      
      // turn this card over      
      cardElement.innerHTML = `${firstCard.name}<br>${firstCard.suitSymbol}`;
       


      

      // ################ EDIT THIS LATER
      // const firstCardDisplay = createCard(firstCard)
      // div.square.appendChild(firstCardDisplay)
  
      // hold onto this for later when it may not match
      firstCardElement = cardElement;

    // second turn
    } else {
    
      console.log('second turn');
      if (
        clickedCard.name === firstCard.name &&
        clickedCard.suit === firstCard.suit
      ) {
        console.log('match');
        const messageBox = document.createElement('div');          
        document.body.appendChild(messageBox)
        
        messageBox.innerHTML = "matched! carry on to next pair"
        console.log(clickedCard,"clicked card")
        // turn this card over
        
        cardElement.innerHTML = `${clickedCard.name}<br>${clickedCard.suitSymbol}`;
        
        
      } else {
        console.log('NOT a match');
        
        messageBox = document.createElement('div');          
        document.body.appendChild(messageBox)
        messageBox.innerHTML = "not a match, try again in 3 seconds"
        
    
        // turn this card back over
        
         cardElement.innerHTML = `${clickedCard.name}<br>${clickedCard.suitSymbol}`;
        setTimeout(() => {firstCardElement.innerText = '';}, delayInMilliseconds);
        setTimeout(() => {cardElement.innerText = '';}, delayInMilliseconds);
        setTimeout(() => {messageBox.innerHTML = ""}, delayInMilliseconds);
        
      }

      // reset the first card
      firstCard = null;
    }
};

// GAME INIT

// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (board) => {
  // create the element that everything will go inside of
  const boardElement = document.createElement('div'); 

  // give it a class for CSS purposes
  boardElement.classList.add('board');
  
  //broke 
  // const messageBox = document.createElement('div');  
  // messageBox.innerHTML ="click on a square to begin"
  // document.body.appendChild(messageBox)

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
};

// MAKE NEW DECK
const makeDeck = (cardAmount) => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
       let cardSuitSymbol = ""; 
      let  suitColor = "";
      let  cardDisplayName = "";

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

      // Additional Info For DOM Elements (Shorter Names)
      if (cardName === '1') {
        cardDisplayName = 'A';
      } else if (cardName === '11') {
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardDisplayName = 'K';
      }

      // Additional Info For DOM Elements (Icon + Suit Color)
      if (currentSuit === 'hearts') {
        cardSuitSymbol = '♥';
        suitColor = 'red'
      } else if (currentSuit === 'diamonds') {
        cardSuitSymbol = '♦️';
        suitColor = 'red'
      } else if (currentSuit === 'clubs') {
        cardSuitSymbol = '♣';
        suitColor = 'black'
      } else if (currentSuit === 'spades') {
        cardSuitSymbol = '♠';
        suitColor = 'black'
      }

      // make a single card object variable
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: cardSuitSymbol,     
        displayName: cardDisplayName,
        colour: suitColor,      
      };    

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(cardInfo); // add double the cards to the deck
      newDeck.push(cardInfo);
    }
  }

  return newDeck;
};

// SHUFFLE DECK
const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

 // CREATE CARD DISPLAY    

   const createCard = (cardInfo) => {
    console.log(cardInfo)
    const suit = document.createElement('div');
    suit.classList.add('suit');
    suit.innerText = cardInfo.suitSymbol;

    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = cardInfo.rank;

    const card = document.createElement('div');
    card.classList.add('card');

    card.appendChild(name);
    card.appendChild(suit);

    console.log (cardInfo.suitSymbol)
  return card;
  
};

// const output = (message) => {
//   messageBox.innerHTML = message;
// };




initGame()





let milliseconds = 60;





// let timerMode = "default"
// let milliseconds = 5000;
// const timerDelay = 1000;

//LAP
// const lapDataSquare = document.createElement('div')
// document.body.appendChild(lapDataSquare);

//TIMER
// const timerDisplay = document.createElement('div');
// document.body.appendChild(timerDisplay);

//BUTTONS

let timerMode = "start"

const startGame = () => {

const resetTimer = setInterval(() => {
  timerDisplay.innerText = "Time Left: " + milliseconds;

if (timerMode === "stop"){
clearInterval(resetTimer)
}


 if (milliseconds <= 0){
   timerDisplay.innerText = "Time Is Up, Restarting in 3 Seconds";
    setTimeout(() => {location.reload();}, 3000);
 }

 milliseconds -= 1;
    }, 1000);
    
}

const timerDisplay = document.createElement('div');
document.body.appendChild(timerDisplay);

const startButton = document.createElement('button')
startButton.innerText = "Start"
startButton.addEventListener ('click', startGame)
document.body.appendChild(startButton);





const stopTimer = () => {
  timerMode = "stop"
  let stopTime = milliseconds
  timerDisplay.innerText = milliseconds
  
}


const stopButton = document.createElement('button')
stopButton.innerText = "Stop"
stopButton.addEventListener ('click', stopTimer)
document.body.appendChild(stopButton);


const displayLap = () =>{
const lap = document.createElement('div')
const currentLap = milliseconds
lap.innerText = currentLap
document.body.appendChild(lap)
}

const lapButton = document.createElement('button')
lapButton.innerText = "Lap"
lapButton.addEventListener ('click', displayLap)
document.body.appendChild(lapButton);

const resetGame = () => {
  timerMode = "start"
  board.length = 0  
  deck.length = 0
  const allSquares = document.querySelectorAll('.square')  
  for (let i = 0; i < allSquares.length; i += 1) {
    allSquares[i].innerHTML = ""
  }

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
    milliseconds = 60;


}

const resetButton = document.createElement('button')
resetButton.innerText = "Reset"
resetButton.addEventListener ('click', resetGame)
document.body.appendChild(resetButton);