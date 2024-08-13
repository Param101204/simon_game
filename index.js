var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var start = false;
$(".play").on("click", function() {
    $(".play").hide();
    nextSequence();
    start = true;
});
// find which button was pressed
$(".btn").on("click", function() {
    if(start === false){
        $("h1").html("Press The Button First.");
        $(".play").show();
    } else {
    var userColour = $(this).attr("id");
    userPattern.push(userColour);
    playAudio(userColour);
    press(userColour);
    check(userPattern.length - 1);
    }
});
function nextSequence() {
    userPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(colors[randomNumber]);
    $("#" + colors[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(colors[randomNumber]);
    level++;
    $("h1").html("Level " + level);
}
function playAudio(currColour) {
    var audio1 = new Audio("./" + currColour + ".mp3");
    audio1.play();
}
function press(currColour) {
    $("#" + currColour).addClass("pressed");
    setTimeout(function(){$("#" + currColour).removeClass("pressed");}, 100);
}
function check(index) {
    if(userPattern[index] === gamePattern[index]) {
        console.log("success");
        if(userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over! Your Score = " + (level - 1) + "</br>Continue Playing by Pressing the Button!")
        $(".play").show();
        level = 0;
        gamePattern = [];
        started = false;
    }
}