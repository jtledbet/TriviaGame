
var allQuestions = [{
    q: "color of sky",
    a1: "red",
    a2: "white",
    a3: "blue",
    a4: "mauve",
    correct: "blue"
}, {
    q: "biggest animal",
    a1: "dog",
    a2: "mouse",
    a3: "elephant",
    a4: "cantaloupe",
    correct: "elephant"
}, {
    q: "cheapest car",
    a1: "lambo",
    a2: "kia",
    a3: "volvo",
    a4: "radio flyer",
    correct: "kia"
}, {
    q: "What is the name of Jon's direwolf?",
    a1: "Summer",
    a2: "Longclaw",
    a3: "Ghost",
    a4: "Spot",
    correct: "Ghost"
}]

var roundDuration = 10
var countDown = 0
var questionTime = 0
var curIndex = -1
var gameRunning = false
var answeredCorrectly = 0
var answeredIncorrectly = 0
var correctAnswer = ""

window.onload = function () {
    $("#startButton").on("click", function () {
        if (!gameRunning) {
            startGame();
            this.style.display = "none";
        }

    });

    $(".list-group-item").on("click", function () {
        if (gameRunning) {

            if (this.textContent === correctAnswer) {
                answeredRight(this, correctAnswer);
            } else {
                answeredWrong(this, correctAnswer);
            }
        }
    });
}

function startGame() {
    console.log(curIndex)
    curIndex++;
    if (curIndex < allQuestions.length) {
        gameRunning = true;
        stopConfetti();
        newQuestion();
        startTimer(roundDuration);    
    } else $("#results").text("All out of questions. Sorry.")

}

function newQuestion() {

    for (i = 1; i <= 4; i++) {
        var item = "ans" + i;
        var itemObj = document.getElementById(item)
        console.log(item + " " + itemObj)
        $(itemObj.style.backgroundColor = "FFFFFF")

    }

    $("#questionBox").text(allQuestions[curIndex].q)

    $("#ans1").text(allQuestions[curIndex].a1)
    $("#ans2").text(allQuestions[curIndex].a2)
    $("#ans3").text(allQuestions[curIndex].a3)
    $("#ans4").text(allQuestions[curIndex].a4)

    $("#ans1").attr("value", allQuestions[curIndex].correct)
    $("#ans2").attr("value", allQuestions[curIndex].correct)
    $("#ans3").attr("value", allQuestions[curIndex].correct)
    $("#ans4").attr("value", allQuestions[curIndex].correct)

    $("#results").text("Make your selection!")
    correctAnswer = allQuestions[curIndex].correct;

}

function startTimer(duration, display) {
    clearInterval(countDown)
    var timer = duration, minutes, seconds;

    countDown = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#clock").text(minutes + ":" + seconds);

        if (--timer < 0) {
            $("#results").text("Time's up! The correct answer was " + correctAnswer + ".")
            timeUp();
        }
    }, 1000);
}

function answeredRight(selected, corAns) {
    answeredCorrectly++;
    selected.style.backgroundColor = "#7FFF00"
    $("#results").text("Correct! Prepare for the next question.")

    resetClock();
    startConfetti();

    gameRunning = false;
    setTimeout(startGame, 3000)
}

function answeredWrong(selected, corAns) {
    answeredIncorrectly++;
    selected.style.backgroundColor = "#FD0000"
    $("#results").text("Incorrect! The correct answer was " + corAns + ".")

    highlightCorrect(corAns);

    resetClock();

    gameRunning = false;
    setTimeout(startGame, 3000)
}

function timeUp() {
    resetClock();

    highlightCorrect(correctAnswer);

    gameRunning = false;
    setTimeout(startGame, 3000)
}


function highlightCorrect(corAns) {
    for (i = 1; i < 4; i++) {
        var item = "ans" + i;
        var itemObj = document.getElementById(item)
        if (itemObj.textContent === corAns)
            $(itemObj.style.backgroundColor = "#7FFF00")
    }
}

function resetClock() {
    clearInterval(countDown)
    $("#clock").text(timeConverter(roundDuration))
    $("#btn-text").text("Next question!")
    // $("#startButton").show();
}


function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}  