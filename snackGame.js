// script.js

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const box = 20; // Size of one box on the grid
const canvasSize = canvas.width / box;

// Snake
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Snake direction
let direction;

// Food
let food = {
  x: Math.floor(Math.random() * canvasSize) * box,
  y: Math.floor(Math.random() * canvasSize) * box
};

// Score
let score = 0;

// Event listener for direction changes
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// Check for collisions
function collision(newHead, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

// Draw everything on the canvas
function drawGame() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake head coordinates
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Update the direction
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Snake eats food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * canvasSize) * box,
      y: Math.floor(Math.random() * canvasSize) * box
    };
  } else {
    snake.pop(); // Remove the tail
  }

  // Create new head
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // Game over: if snake collides with the wall or itself
  if (
    snakeX < 0 || snakeX >= canvas.width ||
    snakeY < 0 || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game); // Stop the game
    alert(`Game Over! Your score: ${score}`);
    return;
  }

  // Add the new head to the snake
  snake.unshift(newHead);

  // Draw the score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

// Run the game loop every 100 milliseconds
let game = setInterval(drawGame, 100); 

// 
