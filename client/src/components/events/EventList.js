import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions';

class EventList extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  renderEvents() {
    return this.props.events.map(event => {
      let date;
      if (event.calendarCheck) {
        date = (
          <div className="card-action">
            <a>
              Yes: {event.yes}
            </a>
            <a>
              No: {event.no}
            </a>
          </div>
        );
      }
      return (
        <div className="card darken-1 blue-grey" key={event._id}>
          <div className="card-content white-text">
            <span className="card-title">
              {event.name}
            </span>
            <p>
              {event.description}
            </p>
            <p className="right">
              Estimated Time: {event.duration}
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
  return { events };
}

export default connect(mapStateToProps, { fetchEvents })(EventList);
