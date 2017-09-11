import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  renderEvents() {
    return [
      <li key={1}>Event 1</li>,
      <li key={2}>Event 2</li>,
      <li key={3}>Event 3</li>
    ];
  }

  render() {
    return (
      <section>
        <Link to="/events/new">New Event</Link>
        <ul>
          {this.renderEvents()}
        </ul>
      </section>
    );
  }
}

export default Dashboard;
