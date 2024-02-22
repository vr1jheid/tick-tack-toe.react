import Square from "./Square";
import styled from "styled-components";
import { squareSide } from "./mainVariables";

const GameFieldContainer = styled.div`
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

const GameField = ({
  indexToMark,
  currentField,
  squareClickHandler,
  disabled,
}) => {
  console.log(indexToMark);
  return (
    <GameFieldContainer>
      {currentField.map((row, rowIndex) => (
        <Row key={`row: ${rowIndex}`}>
          {row.map((value, colIndex) => (
            <Square
              key={`${rowIndex}:${colIndex}`}
              disabled={disabled}
              mark={
                indexToMark && indexToMark.includes(`${rowIndex}:${colIndex}`)
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
    </GameFieldContainer>
  );
};

export default GameField;
