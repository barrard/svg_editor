import React, { useState } from 'react';
import styled from 'styled-components';
import { LineBtn, CurveBtn, PenBtn } from '../Tools/LeftTools/LeftTools.js';
const LeftNavTools = ({ width, height, minimize }) => {
  const [open, setOpen] = useState(true);
  const btnCount = 5;
  let btnHeight = height / btnCount;
  btnHeight = btnHeight < width ? btnHeight : width;
  console.log({ btnHeight, width, height });
  return (
    <StyledDiv isOpen={open} width={width}>
      <MinimizeBtn open={open} onClick={close}>
        _
      </MinimizeBtn>
      {open && (
        <>
          <PenBtn width={width} height={btnHeight} />
          <LineBtn width={width} height={btnHeight} />
          <CurveBtn width={width} height={btnHeight} />
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

export default LeftNavTools;

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  border: solid 1px blue;
  width: ${({ width, isOpen }) => (isOpen ? width + 'px' : '0px')};
  transition: all 0.2s ease-out;
`;

const MinimizeBtn = styled.button`
  /* position:${({ open }) => (open ? 'absolute' : 'initial')}; */
  position: absolute;
  top:0;
  right:${({ open }) => (open ? '0px' : '-2em')};
  /* right:0px; */
  transition:all .2s ease-out;

`;
