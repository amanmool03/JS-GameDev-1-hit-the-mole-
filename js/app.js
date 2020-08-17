const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const scoreCard = document.querySelector('.score-card');

let lastHole;
let timeUp = false;
let Gametime = 10000;
let scoreResult = 0;
let currentTime = time.textContent;
let timerID;


const reset = () => {
    timeUp = false;
    Gametime = 10000;
    scoreResult = 0;
    currentTime = 10;
    time.textContent = 10;
    score.textContent = 0;
    holes.forEach(hole => hole.classList.remove('smashed'));

}
// Random time for the mole to be shown
const randTime = (min, max) => {
    return (Math.round(Math.random() * (max - min) + min));
}

// to select the random hole to display the mole
const randHole = (holes) => {
    const idx = Math.floor(Math.random() * holes.length);
    console.log(idx);
    const hole = holes[idx];
    if (lastHole === hole) {
        console.log("same aayo");
        return randHole(holes);
    }
    lastHole = hole;
    return (hole);
}

//function for peep animation to take place
const peep = () => {
    holes.forEach(hole => hole.classList.remove('smashed'));
    const time = randTime(50, 1000);
    const hole = randHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

const startGame = () => {
    timerID = setInterval(countDown, 1000);
    score.textContent = 0;
    timeUp = false;
    peep();

    setTimeout(() => {
        timeUp = true;
    }, Gametime);

    console.log('clicked');

}

function bonk(e) {
    if (!e.isTrusted) return;
    scoreResult++;
    this.parentNode.classList.remove('up');
    this.parentNode.classList.add('smashed')
    console.log(this);
    score.textContent = scoreResult;
};


moles.forEach((mole) => {
    mole.addEventListener('click', bonk)
})


const countDown = () => {
    currentTime--;
    time.textContent = currentTime;

    if (currentTime == 0) {
        let result = scoreResult;
        reset();
        clearInterval(timerID);
        show(result);
    }
}


const show = (result) => {
    scoreCard.classList.add('visible');
    scoreval = document.querySelector('.FinalScore');
    scoreval.textContent = result;
}

const exit = () => {
    scoreCard.classList.remove('visible');
}

