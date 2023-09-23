const guessedLetters=document.querySelector("ul.guessed-letters"); //UL for guessed letters
const guessButton=document.querySelector("button.guess");
const inputLetters=document.querySelector("input#letter.letter"); // letter input
const wordInProgress=document.querySelector("p.word-in-progress"); 
const remaining=document.querySelector("p.remaining"); //remaining guesses
const guessesSpan=document.querySelector("span"); // 8 guesses span
const message=document.querySelector("p.message"); //empty p where messages will appear
const playAgainButton=document.querySelector("button.play-again.hide");
const word="magnolia";

// console.log(guessedLetters, guessButton, inputLetters, wordInProgress, remaining,
//     message, guessesSpan, playAgainButton);

const placeholder=function(word){
    const placeholderLetters=[];
    console.log(placeholderLetters);
    for(const letters of word){
        console.log(letters);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText=placeholderLetters.join("");

};

placeholder(word);

