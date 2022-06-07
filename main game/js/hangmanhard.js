var words = [
  "ability","absence","academy","account","accused","achieve","acquire","address","advance","adverse","advised","adviser","airline","alcohol","already","analyst","assault","assured","attract","balance","bearing","banking","bedroom","billion","capable","careful","central","century","certain","chapter","certain","clothes","comfort","concept","concern","despite","develop","discuss","economy","exclude","federal","formula","founder","further","fortune","freedom","gallery","gateway","general","gigabit","greater","hanging","healthy","hearing","heavily","helping","herself","husband","inquiry","install","justice","justify","keeping","kingdom","logical","limited","listing","machine","mariied","maximum","message","meeting","massage","mineral","minimum","mission","missing","obvious","opening","opinion","organic","outdoor","passing","passive","payable","important","payable","picking","premier","prepare","prevent","quarter","railway","readily","reality","realize","reading","reality","recieve"  
]

var seconds=60;
if(seconds===0){
  reset();
}
function displayseconds()
{
  seconds-=1;
  document.getElementById("secondsdisplay").innerText="This game will get reset in "+seconds+" Seconds....";
}
setInterval(displayseconds,1000);

function resetpage(){
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'main game/images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  seconds = 60;
}
setTimeout('resetpage()',4000);

let answer = '';
let maxWrong = 3;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'main game/images/' + (2*mistakes) + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'main game/images/0.jpg';
  seconds=60;

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
