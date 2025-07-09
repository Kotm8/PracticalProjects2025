const board = document.getElementById("game-board");
const timerDOM = document.getElementById("timer");
const rows = 4;
const columns = 4;

let timerInterval = null;
let secondsElapsed = 0;

for (let i = 0; i < rows * columns; i++){

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = i;
        
    cell.dataset.row = i % columns;
    cell.dataset.column = Math.floor(i / columns);

    cell.addEventListener("click", () => {
        handleCellCkick(i % columns, Math.floor(i / columns));
    });
    board.appendChild(cell);
    
}
function getIndex(x, y){
    return y * columns + x;
}

const cells = document.querySelectorAll(".cell");
cells[0].classList.add("cell-empty");
cells[0].classList.remove("cell");
cells[0].innerText = ""

function swapTile(x, y, emptyX, emptyY){
    let empty = cells[getIndex(emptyX, emptyY)];
    let clicked = cells[getIndex(x, y)];

    empty.innerText = cells[getIndex(x, y)].innerText;
    empty.classList.remove("cell-empty");
    empty.classList.add("cell");

    clicked.innerText = "";
    clicked.classList.remove("cell");
    clicked.classList.add("cell-empty");
}

function findEmptyAround(x, y){
    if (x + 1 < columns && cells[getIndex(x+1, y)].innerText === ""){
        return { x: x+1, y: y };
    }
    else if (x - 1 >= 0 && cells[getIndex(x-1, y)].innerText === ""){
        return { x: x-1, y: y };
    }
    else if (y + 1 < rows && cells[getIndex(x, y+1)].innerText === ""){
        return { x: x, y: y+1 };
    }
    else if (y - 1 >= 0 && cells[getIndex(x, y-1)].innerText === ""){
        return { x: x, y: y-1 };
    }
    return false;
}

function handleCellCkick(x, y){
    let emptyCell = findEmptyAround(x, y);
    console.log(x, y, emptyCell);
    if (emptyCell){
        swapTile(x, y, emptyCell.x, emptyCell.y);
    }
    if (checkSolved()){
        stopTimer();
        alert(`Solved!\n${timerDOM.innerText}`);
    }
}

function checkSolved(){
    if (cells[0].innerText == "") {
        for (let i = 1; i < rows * columns; i++){
            if (cells[i].innerText !== String(i)) {
                return false; 
            }
        }
    }
    else {
        for (let i = 0; i < rows * columns - 1; i++){
            if (cells[i].innerText !== String(i + 1)) {
                return false; 
            }
        }
    }
    return true;
}

function shuffle(){
    for (let i = 0; i < 400; i++){
        while (true){
            let randomCell = Math.floor(Math.random() * 16);
            let randomX = randomCell % columns;
            let randomY = Math.floor(randomCell / columns);
            let emptyCell = findEmptyAround(randomX, randomY);
            if (emptyCell){
                swapTile(randomX, randomY, emptyCell.x, emptyCell.y);
                break;
            }
        }
    }
    startTimer();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function timer(){
    secondsElapsed++;
    timerDOM.innerText = formatTime(secondsElapsed);
}
function startTimer() {
    resetTimer();
    timerInterval = setInterval(() => {timer()}, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    secondsElapsed = 0;
    timerDOM.innerText = "00:00";
}