const canvas = document.getElementById("canvasAbout");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = true;


function writeAbout() {
  ctx.font = "16px JetBrains Mono";
  ctx.fillStyle = "#eeeeee";
  ctx.textAlign = "left";
  let n = 0;

  paragraphs.forEach((p) => {
    let remText = p;
    let curText = "";
    if (n <= canvas.height - 100) {
      while (remText.length >= 70) {
        curText = remText.slice(0, 70);
        let i = findSpace(curText);
        curText = curText.slice(0, i);
        remText = remText.slice(i, remText.length);
        n += 16;
        console.log(curText.trim());
        ctx.fillText(curText.trim(), 50, 50 + n);
      }
      ctx.fillText(remText.trim(), 50, 50 + n + 16);
      n += 48;
    } else {
      n = 0;
      while (remText.length >= 70) {
        curText = remText.slice(0, 70);
        let i = findSpace(curText);
        curText = curText.slice(0, i);
        remText = remText.slice(i, remText.length);
        n += 16;
        console.log(curText.trim());
        ctx.fillText(curText.trim(), canvas.width / 2 + 50, 50 + n);
      }
      ctx.fillText(remText.trim(), canvas.width / 2 + 50, 50 + n + 16);
      n += 48;
    }
  });
}

function findSpace(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] == " ") {
      return i;
    }
  }
}

function intro() {
  ctx.beginPath();
  ctx.font = "26px JetBrains Mono";
  ctx.fillStyle = "grey";
  ctx.textAlign = "center";
  ctx.fillText("Chris Mitchell", canvas.width * 0.5, canvas.height * 0.1);
  ctx.font = "20px JetBrains Mono";
  ctx.fillText("About", canvas.width * 0.1, canvas.height * 0.1);
  ctx.font = "20px JetBrains Mono";
  ctx.fillText("Projects", canvas.width * 0.3, canvas.height * 0.1);
  ctx.font = "20px JetBrains Mono";
  ctx.fillText("Resume", canvas.width * 0.7, canvas.height * 0.1);
  ctx.font = "20px JetBrains Mono";
  ctx.fillText("GitHub", canvas.width * 0.9, canvas.height * 0.1);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, x + dx, ctx.canvas.height);
  ctx.closePath();
  ctx.beginPath();
  writeAbout();
  ctx.closePath();
  x += dx;
  if (x <= ctx.canvas.width) {
    x += dx;
  }
}

function draw() { }

intro = setInterval(intro, 10);
setInterval(draw);
