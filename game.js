const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = true;

let image = new Image();
image.src = "images/rocket.png";
let batchest = new Image();
batchest.src = "images/bat.png";
let speech = new Image();
speech.src = "images/speech.png";
let nsbs = new Image();
nsbs.src = "images/nsbs.png";
let github = new Image();
github.src = "images/github.png";
let link = new Image();
link.src = "images/link.png";

let s1 = new Image();
s1.src = "images/Drawing.png";

let s2 = new Image();
s2.src = "images/Drawing-2.png";

let s3 = new Image();
s2.src = "images/Drawing-3.png";

let s4 = new Image();
s4.src = "images/Drawing-4.png";

let items = [s1, s2, s3, s4];

xdis = window.innerWidth;
ydis = window.innerHeight;
x = xdis / 2;
y = ydis / 2;
mouseX = xdis / 2;
mouseY = ydis / 2;
angle = 0;

let chrisX = -300;
let chrisY = 0;
let theta = 0;

let obX = 0;
let obY = 0;
let objects = [];
let numObj = 100;
let numCollected = 0;

let githubBox1 = {
  x: -800 + obX,
  y: obY + 500,
  width: 60,
  height: 60,
};

// taken from https://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas
function isInside(rect) {
  return (
    mouseX > rect.x &&
    mouseX < rect.x + rect.width &&
    mouseY < rect.y + rect.height &&
    mouseY > rect.y
  );
}

function handleHover() {
  if (
    mouseX > -800 + obX &&
    mouseX < -800 + obX + 60 &&
    mouseY < obY + 500 + 60 &&
    mouseY > obY + 500
  ) {
    canvas.style.cursor = "pointer";
  } else if (
    mouseX > -800 + obX + 80 &&
    mouseX < -800 + obX + 140 &&
    mouseY < obY + 500 + 60 &&
    mouseY > obY + 500
  ) {
    canvas.style.cursor = "pointer";
  } else if (
    x > canvas.width * 0.5 + obX - 25 &&
    x < canvas.width * 0.5 + obX + 30 &&
    y < canvas.height * 0.5 + obY + 150 + 30 &&
    y > canvas.height * 0.5 + obY + 150 &&
    numCollected >= 5
  ) {
    window.location = "about.html";
  } else {
    canvas.style.cursor = "auto";
  }
}

function mouseMoveHandler(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function mouseClickHandler(e) { }

function drawShip() {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.drawImage(image, -20, -30, 40, 60);
  ctx.restore();
  ctx.closePath();
}

function moveRocket() {
  xdif = x - mouseX;
  x = x - xdif / 20;
  ydif = y - mouseY;
  y = y - ydif / 20;
}

function findRotation() {
  angle = Math.atan2(mouseY - y, mouseX - x);
  angle += Math.PI / 2;
}

function moveChris() {
  theta += 0.2;
  chrisX = chrisX + 1.5 * Math.cos(theta);
  chrisY = chrisY + 1.5 * Math.sin(theta);
}

function drawText() {
  ctx.beginPath();

  ctx.drawImage(
    batchest,
    canvas.width * 0.5 + obX + chrisX,
    canvas.height * 0.4 + obY + chrisY,
    300,
    300
  );
  ctx.drawImage(
    speech,
    canvas.width * 0.5 + 100 + obX + chrisX,
    canvas.height * 0.4 - 350 + obY + chrisY,
    600,
    400
  );

  ctx.font = "20px JetBrains Mono";
  ctx.fillStyle = "black";

  ctx.fillText(
    "HEY! I am Chris.  Nice to see you!",
    canvas.width * 0.5 + 150 + obX + chrisX,
    canvas.height * 0.4 + -300 + obY + chrisY
  );
  ctx.fillText(
    "Welcome to my website, I hope you enjoy.",
    canvas.width * 0.5 + 150 + obX + chrisX,
    canvas.height * 0.4 + -300 + 30 + obY + chrisY
  );

  ctx.font = "30px JetBrains Mono";
  ctx.fillText(
    "THANKS!",
    canvas.width * 0.5 + 150 + obX + chrisX,
    canvas.height * 0.4 + -300 + 200 + obY + chrisY
  );
}

for (let i = 0; i <= numObj; i++) {
  let objX = canvas.width * Math.random() * 3 - canvas.width;
  let objY = canvas.height * (i / numObj) * 3 - canvas.height;
  let object = [objX, objY, 1];
  objects[i] = object;
}

function renderObjects() {
  let numCol = 0;
  for (let i = 0; i <= numObj; i++) {
    if (objects[i][2] == 1) {
      ctx.beginPath();
      let itemNum = i % 4;
      ctx.drawImage(
        items[itemNum],
        objects[i][0] + obX,
        objects[i][1] + obY,
        20,
        20
      );
      ctx.closePath();
    } else {
      numCol += 1;
    }
  }
  numCollected = numCol;
}

function moveObjects() {
  dirX = (mouseX - x) * 0.015;
  obX += -dirX * 5;
  dirY = (mouseY - y) * 0.015;
  obY += -dirY * 5;
}


function writeAbout() {
  ctx.font = "16px JetBrains Mono";
  ctx.fillStyle = "#eeeeee";
  ctx.textAlign = "left";
  let n = 0;

  paragraphs.forEach((p) => {
    let remText = p;
    let curText = "";

    while (remText.length >= 70) {
      curText = remText.slice(0, 70);
      let i = findSpace(curText);
      curText = curText.slice(0, i);
      remText = remText.slice(i, remText.length);
      n += 16;
      console.log(curText.trim());
      ctx.fillText(curText.trim(), canvas.width + 300 + obX, n);
    }
    ctx.fillText(remText.trim(), canvas.width + 300 + obX, n + 16);
    n += 48;
  });
}

function findSpace(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] == " ") {
      return i;
    }
  }
}

function drawProjects() {
  ctx.font = "40px JetBrains Mono";
  ctx.fillStyle = "white";
  ctx.fillText("Projects", -800 + obX, obY);
  ctx.font = "30px JetBrains Mono";
  ctx.fillText("North Shore Bike Shop Website", -800 + obX, obY + 50);
  ctx.drawImage(nsbs, -800 + obX, obY + 75, 500, 300);
  ctx.font = "20px JetBrains Mono";
  ctx.fillText("-HTML/CSS with Python Flask Backend", -800 + obX, obY + 410);
  ctx.fillText(
    "-Uses Python Requests to webscrape a major ",
    -800 + obX,
    obY + 440
  );
  ctx.fillText(" site for buysell data and images", -800 + obX, obY + 470);
  ctx.drawImage(github, -800 + obX, obY + 500, 60, 60);
  ctx.fillRect(-800 + obX + 80, obY + 500, 60, 60);
  ctx.drawImage(link, -800 + obX + 80, obY + 500, 60, 60);
}

function draw() {
  // set background color
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // make text and links
  handleHover();
  moveChris();
  // writeAbout();

  // handle ship
  renderObjects();
  drawText();
  moveObjects();
  findRotation();

  drawShip();
  moveRocket();
}

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", mouseClickHandler, false);
draw = setInterval(draw, 40);
