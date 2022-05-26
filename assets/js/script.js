// TODO: query states
var currentState = "start";
var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var endEl = document.getElementById("end");
var timeEl= document.getElementById("time");


// TODO: initializing function
var init = function() {
    switchStates();
};


// TODO: switch states function
var switchStates = function() {
    if (currentState === "start") {
        startEl.style.display = "block";
        quizEl.style.display = "none";
        endEl.style.display = "none";
    } else if (currentState === "quiz") {
        startEl.style.display = "none";
        quizEl.style.display = "block";
        endEl.style.display = "none";
    } else if (currentState === "end") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "block";
    }
};


// TODO: add event listeners to buttons/answers



// TODO: write questions array
// TODO: loop through questions
// TODO: write score function
// TODO: save score and initials to local storage array of objects






var timeLeft = 5;

function counter() {
    timeEl.textContent = "Time: " + timeLeft;
}

function timer() {
    counter();
    var timerInterval = setInterval(function() {
        timeLeft--;
        counter();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}


init();
timer();