import React, { useEffect, useState } from "react";
import "./style.css";
export const TickTacToe = ({ size = 3 }) => {
  const [gameArr, setGameArrValue] = useState(
    Array.from({ length: size }, () => Array(size).fill(" "))
  );
  const [winner, setWinner] = useState(null);
  const [turn, toggleTurn] = useState("x");
  console.log("gameArr>>>>", gameArr);
  const handleBoxClick = (currValue, x, y) => {
    console.log(currValue, x, y);
    if (currValue === " ") {
      const newArr = gameArr.map((row, rowIdx) =>
        rowIdx === x
          ? row.map((val, colIdx) => (colIdx === y ? turn : val))
          : row
      );
      setGameArrValue(newArr);
      toggleTurn(turn === "x" ? "0" : "x");
    }
  };

  useEffect(() => {
    const checkWinner = () => {
      // Check rows
      for (let i = 0; i < size; i++) {
        if (
          gameArr[i][0] !== " " &&
          gameArr[i].every((val) => val === gameArr[i][0])
        ) {
          return gameArr[i][0];
        }
      }

      // Check columns
      for (let i = 0; i < size; i++) {
        if (
          gameArr[0][i] !== " " &&
          gameArr.every((row) => row[i] === gameArr[0][i])
        ) {
          return gameArr[0][i];
        }
      }

      // Check diagonals
      if (
        gameArr[0][0] !== " " &&
        gameArr.every((row, i) => row[i] === gameArr[0][0])
      ) {
        return gameArr[0][0];
      }

      if (
        gameArr[0][size - 1] !== " " &&
        gameArr.every((row, i) => row[size - 1 - i] === gameArr[0][size - 1])
      ) {
        return gameArr[0][size - 1];
      }

      // Check for draw
      if (gameArr.every((row) => row.every((val) => val !== " "))) {
        return "draw";
      }
      return null;
    };

    const winner = checkWinner();
    if (winner !== null && winner !== "draw") {
      setWinner(winner);
    } else if (winner === "draw") {
      setWinner("draw");
    }
  }, [gameArr, size]);

  return (
    <div className="flexColumn">
      <div className="container">
        {gameArr.map((item, index) => {
          return (
            <div key={index} className="boxes-y">
              {item.map((value, idx) => {
                return (
                  <div
                    onClick={() => handleBoxClick(value, index, idx)}
                    className="boxes-x"
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          );
        })}
        {winner && winner !== "draw" && <h2>winner:{winner}</h2>}
        {winner === "draw" && <h2>It's a draw!</h2>}
        {!winner && <h2>turn:{turn}</h2>}
        
      </div>
      <button
            style={{width: "100px"}}
          onClick={() => {
            setGameArrValue(
              Array.from({ length: size }, () => Array(size).fill(" "))
            );
            setWinner(null);
            toggleTurn("x");
          }}
        >
          Reset Game
        </button>
    </div>
  );
};
