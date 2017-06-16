import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import lazyLoad from './components/lazy-load'

const Index       = lazyLoad(() => import('./containers/index'));
const Codenames   = lazyLoad(() => import('./containers/codenames'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/codenames" component={Codenames} />
          <Route path="/" component={Index} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
