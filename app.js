const playGroundSize = 10;
const snake = {
    body: [],
    direction: "",
};

snake.body.push({ x: 5, y: 3 });
snake.body.push({ x: 5, y: 4 });
snake.body.push({ x: 5, y: 5 });
snake.body.push({ x: 5, y: 6 });
snake.body.push({ x: 5, y: 7 });

function calculateNextCell(direction) {
    let nextPosition = { ...snake.body[0] };
    console.log("head", nextPosition);
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
    console.log("newhead", nextPosition);

    return nextPosition;
}

function move() {
    const nextCell = calculateNextCell(snake.direction);
    snake.body.unshift(nextCell);
    snake.body.pop();
    renderSnake();
}

function renderSnake() {
    const playground = document.getElementById("playground");
    playground.innerHTML = "";

    snake.body.forEach((segment, index) => {
        const renderBody = `<div class="snake-block">${index + 1}</div>`;
        playground.insertAdjacentHTML("beforeend", renderBody);
        const renderedBlock = document.querySelectorAll(
            ".snake-block:last-child"
        )[0];

        const topPosition = (segment.x - 1) * (100 / playGroundSize) + "%";
        const leftPosition = (segment.y - 1) * (100 / playGroundSize) + "%";

        renderedBlock.style.left = topPosition;
        renderedBlock.style.top = leftPosition;
    });
}

window.addEventListener("keydown", (event) => {
    console.log(event.code);
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

renderSnake();
