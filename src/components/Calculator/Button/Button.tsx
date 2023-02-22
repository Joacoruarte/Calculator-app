import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  fontSize?: string;
  width?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  justifyContent?: string;
  hoverColor?: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function Button({
  children,
  backgroundColor = "#333332",
  width = "60px",
  color = "#FFFFFF",
  fontSize = "18px",
  padding = "0",
  borderRadius = "50%",
  justifyContent = "center",
  hoverColor = "#616060",
  selected = false,
  onClick,
}: Props): JSX.Element {
  return (
    <ContainerButton
      color={color}
      backgroundColor={backgroundColor}
      width={width}
      padding={padding}
      fontSize={fontSize}
      selected={selected}
      borderRadius={borderRadius}
      justifyContent={justifyContent}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      {children}
    </ContainerButton>
  );
}

const ContainerButton = styled.button<{
  backgroundColor?: string;
  width?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  justifyContent?: string;
  hoverColor?: string;
  selected?: boolean;
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  height: 60px;
  border-radius: ${({ borderRadius }) => borderRadius};
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ color , selected , backgroundColor }) => selected ? backgroundColor : color};
  background-color: ${({ backgroundColor , selected }) => selected ? '#FFF' : backgroundColor};
  padding: ${({ padding }) => padding};
  transition: all 150ms;

  &:active {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;
