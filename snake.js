//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Draw food as a pixel mouse
    drawMouse(foodX, foodY);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Draw the snake head as a circle with gradient
    let headGradient = context.createRadialGradient(
        snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 4,
        snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2
    );
    headGradient.addColorStop(0, "lime");
    headGradient.addColorStop(1, "green");

    context.fillStyle = headGradient;
    context.beginPath();
    context.arc(snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    context.fill();

    // Draw eyes
    context.fillStyle = "white";
    const eyeRadius = blockSize / 8;
    const eyeOffsetX = blockSize / 4;
    const eyeOffsetY = blockSize / 4;

    context.beginPath();
    context.arc(snakeX + blockSize / 2 - eyeOffsetX, snakeY + blockSize / 2 - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(snakeX + blockSize / 2 + eyeOffsetX, snakeY + blockSize / 2 - eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
    context.fill();

    // Draw the snake body segments with gradient
    for (let i = 0; i < snakeBody.length; i++) {
        let segmentGradient = context.createRadialGradient(
            snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 4,
            snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 2
        );
        segmentGradient.addColorStop(0, "lime");
        segmentGradient.addColorStop(1, "green");

        context.fillStyle = segmentGradient;
        context.beginPath();
        context.arc(snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
        context.fill();
    }

    // Game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function drawMouse(x, y) {
    context.fillStyle = "gray";
    // Main body
    context.fillRect(x + 5, y + 5, 15, 15);
    // Ears
    context.fillRect(x + 2, y + 2, 5, 5);
    context.fillRect(x + 18, y + 2, 5, 5);
    // Tail
    context.fillRect(x + 20, y + 10, 5, 2);
    // Eyes
    context.fillStyle = "white";
    context.fillRect(x + 7, y + 7, 2, 2);
    context.fillRect(x + 16, y + 7, 2, 2);
    // Nose
    context.fillStyle = "pink";
    context.fillRect(x + 11, y + 16, 3, 3);
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}