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

    return { getName, getMarker };
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
            //show winner
            console.log(getResult());
            return;
        }
        switchTurn();
    }

    const restartGame = () => {
        GameBoard.clearBoard();
        currentTurn = players[0];
    }

    return { playTurn, getCurrentTurn, board, restartGame, isGameOver, getResult };
}
