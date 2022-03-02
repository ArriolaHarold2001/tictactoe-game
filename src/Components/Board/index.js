import React, { useState } from "react";
import Square from "../Square/index";
import ResetButton from "../ResetButton/index";
import r2h from "../../img/r2h.png";

const Board = () => {
  /**
   * calculateWinner (helper function)
   *
   * Parameter: squares (array of 'X', '0', or null)
   * Return value: 'X', 'O', or null
   */
  // Create empty array for 9 items
  const initialBoard = Array(9).fill(null);

  //Setting up board manipulation
  const [squares, setSquares] = useState(initialBoard);

  //Set next Player

  const [playerXIsNext, setPlayerXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  const renderSquare = function (i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
      />
    );
  };

  const handleClick = function (e) {
    // console.log(`${e} square was clicked`);
    const newSquares = [...squares];
    // Check to see if the square is already filled
    const squareAlreadyFilled = Boolean(newSquares[e]);
    // Has a winner been declared or is the square already being used
    if (winner || squareAlreadyFilled) {
      return;
    }

    newSquares[e] = playerXIsNext ? "❌" : "⭕️";

    //Set new squares to display board update
    setSquares(newSquares);
    setPlayerXIsNext(!playerXIsNext);
  };

  const reset = () => {
    setSquares(initialBoard);
    setPlayerXIsNext(true);
  };

  const isBoardFull = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  };

  const getStatus = () => {
    if (winner) {
      return `🏆🏆🏆 Congratulations player ${winner} 🏆🏆🏆`;
    } else if (isBoardFull(squares)) {
      return `🥵🥵🥵 DRAW! 🥵🥵🥵`;
    } else {
      return `Next Player is Player ${playerXIsNext ? "❌" : "⭕️"}`;
    }
  };

  function calculateWinner(squares) {
    /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]; // shows all of the winning combinations ("lines")

    // Iterate over all the winning line combinations to see if the
    // input squares array has one of the with all 'X's or all 'O's.
    // If it does, return 'X' or 'O'.
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    // If none of the winning line combinations is contained in
    // input squares array, return null...
    return null;
  }

  const changeStyle = () => {
    if (winner) {
      return "winner";
    } else if (getStatus === `🥵🥵🥵 DRAW! 🥵🥵🥵`) {
      return "draw";
    } else {
      return `${playerXIsNext ? "X" : "O"}`;
    }
  };

  return (
    <>
      <main className={`main--container ${changeStyle()}`}>
        <div className="logo">
          <img src={r2h} alt="r2h logo" />
        </div>
        <div className="status">{getStatus()}</div>
        <div className="board--container">
          <div className="board">
            <div className="board--row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board--row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board--row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
        </div>
        <ResetButton reset={reset} />
      </main>
    </>
  );
};

export default Board;
