//Game constants and variable
let direction = {x:0 , y:0}

const foodSound = new Audio('./Assets/music/food.mp3');
const gameOverSound = new Audio('./Assets/music/gameover.mp3')
const musicSound = new Audio('./Assets/music/music.mp3')
const moveSound = new Audio('./Assets/music/move.mp3')
let speed =7;

let score =0;

let lastPaintTime =0 
let snakeArray = [
    {x:13 , y:15}
]

food = {x:10 , y:12}


// snakeElement.classList.add('head', 'snake');


//Game function

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();

}

function snakeCollide(snake){
    //if snake bump itself
    for (let i = 1; i < snakeArray.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        } 
    }
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }

}

function gameEngine(){
    //part 1 :updating the snake array and food

    if(snakeCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        direction  = {x:0 , y:0};
        alert("GAme Over .Press any key to continue ")

        snakeArray = [{x:10 , y:12}]
        musicSound.play();
        score = 0;

    }

    // if snake have eaten the food , increase score and regenerate the food
    if(snakeArray[0].y == food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score +=1;
        if(score > highscorevel){
            highscorevel = score;
            localStorage.setItem("highscore ",JSON.stringify(highscorevel));
            HighscoreBox.innerHTML = "HighScore : " + highscorevel;
        }
        scoreBox.innerHTML = "score : " + score;

        snakeArray.unshift({x: snakeArray[0].x + direction.x , y: snakeArray[0].y + direction.y});
        let a=1;
        let b=17;
        food ={x: Math.round(a+(b-a)*Math.random()),  y: Math.round(a+(b-a)*Math.random())}
    } 

    //Moving the Snake
    for (let i = snakeArray.length -2 ; i >= 0; i--) {
        // const element = snakeArray[i];
        snakeArray[i+1] ={...snakeArray[i]};
        musicSound.play();
        
    }

    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;


    //part 2 : display the snake and food

    //snake
    board.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }
        // else{
        //     snakeElement.classList.add('snake');
        // }
        board.appendChild(snakeElement);



    })



    //Food 
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
    
        board.appendChild(foodElement);

}





//Main logic starts here

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscorevel =0 ;
    localStorage.setItem("highscore",JSON.stringify(highscorevel));
}
else{
    highscorevel = JSON.parse(highscore)
    HighscoreBox.innerHTML = "HighScore : " + highscore;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    direction = {x:0 , y:1} //starts the game
    moveSound.play();

    switch (e.key) {

        case "ArrowUp":
            console.log("ArrowUP");
            direction.x=0;
            direction.y=-1;

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x=0;
            direction.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x=-1;
            direction.y=0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            direction.x=1;
            direction.y=0;
            break;
    
        default:
            break;
    }
})