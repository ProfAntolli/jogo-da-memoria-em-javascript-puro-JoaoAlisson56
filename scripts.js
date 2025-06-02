
const cards = document.querySelectorAll('.carta');
const contadorElemento = document.getElementById('contador');
const reiniciarBtn = document.getElementById('reiniciar');


let movimentos = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let paresEncontrados = 0;

function init() {
  movimentos = 0;
  paresEncontrados = 0;
  contadorElemento.textContent = movimentos;
  
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    card.style.pointerEvents = 'auto'; 
  });
  
  shuffle();
  resetBoard();
}

function shuffle() {
  const cardsArray = Array.from(cards);
  for (let i = cardsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    cardsArray[i].style.order = j;
    cardsArray[j].style.order = i;
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains('flip')) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  movimentos++;
  contadorElemento.textContent = movimentos;

  const isMatch = firstCard.dataset.pokemon === secondCard.dataset.pokemon;
  
  if (isMatch) {
    disableCards();
    paresEncontrados++;
    checkGameOver();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.style.pointerEvents = 'none';
  secondCard.style.pointerEvents = 'none';
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

document.getElementById('reiniciar').addEventListener('click', () => {
  cards.forEach(card => {
    card.style.transition = 'none'; 
    card.classList.remove('flip');
  });

  shuffle();
  
  setTimeout(() => {
    cards.forEach(card => {
      card.style.transition = ''; 
      card.style.pointerEvents = 'auto'; 
    });
  }, 10);

  movimentos = 0;
  contadorElemento.textContent = movimentos;
  resetBoard();
});

function checkGameOver() {
  if (paresEncontrados === cards.length / 2) {
    setTimeout(() => {
      alert(`Parabéns! Você completou o jogo em ${movimentos} movimentos!`);
    }, 500);
  }
}

reiniciarBtn.addEventListener('click', init);
cards.forEach(card => card.addEventListener('click', flipCard));

init();