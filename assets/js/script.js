var headEl = document.getElementById("head");

var timeLeft = 5;

function timer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        console.log(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

timer();