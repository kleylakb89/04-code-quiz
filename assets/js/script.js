// TODO: query states
var currentState = "start";
var timeLeft = 75;
var questionsIndex = 0;

var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var endEl = document.getElementById("end");
var scoresEl = document.getElementById("scores");
var startBtn = document.getElementById("startBtn");
var saveBtn = document.getElementById("saveBtn");
var againBtn = document.getElementById("againBtn");
var timeEl = document.getElementById("time");
var initialsEl = document.getElementById("initials");
var questionsEl = document.getElementById("questions");

var answer1El = document.createElement("button");
var answer2El = document.createElement("button");
var answer3El = document.createElement("button");
var answer4El = document.createElement("button");

// TODO: write questions array
var questions = [{
    question: "Question1?",
    answers: ["A", "B", "C", "D"],
    correct: "A"
}, {
    question: "Question2?",
    answers: ["1", "2", "3", "4"],
    correct: "4"
}, {
    question: "Question3?",
    answers: ["C", "B", "C", "D"],
    correct: "C"
}, {
    question: "Question4?",
    answers: ["5", "6", "7", "8"],
    correct: "7"
}, {
    question: "Question5?",
    answers: ["E", "B", "C", "D"],
    correct: "B"
}];

// Timer function
function counter() {
    timeEl.textContent = "Time: " + timeLeft;
};

function timer() {
    if (timeLeft < 75){
        timeLeft = 75;
    };
    counter();
    var timerInterval = setInterval(function () {
        timeLeft--;
        counter();
        
        if (timeLeft === 0 || currentState !== "quiz") {
            clearInterval(timerInterval);
        };
    }, 1000);
};

// TODO: display questions
var displayQuestions = function () {
    if(questionsIndex>=questions.length){
        questionsIndex = 0;
    }
    questionsEl.textContent = questions[questionsIndex].question;
    questionsEl.appendChild(answer1El);
    questionsEl.appendChild(answer2El);
    questionsEl.appendChild(answer3El);
    questionsEl.appendChild(answer4El);
    answer1El.textContent = questions[questionsIndex].answers[0];
    answer2El.textContent = questions[questionsIndex].answers[1];
    answer3El.textContent = questions[questionsIndex].answers[2];
    answer4El.textContent = questions[questionsIndex].answers[3];
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
        timer();
        displayQuestions();
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
  switchStates();
};


// TODO: save score and initials to local storage array of objects

var scores = function() {
    var savedScore = {
        initials: initialsEl.value.trim(),
        score: timeLeft
    };
    console.log(savedScore);
}




// TODO: add event listeners to buttons/answers
startBtn.addEventListener("click", function () {
    currentState = "quiz";
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

questionsEl.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("button")) {
        if (element.textContent === questions[questionsIndex].correct) {
            console.log("correct");
        } else {
            timeLeft -= 10;
        }
        questionsIndex++;
        if (questionsIndex < questions.length) {
            displayQuestions();
        } else {
            currentState = "end";
            switchStates();
        }
    }
});


init();