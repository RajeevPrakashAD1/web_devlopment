// alert("hello");

var btns = document.querySelectorAll("button")

for(i=0;i<btns.length;i++){
    btns[i].addEventListener("click",function(){
        var key = this.innerHTML;
        checkKey(key);
    } )}
        
    function checkKey(btn){
        
        switch (btn) {
            case "w":
                new Audio("sounds/crash.mp3").play();
            
            case 'a':
                new Audio("sounds/kick-bass.mp3").play();
                break;
            case 's':
                new Audio("sounds/snare.mp3").play();
                break;
            case 'd':
                new Audio("sounds/tom-1.mp3").play();
                break;
            case 'j':
                new Audio("sounds/tom-2.mp3").play();
                break;
            case 'k':
                new Audio("sounds/tom-3.mp3").play();
                break;
            case 'l':
                new Audio("sounds/tom-4.mp3").play();
                break;
            
            
            default:
                break;
        }
    }


document.addEventListener("keypress",function(event){
    var key = event.key;
    console.log(event);
    checkKey(key);    
})
    


