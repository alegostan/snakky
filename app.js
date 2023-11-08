const playGroundSize = 50;
const snake = {
    body: [],
    direction: "",
};
const food = { x: 20, y: 10 };

// Initialize the snake's body with some initial positions
for (let i = 3; i <= 7; i++) {
    snake.body.push({ x: 5, y: i });
}

function calculateNextCell(direction) {
    const { x, y } = snake.body[0];
    let nextX = x;
    let nextY = y;

    switch (direction) {
        case "Up":
            nextY = y === 1 ? playGroundSize : y - 1;
            break;
        case "Right":
            nextX = x === playGroundSize ? 1 : x + 1;
            break;
        case "Down":
            nextY = y === playGroundSize ? 1 : y + 1;
            break;
        case "Left":
            nextX = x === 1 ? playGroundSize : x - 1;
            break;
    }

    return { x: nextX, y: nextY };
}

function move() {
    const nextCell = calculateNextCell(snake.direction);

    if (nextCell.x === food.x && nextCell.y === food.y) {
        placeFood();
        snake.body.unshift(nextCell);
        renderScene();
    }

    if (
        snake.body.some(
            (segment) => segment.x === nextCell.x && segment.y === nextCell.y
        )
    ) {
        console.log("hit");
        return;
    }

    snake.body.unshift(nextCell);
    snake.body.pop();

    renderScene();
}

function renderScene() {
    const playground = document.getElementById("playground");
    playground.innerHTML = "";

    const foodBlock = createBlock(food.x, food.y, "food-block");
    playground.appendChild(foodBlock);

    snake.body.forEach((segment) => {
        const snakeBlock = createBlock(segment.x, segment.y, "snake-block");
        playground.appendChild(snakeBlock);
    });
}

function createBlock(x, y, className) {
    const block = document.createElement("div");
    block.style.left = getOffsets(x);
    block.style.top = getOffsets(y);
    block.className = className;
    return block;
}

function getOffsets(offset) {
    return (offset - 1) * (100 / playGroundSize) + "%";
}

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            if (snake.direction !== "Down") {
                snake.direction = "Up";
            }
            break;
        case "ArrowRight":
            if (snake.direction !== "Left") {
                snake.direction = "Right";
            }
            break;
        case "ArrowDown":
            if (snake.direction !== "Up") {
                snake.direction = "Down";
            }
            break;
        case "ArrowLeft":
            if (snake.direction !== "Right") {
                snake.direction = "Left";
            }
            break;
        default:
            return;
    }
    //move();
});

function placeFood() {
    const x = Math.floor(Math.random() * playGroundSize) + 1;
    const y = Math.floor(Math.random() * playGroundSize) + 1;

    food.x = x;
    food.y = y;
}

renderScene();

setInterval(() => {
    move();
}, 30);
