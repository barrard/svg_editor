import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

import SVG_Editor_Main_Canvas from './SVG_Editor_Main_Canvas.js';
import SVG_Editor_Top_Nav_Tools from './SVG_Editor_Top_Nav_Tools';
import SVG_Editor_Left_Nav_Tools from './SVG_Editor_Left_Nav_Tools';
import SVG_Editor_Right_Nav_Tools from './SVG_Editor_Right_Nav_Tools';

const SVG_Editor = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [topNavHeight, setTopNavHeight] = useState(0.1);
  const [mainCanvasWidth, setMainCanvasWidth] = useState(0.8);
  const [sideButtonWidth, setSideButtonWidth] = useState(0.1);
  const [leftNavOpen, setLeftNavOpen] = useState(true);
  const [rightNavOpen, setRightNavOpen] = useState(true);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  return (
    <StyledEditorContainer>
      <SVG_Editor_Top_Nav_Tools width={width} height={height * topNavHeight} />
      <StyledDiv top={height * topNavHeight}>
        <SVG_Editor_Main_Canvas
          leftNavOpen={leftNavOpen}
          rightNavOpen={rightNavOpen}
          setMainCanvasWidth={setMainCanvasWidth}
          width={width * (mainCanvasWidth - 0.02) /* magic number! */}
          height={height - height * topNavHeight}
          sideButtonWidth={width * sideButtonWidth}
        />

        <SVG_Editor_Left_Nav_Tools
          minimize={setIsOpenLeftNav}
          width={width * sideButtonWidth}
          height={height * (1 - topNavHeight)}
        />
        <SVG_Editor_Right_Nav_Tools
          minimize={setIsOpenRightNav}
          width={width * sideButtonWidth}
          height={height * (1 - topNavHeight)}
        />
      </StyledDiv>
    </StyledEditorContainer>
  );
  function setIsOpenLeftNav (isOpen) {
    console.log({ isOpen });
    setLeftNavOpen(isOpen);
    isOpen
      ? setMainCanvasWidth(mainCanvasWidth - 0.1)
      : setMainCanvasWidth(mainCanvasWidth + 0.1);
  }
  function setIsOpenRightNav (isOpen) {
    console.log({ isOpen });
    setRightNavOpen(isOpen);
    isOpen
      ? setMainCanvasWidth(mainCanvasWidth - 0.1)
      : setMainCanvasWidth(mainCanvasWidth + 0.1);
  }
};

export default SVG_Editor;

const StyledEditorContainer = styled.div`
  position: relative;
  transition: all 0.2s ease-out;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: ${props => props.top + 'px'};
  transition: all 0.2s ease-out;
`;
