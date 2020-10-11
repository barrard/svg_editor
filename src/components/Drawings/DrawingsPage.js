import React from 'react';
import { Route } from 'react-router-dom';
import DrawingsList from './DrawingsList.js';
import Drawing from './singleDrawing.js';

const Drawings = ({ match }) => {
  console.log({ match });
  return (
    <div>
      <h2>Drawings Page</h2>
      <DrawingsList />
      <Route path={`${match.path}/:id`} component={Drawing} />
    </div>
  );
};

export default Drawings;
