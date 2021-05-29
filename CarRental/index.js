const textarr = ["Are you on a trip","Or you are out for business work","Dont  want to travel  through  public transport","Worry Not","We are here to rent you car"];

const alreadyTyped = document.querySelector(".typed");
const typingdelay = 200;
const erasingdelay = 100;
const newTextDelay = 200;

let textarrIndex=0;
let chararrIndex = 0;


function typing(){
    
    if(chararrIndex<textarr[textarrIndex].length){
        alreadyTyped.textContent += textarr[textarrIndex].charAt(chararrIndex);
        chararrIndex++;
        setTimeout(typing,typingdelay);

    }
    else{
        textarrIndex ++;
        if(textarrIndex<textarr.length){
            alreadyTyped.textContent = "";
            
            chararrIndex =0;
            setTimeout(typing,typingdelay+1000);
        }
        else{
            alreadyTyped.textContent = "";
            textarrIndex=0;
            chararrIndex=0;
            setTimeout(typing,typingdelay);

        }
    }
}

    


document.addEventListener("DOMContentLoaded",function(){
    setTimeout(typing,3000);
})
