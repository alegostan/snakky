const playGroundSize = 50;
const snake = {
    body: [],
    direction: "",
};
var food = { x: 20, y: 10 };

snake.body.push({ x: 5, y: 3 });
snake.body.push({ x: 5, y: 4 });
snake.body.push({ x: 5, y: 5 });
snake.body.push({ x: 5, y: 6 });
snake.body.push({ x: 5, y: 7 });

function calculateNextCell(direction) {
    let nextPosition = { ...snake.body[0] };
    switch (direction) {
        case "Up":
            if (nextPosition.y === 1) {
                nextPosition.y = playGroundSize;
                break;
            }
            nextPosition.y--;
            break;
        case "Right":
            if (nextPosition.x === playGroundSize) {
                nextPosition.x = 1;
                break;
            }
            nextPosition.x++;
            break;
        case "Down":
            if (nextPosition.y === playGroundSize) {
                nextPosition.y = 1;
                break;
            }
            nextPosition.y++;

            break;
        case "Left":
            if (nextPosition.x === 1) {
                nextPosition.x = playGroundSize;
                break;
            }
            nextPosition.x--;

            break;
        default:
            break;
    }

    return nextPosition;
}

function move() {
    const nextCell = calculateNextCell(snake.direction);
    if (nextCell.x == food.x && nextCell.y == food.y) {
        snake.body.unshift(nextCell);
        placeFood();
    }

    snake.body.unshift(nextCell);
    snake.body.pop();

    renderScene();
}

function renderScene() {
    const playground = document.getElementById("playground");
    let foodBlock = `<div style="\
    left: ${getOffsets(food.x)}; \
    top: ${getOffsets(food.y)};" \
    class="food-block"></div>`;

    playground.innerHTML = "";
    playground.insertAdjacentHTML("beforeend", foodBlock);

    snake.body.forEach((segment) => {
        let snakeBlock = `<div style="\
        left: ${getOffsets(segment.x)}; \
        top: ${getOffsets(segment.y)};" \
        class="snake-block"></div>`;
        playground.insertAdjacentHTML("beforeend", snakeBlock);
    });
}

function getOffsets(offset) {
    return (offset - 1) * (100 / playGroundSize) + "%";
}

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            if (snake.direction !== "Down") {
                snake.direction = "Up";
            } else return;

            break;
        case "ArrowRight":
            if (snake.direction !== "Left") {
                snake.direction = "Right";
            } else return;
            break;
        case "ArrowDown":
            if (snake.direction !== "Up") {
                snake.direction = "Down";
            } else return;
            break;
        case "ArrowLeft":
            if (snake.direction !== "Right") {
                snake.direction = "Left";
            } else return;
            break;
        default:
            return;
    }
    move();
});

function placeFood() {
    let x = Math.abs(Math.floor(Math.random() * playGroundSize));
    let y = Math.abs(Math.floor(Math.random() * playGroundSize));

    food.x = x;
    food.y = y;
}

renderScene();
