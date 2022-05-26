// TODO: query states
var currentState = "start";
var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var endEl = document.getElementById("end");
var scoresEl = document.getElementById("scores");
var startBtn = document.getElementById("startBtn");

var testEl = document.getElementById("test");

var saveBtn = document.getElementById("saveBtn");
var againBtn = document.getElementById("againBtn");
var timeEl = document.getElementById("time");



// TODO: switch states function
var switchStates = function () {
    if (currentState === "start") {
        startEl.style.display = "block";
        quizEl.style.display = "none";
        endEl.style.display = "none";
        scoresEl.style.display = "none";
    } else if (currentState === "quiz") {
        startEl.style.display = "none";
        quizEl.style.display = "block";
        endEl.style.display = "none";
        scoresEl.style.display = "none";
        timer();
    } else if (currentState === "end") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "block";
        scoresEl.style.display = "none";
    } else if (currentState === "scores") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "none";
        scoresEl.style.display = "block";
    }
};

// TODO: initializing function
var init = function () {
    switchStates();
};

// TODO: add event listeners to buttons/answers
startBtn.addEventListener("click", function () {
    currentState = "quiz";
    switchStates();
});

testEl.addEventListener("click", function () {
    currentState = "end";
    switchStates();
});

saveBtn.addEventListener("click", function () {
    currentState = "scores";
    switchStates();
});

againBtn.addEventListener("click", function () {
    currentState = "start"
    switchStates();
});

// Timer function and variable
// TODO: Debug timer starting early
var timeLeft = 5;
function counter() {
    timeEl.textContent = "Time: " + timeLeft;
};

function timer() {
    counter();
    var timerInterval = setInterval(function () {
        timeLeft--;
        counter();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
        };
    }, 1000);
};

// if (currentState === "quiz") {
//     timer();
// };


// TODO: write score function
var score = timeLeft;
console.log(score);


// TODO: write questions array
// TODO: loop through questions
// TODO: save score and initials to local storage array of objects







init();