// ----- GLOBAL VARIABLES -----------------------
const boardSize = 4;
const board = [];

let deck;
let firstCard = null;
let firstCardElement;

// For gameplay
let canClick = false;
// let gameCompleted = false;

// For stopwatch
let milliseconds = 0;
const delayInMilliseconds = 100; // 0.1 second
const maxMilliseconds = 60000; // 3 minutes (1 min = 60 000ms)
let stopwatchStarted = false;
let stopwatchRef;

const stopwatch = document.createElement('div');
const startBtn = document.createElement('button');
const stopBtn = document.createElement('button');
const resetBtn = document.createElement('button');

// For game information
const gameInfoContainer = document.createElement('div');
const gameInfo = document.createElement('div');
const stopwatchContainer = document.createElement('div');

// ----- HELPER FUNCTIONS -----------------------
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Create deck
const makeDeck = () => {
	const newDeck = [];
	const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];
	const cardName = [
		'A',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
	];
	const cardRank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

	// Loop over the suits array
	for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
		// Store the current suit in a variable
		const currentSuit = suits[suitIndex];

		for (let i = 0; i < 13; i += 1) {
			// Set suit color
			let suitColor = 'black';
			if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
				suitColor = 'red';
			}

			// Create a new card with the current name, suit, and rank
			const card = {
				name: cardName[i],
				suit: currentSuit,
				symbol: suitSymbols[suitIndex],
				color: suitColor,
				rank: cardRank[i],
			};

			// Add the new card to the deck
			newDeck.push(card);
			newDeck.push(card);
		}
	}

	// Return the completed card deck
	return newDeck;
};

// Shuffle cards
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

// Format open cards
const formatOpenCard = (cardDiv, card) => {
	cardDiv.innerText = `${card.name}${card.symbol}`;
	if (card.symbol === '♥️' || card.symbol === '♦️') {
		cardDiv.classList.add('red');
	}
	cardDiv.classList.add('open-card');
};

// Format stopwatch
const formatStopwatch = (ms) => {
	// Show min:sec
	// calculate minutes
	let min = Math.floor((ms / 1000 / 60) % 60);
	// calculate seconds
	let sec = Math.floor((ms / 1000) % 60);

	// add leading 0
	if (min < 10) {
		min = '0' + min;
	}
	if (sec < 10) {
		sec = '0' + sec;
	}
	return `${min}:${sec}`;
};

const startStopwatch = () => {
	canClick = true;
	startBtn.disabled = true;
	stopBtn.disabled = false;

	stopwatchRef = setInterval(() => {
		if (milliseconds >= maxMilliseconds) {
			clearInterval(stopwatchRef);
			updateGameInfo(`Time's up! You lose.`);
			canClick = false;
		}

		stopwatch.innerHTML = formatStopwatch(milliseconds);
		milliseconds += delayInMilliseconds;
	}, delayInMilliseconds);
};

const stopStopwatch = () => {
	clearInterval(stopwatchRef);
	updateGameInfo(
		`Congrats, you matched all the cards!<br>Refresh the page to play again.`
	);
	canClick = false;
	startBtn.disabled = false;
	stopBtn.disabled = true;
};

const resetStopwatch = () => {
	clearInterval(stopwatchRef);
	milliseconds = 0;
	stopwatch.innerHTML = formatStopwatch(milliseconds);
	startBtn.disabled = false;
	stopBtn.disabled = true;

	// Reset game
	board.length = 0;
	const bodyDivs = document.querySelectorAll('body > div');
	for (let i = 0; i < bodyDivs.length; i += 1) {
		document.body.removeChild(bodyDivs[i]);
	}
	initGame();
};

const areAllCardsOpen = () => {
	const numOfOpenCards = document.querySelectorAll('.open-card');
	if (numOfOpenCards.length === 16) {
		return true;
	}
	return false;
};

// ----- GAMEPLAY LOGIC -------------------------

