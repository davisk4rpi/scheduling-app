import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import EventNew from './events/EventNew';
import EventEdit from './events/EventEdit';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
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
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/events/new" component={EventNew} />
              <Route exact path="/events/:id/edit" component={EventEdit} />
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
