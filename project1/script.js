let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let turnO = true;
let score = document.querySelector('#score');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let x_icon_path = 'assets/x_icon.png';
let o_icon_path = 'assets/o_icon.png';

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let xMoves = [];
let oMoves = [];
let xWins = 0;
let oWins = 0;
boxes.forEach((box, index) => {
    box.addEventListener('click', function () {
        if (turnO) {
            oMoves.push(index);
            box.innerHTML = `<img class="icon" src="${o_icon_path}" />`;
            turnO = false;
            box.disabled = true;
            checkWinner();
        } else {
            xMoves.push(index);
            box.innerHTML = `<img class="icon" src="${x_icon_path}" />`;
            turnO = true;
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
    if (xWins + oWins != 0){
        score.innerText = `X = ${xWins} O = ${oWins}`;
    };
};

const checkWinner = () => {
    let hasWin = false;
    for (let winningPattern of winPatterns){
        if (oMoves.includes(winningPattern[0]) && oMoves.includes(winningPattern[1]) && oMoves.includes(winningPattern[2])){
            oWins += 1;
            showWinner("O");
            hasWin = true;
            return;
        }
        if (xMoves.includes(winningPattern[0]) && xMoves.includes(winningPattern[1]) && xMoves.includes(winningPattern[2])){
            xWins += 1;
            showWinner("X");
            hasWin = true;
            return;
        }
    }
    

    if (!hasWin) {
        if (xMoves.length + oMoves.length === 9) {
            msgContainer.classList.remove('hide');
            msg.innerText = 'Match Drawn';
        }
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    xMoves = []
    oMoves = []
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);