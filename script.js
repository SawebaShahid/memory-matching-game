$(document).ready(function(){
let symbols = ['🍕','🍔','🌮','🍜','🍩','🍦'];
let cards = symbols.concat(symbols);
cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matched = 0;

let timer = 0;
let timerStarted = false;
let timerInterval;

// create the board
for(let i=0; i<cards.length; i++){
    let card = $("<div class='box'></div>");
    card.attr("data-symbol", cards[i]);
    card.text(cards[i]); 
    $("#board").append(card);
}

// show moves
$("#info").append("<br>Moves: <b id='moves'>0</b>");

// start timer
function startTimer(){
    timerInterval = setInterval(function(){
        timer++;
        $("#seconds").text(timer);
    }, 1000);
}

// card click
$(".box").click(function(){

    if(lockBoard) return;
    if($(this).hasClass("open") || $(this).hasClass("done")) return;

    if(!timerStarted){
        startTimer();
        timerStarted = true;
    }

    $(this).addClass("open");

    if(!firstCard){
        firstCard = $(this);
        return;
    }

    secondCard = $(this);
    lockBoard = true;

    moves++;
    $("#moves").text(moves); // update moves

    checkMatch();
});

// check match
function checkMatch(){
    let symbol1 = firstCard.data("symbol");
    let symbol2 = secondCard.data("symbol");

    if(symbol1 === symbol2){
        $("#matchSound")[0].play();

        firstCard.removeClass("open").addClass("done");
        secondCard.removeClass("open").addClass("done");

        matched++;

        reset();

        if(matched === symbols.length){
            clearInterval(timerInterval);
            $("#win-msg").fadeIn();
        }

    } else {
        $("#wrongSound")[0].play();

        setTimeout(function(){
            firstCard.removeClass("open");
            secondCard.removeClass("open");

            reset();
        }, 1000);
    }
}

// reset turn
function reset(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
});