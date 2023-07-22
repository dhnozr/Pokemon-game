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

cards.forEach(card => card.addEventListener('click', flipCard));
