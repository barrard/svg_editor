import React, { useState } from 'react';

export const ToolsContext = React.createContext({});
export const PathsContext = React.createContext([]);
export const IsDrawingContext = React.createContext({});

const Store = ({ children }) => {
  const { toolContext, setTool } = useTools();
  const { pathContext, addPath, getPath } = usePaths();
  const { getIsDrawing, setIsDrawing } = useIsDrawing();

  return (
    <IsDrawingContext.Provider value={{ getIsDrawing, setIsDrawing }}>
      <PathsContext.Provider value={{ pathContext, addPath, getPath }}>
        <ToolsContext.Provider value={{ toolContext, setTool }}>
          {children}
        </ToolsContext.Provider>
      </PathsContext.Provider>
    </IsDrawingContext.Provider>

  );
};

export default Store;

function usePaths () {
  const [pathContext, setPathContext] = useState([]);
  const addPath = (path) => setPathContext([
    ...pathContext, path
  ]);
  const getPath = (index) => pathContext[index];
  return { pathContext, addPath, getPath };
}

function useTools () {
  const [toolContext, setToolContext] = useState({
    currentTool: ''
  });
  const setTool = (tool) => setToolContext({
    ...toolContext, currentTool: tool
  });
  return { toolContext, setTool };
}

function useIsDrawing () {
  const [isDrawing, setIsDrawing] = useState(false);

  const getIsDrawing = () => isDrawing;
  return { getIsDrawing, setIsDrawing };
}
