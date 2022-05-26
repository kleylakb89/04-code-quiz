// TODO: query states
var currentState = "start";
var timeLeft = 5;

var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var endEl = document.getElementById("end");
var scoresEl = document.getElementById("scores");
var startBtn = document.getElementById("startBtn");

var testEl = document.getElementById("test");

var saveBtn = document.getElementById("saveBtn");
var againBtn = document.getElementById("againBtn");
var timeEl = document.getElementById("time");
var initialsEl = document.getElementById("initials");
var questionsEl = document.getElementById("questions");


// Timer function
function counter() {
    timeEl.textContent = "Time: " + timeLeft;
};

function timer() {
    if (timeLeft < 5){
        timeLeft = 5;
    };
    counter();
    var timerInterval = setInterval(function () {
        timeLeft--;
        counter();
        
        if (timeLeft === 0 || currentState !== "quiz") {
            clearInterval(timerInterval);
        };
    }, 1000);
    console.log(timeLeft);
    return(timeLeft);
};

// TODO: switch states function
var switchStates = function () {
    if (currentState === "start") {
        startEl.style.display = "block";
        quizEl.style.display = "none";
        endEl.style.display = "none";
        scoresEl.style.display = "none";
    }
    if (currentState === "quiz") {
        startEl.style.display = "none";
        quizEl.style.display = "block";
        endEl.style.display = "none";
        scoresEl.style.display = "none";
        var score = timer();
        displayQuestions();
        console.log(score);
        return(score);
    }
    if (currentState === "end") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "block";
        scoresEl.style.display = "none";
    } 
    if (currentState === "scores") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "none";
        scoresEl.style.display = "block";
        scores();
    }
};

// TODO: initializing function
var init = function () {
  var score = switchStates();
  console.log(score);
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





// TODO: write questions array
var questions = [{
    Question: "Question?",
    AnswerA: "A", 
    AnswerB: "B",
    AnswerC: "C", 
    AnswerD: "D"
}, {
    Question: "Question?",
    AnswerA: "A", 
    AnswerB: "B",
    AnswerC: "C", 
    AnswerD: "D"
}, {
    Question: "Question?",
    AnswerA: "A", 
    AnswerB: "B",
    AnswerC: "C", 
    AnswerD: "D"
}, {
    Question: "Question?",
    AnswerA: "A", 
    AnswerB: "B",
    AnswerC: "C", 
    AnswerD: "D"
}, {
    Question: "Question?",
    AnswerA: "A", 
    AnswerB: "B",
    AnswerC: "C", 
    AnswerD: "D"
}];


// TODO: loop through questions
var displayQuestions = function () {
    questionsEl.textContent = questions;

};


// TODO: save score and initials to local storage array of objects

var scores = function() {
    var savedScore = {
        initials: initialsEl.value.trim(),
        score: score
    };
    console.log(savedScore);
}







init();