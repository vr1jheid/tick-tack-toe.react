import { useState } from "react";
import styled from "styled-components";

const squareSide = "36px";
const squareFontSize = `${(Number.parseInt(squareSide) / 40) * 2}rem`;

const WinnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 10px;
  width: calc((${squareSide} * 3) - 15px);
`;

const WinnerText = styled.p`
  margin: 0;
`;

const GameField = styled.div`
  width: fit-content;
  border: 0.5px solid black;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin: 0;
  height: ${squareSide};
  width: fit-content;
  display: flex;
`;

const Square = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${squareSide};
  height: 100%;
  border: 0.5px solid black;
  font-size: ${squareFontSize};
  background-color: ${(props) => (props.$winner ? "red" : "inherit")};
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

  const [gameHistory, setGameHistory] = useState([initialField]);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const currentField = gameHistory
    .at(gameHistory.length - 1)
    .map((gameState) => [...gameState]);

  const calculateWinner = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      // По горизонтали
      if (
        arr[i][0] !== null &&
        arr[i][0] === arr[i][1] &&
        arr[i][1] === arr[i][2]
      ) {
        return {
          winner: arr[i][0],
          winSquares: [`${i}:0`, `${i}:1`, `${i}:2`],
        };
      }
      // По вертикали
      if (
        arr[0][i] !== null &&
        arr[0][i] === arr[1][i] &&
        arr[1][i] === arr[2][i]
      ) {
        return {
          winner: arr[0][i],
          winSquares: [`0:${i}`, `1:${i}`, `2:${i}`],
        };
      }
    }

    // Основная диагональ
    if (
      arr[0][0] !== null &&
      arr[0][0] === arr[1][1] &&
      arr[1][1] === arr[2][2]
    ) {
      return { winner: arr[0][0], winSquares: ["0:0", "1:1", "2:2"] };
    }

    // Побочная диагональ
    if (
      arr[0][2] !== null &&
      arr[0][2] === arr[1][1] &&
      arr[1][1] === arr[2][0]
    ) {
      return { winner: arr[0][2], winSquares: ["0:2", "1:1", "2:0"] };
    }

    // Ничья
    if (
      !arr.some((row, rowIndex) =>
        row.some((_, colIndex) => arr[rowIndex][colIndex] === null)
      )
    ) {
      return { winner: "Draw", winSquares: null };
    }
  };

  const squareClickHandler = (rowIndex, colIndex) => {
    if (winnerInfo) return;
    if (currentField[rowIndex][colIndex]) return;

    currentField[rowIndex][colIndex] = currentPlayer;
    setGameHistory([...gameHistory, currentField]);
    if (calculateWinner(currentField)) {
      setWinnerInfo(calculateWinner(currentField));
      /*       console.log(gameHistory); */
      return;
    }

    currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
  };

  const resetGame = () => {
    setWinnerInfo(null);
    setCurrentPlayer("X");
    setGameHistory([initialField]);
  };

  console.log(winnerInfo);
  return (
    <>
      <GameField className="game">
        {currentField.map((row, rowIndex) => (
          <Row key={`row: ${rowIndex}`}>
            {row.map((value, colIndex) => (
              <Square
                key={`${rowIndex}:${colIndex}`}
                $winner={
                  winnerInfo &&
                  winnerInfo.winner !== "Draw" &&
                  winnerInfo.winSquares.includes(`${rowIndex}:${colIndex}`)
                    ? true
                    : false
                }
                onClick={() => {
                  squareClickHandler(rowIndex, colIndex);
                }}
              >
                {value}
              </Square>
            ))}
          </Row>
        ))}
      </GameField>
      {Boolean(winnerInfo) && (
        <WinnerInfo>
          <WinnerText>
            {winnerInfo.winner === "Draw"
              ? "Draw!"
              : `Winner: ${winnerInfo.winner}`}
          </WinnerText>
          <button onClick={resetGame}>Try again</button>
        </WinnerInfo>
      )}
    </>
  );
};

export default Game;
