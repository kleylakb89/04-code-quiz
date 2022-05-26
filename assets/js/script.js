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
// var answerEl = document.querySelector(".answer");
// var aEl = document.getElementById("a");
// var bEl = document.getElementById("b");
// var cEl = document.getElementById("c");
// var dEl = document.getElementById("d");
var answer1El = document.createElement("li");
var answer2El = document.createElement("li");
var answer3El = document.createElement("li");
var answer4El = document.createElement("li");


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






// TODO: write questions array
var questions = [{
    question: "Question1?",
    answers: ["A", "B", "C", "D"],
    correct: 0
}, {
    question: "Question2?",
    answers: ["1", "2", "3", "4"],
    correct: 1
}, {
    question: "Question3?",
    answers: ["C", "B", "C", "D"],
    correct: 3
}, {
    question: "Question4?",
    answers: ["5", "6", "7", "8"],
    correct: 2
}, {
    question: "Question5?",
    answers: ["E", "B", "C", "D"],
    correct: 1
}];

console.log(questions);
var questionsIndex = 0;


// TODO: loop through questions

var displayQuestions = function () {
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

questionsEl.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("li")) {
        questionsIndex++;
        if (questionsIndex < questions.length) {
            displayQuestions();
        } else {
            currentState = "end";
            switchStates();
        }
    }
});


// TODO: save score and initials to local storage array of objects

var scores = function() {
    var savedScore = {
        initials: initialsEl.value.trim(),
        score: score
    };
    console.log(savedScore);
}




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



init();