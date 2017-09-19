import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EventList from './events/EventList';

class Dashboard extends Component {
  render() {
    return (
      <section id="dashboard">
        <Link to="/events/new" className="green white-text btn-floating">
          <i className="material-icons">add</i>
        </Link>
        <EventList />
      </section>
    );
  }
}

export default Dashboard;
