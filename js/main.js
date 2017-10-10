







var cards = [];
var playersCard = [];
var dealersCard = [];
var cardCount = 0;
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9","10", "J","Q", "K"];
var output = document.getElementById("output");
var dealerHolder = document.getElementById("dealerHolder");
var playerHolder = document.getElementById("playerHolder");

// event listener



// loop for cards. s is the index. allows us to loop through the values and attach them to suits
for (s in suits) {
    
    var suit = suits[s][0].toUpperCase();
// declaring a variable for background and using ternary for rules of changing colors. If suit is S or C then we apply black. Else is red.
    var bColor = (suit === "S" || suit == "C") ? "black" : "red";
    for (n in numb) {
      //  output.innerHTML += "<span style='color:" + bColor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
      // if the index n is greater than 9 give it the value 10. anything under 10 is n+1, using the parseInt method give index n an numerical value, since numb is a string.
     var cardValue =(n>9) ? 10 : parseInt(n)+1
      var card = {
          suit:suit,
          icon:suits[s],
          bColor:bColor,
          cardnum:numb[n],
          cardvalue:cardValue
      }
      cards.push(card);
    }
}
     console.log(cards);
// Functions
// random number generator for the deck



function startGame() {
    shuffleDeck(cards);
    dealNew();
   
}
// dealing new cards
function dealNew() {
    playerCard = [];
    dealerCard = [];
    dealerHolder.innerHTML = "";
    playerHolder.innerHTML = "";
    // 
    for(x=0; x<2;x++) {
        dealerCard.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount);
    // moves on to the next card
        cardCount++
        playerCard.push(cards[cardCount]);
        playerHolder.innerHTML += cardOutput(cardCount);
        cardCount++
    }
    console.log(dealerCard);
    console.log(playerCard);
}

function cardOutput(n) {
    return '<div class="icard clubs">  <div class= "top-card suit">5<br></div> <div class="content-card suit"></div> <div class="bottom-card suit">5<br> </div> </div>'

}

function shuffleDeck(array) {
for(var i = array.length -1;i>0;i--){
    var j= Math.floor(Math.random() * (i+1));
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