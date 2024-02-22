import styled from "styled-components";
import { squareSideSize } from "./mainVariables";

const squareFontSize = `${(Number.parseInt(squareSideSize) / 40) * 2}rem`;

const SquareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${squareSideSize};
  height: 100%;
  border: 0.5px solid black;
  font-size: ${squareFontSize};
  background-color: ${(props) => (props.$mark ? "red" : "inherit")};

  &:disabled {
    color: #575757;
  }

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
