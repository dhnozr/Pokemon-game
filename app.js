// take all the game card's
const cards = document.querySelectorAll('.card');

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
  if (firstCard.dataset.info === secondCard.dataset.info) {
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

cards.forEach(card => card.addEventListener('click', flipCard));
