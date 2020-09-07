import styled from "styled-components";

type BlockProps = {
  snake: boolean,
  head: boolean,
  apple: boolean,
  dash: boolean
}

export const Block = styled.div<BlockProps>`
  width: 15px;
  height: 15px;
  background: ${({ snake, apple, dash }) => {
    if (snake) return "#000";
    if (apple) return "red";
    if (dash) return "#a8e335";
    return "#B2EE4A";
  }}; 
  border-radius: ${({ apple }) => (apple && "50%") || "0px 0px 0px 0px"};
`
