import React, { Component } from 'react';

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
        <ul>
          {this.renderEvents()}
        </ul>
      </section>
    );
  }
}

export default Dashboard;
