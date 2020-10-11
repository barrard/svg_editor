import React, { useEffect, useState } from 'react';
import { getDrawingsList } from '../API/DrawingsAPI.js';
import { Link, Route, useRouteMatch } from 'react-router-dom';

const DrawingsList = () => {
  const match = useRouteMatch();
  console.log(match);
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    console.log('mounted');
    setDrawings(getDrawingsList());
  }, []);
  return (
    <div>
      <h1>Drawings List</h1>

      {drawings.map(d => (
        <li key={d}>
          <Link to={`/drawings/${d}`}>{d}</Link>
        </li>
      ))}

      <Route exact path={match.path}>
        <h3>Please select a topic.</h3>
      </Route>
    </div>
  );
};

export default DrawingsList;
