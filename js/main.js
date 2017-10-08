// rng for deck of cards
var cards = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9","10", "J","Q", "K"];
var output= document.getElementById("output");

// loop for cards. s is the index. allows us to loop through the values and attach them to suits
for (s in suits) {
    
    var suit = suits[s][0].toUpperCase();
// declaring a variable for background and using ternary for rules of changing colors.
    var bColor = (suit === "S" || suit == "C") ? "black" : "red";
    for (n in numb) {
        output.innerHTML += "<span style='color:" + bColor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
    }
}
var randomNum = Math.floor(Math.random()*52) +1;
