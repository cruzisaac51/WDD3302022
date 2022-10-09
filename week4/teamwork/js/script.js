const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let clicked = [];
let boardBlocked = false;
let player1 = "X";
// const player2 = 'O';
// let player = player1;
let clickPlayer = [];		
		clickPlayer["X"] = [];
		clickPlayer["O"] = [];
let counter = [];		
		counter["X"] = 0;
		counter["O"] = 0;

const winner = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
    ];

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));

    var restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', resetBoard);

function check(player1){
    if(clickPlayer[player1].length < 3){
        return false
    }

    for(let i=0; i<clickPlayer[player1].length; i++) {
        for(let j=0; j<clickPlayer[player1].length; j++) {
            for(let z=0; z<clickPlayer[player1].length; z++) {

                var combination = [
                clickPlayer[player1][i], 
                clickPlayer[player1][j], 
                clickPlayer[player1][z]
                ];

                for(let y=0; y<winner.length; y++) {
                    if(JSON.stringify(winner[y]) === JSON.stringify(combination)){
                        win();
                        return true;
                    }
                }

            }
        }
    }
    
}
function cellClick(clickedCellEvent) {
    if(!boardBlocked){
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = clickedCell.getAttribute('data-cell');
        if(!clicked.includes(clickedCellIndex)){
            clicked.push(clickedCellIndex);
            clickPlayer[player1].push(parseInt(clickedCellIndex));
            clickedCell.innerHTML = '<span class="player-' + player1 + '">' + player1 + '</span>';
            check(player1);
            changePlayer();
        }
    }
}

function changePlayer() {
    player1 = player1 === "X" ? "O" : "X";			
}

function win(){
    boardBlocked = true;
    document.getElementById('board').classList.add("boardBlocked");
    document.getElementById('result').classList.add("visible");
    document.getElementById('result').innerHTML = player1 + " winner!";
    addToMarker(player1);
}

function addToMarker(player1){
    counter[player1] ++;
    document.getElementById('marker-' + player1).innerHTML = counter[player1];
}

function resetBoard(){
    clicked = [];
    boardBlocked = false;
    current_player = "X";
    clickPlayer["X"] = [];
    clickPlayer["O"] = [];
    document.getElementById('result').innerHTML = "";	
    document.getElementById('board').classList.remove("boardBlocked");
    document.getElementById('result').classList.remove("visible");
    document.querySelectorAll('.cell').forEach(cell => cell.textContent='');					
}


// function addPiece(e) {
//     console.log(e.target);
//     e.target.innerHTML = player;
//     if (player === player1) player = player2;
//     else player = player1;
// }

// function resetBoard() {
//     const board = document.getElementById('board');
//     for (let i = 0; i < board.children.length; i++) {
//         board.children[i].innerText = '';
//     }
//     const children = Array.from(board.children);
//     const empty = children.filter(function(child) {
//         return child.innerText == 'X' || child.innerText == 'O';
//     });
//     console.log(empty)
// }


// board.addEventListener('click', addPiece);
// resetButton.addEventListener('click', resetBoard)

