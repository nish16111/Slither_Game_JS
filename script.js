// Initialization of constants and variables

let hiscore = localStorage.getItem('hiscore');
let direction = {x:0, y:0};

const moveSound = new Audio("move.mp3")
const foodSound = new Audio("food.mp3")
const gameOverSound = new Audio("gameover.mp3")

let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{x : 13, y : 15}]
let food = {x : 6, y : 7};
let score = 0;
let hiscoreval = 0;

// Functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collide(snake)
{
    // if the snake bumps into intself
    for(let i = 1; i < snakeArr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true
        }
    }

    // if the snake touches the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 ||
       snake[0].y >= 18 || snake[0].y <= 0)
    {
        return true;
    }

    return false;

}

function gameEngine()
{
    // Part1 --> Updating the snake and food

    if(collide(snakeArr))
    {
        gameOverSound.play();
        direction = {x:0, y:0};
        alert("Game Over, Reload to play again");
        snakeArr = [{x:13, y:15}];
        score = 0;
    }

    // if you have eaten the food regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodSound.play();
        score++;
        if(score > hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            document.getElementById('hiscorebox').innerHTML = "HiScore: " + hiscoreval;
        }


        snakeArr.unshift({x: snakeArr[0].x + direction.x,
        y: snakeArr[0].y + direction.y});
        
        let a = 2, b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()),
                y: Math.round(a + (b-a) * Math.random())}
    }

    // Move the snake

    for(let i = snakeArr.length - 2; i >= 0; i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Part2 Display / render snake and food

    // Display snake
    playArea.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }

        playArea.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playArea.appendChild(foodElement);
}

// Logical Code


if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}

else
{
    hiscoreval = JSON.parse(hiscore)
    hiscore.innerHTML = "Hiscore" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = {x:12, y:13};
    switch(e.key){
        case "ArrowUp":
            console.log("Arrow up key has been pressed");
            moveSound.play();
            direction.y = -1;
            direction.x = 0;
            break;

        case "ArrowDown":
            console.log("Arrow down has been pressed");
            moveSound.play();
            direction.y = 1;
            direction.x = 0;
            break;

        case "ArrowLeft":
            console.log("Arrow Left has been pressed");
            moveSound.play();
            direction.y = 0;
            direction.x = -1;
            break;

        case "ArrowRight":
            console.log("Arrow Right has been pressed");
            moveSound.play();
            direction.y = 0;
            direction.x = 1;
            break;

        default:
            break;
    }
})