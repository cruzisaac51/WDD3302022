const url = 'https://spbooks.github.io/jsninja2/Ch%2013/quiz/questions.json';

fetch(url)
.then(res => res.json())
.then(quiz => {
    view.start.addEventListener('click', () => game.start(quiz.questions), false);
    view.response.addEventListener('click', (event) => game.check(event), false);
});


// Utility functions
function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
      if (b === 1) {
          [a,b] = [b,a];
      }
      return Math.floor((b-a+1) * Math.random()) + a;
}
    
function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i)-1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}
    
// View Object
const view = {
    score: document.querySelector('#score strong'),
    question: document.querySelector('#question'),
    result: document.querySelector('#result'),
    info: document.querySelector('#info'),
    start: document.querySelector('#start'),
    response: document.querySelector('#response'),
    timer: document.querySelector('#timer strong'),
    render(target,content,attributes) {
        for(const key in attributes) {
        target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    show(element){
        element.style.display = 'block';
    },
    hide(element){
        element.style.display = 'none';
    },
    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,game.score);
        this.render(this.result,'');
        this.render(this.info,'');
    },
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },
    buttons(array){
    return array.map(value => `<button>${value}</button>`).join('');
    }
};

const game = {
    start(quiz){
        console.log('start() invoked');
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.secondsRemaining = 20;
        this.timer = setInterval( this.countdown , 1000 );
        this.ask();
    },
    countdown() {
        game.secondsRemaining--;
        view.render(view.timer,game.secondsRemaining);
            if(game.secondsRemaining <= 0) {
            game.gameOver();
            }
    },
    ask(name){
    console.log('ask() invoked');
    if(this.questions.length > 2) {
        shuffle(this.questions);
        this.question = this.questions.pop();
        const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
        shuffle(options);
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question,question);
        view.render(view.response,view.buttons(options));
    }
    else {
        this.gameOver();
    }
    },
    check(event){
        console.log('check(event) invoked');
        const response = event.target.textContent;
        const answer = this.question.realName;
        if(response === answer){
            console.log('correct');
            view.render(view.result,'Correct!',{'class':'correct'});
            this.score++;
            view.render(view.score,this.score);
        } else {
            console.log('wrong');
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        this.ask();
    },
    gameOver(){
        console.log('gameOver() invoked');
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        view.teardown();
        clearInterval(this.timer);
    }
}



// note 3 


const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();