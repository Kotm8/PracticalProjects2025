const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const canvas = document.getElementById("canvas");
const scoreDOM = document.getElementById("score");

let cactusX = canvas.offsetWidth;

const cactusWidth = 20;
const cactusHeight = 40;
const dinoWidth = 70;

let speed = 5;
let maxSpeed = 25;
let velocity = 0;
let gravity = 0.7;
let dinoY = 0;
let score = 0;
let isJumping = false;

function jump() {
    if (isJumping) return;
    isJumping = true;
    velocity = 20;
    requestAnimationFrame(applyGravity);
}

function applyGravity() {
    velocity -= gravity;
    dinoY += velocity;

    if (dinoY <= 0) {
        dinoY = 0;
        velocity = 0;
        isJumping = false;
    } else {
        requestAnimationFrame(applyGravity);
    }

    dino.style.bottom = `${dinoY}px`;
}

function checkCollision() {
    const dinoBox = dino.getBoundingClientRect();
    const cactusBox = cactus.getBoundingClientRect();

    if (
        dinoBox.right > cactusBox.left &&
        dinoBox.left < cactusBox.right &&
        dinoBox.bottom > cactusBox.top
    ) {

        location.reload();
    }
}

function animate() {
    cactusX -= speed;

    if (cactusX < -cactusWidth) {
        cactusX = canvas.offsetWidth + (Math.random() * 250 );
        if (speed < maxSpeed){
            speed++;
        }
    }

    cactus.style.left = `${cactusX}px`;

    score++;
    scoreDOM.innerText = "Score: " + Math.floor(score / 10);

    checkCollision();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        jump();
    }
});
