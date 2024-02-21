import { useState } from "react";
import styled from "styled-components";

const GameContainer = styled.div`
  width: fit-content;
  border: 0.5px solid black;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin: 0;
  height: 40px;
  width: fit-content;
  display: flex;
`;

const Square = styled.button`
  width: 40px;
  height: 100%;
  border: 0.5px solid black;
  &:disabled:active {
    background-color: inherit;
  }
  &:active {
    background-color: #b5b5b2;
  }
`;

const Game = () => {
  const initialField = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [gameHistory, setGameHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameField, setGameField] = useState(initialField);

  const calculateWinner = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i][0] !== null &&
        arr[i][0] === arr[i][1] &&
        arr[i][1] === arr[i][2]
      ) {
        console.log("Case 1");
        return arr[i][0];
      }

      if (
        arr[0][i] !== null &&
        arr[0][i] === arr[1][i] &&
        arr[1][i] === arr[2][i]
      ) {
        console.log("Case 2");
        return arr[0][i];
      }
    }

    if (
      arr[0][0] !== null &&
      arr[0][0] === arr[1][1] &&
      arr[1][1] === arr[2][2]
    ) {
      return arr[0][0];
    }

    if (
      arr[0][2] !== null &&
      arr[0][2] === arr[1][1] &&
      arr[1][1] === arr[2][0]
    ) {
      return arr[0][2];
    }

    if (
      !arr.some((row, rowIndex) =>
        row.some((_, colIndex) => arr[rowIndex][colIndex] === null)
      )
    ) {
      return "Draw";
    }
  };
  const squareClickHandler = (rowIndex, colIndex) => {
    if (winner) return;
    if (gameField[rowIndex][colIndex]) return;

    gameField[rowIndex][colIndex] = currentPlayer;
    setGameField(gameField.map((row) => [...row]));
    setGameHistory([...gameHistory, [...gameField]]);
    console.log("gameField", gameField);
    console.log(gameHistory, gameHistory);
    if (calculateWinner(gameField)) {
      setWinner(calculateWinner(gameField));
      /*       console.log(gameHistory); */
      return;
    }

    currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
  };
  const resetGame = () => {
    setWinner(null);
    setCurrentPlayer("X");
    setGameField(initialField);
  };

  /*   console.log("initialField", initialField);
  console.log("gameField", gameField); */
  return (
    <>
      <GameContainer className="game">
        {gameField.map((row, rowIndex) => (
          <Row key={`row: ${rowIndex}`}>
            {row.map((value, colIndex) => (
              <Square
                onClick={() => {
                  squareClickHandler(rowIndex, colIndex);
                }}
                key={`${rowIndex}:${colIndex}`}
              >
                {value}
              </Square>
            ))}
          </Row>
        ))}
      </GameContainer>
      {Boolean(winner) && (
        <div>
          {winner === "Draw" ? "Draw!" : `Winner is ${winner}`}
          <button onClick={resetGame}>Try again</button>
        </div>
      )}
    </>
  );
};

export default Game;
