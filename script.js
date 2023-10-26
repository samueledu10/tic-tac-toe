"use strict"

const GameBoard = (function () {
    const board = [
        "", "", "", 
        "", "", "", 
        "", "", ""];

    const boardSize = board.length;

    const getBoard = () => {
        return board;
    }

    const clearBoard = () => {
        for (let i = 0; i < boardSize; ++i) {
            board[i] = "";
        }
    }

    const addMarker = (marker, index) => {
        if (board[index] === "") {
            board.splice(index, 1, marker);
        }
    }
    
    return { clearBoard, addMarker, getBoard };
})();

function createPlayer(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    let score = 0;

    const getScore = () => {
        return score;
    }

    const increaseScore = () => {
        score += 1;
    }

    const resetScore = () => {
        score = 0;
    }

    return { getName, getMarker, increaseScore, getScore };
}

const GameController = () => {
    const players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];

    let currentTurn = players[0];

    let board = GameBoard.getBoard();

    const switchTurn = () => {
        currentTurn = currentTurn === players[0] ? players[1] : players[0];
    }

    const getCurrentTurn = () => {
        return currentTurn;
    }
    
    let result;
    const isGameOver = () => {
        let marker = getCurrentTurn().getMarker();
        let name = getCurrentTurn().getName();

        // all win conditions
        if (board[0] === marker && board[1] === marker && board[2] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[3] === marker && board[4] === marker && board[5] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[6] === marker && board[7] === marker && board[8] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[0] === marker && board[3] === marker && board[6] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[1] === marker && board[4] === marker && board[7] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[2] === marker && board[5] === marker && board[8] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[0] === marker && board[4] === marker && board[8] === marker) {

            result = `${name} won!`;
            return true;
        } else if (board[2] === marker && board[4] === marker && board[6] === marker) {

            result = `${name} won!`;
            return true;
        }

        // check if there are still empty spots on the board
        for (let i = 0; i < board.length; ++i) {
            if (board[i] === "") {
                return false;
            }
        }

        // if board is full
        //then it is a tie
        result = "Tie";
        return true;
    }

    const getResult = () => {
        return result;
    }

    const playTurn = (index) => {
        GameBoard.addMarker(getCurrentTurn().getMarker(), index);

        if (isGameOver()) {
            getCurrentTurn().increaseScore();
            return;
        }
        switchTurn();
    }

    const restartGame = () => {
        GameBoard.clearBoard();
        currentTurn = players[0];
    }

    return { playTurn, getCurrentTurn, board, restartGame, isGameOver, getResult, players };
}

const ScreenController = () => {
    const game = GameController();
    const boardContainer = document.querySelector(".board-container");
    const score = document.querySelector(".score");
    score.textContent = `${game.players[0].getScore()}-${game.players[1].getScore()}`;
    

    const displayBoard = () => {
        boardContainer.textContent = "";

        for (let i = 0; i < game.board.length; ++i) {
            const spot = document.createElement("button");
            spot.classList.add("spot");
            //spot.setAttribute("data-index", i);

            spot.addEventListener("click", (e) => {
                // if game is over do not let players keep putting markers(X and O) on the board
                // or if spot is already filled, do not playTurn
                if (game.isGameOver() || spot.textContent !== "") {
                    return;
                }

                game.playTurn(i);
                displayBoard();
                console.log(game.board);
                if (game.isGameOver()) {
                    gameOver();
                }
            });
            spot.textContent = game.board[i];
            boardContainer.appendChild(spot);
        }
    }

    const gameOver = () => {
        const results = document.querySelector(".results");

        if (game.isGameOver()) {
            // update score
            score.textContent = `${game.players[0].getScore()}-${game.players[1].getScore()}`;

            const result = document.createElement("div");
            result.textContent = game.getResult();

            const restartBtn = document.createElement("button");
            restartBtn.textContent = "Restart";

            restartBtn.addEventListener("click", () => {
                game.restartGame();
                displayBoard();
                result.remove();
                restartBtn.remove();
            });

            results.appendChild(result);
            results.appendChild(restartBtn);
        }
    }

    displayBoard();
}

ScreenController();