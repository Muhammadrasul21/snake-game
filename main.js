const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snake = [{ x: 2, y: 2 }];
let direction = "right";
let fruit = generateFruit();

function generateFruit() {
  return { 
    x: Math.floor(Math.random() * (canvas.width / scale)), 
    y: Math.floor(Math.random() * (canvas.height / scale)) 
  };
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let head = { ...snake[0] };

  if (direction === "right") head.x++;
  if (direction === "left") head.x--;
  if (direction === "up") head.y--;
  if (direction === "down") head.y++;

  snake.unshift(head);
  if (head.x === fruit.x && head.y === fruit.y) {
    fruit = generateFruit();
  } else {
    snake.pop();
  }

  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "green" : "white";
    ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(fruit.x * scale, fruit.y * scale, scale, scale);

  if (checkGameOver()) {
    alert("Game Over!");
    snake = [{ x: 2, y: 2 }];
    direction = "right";
  }
}

function checkGameOver() {
  let head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / scale || head.y < 0 || head.y >= canvas.height / scale) return true;

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

setInterval(gameLoop, 100);
