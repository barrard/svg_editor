import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToolsContext, PathsContext } from '../../../context/Store.js';
import { pythagorean } from '../Tools/ToolUtils.js';

const MainSVG = props => {
  const { width, height, leftNavOpen, rightNavOpen, sideButtonWidth } = props;
  const { setTool, toolContext } = useContext(ToolsContext);
  const { pathContext, addPath, getPath } = useContext(PathsContext);
  const [currentSvgElement, setCurrentSvgElement] = useState(false);
  const [currentMarkers, setCurrentMarkers] = useState({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathData, setPathData] = useState('');
  const [penWidth, setPenWidth] = useState(3);
  const [penColor, setPenColor] = useState('black');
  const mainSVG = useRef();
  useEffect(() => {
    console.log('-----------  MAIN CANVAS -------------------');
  });
  return (
    <StyledSVG
      ref={mainSVG}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sideButtonWidth={sideButtonWidth}
      width={width}
      height={height}
      rightNavOpen={rightNavOpen}
      leftNavOpen={leftNavOpen}
    />
  );

  function onMouseDown (e) {
    const { x, y } = MouseCoords(e);
    const { currentTool } = toolContext;
    let currentSvgElement;
    setCurrentMarkers({});
    setIsDrawing(!isDrawing);
    console.log({ isDrawing });

    // setTimeout(() => {
    switch (currentTool) {
      case 'square': {
        currentSvgElement = addSVGElement('rect');
        currentSvgElement.setAttribute('x', x);
        currentSvgElement.setAttribute('y', y);
        currentSvgElement.setAttribute('width', 5);
        currentSvgElement.setAttribute('height', 5);
        setPathData({ x, y });
        break;
      }
      case 'circle': {
        currentSvgElement = addSVGElement('circle');
        currentSvgElement.setAttribute('cx', x);
        currentSvgElement.setAttribute('cy', y);
        currentSvgElement.setAttribute('radius', 5);
        setPathData({ x, y });

        break;
      }

      default: {
        currentSvgElement = addSVGElement('path');
        setPathData(`M ${x}, ${y}`);
        break;
      }
    }
    currentSvgElement.setAttribute('class', 'userDrawing');

    setCurrentSvgElement(currentSvgElement);
    addCurrentMarkers(currentTool);
    // }, 0);
  }
  function onMouseUp (e) {
    console.log('MouseUp');
    if (!currentSvgElement) return;
    currentSvgElement.onmousedown = handleSvgElementSelected;
    currentSvgElement.onmouseup = handleSvgElementUnselected;
    currentSvgElement.onmouseover = handleSvgElementHovered;
    setCurrentSvgElement(false);
    // setIsDrawing(false);
    console.log({ isDrawing });
  }
  function onMouseMove (e) {
    if (currentSvgElement) {
      const { x, y } = MouseCoords(e);

      const { currentTool } = toolContext;
      switch (currentTool) {
        case 'pen': {
          setPathData(`${pathData}L${x},${y}`);
          currentSvgElement.setAttribute('d', pathData);
          break;
        }
        case 'cubic-curve': {
          const startY = +pathData.split(',')[1];
          const startX = +pathData
            .split(',')[0]
            .split('')
            .splice(1)
            .join('');
          const firstPoint = `${startX}, ${y}`;
          const secondPoint = `${x}, ${startY}`;
          const endPoint = `${x},${y}`;
          const path = `${pathData}C${firstPoint} ${secondPoint} ${endPoint}`;
          currentSvgElement.setAttribute('d', path);
          const startPoint = `${startX},${startY}`;
          setCurveMarkersPosition(
            startPoint,
            firstPoint,
            secondPoint,
            endPoint
          );
          break;
        }
        case 'line': {
          currentSvgElement.setAttribute('d', `${pathData}L${x},${y}`);
          break;
        }
        case 'vertical-line': {
          // console.log({ pathData });
          const _y = pathData.split(',')[1];
          currentSvgElement.setAttribute('d', `${`M${x},${_y}`}V${y}`);
          break;
        }
        case 'horizontal-line': {
          const _x = pathData
            .split(',')[0]
            .split('')
            .splice(1)
            .join('');
          currentSvgElement.setAttribute('d', `${`M${_x},${y}`}H${x}`);
          break;
        }
        case 'square': {
          const _y = pathData.y;
          const _x = pathData.x;
          let width, height, startX, startY;
          if (_x > x) {
            startX = x;
            width = _x - x;
          } else {
            startX = _x;
            width = x - _x;
          }
          if (_y > y) {
            startY = y;
            height = _y - y;
          } else {
            startY = _y;
            height = y - _y;
          }
          currentSvgElement.setAttribute('width', width);
          currentSvgElement.setAttribute('height', height);
          currentSvgElement.setAttribute('x', startX);
          currentSvgElement.setAttribute('y', startY);
          break;
        }
        case 'circle': {
          const _x = pathData.x;
          const _y = pathData.y;
          const sideA = Math.abs(_x - x);
          const sideB = Math.abs(_y - y);
          const r = pythagorean(sideA, sideB);
          currentSvgElement.setAttribute('r', r);

          break;
        }

        default:
          break;
      }
    }
  }
  function onMouseEnter (e) {
    // console.log('MouseEnter');
    // console.log(toolContext);
    // console.log(e);
  }
  function onMouseLeave (e) {
    // console.log('MouseExt');
    // console.log(toolContext);
    // console.log(e);
  }

  function MouseCoords (e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    return { x, y };
  }
  function addSVGElement (tag) {
    const path = appendSVGElement(tag);
    path.setAttribute('fill', 'none');
    path.setAttribute('line-width', penWidth);
    path.setAttribute('stroke', penColor);

    addPath(path);
    return path;
  }

  function appendSVGElement (tag) {
    const svg = mainSVG.current;
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    svg.appendChild(el);
    return el;
  }
  function setCurveMarkersPosition (
    startPoint,
    firstPoint,
    secondPoint,
    endPoint
  ) {
    setMarkerPosition(currentMarkers.startPoint, startPoint);
    setMarkerPosition(currentMarkers.firstPoint, firstPoint);
    setMarkerPosition(currentMarkers.secondPoint, secondPoint);
    setMarkerPosition(currentMarkers.endPoint, endPoint);
  }
  function setMarkerPosition (marker, coords) {
    coords = coords.split(',');
    const x = coords[0];
    const y = coords[1];
    marker.setAttribute('cx', x);
    marker.setAttribute('cy', y);
  }
  function addMarker (coords) {
    coords = coords.split(',');
    const x = coords[0];
    const y = coords[1];
    const circle = appendSVGElement('circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 10);
    circle.setAttribute('class', 'active marker');
    circle.onmousedown = handleMarkerClick;
    return circle;
  }
  function addCurrentMarkers (currentTool) {
    switch (currentTool) {
      case 'cubic-curve': {
        const { startX, startY } = extractStartXY(pathData);
        const coords = `${startX},${startY}`;
        /* 4 circles */
        const startPoint = addMarker(coords);
        const firstPoint = addMarker(coords);
        const secondPoint = addMarker(coords);
        const endPoint = addMarker(coords);
        setCurrentMarkers({
          startPoint,
          firstPoint,
          secondPoint,
          endPoint
        });

        break;
      }
      default:
        break;
    }
  }

  function handleMarkerClick (e) {
    console.log(isDrawing);
    if (isDrawing) return;
    e.stopPropagation();
    console.log(e.target);
  }

  function handleSvgElementSelected (e) {
    console.log(isDrawing);
    if (isDrawing) return;
    e.stopPropagation();
    console.log(e.target);
  }

  function handleSvgElementUnselected (e) {
    console.log(isDrawing);
    if (isDrawing) return;
    e.stopPropagation();
    console.log(e.target);
  }

  function handleSvgElementHovered (e) {
    console.log(isDrawing);
    if (isDrawing) return;
    e.stopPropagation();
    console.log(e.target);
  }
};

export default MainSVG;

const StyledSVG = styled.svg`
  border: solid 1px red;
  position: absolute;
  left: ${({ leftNavOpen, sideButtonWidth }) =>
    leftNavOpen ? sideButtonWidth + 'px' : '0px'};
  right: ${({ leftNavOpen, sideButtonWidth }) =>
    leftNavOpen ? sideButtonWidth + 'px' : '0px'};
  transition: all 0.2s ease-out;
  /* display: flex;
  justify-content: center; */
`;

function extractStartXY (pathData) {
  const startY = +pathData.split(',')[1];
  const startX = +pathData
    .split(',')[0]
    .split('')
    .splice(1)
    .join('');
  return { startX, startY };
}
