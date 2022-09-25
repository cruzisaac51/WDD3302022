// alerts note 1
const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

function start(quiz){
    let score = 0;

    // main game loop
    for(const [question,answer] of quiz){
        const response = ask(question);
        check(response,answer);
    }
    // end of main game loop

    gameOver();

    // function declarations
    function ask(question){
        return prompt(question);
    }

    function check(response,answer){
        if(response === answer){
        alert('Correct!');
        score++;
        } else {
        alert(`Wrong! The correct answer was ${answer}`);
        }
    }

    function gameOver(){
        alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
    }
}

function doSomething(){
    document.getElementById('id_truebtn').onclick = start(quiz);
}
//Date note 2

var today = new Date();
  var day = today.getDay();
  var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  document.querySelector("#dateyear").innerHTML = `${"Today is : " + daylist[day] + "."}`;

  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();
  var prepand = (hour >= 12)? " PM ":" AM ";
  hour = (hour >= 12)? hour - 12: hour;
  if (hour === 0 && prepand ===' PM ') { 
    if (minute === 0 && second === 0) { 
        hour=12;
        prepand=' Noon';
    } 
    else { 
        hour=12;
        prepand=' PM';
    } 
} 
  if (hour === 0 && prepand === ' AM ') { 
    if (minute === 0 && second === 0) { 
        hour=12;
        prepand=' Midnight';
    } 
    else { 
        hour=12;
        prepand=' AM';
    } 
} 
document.querySelector("#timer").innerHTML = `${"Current Time : "+hour + prepand + " : " + minute + " : " + second}`;
