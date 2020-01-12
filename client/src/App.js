import React from 'react';
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './App.css';
import MusicPlay from './components/pages/MusicPlay';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Switch>
                <Route exact path = "/play">
                    <MusicPlay />
                </Route>
                <Route exact path="/" render={() => <Redirect to='/play' />} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
