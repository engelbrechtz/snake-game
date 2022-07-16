let boxSize = 25;
let rows = 30;
let cols = 30;
let board;

// Drawing object
let context;
let snakeX = boxSize * 5;
let snakeY = boxSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

// let foodX = boxSize * 10;
// let foodY = boxSize * 10;

let gameOver = false;

window.onload = function () {
  board = document.querySelector(".board");
  board.height = rows * boxSize;
  board.width = cols * boxSize;
  context = board.getContext("2d");

  placefood();
  //   update();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

const update = function () {
  if (gameOver) return;
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, boxSize, boxSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placefood();
  }

  for (let i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lightgreen";
  context.fillRect(snakeX, snakeY, boxSize, boxSize);
  snakeX += speedX * boxSize;
  snakeY += speedY * boxSize;
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
  }

  if (
    snakeX < 0 ||
    snakeX > cols * boxSize ||
    snakeY < 0 ||
    snakeY > cols * boxSize
  ) {
    gameOver = true;
    alert("Game over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      (gameOver = true), alert("Game over");
    }
  }
};

const placefood = function () {
  foodX = Math.floor(Math.random() * cols) * boxSize;
  foodY = Math.floor(Math.random() * rows) * boxSize;
};

const changeDirection = function (e) {
  if (e.code == "ArrowUp") {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown") {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft") {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight") {
    speedX = 1;
    speedY = 0;
  }
};
