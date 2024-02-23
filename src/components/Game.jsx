import { useState } from "react";
import styled from "styled-components";
import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";

import GameField from "./GameField";

const SortButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border: none;
  background-color: inherit;
  margin-top: 10px;
  padding: 5px;
  border-radius: 4px;
  &:hover {
    background-color: #f9f175;
  }
  &:active {
    color: #1e627d;
  }
`;

const CachedMove = styled.div`
  padding: 20px;
`;

const MovesHistory = styled.div`
  padding-right: 30px;
  margin-top: 25px;
  position: absolute;
  left: 50px;
  top: 0px;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
`;

const WinnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 10px;
  width: 500px;
`;

const WinnerText = styled.p`
  margin: 0;
`;

const MoveInfo = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 40px;
`;

const Player = styled.span`
  font-weight: 600;
  color: crimson;
`;

const Game = () => {
  const initialField = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [sortingDirection, setSortingDirection] = useState("desc");
  const [gameHistory, setGameHistory] = useState([initialField]);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  console.log(gameHistory);
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
      return;
    }

    currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
  };

  const resetGame = () => {
    setWinnerInfo(null);
    setCurrentPlayer("X");
    setGameHistory([initialField]);
  };

  const getMovesHistory = () => {
    return gameHistory.map((gameState, i) => {
      if (i === gameHistory.length - 1 || i === 0) return;
      return (
        <CachedMove key={`move #${i}`}>
          <span>Move #{i}</span>
          <GameField currentField={gameState} disabled={true} />
          <button
            onClick={() => {
              setGameHistory(gameHistory.slice(0, ++i));
              setWinnerInfo(null);
              setCurrentPlayer(i % 2 === 0 ? "O" : "X");
            }}
          >
            To this move
          </button>
        </CachedMove>
      );
    });
  };

  const switchSortingDirection = () => {
    sortingDirection === "desc"
      ? setSortingDirection("asc")
      : setSortingDirection("desc");
  };

  return (
    <>
      <div>
        <MoveInfo>
          {winnerInfo ? (
            winnerInfo.winner === "Draw" ? (
              <Player>Draw!</Player>
            ) : (
              <>
                Winner: <Player>{winnerInfo.winner}</Player>
              </>
            )
          ) : (
            <>
              Player`s <Player>{currentPlayer}</Player> move
            </>
          )}
        </MoveInfo>
        <GameField
          currentField={currentField}
          squareClickHandler={squareClickHandler}
          indexToMark={
            winnerInfo && winnerInfo.winner !== "Draw"
              ? winnerInfo.winSquares
              : null
          }
          disabled={Boolean(winnerInfo)}
        />
        <button onClick={resetGame}>Restart</button>
      </div>

      {gameHistory.length > 2 && (
        <MovesHistory>
          <header>Game moves history:</header>
          <SortButton onClick={switchSortingDirection}>
            {sortingDirection === "desc" ? (
              <>
                По убыванию <FcNumericalSorting21 />
              </>
            ) : (
              <>
                По возрастанию <FcNumericalSorting12 />
              </>
            )}
          </SortButton>
          {sortingDirection === "desc"
            ? getMovesHistory().reverse()
            : getMovesHistory()}
        </MovesHistory>
      )}
    </>
  );
};

export default Game;
