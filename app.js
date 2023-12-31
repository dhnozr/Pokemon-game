// take all the game card's
const cards = document.querySelectorAll('.card');

// update dom score-info
const scoreInfo = document.querySelector('.score-info');
const playerLives = document.querySelector('.playerLife-info');

// first screen settings
const overlay = document.querySelector('.overlay');
// end game settings
const overlayEndGame = document.querySelector('.overlay-endgame');
const gameTitle = document.querySelector('.title');

function overlayHandler() {
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    shuffleCards();
  });
}
overlayHandler();

let hasFlipped = false;
// lock board when were flipping
let lockBoard = false;
let firstCard;
let secondCard;
let score = 0;
let playerLivesCount = 5;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlipped) {
    // first click
    firstCard = this;
    hasFlipped = true;
    return;
  } else {
    // second click
    secondCard = this;
    hasFlipped = false;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    // it's a match
    firstCard.style.pointerEvents = 'none';
    secondCard.style.pointerEvents = 'none';
    score += 1;
    scoreInfo.textContent = score;
    winGame();
  } else {
    // not a match
    // make a time to show cards when flipping
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetCardFunc();
    }, 1000);
    playerLivesCount -= 1;
    playerLives.textContent = playerLivesCount;
    endGame();
  }
}

function resetCardFunc() {
  [lockBoard, hasFlipped] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  score = 0;
  scoreInfo.textContent = score;
  playerLivesCount = 5;
  playerLives.textContent = playerLivesCount;
  cards.forEach(card => {
    card.classList.remove('flip');
    card.style.pointerEvents = 'auto';
  });
}

function winGame() {
  if (score === 8) {
    setTimeout(() => {
      overlayEndGame.style.display = 'flex';
      gameTitle.textContent = 'You won😎 Now you are a pokemon hunter';
    }, 1000);
    overlayEndGame.addEventListener('click', () => {
      overlayEndGame.style.display = 'none';
      resetGame();
      resetCardFunc();
    });
  }
}

function endGame() {
  if (playerLivesCount === 0) {
    setTimeout(() => {
      overlayEndGame.style.display = 'flex';
      gameTitle.textContent = `You Lost😢 Restart again the claim your pokemon    `;
      playerLivesCount = 5;
      playerLives.textContent = playerLivesCount;
      resetGame();
    }, 1000);
  }

  overlayEndGame.addEventListener('click', () => {
    overlayEndGame.style.display = 'none';
  });
}

// shuffle Cards
function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));
