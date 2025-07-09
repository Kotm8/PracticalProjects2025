const board = document.getElementById("game-board");
const scoreDOM = document.getElementById("score");
const rows = 20;
const columns = 20;

let grid = Array.from({ length: rows}, () => Array(columns).fill(0));

let updateSpeed = 200;
let maxQueue = 2;
let directionQueue = [];
let isPaused = false;
let snake = [{x : 10, y: 10},{x : 10, y: 11}];
let direction = { x: 0, y:-1}
let food = {x : 5, y: 5};
let score = 0;

for (let i = 0; i < rows * columns; i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
}
function getIndex(x, y){
    return y * columns + x;
}

const cells = document.querySelectorAll(".cell");

function renderSnake(snake) {
    cells.forEach(c => c.classList.remove("snake"));
    snake.forEach(part => {
        const index = getIndex(part.x, part.y);
        cells[index].classList.add("snake");
    });
}

function renderFood() {
    cells.forEach(c => c.classList.remove("food"));
    const index = getIndex(food.x, food.y);
    cells[index].classList.add("food");
}


function moveSnake(){
    const head = snake[0];
    const newHead = {x: head.x + direction.x, y: head.y + direction.y};
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        makeFood();
        score++;
        scoreDOM.innerText = "Score: " + score;
    }
    else {
        snake.pop();
    }
}

function makeFood(){
    while (true) {
        const newFood = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns)};
        const onSnake = snake.some(part => part.x === newFood.x && part.y == newFood.y);
        if (!onSnake){
            food = newFood;
            break;
        }
    }
}

function hitWall(head) {
    return (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns);
}
function hitSelf(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function updateGame(){
    if (directionQueue.length > 0) {
        const nextDirection = directionQueue.shift();
        if (nextDirection && (nextDirection.x !== -direction.x || nextDirection.y !== -direction.y)) {
            direction = nextDirection;
        }
    }

    moveSnake();

    const head = snake[0];
    if (hitWall(head) || hitSelf(head)){
        clearInterval(gameLoop);
        if (hitSelf(head)){
            alert(`Game over\nHit self\nScore: ${score}`)
        }
        else{
            alert(`Game over\nHit wall\nScore: ${score}`)
        }
        location.reload();
    }

    renderFood();
    renderSnake(snake);
}
function QueueDirection(newDir) {
    if (directionQueue.length >= maxQueue) return;
    const lastDirection = directionQueue.length > 0 ? directionQueue[directionQueue.length - 1] : direction;
    
    if ((newDir.x !== -lastDirection.x || newDir.y !== -lastDirection.y) && (newDir.x !== lastDirection.x || newDir.y !== lastDirection.y)) {
        directionQueue.push(newDir);
    }
}

let gameLoop = setInterval(updateGame, updateSpeed);


document.addEventListener('keydown', (event) => {
    switch (event.key){
        case "Escape":
            if (isPaused === false){
                clearInterval(gameLoop);
                isPaused = true;
              }
              else{
                gameLoop = setInterval(updateGame, updateSpeed);
                isPaused = false;
            }
            break;
        case "w":
        case "ArrowUp":
            QueueDirection({x: 0, y: -1});
            break;
        case "s":
        case "ArrowDown":
            QueueDirection({x: 0, y: 1});
            break;
        case "a":
        case "ArrowLeft":
            QueueDirection({x: -1, y: 0});
            break;
        case "d":
        case "ArrowRight":
            QueueDirection({x: 1, y: 0});
            break;
    }
  });