import React, { useContext } from 'react';
import { ToolBtnContainer, StyledToolBtn } from '../ToolUtils.js';

export const VerticalLineBtn = ({ height, width }) => {
  const xStart = width * 0.5;
  const yStart = height * 0.1;
  const xEnd = width * 0.5;
  const yEnd = height * 0.8;

  const start = `${xStart}, ${yStart}`;
  const end = `${yEnd}`;
  return (
    <ToolBtnContainer
      tool='vertical-line'
    >
      <StyledToolBtn height={height} width={width}>
        <path
          d={`
        M ${start}
        V ${end}
        `}
        />
        <circle cx={xStart} cy={yStart} r={4} />
        <circle cx={xEnd} cy={yEnd} r={4} />
      </StyledToolBtn>
    </ToolBtnContainer>
  );
};

export const HorizontalLineBtn = ({ height, width }) => {
  const xStart = width * 0.1;
  const yStart = height * 0.5;
  const xEnd = width * 0.8;
  const yEnd = height * 0.5;

  const start = `${xStart}, ${yStart}`;
  const end = `${xEnd}`;
  return (
    <ToolBtnContainer
      tool='horizontal-line'
    >
      <StyledToolBtn height={height} width={width}>
        <path
          d={`
        M ${start}
        H ${end}
        `}
        />
        <circle cx={xStart} cy={yStart} r={4} />
        <circle cx={xEnd} cy={yEnd} r={4} />
      </StyledToolBtn>
    </ToolBtnContainer>
  );
};

export const SquareShapeBtn = ({ height, width }) => {
  const xStart = width * 0.2;
  const yStart = height * 0.2;
  const squareWidth = width * 0.6;
  const squareHeight = height * 0.6;

  return (
    <ToolBtnContainer tool='square'>
      <StyledToolBtn height={height} width={width}>
        <rect x={xStart} y={yStart} width={squareWidth} height={squareHeight} />
        <circle cx={xStart} cy={yStart + squareHeight} r={4} fill='red' />
        <circle
          cx={xStart + squareWidth}
          cy={yStart + squareHeight}
          r={4}
          fill='red'
        />
        <circle cx={xStart + squareWidth} cy={yStart} r={4} fill='red' />
        <circle cx={xStart} cy={yStart} r={4} fill='red' />
      </StyledToolBtn>
    </ToolBtnContainer>
  );
};

export const CircleShapeBtn = ({ height, width }) => {
  const xStart = width * 0.5;
  const yStart = height * 0.5;
  const radius = width * 0.3;

  return (
    <ToolBtnContainer tool='circle'>
      <StyledToolBtn height={height} width={width}>
        <circle cx={xStart} cy={yStart} r={radius} />
        <circle cx={xStart} cy={yStart} r={4} fill='red' />
      </StyledToolBtn>
    </ToolBtnContainer>
  );
};
