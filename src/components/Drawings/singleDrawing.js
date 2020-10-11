import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Drawing = props => {
  const { id } = useParams();
  console.log({ id });
  const drawingNumber = props.match.params.id;
  useEffect(() => {
    console.log('Drawing mounted');
  }, []);
  console.log({ drawingNumber });
  return (
    <div>
      <h2>
        {drawingNumber}

      </h2>
    </div>
  );
};

export default Drawing;
