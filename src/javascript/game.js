"use strict";
// create global variables
var guesses = 0;
var matches = 0;
document.getElementById("startButton").onclick = hideStart;

// hides the initial html content and creates the game
function hideStart(){
    // get the number of symbols and validate the input
    var numSymbols = parseFloat(document.getElementById("numSymbols").value);
    if (isNaN(numSymbols))
        window.alert("Please provide a valid integer.");
    else{
        // ensure that the input is within bounds
        if (numSymbols > 8)
            numSymbols = 8;
        if (numSymbols < 1)
            numSymbols = 1;
        document.getElementById("startForm").style.display = "none";
        drawGame(numSymbols);
    }
}

// creates the game bored
function drawGame(symbolCount){
    // create and insert a label for the number of guesses
    var guessCount = document.createElement("p");
    guessCount.id = "guessCount";
    guessCount.innerHTML = "Guesses: 0";
    document.body.appendChild(guessCount);
    // create the table 
    var cardTable = document.createElement("table");
    cardTable.id = "cardTable";
    // determine the symbols to use
    var symbols = ["1", "2", "3", "4", "5", "6", "7", "8"];
    symbols = symbols.slice(8-symbolCount);
    // insert a second copy of each symbol
    for (var i = 0; i < symbolCount; i++)
        symbols.push(symbols[i]);
    // create two rows of cards
    for (var i = 0; i < 2; i++){
        var cardRow = document.createElement("tr")
        var symbolNo;
        var card;
        for (var j = 0;  j < symbolCount; j++){
            // determine the symbol to use
            symbolNo = Math.floor(Math.random() * symbols.length);
            // create the card
            card = document.createElement("td");
            card.classList.add("card", "hidden");
            card.innerHTML = symbols[symbolNo];
            card.onclick = peekCard;
            cardRow.appendChild(card);
            // delete the symbol from the array
            symbols.splice(symbolNo, 1);
        }
        cardTable.appendChild(cardRow);
    }
    document.body.appendChild(cardTable);
}

// flips over a card, and if two cards are flipped, compares them
function peekCard(e){
    if (document.querySelectorAll("td.peek").length != 2){
        var card = e.target;
        card.classList.remove("hidden");
        card.classList.add("peek");
        // check if another card has been peaked
        var peekedCards = document.querySelectorAll("td.peek");
        if (peekedCards.length == 2){
            // wait one second before displaying the results
            // determine if cards are matching
            if (peekedCards[0].innerHTML == peekedCards[1].innerHTML){
                matches++;
                for (var i = 0; i < 2; i++){
                    peekedCards[i].classList.remove("peek");
                    peekedCards[i].classList.add("reveal");
                }
                // determine if all cards are matched
                if (matches == document.querySelectorAll("td").length/2){
                    document.getElementById("guessCount").innerHTML = `Guesses: ${++guesses}`;
                    displayVictory();
                    return;
                }
            }
            else{
                // wait one second before "flipping" the cards back
                setTimeout(function(){
                    for (var i = 0; i < 2; i++){
                        peekedCards[i].classList.remove("peek");
                        peekedCards[i].classList.add("hidden");
                    }}, 
                1000);
            }
            document.getElementById("guessCount").innerHTML = `Guesses: ${++guesses}`;
        }
    }
}

// displays that the user won along with a thank you message
function displayVictory(){
    matches = 0;
    guesses = 0;
    // clear the board
    document.body.removeChild(document.getElementById("cardTable"));
    // display a thank you message
    var thanks = document.createElement("div");
    thanks.id = "thanks";
    var message = document.createElement("p");
    message.innerHTML = "You win! Thanks for playing!";
    thanks.appendChild(message);
    // create a play again button
    var playAgain = document.createElement('button');
    playAgain.innerHTML = "Play Again?";
    playAgain.onclick = restart;
    thanks.appendChild(playAgain);
    document.body.appendChild(thanks);
}

// starts the game over
function restart(){
    document.body.removeChild(document.getElementById("thanks"));
    document.body.removeChild(document.getElementById("guessCount"));
    document.getElementById("startForm").style.display = "block";
}