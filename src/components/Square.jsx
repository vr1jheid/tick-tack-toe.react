import styled from "styled-components";
import { squareSide } from "./mainVariables";

const squareFontSize = `${(Number.parseInt(squareSide) / 40) * 2}rem`;

const SquareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${squareSide};
  height: 100%;
  border: 0.5px solid black;
  font-size: ${squareFontSize};
  background-color: ${(props) => (props.$mark ? "red" : "inherit")};
  &:active:not(:disabled) {
    background-color: #b5b5b2;
  }
`;

const Square = ({ mark, onClick, children, disabled }) => {
  return (
    <SquareButton disabled={disabled} onClick={onClick} $mark={mark}>
      {children}
    </SquareButton>
  );
};

export default Square;
