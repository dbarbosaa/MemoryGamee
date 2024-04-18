const getQ = (p) => document.querySelector(p);
let decrem = "";
const container = getQ(".container");
const display = getQ('#time');
const btn = getQ(".btn");
let cardBefore = "";
let durations = 40;
let touchCount = 0;

// função para contar os toques;
function countTouches() {
  touchCount++;
  document.getElementById('touchCount').textContent = touchCount;
  console.log("Contagem de toques atualizada:", touchCount); // Adicione este console.log
}

function setime2(t) {
  if (durations < 0 || t === 12) {
    clearInterval(decrem);
    btn.style.display = "block";
    // Adiciona uma mensagem de tempo esgotado na tela
    display.innerHTML = "Tempo Esgotado!";
    // Você pode estilizar a mensagem conforme necessário
    display.style.fontSize = "2em";
    display.style.color = "red";
    // Restante do código...
    return;
  }
  display.innerHTML = `⌛${durations < 10 ? ("0" + durations--) : durations--}`;
}

function newGame() {
  const emojis = ["🤐", "😅", "😡", "🤗", "😡", "🧐", "🤯", "😅", "🧐", "🤐", "🤗", "🤯"].sort(() => 0.5 - Math.random());
  container.innerHTML = emojis.map((e) => `<div class="item"><span>${e}</span></div>`).join("");
  addEvent();
  durations = 40;
  decrem = setInterval(setime2, 1000);
  btn.style.display = "none";
}

function addEvent() {
  const spans = document.querySelectorAll('.item');
  for (const span of spans) {
    span.addEventListener("click", clickCard);
  }
}

function rmvEvent() {
  const spans = document.querySelectorAll('.item');
  for (const span of spans) {
    span.removeEventListener("click", clickCard);
  }
}

newGame();
btn.style.display = "none";

async function clickCard() {
  const span = this.querySelector("span");
  this.style.transition = "transform 0.6s";
  this.style.transform = "rotateY(180deg)";

  setTimeout(() => {
    span.style.display = "block";
    span.style.transform = "rotateY(180deg)";
    console.log("Contagem de toques antes de incrementar:", touchCount); // Adicione este console.log
    countTouches();
  }, 300);

  if (cardBefore === "") {
    cardBefore = this;
    return;
  } else if (span.innerHTML === cardBefore.querySelector("span").innerHTML) {
    this.style.border = "solid 2px tomato";
    cardBefore.style.border = "solid 2px tomato";
    cardBefore = "";
    chkWin();
  } else {
    rmvEvent();
    setTimeout(() => {
      addStyle([this, cardBefore]);
      span.style.display = "none";
      cardBefore.querySelector("span").style.display = "none";
      cardBefore = "";
      addEvent();
    }, 1000);
  }
}

function addStyle(elems) {
  for (const el of elems) {
    el.style.transition = "transform 0.6s";
    el.style.transform = "rotateY(-180deg)";
    el.style.border = "solid 2px #333";
  }
}

function chkWin() {
  let count = 1;
  const spans = document.querySelectorAll('.item');
  for (const span of spans) {
    if (span.querySelector("span").style.display === "block") {
      count++;
    }
  }
  setime2(count);
}