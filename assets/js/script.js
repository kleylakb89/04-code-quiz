var headEl = document.getElementById("head");

var timeLeft = 5;

function counter() {
    headEl.textContent = "Time: " + timeLeft;
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