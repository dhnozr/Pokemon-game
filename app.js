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

cards.forEach(card => card.addEventListener('click', flipCard));