// What happens when user clicks on a square
const openCard = (cardElement, row, column) => {
	// Store the clicked card
	const clickedCard = board[row][column];

	// If this card is already open (user has already clicked this square)
	// Or setTimeout is running
	if (cardElement.innerText !== '' || canClick === false) {
		return;
	}

	// First turn
	if (firstCard === null) {
		// Set the firstCard to the card that was clicked
		firstCard = clickedCard;

		// "Turn the card over" by showing the card name in the square
		formatOpenCard(cardElement, clickedCard);

		// Hold on to this first in case second card doesn't match
		firstCardElement = cardElement;

		// Update game info
		updateGameInfo(`Great, now find its match!`);
	}

	// Second turn
	else {
		canClick = false;

		// If it's a match
		if (
			clickedCard.name === firstCard.name &&
			clickedCard.suit === firstCard.suit
		) {
			// "Turn the card over" by showing the card name in the square

			formatOpenCard(cardElement, clickedCard);

			// Check if all cards are open
			if (areAllCardsOpen() === true) {
				stopStopwatch();
				return;
			}

			// If not all cards have been open, update game info
			else {
				updateGameInfo(`Noice, it's a match!`);
				if (milliseconds <= 2100) {
					setTimeout(() => {
						updateGameInfo(`Click a card to continue.`);
					}, 2000);
				}

				canClick = true;
			}
		}

		// If it's not a match
		else {
			// "Open cards" by showing the card name in the square and adding the relevant classes

			formatOpenCard(cardElement, clickedCard);

			// "Turn cards over" after a set time
			setTimeout(() => {
				// "Turn cards over" by removing card name in square
				cardElement.innerText = ``;
				firstCardElement.innerText = ``;

				cardElement.classList.remove('open-card', 'red', 'black');
				firstCardElement.classList.remove('open-card', 'red', 'black');

				if (milliseconds >= 2000) {
					updateGameInfo(`Click to open a card.`);
				}
				canClick = true;
			}, 1500);

			// Update game info
			updateGameInfo(`Sorry, those didn't match. Try again!`);
		}

		// Reset the cards
		firstCard = null;
	}
};

// ----- GAME INITIALISATION --------------------

// Create container for stopwatch
const createStopwatchContainer = () => {
	// Format the container
	stopwatchContainer.classList.add('stopwatch-container');
	stopwatchContainer.innerHTML = `<p>Time how long it takes for you to match all the cards. You can only flip cards over when the stopwatch is running.</p>`;
	document.body.appendChild(stopwatchContainer);

	// Format the stopwatch
	stopwatch.classList.add('stopwatch');
	stopwatch.innerHTML = formatStopwatch(milliseconds);
	stopwatchContainer.appendChild(stopwatch);

	// Format the buttons
	startBtn.innerText = 'Start';
	stopBtn.innerText = 'Stop';
	resetBtn.innerText = 'Reset';
	stopwatchContainer.appendChild(startBtn);
	stopwatchContainer.appendChild(stopBtn);
	stopwatchContainer.appendChild(resetBtn);

	stopBtn.disabled = true;

	// Add event listeners to buttons
	startBtn.addEventListener('click', startStopwatch);
	stopBtn.addEventListener('click', stopStopwatch);
	resetBtn.addEventListener('click', resetStopwatch);
};

// Create container for game info
const createGameInfoContainer = () => {
	gameInfoContainer.classList.add('game-info-container');
	gameInfo.classList.add('game-info');

	gameInfo.innerHTML = `Click on the squares to match cards.`;

	gameInfoContainer.appendChild(gameInfo);
	document.body.appendChild(gameInfoContainer);
};

const updateGameInfo = (msgText) => {
	gameInfo.innerHTML = msgText;
	gameInfoContainer.appendChild(gameInfo);
};

// Create container for board elements
const createBoardContainer = (board) => {
	// Create main container
	const boardContainer = document.createElement('div');
	boardContainer.classList.add('board-container');

	// Create the board grid with 2 loops ------
	// First for row and second for column
	for (let i = 0; i < board.length; i += 1) {
		// Create variable to hold cards in this row
		const row = board[i];

		// Create div for the row
		const rowDiv = document.createElement('div');
		rowDiv.classList.add('row');

		// Start second loop --------
		// to create the columns (cards / squares) in the row
		for (let j = 0; j < row.length; j += 1) {
			// Create the square (card)
			const square = document.createElement('div');
			square.classList.add('square');

			// Add event listener to the square
			square.addEventListener('click', (e) => {
				openCard(e.currentTarget, i, j);
			});

			// Append the square to the row
			rowDiv.appendChild(square);
		}

		// Append row to the board
		boardContainer.appendChild(rowDiv);
	}
	document.body.appendChild(boardContainer);
};

// Game initialisation
const initGame = () => {
	// Prepare the deck ----------
	// Create a deck with twice the number of cards
	let doubleDeck = makeDeck();

	// Select enough to make a smaller deck
	let deckSubset = doubleDeck.slice(0, boardSize * boardSize);

	// Shuffle the cards
	deck = shuffleCards(deckSubset);

	// Deal cards to the board data structure (nested array) -----
	for (let i = 0; i < boardSize; i += 1) {
		// Create the array for each row
		board.push([]);

		// Deal the cards per row
		for (let j = 0; j < boardSize; j += 1) {
			board[i].push(deck.pop());
		}
	}

	createStopwatchContainer();
	createGameInfoContainer();
	createBoardContainer(board);
};

initGame();
