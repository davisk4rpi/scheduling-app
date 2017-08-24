import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="">
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
