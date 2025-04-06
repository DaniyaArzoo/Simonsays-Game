let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highestscore = 0;

let btns = ["one","two","three","four"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;
        
        levelUp();
    }
});

function levelUp(){
    // To reset the UserSeq after each flash
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3) + 1;
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout( function() {
        btn.classList.remove("flash");
    }, 300);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function btnPress(){
    //to access the button flashed
    let btn = this;
    // console.log(btn);
    userFlash(btn);

    //To access the button pressed by user
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    // console.log(userSeq);

    checkAns(userSeq.length - 1);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout( function() {
        btn.classList.remove("userflash");
    },300);
}

function checkAns(idx){
    if( userSeq[idx] === gameSeq[idx]){
        // console.log(idx);
        if( userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if( (level-1) > highestscore){
            highestscore = level - 1;
            // console.log(level);
            // console.log(highestscore);
            h2.innerText = `Game over !! Played well !! 
            You're at Level ${level - 1} . 
            THE HIGHEST LEVEL YET !!`;
        }
        else{
            // console.log(level);
            // console.log(highestscore);
            h2.innerText = `Game over !! 
            Press any key to start the game. 
            Your Score is ${level - 1} .
            Highest Score yet : ${highestscore}`;
        }

        //When game is over to flash
        document.querySelector(".main").classList.add("background");
        setTimeout(function() {
            document.querySelector(".main").classList.remove("background");
        },300);
        
        reset();   
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}