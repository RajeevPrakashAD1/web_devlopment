
var number = Math.random();
number = Math.floor(number*6+1);

document.querySelector(".img2").setAttribute("src","images/dice"+number+".png");
var number2 = Math.random();
number2 = Math.floor(number2*6+1);

document.querySelector(".img1").setAttribute("src","images/dice"+number2+".png");

if( number> number2){
    document.querySelector("h1").innerHTML = "player 2 wins 🏵";
}
else if( number< number2){
    document.querySelector("h1").innerHTML ="player 1 wins 🏵";
}

else{
    document.querySelector("h1").innerText = " draw";
}
