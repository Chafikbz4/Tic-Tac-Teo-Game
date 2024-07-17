let btn = document.getElementsByClassName("btn");
let turn = 0; // Counter to keep track of turns
let scoreO = document.getElementById("score-o");
let scoreX = document.getElementById("score-x");
let PlayAgain = document.getElementById("yes");
let Back = document.getElementById("no");
let hide = document.querySelector(".modul");

let play = function(btn) {
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function() {
            if (btn[i].innerText === "") { // Only allow setting if the button is empty
                if (turn % 2 == 0) {
                    btn[i].innerText = "X";
                } else {
                    btn[i].innerText = "O";
                }
                btn[i].disabled = true; // Disable the button once clicked
                turn++; // Increment turn counter

                let winner = checkWinner();
                if (winner) {
                    if (winner.player === "X") {
                        scoreX.innerText = `X: ${parseInt(scoreX.innerText.split(": ")[1]) + 1}`;
                    } else {
                        scoreO.innerText = `O: ${parseInt(scoreO.innerText.split(": ")[1]) + 1}`;
                    }
                    highlightWinner(winner.combination);
                } else if (turn === 9) {
                    // All buttons are filled and there's no winner
                    showDraw();
                }
            }
        }
    }
};

let checkWinner = function() {
    // Define winning combinations
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combination of winCombinations) {
        const [a, b, c] = combination;
        if (btn[a].innerText !== "" && btn[a].innerText === btn[b].innerText && btn[a].innerText === btn[c].innerText) {
            return { player: btn[a].innerText, combination }; // Return "X" or "O" and the winning combination
        }
    }
    return null;
}

let highlightWinner = function(combination) {
    for (let i = 0; i < btn.length; i++) {
        if (!combination.includes(i)) {
            btn[i].disabled = true; // Disable all buttons except the winning ones
        }
    }
    for (let index of combination) {
        btn[index].classList.add("winner");
    }
    again();
}

let showDraw = function() {
    hide.querySelector("h1").innerText = "It's a draw! Do you want to play again?";
    hide.classList.remove("hide");
    PlayAgain.onclick = function() {
        hide.classList.add("hide");
        resetGame();
    }
    Back.onclick = function() {
        hide.classList.add("hide");
    }
}

let again = function() {
    hide.querySelector("h1").innerText = "Do you want to play again?";
    hide.classList.remove("hide");
    PlayAgain.onclick = function() {
        hide.classList.add("hide");
        resetGame();
    }
    Back.onclick = function() {
        hide.classList.add("hide");
    }
}

let resetGame = function() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].innerText = "";
        btn[i].classList.remove("winner");
        btn[i].disabled = false; // Re-enable all buttons
    }
    turn = 0;
}

play(btn);
