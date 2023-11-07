const playGroundSize = { x: 10, y: 10 };
var direction = 0;
const snake = {
    headPos: {
        x: 5,
        y: 5,
    },
    body: [],

    move() {
        switch (direction) {
            case 1:
                if (this.headPos.x === 0) this.headPos.x = 10;
                this.headPos.x = 1 + (this.headPos.x % 10);
                break;
            case 2:
                if (this.headPos.y === 0) this.headPos.y = 10;
                this.headPos.y = 1 + (this.headPos.y % 10);

                break;
            case 3:
                if (this.headPos.x == 10) this.headPos.x--;

                this.headPos.x = Math.abs((this.headPos.x % 10) - 1);

                if (this.headPos.x == 0) {
                    this.headPos.x = 10;
                }
                break;
            case 4:
                if (this.headPos.y == 10) this.headPos.y--;

                this.headPos.y = Math.abs((this.headPos.y % 10) - 1);
                if (this.headPos.y == 0) {
                    this.headPos.y = 10;
                }

                break;
            default:
                break;
        }
    },
};

function renderSnake() {
    const renderBody = '<div class="snake-block"></div>';
    for (var item of snake.body) {
        const playground = document.getElementById("playground");
        playground.innerHTML = "";
        playground.insertAdjacentHTML("beforeend", renderBody);

        renderedBlock = document.querySelectorAll(".snake-block:last-child")[0];

        renderedBlock.style["top"] =
            (
                playground.offsetHeight -
                item.x * (playground.offsetHeight / playGroundSize.x)
            ).toString() + "px";
        renderedBlock.style["left"] =
            (
                (item.y - 1) *
                (playground.offsetWidth / playGroundSize.y)
            ).toString() + "px";
    }
}

window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37:
            direction = 4;
            break;
        case 38:
            direction = 1;
            break;
        case 39:
            direction = 2;
            break;
        case 40:
            direction = 3;
            break;
        default:
            return;
    }
    console.log(event.keyCode, snake.headPos, direction);

    snake.move();
    renderSnake();
});
snake.body.push(snake.headPos);
renderSnake();
