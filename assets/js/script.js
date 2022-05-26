// TODO: query states
// TODO: initializing function
// TODO: switch states function
// TODO: write questions array
// TODO: loop through questions
// TODO: add event listeners to buttons/answers
// TODO: write score function
// TODO: save score and initials to local storage array of objects





var timeEl= document.getElementById("time");

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

timer();