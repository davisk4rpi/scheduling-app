import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EventList from './events/EventList';

class Dashboard extends Component {
  render() {
    return (
      <section>
        <Link to="/events/new" className="btn btn-flat green white-text">New Event</Link>
        <EventList />
      </section>
    );
  }
}

export default Dashboard;
