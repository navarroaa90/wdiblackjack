







var cards = [];
var playersCard = [];
var dealersCard = [];
var cardCount = 0;
var mydollars = 1000;

var endplay = false;


var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var message = document.getElementById("message");
var output = document.getElementById("output");
var dealerHolder = document.getElementById("dealerHolder");
var playerHolder = document.getElementById("playerHolder");
var pValue = document.getElementById("pValue");
var dValue = document.getElementById("dValue");
var dollarValue = document.getElementById("dollars");
// event listener
document.getElementById('mybet').onchange = function () {
    if (this.value < 0) { this.value = 0; }
    if (this.value > mydollars) { this.value = mydollars; }
    message.innerHTML = "bet changed to $" + this.value;
}


// loop for cards. s is the index. allows us to loop through the values and attach them to suits
for (s in suits) {

    var suit = suits[s][0].toUpperCase();
    // declaring a variable for background and using ternary for rules of changing colors. If suit is S or C then we apply black. Else is red.
    var bColor = (suit === "S" || suit == "C") ? "black" : "red";
    for (n in numb) {
        //  output.innerHTML += "<span style='color:" + bColor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
        // if the index n is greater than 9 give it the value 10. anything under 10 is n+1, using the parseInt method give index n an numerical value, since numb is a string.
        var cardValue = (n > 9) ? 10 : parseInt(n) + 1
        var card = {
            suit: suit,
            icon: suits[s],
            bColor: bColor,
            cardnum: numb[n],
            cardvalue: cardValue
        }
        cards.push(card);
    }
}



// start of the game!
function startGame() {
    shuffleDeck(cards);
    dealNew();
    document.getElementById('startbtn').style.display = 'none';
    document.getElementById('dollars').innerHTML = mydollars;
}
// dealing new cards
function dealNew() {
    dValue.innerHTML = "?";
    playerCard = [];
    dealerCard = [];
    dealerHolder.innerHTML = "";
    playerHolder.innerHTML = "";
    var betvalue = document.getElementById('mybet').value;
    mydollars = mydollars - betvalue;
    document.getElementById('dollars').innerHTML = mydollars;
    document.getElementById('myactions').style.display = 'block';
    message.innerHTML = "Get up to 21 and beat the dealer to win.<br>Current bet is $" + betvalue;
    document.getElementById('mybet').disabled = true;
    document.getElementById('maxbet').disabled = true;
    deal();
    document.getElementById('btndeal').style.display = 'none';
}
// After 30 cards the deck is reshuffled
function redeal() {
    cardCount++;
    if (cardCount > 30) {
        shuffleDeck(cards);
        cardCount = 0;
        message.innerHTML = "New Shuffle";
    }
}




function deal() {
    //card count reshuffle


    for (x = 0; x < 2; x++) {
        dealerCard.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount, x);
        // moves on to the next card
        // hides dealers first card
        if (x == 0) {
            dealerHolder.innerHTML += '<div id= "cover" style="left:100px"></div>'
        }
        redeal();
        playerCard.push(cards[cardCount]);
        playerHolder.innerHTML += cardOutput(cardCount, x);
        redeal();
    }

    pValue.innerHTML = checktotal(playerCard);

}



function cardOutput(n, x) {
    var hpos = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
        '<br></div> </div>';

}

function maxbet() {
    document.getElementById('mybet').value = mydollars;
    message.innerHTML = "Bet changed to $" + mydollars;
}

function cardAction(a) {

    switch (a) {
        case 'hit':
            playucard(); // add new card to players hand
            break;
        case 'hold':
            playend(); //playout and calculate
            break;
        case 'double':
            var betvalue = parseInt(document.getElementById('mybet').value);
            if ((mydollars - betvalue) < 0) {
                betvalue = betvalue + mydollars;
                mydollars = 0;
            } else {
                mydollar = mydollars - betvalue;
                betvalue = betvalue * 2;
            }
            document.getElementById('dollars').innerHTML = mydollars;
            document.getElementById('mybet').value = betvalue;

            playucard(); // add new card to players hand
            playend(); //playout and calculate
            break;
        default:
            playend(); //playout and calculate

    }
}
// adding card to players hand
function playucard() {
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length - 1));
    redeal();
    var rValu = checktotal(playerCard);
    pValue.innerHTML = rValu;
    if (rValu > 21) {
        message.innerHTML = "busted!";
        playend();
    }
}
// at the end of the game we compare hands with the player and dealer. With this funciton we disable a few buttons and take off the 
//cover on the dealers side.
function playend() {
    endplay = true;
    document.getElementById('cover').style.display = 'none';
    document.getElementById('myactions').style.display = 'none';
    document.getElementById('btndeal').style.display = 'block';
    document.getElementById('mybet').disabled = false;
    document.getElementById('maxbet').disabled = false;
    message.innerHTML = " ";
    var payoutJack = 1;
    var dealervalue = checktotal(dealerCard);
    dValue.innerHTML = dealervalue;

    while (dealervalue < 17) {
        dealerCard.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length - 1));
        redeal();
        dealervalue = checktotal(dealerCard);
        dValue.innerHTML = dealervalue;
    }
    //who won?
    var playervalue = checktotal(playerCard);
    if (playervalue == 21 && playerCard.length == 2) {
        message.innerHTML = "Player BlackJack";
        payoutJack = 1.5;
    }
    var betvalue = parseInt(document.getElementById('mybet').value) * payoutJack;

    if ((playervalue < 22 && dealervalue < playervalue) || (dealervalue > 21 && playervalue < 22)) {
        message.innerHTML += '<span style="color:green";> You WIN! You won $' + betvalue + '</span>';
        mydollars = mydollars + (betvalue * 2);
    }
    else if (playervalue > 21) {
        message.innerHTML += '<span style="color: red";> Dealer Wins! You lost $' + betvalue + '</span>';

    }
    else if (playervalue == dealervalue) {
        message.innerHTML += '<span style="color: blue";>PUSH</span>';
        mydollars = mydollars + betvalue;
    }
    else {
        message.innerHTML += '<span style="color: red";> Dealer Wins! You lost $' + betvalue + '</span>';

    }


    pValue.innerHTML = playervalue;
    dollarValue.innerHTML = mydollars;
}

// ace logic
function checktotal(arr) {
    var rValue = 0;
    var aceAdjust = false;
    for (var i in arr) {
        if (arr[i].cardnum == 'A' && !aceAdjust) {
            aceAdjust = true;
            rValue = rValue + 10;
        }
        rValue = rValue + arr[i].cardvalue;
    }
    if (aceAdjust && rValue > 21) {
        rValue = rValue - 10;
    }
    return rValue;
}

// rng
function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }
    return array;
}
// displays card
function outputCard() {
    output.innerHTML += "<span style='color:" + cards[cardCount].bColor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";

}