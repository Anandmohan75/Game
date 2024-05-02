let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
/////////////////////////////////////////////////////////
////// For start game
document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
});
/////////////////////////////////////////////////////////
////// Flash button
function gameFlash(btn) {
    btn.classList.add("Flash");
    setTimeout(function () {
        btn.classList.remove("Flash");
    }, 250)
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250)
}
/////////////////////////////////////////////////////////
////// Level Up
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomInx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomInx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    gameFlash(randomBtn);

}
//////////////////////////////////////////////////////////
////// check and compare user button thats button exist or no in userSeq
function checkBtn(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game is over! <b>Your score was : ${level}</b><br>
        Press any key to start game.`;

        document.querySelector("body").style.backgroundColor = "red"
        let over = document.querySelector("p");
        over.classList.add("gameOver");
        over.innerText = "Game Over";

        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "rgb(252, 221, 183)";
            over.innerText = "";
            over.classList.remove("gameOver");
        }, 200);
        reset();
    }

}
//////////////////////////////////////////////////////////
////// For user press button
function userPress() {
    let btn = this;
    console.log(this);
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkBtn(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", userPress);
}
///////////////////////////////////////////////////////////
//////Reset game

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}