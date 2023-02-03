let timeLeftDisplay= document.querySelector('#time-left');
let resultDisplay = document.querySelector('#result');
let stopPauseButton = document.querySelector('#start-pause-button');
let squares = document.querySelectorAll('.grid div');
let logsLeft = document.querySelectorAll('.grid .log-left');
let logsRight = document.querySelectorAll('.grid .log-right');
let carsLeft = document.querySelectorAll('.car-left');
let carsRight = document.querySelectorAll('.car-right');


let currentIndex = 76;
let width =9;
let timeId;
let timeDisplay = 20;
//move frog
//check just move into the grid
function moveFrog(e){
    squares[currentIndex].classList.remove('frog')
 switch(e.key){
    case 'ArrowLeft':
        if(currentIndex % width !== 0) 
        currentIndex -=1;
        break;
    case 'ArrowRight':
        if(currentIndex % width <  width-1)
        currentIndex +=1;
        break;
    case 'ArrowUp':
        if(currentIndex -width >=0)
        currentIndex -= width;
        break;
    case 'ArrowDown':
        if(currentIndex+ width < width * width)
        currentIndex += width;
        break;    
 }
 squares[currentIndex].classList.add('frog');
}

//
function autoMoveElement(){
    timeDisplay -=1;
    timeLeftDisplay.textContent = timeDisplay;
    logsLeft.forEach(logLeft => moveLogsLeft(logLeft));
    logsRight.forEach(logRight =>moveLogsRight(logRight));
    carsLeft.forEach(carLeft =>moveCarsLeft(carLeft));
    carsRight.forEach(carRight =>moveCarsRight(carRight));
    loose();
    win();
}
// move the logs
function moveLogsLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
             logLeft.classList.remove('l1');
             logLeft.classList.add('l2');
             break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1')
            break;
    }
}
// move logs right
function moveLogsRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
             break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4')
            break;
    }
}
// move car left
function moveCarsLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
             break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}
//move car right
function moveCarsRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
             break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

//win
function win(){
if(squares[currentIndex].classList.contains('ending-block')){
    console.log('you win');
    clearInterval(timeId);
    resultDisplay.textContent= 'You win';
}
}
function loose(){
    if( squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l1') ||
        squares[currentIndex].classList.contains('l2') ||
        squares[currentIndex].classList.contains('l3') ||
        timeDisplay <=0)
        {
            console.log(' you are looser');
            clearInterval(timeId);
            document.removeEventListener('keyup',moveFrog);
            resultDisplay.textContent= 'You loose';
            return;
    }
}
stopPauseButton.addEventListener('click', () => {
    console.log(timeId)
    if(timeId){
        clearInterval(timeId);
        timeId = null;
        document.removeEventListener('keyup',moveFrog);
    }
    else{
        timeId = setInterval(autoMoveElement,1000);
        document.addEventListener('keyup', moveFrog);
    }
})


