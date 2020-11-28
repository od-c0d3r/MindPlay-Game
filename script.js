function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function win(gameStart, openedCards, starRate) {
    let gameEnd = performance.now(); // Game End Time
    let gameTime = Math.round((gameEnd - gameStart) / 1000); // Calculate game time

    const winMode = document.createElement('div');
    winMode.className = 'winMode';
    document.body.appendChild(winMode);

    const winWindow = document.createElement('div');
    winWindow.className = 'winWindow';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'resetBtn';
    resetBtn.textContent = 'Play Again!';
    resetBtn.onclick = function() {
        document.location.reload(true);
    }

    const starTxt = document.createElement('div');
    starTxt.className = 'starTxt';
    starTxt.textContent = `Rate : ${starRate.textContent}`;

    const movesTxt = document.createElement('p');
    movesTxt.className = 'movesTxt';
    movesTxt.textContent = `Moves : ${openedCards.length}`;

    const timeTxt = document.createElement('p');
    timeTxt.className = 'timeTxt';
    timeTxt.textContent = `Time : ${gameTime} Sec`;

    winWindow.appendChild(timeTxt);
    winWindow.appendChild(starTxt);
    winWindow.appendChild(movesTxt);
    winWindow.appendChild(resetBtn);
    winMode.appendChild(winWindow);
    document.body.appendChild(winMode);
}

// Creates Start Button
const startGameBtn = document.createElement('button');
startGameBtn.textContent = 'Start';
startGameBtn.className = 'btn';
document.body.appendChild(startGameBtn);
startGameBtn.onclick =

    // Main Function 
    function startGame() {
        let gameStart = performance.now(); // Start Timer
        game(gameStart, openedCards);
    };

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

let openedCards = [];
let currentGame = [];
let greenCards = [];


function game(gameStart, openedCards) {

    //Timer
    setInterval(function(){
        let timerDiv = document.querySelector('.timer')
        let timeNOW = performance.now();
        let timeDiff = timeNOW - gameStart ;
        if (greenCards.length !== 16){
        timerDiv.innerHTML = `${Math.round(timeDiff/1000)} ⏰`
            }else{timerDiv.innerHTML = ` ⏰`;}
        });

    // Restart BTN
    const restartBTN = document.querySelector('.restart');
    restartBTN.onclick = function() {
        document.location.reload(true);
    }

    startGameBtn.remove();
    const cardsTable = document.createElement('div');
    cardsTable.className = 'cardsTable';

    // Cards creation
    let cardsContent = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
    cardsContent = shuffle(cardsContent);

    for (let i = 0; i <= 15; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = cardsContent[i];
        cardsTable.appendChild(card);
    };
    document.body.appendChild(cardsTable);


    cardsTable.addEventListener('click', function eventStart(event) {
        if (event.target.className === 'card') { // card is clicked

            let counterDiv = document.querySelector('.counter');
            counterDiv.innerHTML = `${openedCards.length+1}`;
            cardsTable.insertAdjacentElement("beforebegin", counterDiv);

            //Star Rate system
            let starRate = document.querySelector('.starRate');

            switch (openedCards.length + 1) {
                case 1:
                    starRate.innerHTML = `⭐⭐⭐`;
                    break;
                case 21:
                    starRate.innerHTML = `⭐⭐`;
                    break;
                case 31:
                    starRate.innerHTML = `⭐`;
                    break;
                default:
                    break;
            }

            event.target.classList.toggle("show");
            currentGame.push(event.target); // initial game
            openedCards.push(event.target); // whole game for moves counter
            console.log(currentGame);

            if (currentGame.length == 2) { // two cards are opened
                console.log("two cards are opened");
                if (currentGame[0].textContent !== currentGame[1].textContent) { // not equal

                    currentGame[0].classList.toggle('red');
                    currentGame[1].classList.toggle('red');

                    setTimeout(function(currentGame) {
                        console.log(currentGame[0], currentGame[1]);
                        currentGame[0].classList.toggle('show');
                        currentGame[1].classList.toggle('show');
                        currentGame[0].classList.toggle('red');
                        currentGame[1].classList.toggle('red');
                    }, 1200, currentGame);


                } else { // equal
                    currentGame[0].classList.toggle('green');
                    currentGame[1].classList.toggle('green');
                    greenCards.push(currentGame[0]);
                    greenCards.push(currentGame[1]);
                    if (greenCards.length == 16) {

                        win(gameStart, openedCards, starRate);

                    }
                    console.log('Green Cards ' + greenCards.length)
                }

                currentGame = [];
                console.log(openedCards.length);
            } else { //currentGame.length > 2 
                return;
            }
        } else { // not a card selected
            return; //Don't change it
        }

    });
}