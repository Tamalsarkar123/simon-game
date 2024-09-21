
let gameKey = [];
let userKey = [];
let highestScore = 0; // Variable to hold the highest score
let btns = ["red", "yellow", "green", "purple"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");


// Create and append a new div to display the highest score
let scoreDisplay = document.createElement("div");
scoreDisplay.innerText = `Highest Score: ${highestScore}`;
scoreDisplay.style.fontSize = "20px";
scoreDisplay.style.marginTop = "10px";
document.body.appendChild(scoreDisplay);

document.addEventListener("keypress", function () {
  if (start === false) {
    console.log("game started");
    start = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("game-flash");
  setTimeout(function () {
    btn.classList.remove("game-flash");
  }, 250);
};

function userFlash(btn) {
  btn.classList.add("user-flash");
  setTimeout(function () {
    btn.classList.remove("user-flash");
  }, 250);
};



function levelUp() {
  userKey = [];
  level++;
  h2.innerText = `Level ${level}`;

  //random button:
  let randomIdx = Math.floor(Math.random() * 3); //Corrected random index range
  let randomClr = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomClr}`);
  gameKey.push(randomClr);
  console.log(gameKey);
  gameFlash(randomBtn);

};

function checkAns(idx) {

  if (gameKey[idx] == userKey[idx]) {
    if (gameKey.length == userKey.length) {
      setTimeout(levelUp, 1000)
    }
  }
  else {
    if (level > highestScore) {
      highestScore = level; // Update the highest score
      scoreDisplay.innerText = `Highest Score: ${highestScore}`; // Update the score display
    }

    h2.innerHTML = `Game over! your score was <b>${level}</b><br>press any key to start.`;
    document.querySelector("body").style.backgroundImage = "linear-gradient(to top, #d31027, #ea384d)";
    setTimeout(() => {
      document.querySelector("body").style.backgroundImage = "linear-gradient( to bottom, #ff9966, #ff5e62)";
    }, 150);
    reset();
  }

}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userClr = btn.getAttribute("id");
  userKey.push(userClr);
  console.log(userKey);
  checkAns(userKey.length - 1);
};




let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
};


function reset() {
  start = false;
  gameKey = [];
  userKey = [];
  level = 0;
}