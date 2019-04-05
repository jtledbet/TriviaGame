
var allQuestions = [{
    q: "What is the name of Jon's direwolf?",
    a1: "Summer",
    a2: "Longclaw",
    a3: "Ghost",
    a4: "Spot",
    correct: "Ghost"
}, {
    q: "Which name is given to the bastards of The Reach?",
    a1: "Sand",
    a2: "Fog",
    a3: "Snow",
    a4: "Flowers",
    correct: "Flowers"
}, {
    q: "Which House is a direct vassal of House Baratheon of King's Landing?",
    a1: "Samwell",
    a2: "Stokeworth",
    a3: "Varys",
    a4: "Viserys",
    correct: "Stokeworth"
}, {
    q: "In the first episode, King Robert Baratheon says \"In my dreams, I kill him every night.\" To whom is the King referring and why?",
    a1: "Rhaegar",
    a2: "Tyrion",
    a3: "Jaime",
    a4: "Podrick",
    correct: "Rhaegar"
}, {
    q: "At Hoster Tully's funeral, who shot the burning arrow that hit its mark?",
    a1: "Edmund Tully",
    a2: "Brynden Tully",
    a3: "Dickon Tully",
    a4: "Catelyn Tully",
    correct: "Brynden Tully"
}, {
    q: "Which name is given to the bastards of Dorne?",
    a1: "Stone",
    a2: "Hill",
    a3: "Sand",
    a4: "Flowers",
    correct: "Sand"
}, {
    q: "In season 2, who does Tyrion tell Varys he is planning on marrying to Princess Myrcella?",
    a1: "Joffrey Lannister",
    a2: "Bronn",
    a3: "Gendry",
    a4: "Theon Greyjoy",
    correct: "Theon Greyjoy"
}, {
    q: "How many fingertips did Stannis Baratheon chop off of Davos' hand(s)?",
    a1: "1",
    a2: "2",
    a3: "4",
    a4: "8",
    correct: "4"
}, {
    q: "Who is king of Westeros when the the series begins?",
    a1: "Robert Baratheon",
    a2: "Tywin Lannister",
    a3: "Euron Greyjoy",
    a4: "Renly Baratheon",
    correct: "Robert Baratheon"
}, {
    q: "What is Olenna's relationship to Mace Tyrell?",
    a1: "Mother",
    a2: "Sister",
    a3: "Daughter",
    a4: "Lover",
    correct: "Mother"
}, {
    q: "Which name is given to the bastards of The Westerlands?",
    a1: "Snow",
    a2: "Hill",
    a3: "Sand",
    a4: "Stone",
    correct: "Hill"
}, {
    q: "\"I always hated crossbows. Take too long to load!\"",
    a1: "Rodrik Cassel",
    a2: "Jory Cassel",
    a3: "Robb Stark",
    a4: "Yoren",
    correct: "Yoren"
},]


var roundDuration = 10
var countDown = 0
var curIndex = -1
var gameRunning = false
var answeredCorrectly = 0
var answeredIncorrectly = 0
var correctAnswer = ""
var questionsAsked = 0

window.onload = function () {

    // startGame();
    $("#scoreBox").hide();
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
   
    $("#restartButton").on("click", function () {

        curIndex = -1
        answeredCorrectly = 0
        answeredIncorrectly = 0

        startGame();
        $("#main").show();
        $("#scoreBox").hide();
    
    });

    // this was for debug:
    // $("#clock").on("click", function () {
    //     scoreScreen();
    // });
}

function startGame() {
    
    console.log(curIndex)
    curIndex++;

    if (curIndex < allQuestions.length) {
        gameRunning = true;
        stopConfetti();
        newQuestion();
        startTimer(roundDuration);    
    } else {
        $("#results").text("All out of questions. Game over.")
        setTimeout(scoreScreen, 3000)
    }

}

function newQuestion() {

    // return all answer panels to white
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
            $("#results").html("Time's up! The correct answer was " + correctAnswer + ". <br>"
            + "Prepare for the next question.")
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
    
    $("#results").html("Incorrect! The correct answer was " + corAns + ". <br>"
    + "Prepare for the next question.")

    highlightCorrect(corAns);

    resetClock();

    gameRunning = false;
    setTimeout(startGame, 3000)
}

function timeUp() {
    answeredIncorrectly++;
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
    $("#btn-text").text("")
    // $("#startButton").show();
}

function scoreScreen() {
    console.log("calculating score")
    $("#totalQuestions").html("Total Questions: " + allQuestions.length)
    $("#correctAnswers").html("Correct Answers: " + answeredCorrectly)
    $("#incorrectAnswers").html("Incorrect Answers: " + answeredIncorrectly)
    $("#finalScore").html("Final Score: " + calcScore(allQuestions.length, answeredCorrectly) + "%")

    $("#main").hide();
    $("#scoreBox").show();
}

function calcScore (totalQs, correctQs) {
    var score = Math.round((100 / totalQs) * correctQs);
    return score;
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