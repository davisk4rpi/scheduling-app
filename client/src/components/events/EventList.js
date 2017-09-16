import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEvents, deleteEvent } from '../../actions';

import EventShow from './EventShow';

class EventList extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  renderEvents() {
    return this.props.events.map(event => {
      let date;
      if (event.calendarCheck) {
        const time = new Date(event.startTime);
        date = (
          <div className="card-action">
            {time.toLocaleDateString()} at {time.toLocaleTimeString()}
          </div>
        );
      }
      return (
        <EventShow
          key={event._id}
          event={event}
          date={date}
          onDeleteClick={() => this.props.deleteEvent(event._id)}
          onEditClick={() =>
            this.props.history.push(`/events/${event._id}/edit`)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderEvents()}
      </div>
    );
  }
}

function mapStateToProps({ events }) {
  return { events: events.index };
}

export default connect(mapStateToProps, { fetchEvents, deleteEvent })(
  withRouter(EventList)
);
