import React from "react";
import styled from "styled-components";

const SpanButton = styled.span`
  color: #000;
  cursor: pointer;
  text-decoration: underline;
`;

const Container = styled.div`
  position: absolute;
  text-align: center;
`

type BoardMessageProps = {
  title: string,
  btnText: string,
  onClick: Function
}

export const BoardMessage = ({ title, btnText, onClick }: BoardMessageProps) => (
  <Container>
    <h1 style={{ marginTop: 0 }}>{title}</h1>
    <SpanButton onClick={() => onClick()} role="button">{btnText}</SpanButton>
  </Container>
)