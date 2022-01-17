// ----- GLOBAL VARIABLES -----------------------
const boardSize = 4;
const board = [];

let deck;
let firstCard = null;
let firstCardElement;

// For gameplay
let canClick = false;

// For stopwatch
let milliseconds = 0;
const delayInMilliseconds = 100; // 0.1 second
const maxMilliseconds = 180000; // 3 minutes (1 min = 60 000ms)
let stopwatchStarted = false;
let stopwatchRef;

const stopwatch = document.createElement('div');
const startBtn = document.createElement('button');
const stopBtn = document.createElement('button');
const resetBtn = document.createElement('button');

// For game information
const stopwatchContainer = document.createElement('div');
const gameRulesDiv = document.createElement('div');
const gameInfoContainer = document.createElement('div');
const gameInfo = document.createElement('div');
let timeoutMsgMatch;
let timeoutMsgNoMatch;
