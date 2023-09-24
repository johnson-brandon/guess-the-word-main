const guessedLettersList=document.querySelector("ul.guessed-letters"); //UL for guessed letters
const guessButton=document.querySelector("button.guess");
const lettersInput=document.querySelector("input#letter.letter"); // letter input
const wordInProgress=document.querySelector("p.word-in-progress"); 
const remaining=document.querySelector("p.remaining"); //remaining guesses
const guessesSpan=document.querySelector("span"); // 8 guesses span
const message=document.querySelector("p.message"); //empty p where messages will appear
const playAgainButton=document.querySelector("button.play-again.hide");
const word="magnolia";
const guessedLetters=[];

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

placeholder(word);


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

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText="Ahhhhh,you've already guessed that letter dude. Try a new one.";
    } else {
        guessedLetters.push(guess);
    }
    console.log(guessedLetters);
};