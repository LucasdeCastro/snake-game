import styled from "styled-components";

export const GameBoard = styled.div`
  display: flex;
  margin: 20px;
  border: 4px solid #000; 
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

type HeaderProps = {
  width: number
}

export const Header = styled.div<HeaderProps>`
  width: ${({ width }) => (width * 15.11)}px;
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid #000;
`;