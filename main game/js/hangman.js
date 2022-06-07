var words = [
  "adore","agile","agree","alert","alive","allow","aloha","amaze","amiity","ample","amply","amuse","angel","ardor","aware","bless","bliss","bloom","bonus","champ","charm","clean","clear","dandy","dream","drive","eager","enjoy","extra","faith","fancy","focus","giddy","glory","grace","grand","great","guide","happy","heart","hello","honor","human","humor","inner","jolly","kalon","laugh","learn","light","logic","loyal","lucky","magic","major","mercy","merit","moved","noble","order","peace","pious","power","pride","proto","proud","quiet","ready","relax","renew","scope","serve","shine","skill","sleep","smart","smile","space","spark","start","still","study","style","sweet","teach","thank","touch","trust","truth","unity","valid","value","water","whole","worth","young","youth","yummy","zappy","zippy",
]

var seconds=100;
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
  seconds = 100;
}
setTimeout('resetpage()',4000);

let answer = '';
let maxWrong = 6;
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
  document.getElementById('hangmanPic').src = 'main game/images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won...wont be hanged now :)!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!...Die Now :(';
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
  seconds=100;

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
