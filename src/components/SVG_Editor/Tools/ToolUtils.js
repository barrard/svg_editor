import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToolsContext } from '../../../context/Store';

export const ToolBtnContainer = ({ children, tool }) => {
  const { setTool, toolContext } = useContext(ToolsContext);

  const { currentTool } = toolContext;
  return (
    <div
      style={currentToolStyle(currentTool, tool)}
      onClick={() => setTool(tool)}
    >
      {children}
    </div>
  );
};

function currentToolStyle (currentTool, tool) {
  return currentTool === tool
    ? {
      stroke: 'green',
      strokeWidth: '3px',
      background: '#444'
    }
    : {
      stroke: 'black',
      strokeWidth: '1px',
      background: 'white'

    };
}

export const StyledToolBtn = styled.svg`
width: ${props => props.width};
height: ${props => props.height};
border:black solid 1px;
/* stroke:black; */
/* stroke-width:3px; */
`;

export function pythagorean (sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
