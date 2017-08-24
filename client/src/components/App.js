import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="">
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/login"
              render={props => {
                return <Login message="Log in" {...props} />;
              }}
            />
            <Route
              exact
              path="/signup"
              render={props => {
                return <Login message="Sign up" {...props} />;
              }}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
