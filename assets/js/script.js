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
var rightOrWrong = document.createElement("p");

rightOrWrong.textContent = "";

// TODO: write questions array
var questions = [{
    question: "What would you use to iterate through an array?",
    answers: ["For Loop", "If/Else", "String", "Object"],
    correct: "For Loop"
}, {
    question: "What encloses a string?",
    answers: ["Variable", "Parentheses", "Brackets", "Quotes"],
    correct: "Quotes"
}, {
    question: "Which of these is a Boolean value?",
    answers: ["Yes", "Nope", "True", "8"],
    correct: "True"
}, {
    question: "What encloses an array?",
    answers: ["Variable", "Parentheses", "Brackets", "Quotes"],
    correct: "Brackets"
}, {
    question: "What do you traverse when accessing HTML?",
    answers: ["The Web-o-verse", "DOM", "Code Snippets", "None of the above"],
    correct: "DOM"
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
            displayEnd();
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
        saveScores();
    }
};

// TODO: initializing function
var init = function () {
  switchStates();
};

var displayEnd = function() {
    currentState = "end";
    switchStates();
}


// TODO: save score and initials to local storage array of objects

var saveScores = function() {
    var savedScore = {
        initials: initialsEl.value.trim(),
        score: timeLeft
    };

    var highestScores = JSON.parse(localStorage.getItem("highScore")) || [];

    highestScores.push(savedScore);

    highestScores = [{
        initials: "KBK",
        score: 28
    },{
        initials: "MAM",
        score: 39
    }];
    console.log(highestScores);

    highestScores.sort(function(first, second) {
        return second.score - first.score;
    });
    console.log(highestScores);
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
            quizEl.appendChild(rightOrWrong);
            rightOrWrong.textContent = "Correct!";
        } else {
            if (timeLeft >= 10){
                timeLeft -= 10;
                quizEl.appendChild(rightOrWrong);
                rightOrWrong.textContent = "Wrong!";
            } else {
                timeLeft = 1;
                quizEl.appendChild(rightOrWrong);
                rightOrWrong.textContent = "Wrong!";
                displayEnd();
            }
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