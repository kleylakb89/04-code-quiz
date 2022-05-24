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