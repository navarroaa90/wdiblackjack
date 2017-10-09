







var cards = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9","10", "J","Q", "K"];
var output= document.getElementById("output");

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
var randomNum = Math.floor(Math.random()*52);
output.innerHTML += "<span style='color:" + cards[randomNum].bColor + "'>&" + cards[randomNum].icon + ";" + cards[randomNum].cardnum + "</span>  ";

}
