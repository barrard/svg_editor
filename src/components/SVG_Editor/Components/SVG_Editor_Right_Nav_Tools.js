import React, { useState } from 'react';
import styled from 'styled-components';
import {
  VerticalLineBtn,
  HorizontalLineBtn,
  SquareShapeBtn,
  CircleShapeBtn
} from '../Tools/RightTools/RightTools.js';

const RightNavTools = ({ width, height, minimize }) => {
  const [open, setOpen] = useState(true);

  const btnCount = 5;
  let btnHeight = height / btnCount;
  btnHeight = btnHeight < width ? btnHeight : width;
  return (
    <StyledDiv isOpen={open} width={width}>
      <MinimizeBtn open={open} onClick={close}>
        _
      </MinimizeBtn>
      {open && (
        <>
          <VerticalLineBtn width={width} height={btnHeight} />
          <HorizontalLineBtn width={width} height={btnHeight} />
          <SquareShapeBtn width={width} height={btnHeight} />
          <CircleShapeBtn width={width} height={btnHeight} />
        </>
      )}
    </StyledDiv>
  );

  function close (e) {
    console.log(e);
    setOpen(!open);
    minimize(!open);
  }
};

export default RightNavTools;

const StyledDiv = styled.div`
  position: absolute;
  right: 0;
  border: solid 1px blue;
  width: ${({ width, isOpen }) => (isOpen ? width + 'px' : '0px')};
  transition: all 0.2s ease-out;
`;

const MinimizeBtn = styled.button`
  /* position:${({ open }) => (open ? 'absolute' : 'initial')}; */
  position: absolute;
  top:0;
  left:${({ open }) => (open ? '0px' : '-2em')};
  /* right:0px; */
  transition:all .2s ease-out;

`;
