

$("h1").css("color","red");

$(document).keypress(function(event){
    $("h2").text(event.key);
}); 

$("button").click(function(){
    $("h1").css("color","yellow");
});