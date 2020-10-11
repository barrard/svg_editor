import React from 'react';
import styled from 'styled-components';

const topNavTools = ({ height }) => {
  return (
    <StyledDiv height={height}>
      <div>div</div>
      <div>div</div>

    </StyledDiv>
  );
};

export default topNavTools;

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  border: solid 1px blue;
  height: ${props => props.height + 'px'};
`;
