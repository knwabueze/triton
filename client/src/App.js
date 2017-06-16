import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import lazyLoad from './components/lazy-load'

const Index = lazyLoad(() => import('./containers/index'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
