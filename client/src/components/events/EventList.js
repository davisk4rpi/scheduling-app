import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEvents, deleteEvent } from '../../actions';

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
        <div className="card darken-1 blue-grey" key={event._id}>
          <div className="card-content white-text">

            <button
              className="btn red right"
              onClick={() => this.props.deleteEvent(event._id)}
            >
              delete
            </button>
            <button
              className="btn red blue right"
              onClick={() => this.props.history.push(`/events/${event._id}/edit`)}
            >
              edit
            </button>
            <span className="card-title">
              {event.name}
            </span>
            <p>
              {event.description}
            </p>
            <p className="right">
              Estimated Time: {event.duration} min
            </p>
          </div>
          {date}
        </div>
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