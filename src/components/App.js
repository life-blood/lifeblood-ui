import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact from="/" render={() => <Home />} />
        <Route exact path="/1" render={() => { }} />
        <Route exact path="/2" render={() => { }} />
        <Route exact path="/3" render={() => { }} />
      </Switch>
    )
  }
}

export default App;