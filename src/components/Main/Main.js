import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home.js';
import SVG_Editor from '../SVG_Editor/Components/SVG_Editor.js';
import DrawingsPage from '../Drawings/DrawingsPage.js';

const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/editor' component={SVG_Editor} />
        <Route path='/drawings' component={DrawingsPage} />
      </Switch>
    </div>
  );
};

export default Main;
