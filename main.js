const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
let lettersArray = Array.from(letters);
// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  // Append The Letter To Span
  span.appendChild(theLetter);
  // Add Class On Span
  span.className = "letter-box";
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];
// Add this value For Catogery
let catogory = document.querySelector(".category");
catogory.textContent = `Word From: ${allKeys[randomPropNumber]}`;
console.log(randomValueValue);

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);
let lettersGuessContainer = document.querySelector(".letters-guess");
// Create Spans Depened On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
let newValue = randomValueValue.toLowerCase();
let spanClicked = document.querySelectorAll(".letter-box");
let wrongCount = 0;
let guessSpans = document.querySelectorAll(".letters-guess span");
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let ArrayValue = Array.from(randomValueValue.toLowerCase());
    ArrayValue.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter === wordLetter) {
        document.getElementById("success").play()
        console.log(wordIndex);
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
          }
        });
        checkIfWordIsComplete()
      }
    });
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongCount++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongCount}`);
      document.getElementById("fail").play()
      if(wrongCount === 8){
        endGame()
        lettersContainer.classList.add("finished");
      }
    }
  }
});
// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  // Apped Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = 'popup';
  // Append To The Body
  document.body.appendChild(div);
}
function wonGame() {
  // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  // Apped Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = 'popup';
  // Append To The Body
  document.body.appendChild(div);
}
function checkIfWordIsComplete() {
   // Adjust selector as needed
  const allRevealed = Array.from(guessSpans).every(span => span.innerHTML.trim() !== "");
  if (allRevealed) {
    // Trigger win logic here
    // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(`🎉 Word complete! Player wins!, The Word Is ${randomValueValue}`);
  // Apped Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = 'popup';
  // Append To The Body
  document.body.appendChild(div);
  }
}
