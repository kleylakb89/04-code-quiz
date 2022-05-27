// establish variables and queried states
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
var leaderboardEl = document.getElementById("leaderboard");
var viewScoresEL = document.getElementById("viewScores");

var answer1El = document.createElement("button");
var answer2El = document.createElement("button");
var answer3El = document.createElement("button");
var answer4El = document.createElement("button");
var rightOrWrong = document.createElement("p");

// questions array of objects for quiz
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

// display questions - appends and fills content of questions and answers
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

// switch states function - sets sections of HTML to either display block or none depending on what is the currentState. This way, start screen will always be the start button, the quiz will cycle through the questions, the end screen will game over, and high scores will display the scores
var switchStates = function () {
    if (currentState === "start") {
        startEl.style.display = "block";
        quizEl.style.display = "none";
        endEl.style.display = "none";
        scoresEl.style.display = "none";
        viewScoresEL.setAttribute("id", "viewScores");
        viewScoresEL.textContent = "View High Scores";

    }
    if (currentState === "quiz") {
        startEl.style.display = "none";
        quizEl.style.display = "block";
        endEl.style.display = "none";
        scoresEl.style.display = "none";
        viewScoresEL.setAttribute("id", "disabled");
        timer();
        displayQuestions();
    }
    if (currentState === "end") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "block";
        scoresEl.style.display = "none";
        viewScoresEL.setAttribute("id", "viewScores");
        viewScoresEL.textContent = "Back";
    } 
    if (currentState === "scores") {
        startEl.style.display = "none";
        quizEl.style.display = "none";
        endEl.style.display = "none";
        scoresEl.style.display = "block";
        viewScoresEL.setAttribute("id", "viewScores");
        saveScores();
        leaderboardEl.innerHTML = "";
        displayScores();
    }
};

// intializing function - how the page will begin
var init = function () {
  switchStates();
};

// for when the end screen needs to display
var displayEnd = function() {
    currentState = "end";
    switchStates();
}


// save score and initials to local storage array of objects
var saveScores = function() {
    // sets a single object variable with the input initials and remaining time
    var savedScore = {
        initials: initialsEl.value.trim(),
        score: timeLeft
    };
    // pulls the high scores from local storage if they exist
    var highestScores = JSON.parse(localStorage.getItem("highScore")) || [];

    // keeps scores below the start time
    if (savedScore.score < 75){
        highestScores.push(savedScore);
    }

    // organizes scores highest first
    highestScores.sort(function(first, second) {
        return second.score - first.score;
    });

    // keeps saved scores from going beyond 10 total
    if (highestScores.length > 10) {
        highestScores.pop();
    }

    // sets high scores in local storage
    localStorage.setItem("highScore", JSON.stringify(highestScores));
}

// to display scores, pulls them from local storage, the loops and appends the list as paragraphs
var displayScores = function() {
    var highestScores = JSON.parse(localStorage.getItem("highScore")) || [];
    for (var i = 0; i < highestScores.length; i++) {
        var scoreList = document.createElement("p");
        leaderboardEl.appendChild(scoreList);
        scoreList.textContent = "Player: " + highestScores[i].initials + "  Score: " + highestScores[i].score;
    }
}



// event listeners to buttons/answers
startBtn.addEventListener("click", function() {
    currentState = "quiz";
    rightOrWrong.textContent = "";
    switchStates();
});

saveBtn.addEventListener("click", function() {
    currentState = "scores";
    switchStates();
});

againBtn.addEventListener("click", function() {
    currentState = "start";
    switchStates();
});

// allows right and wrong answers to be selected in quiz. Subtracts ten seconds from timeLeft if given a wrong answer
questionsEl.addEventListener("click", function(event){
    var element = event.target;
    rightOrWrong.textContent = "";
    if (element.matches("button")) {
        if (element.textContent === questions[questionsIndex].correct) {
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

// switches state and content of "View High Scores" so user can navigate from start state to score state and back
viewScoresEL.addEventListener("click", function() {
    if (currentState === "start") {
        viewScoresEL.textContent = "Back";
        currentState = "scores";
        switchStates();
    } else if (currentState === "scores") {
        viewScoresEL.textContent = "View High Scores";
        currentState = "start";
        switchStates();
    } else if (currentState === "end") {
        viewScoresEL.textContent = "Back";
        currentState = "start";
        switchStates();
    }
})


// initializes page
init();