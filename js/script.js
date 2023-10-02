const guessedLettersList=document.querySelector("ul.guessed-letters"); //UL for guessed letters
const guessButton=document.querySelector("button.guess");
const lettersInput=document.querySelector("input#letter.letter"); // letter input
const wordInProgress=document.querySelector("p.word-in-progress"); 
const remaining=document.querySelector("p.remaining"); //remaining guesses
const guessesSpan=document.querySelector("span"); // 8 guesses span
const message=document.querySelector("p.message"); //empty p where messages will appear
const playAgainButton=document.querySelector("button.play-again");
let word="magnolia";
const guessedLetters=[];
let remainingGuesses=8;

//Update word with randomWord
const getWord= async function () {
    const res = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words= await res.text();
    const wordsArray=words.split("\n");
    const randomIndex=Math.floor(Math.random()*wordsArray.length);
    const randomWord=wordsArray[randomIndex];
    console.log(randomWord);
    word=randomWord.trim();
    placeholder(word);
};

// console.log(guessedLetters, guessButton, inputLetters, wordInProgress, remaining,
//     message, guessesSpan, playAgainButton);

// Function to add placeholder text for word to be guessed on screen
const placeholder=function(word){
    const placeholderLetters=[];
    // console.log(placeholderLetters);
    for(const letters of word){
        // console.log(letters);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText=placeholderLetters.join("");
};

getWord();


// Add event listener to guessButton
guessButton.addEventListener("click", function(e){
        e.preventDefault();
         // Clear message paragaph
        message.innerText="";
        // What was entered into input
        const guess= lettersInput.value;
        
        const passGuess=validateInput(guess);

        lettersInput.value="";

        if (passGuess) {
            makeGuess(guess);
        };
});

// check data entered is a single letter only and input was not emtpy
const validateInput = function (input) {
    const acceptedLetter=/[a-zA-Z]/;
    if(input.length===0) {
        message.innerText= "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText= "Please enter a single letter.";
    } else if (!input.match(acceptedLetter )) {
        message.innerText = "Please enter a letter A to Z.";
    } else {
        return input;
    }
};
// verifies guessed letter has not already been guessed
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText= "Aaaaa... you've already guessed that letter dude. Try a new one.";
    } else {
        guessedLetters.push(letter);
        showGuessedLetters();
        countRemainingGuesses(letter);
        updateWordInProgress(guessedLetters);
    }
    // console.log(guessedLetters);
};

// Pushes guessed letters to screen
const showGuessedLetters = function () {
    guessedLettersList.innerHTML="";
    guessedLetters.forEach(function (letter) {
        const li = document.createElement("li");
        li.innerHTML= letter;
        guessedLettersList.append(li);
    })
};

// checks secret word against guessed letters and pushes correct letters
const updateWordInProgress = function (guessedLetters) {
    const wordUpper=word.toUpperCase();
    const wordArray=wordUpper.split("");
    const magicWord=[];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            magicWord.push(letter.toUpperCase());
        } else {magicWord.push("●")}
    }
    wordInProgress.innerText = magicWord.join("");
    checkForTheWin();
};

const countRemainingGuesses = function (guess) {
    const wordUpper=word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        remainingGuesses -= 1;
        message.innerText=`Sorry, the word does not include the letter ${guess}.`;
    } else {
        message.innerText=`Good guess! The word has the letter ${guess}!`;
    }

    if(remainingGuesses===0) {
        message.innerHTML=`Sorry, game over. 😢 The word was <span class="highlight">${wordUpper}</span>.`;
        guessesSpan.innerText=`${remainingGuesses} guesses`;
        // startOver();
    } else if (remainingGuesses === 1) {
        guessesSpan.innerText= `${remainingGuesses} guess`;
    } else {
        guessesSpan.innerText=`${remainingGuesses} guesses`;
    }
    startOver();
};

//verifies all correct letters haven been guessed and pushes win message and class
const checkForTheWin = function () {
    if( word.toUpperCase()=== wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">Hooray! You guessed the correct word!!! Congrats!</p>`;
    }
};

const startOver = function () {
    if(remainingGuesses===0){
        guessButton.classList.add("hide");
        remaining.classList.add("hide");
        guessedLettersList.classList.add("hide");
        playAgainButton.classList.remove("hide");
    }
};

// START OVER FUNCTION WORKS IF PLAYER LOSES, BUT NOT IF THEY WIN... FIX THIS!!!:-)