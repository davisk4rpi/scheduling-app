import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEvents, deleteEvent } from '../../actions';

import EventShow from './EventShow';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todosCollapsed: true,
      eventsCollapsed: true
    };
  }
  componentDidMount() {
    this.props.fetchEvents();
  }

  renderTodos() {
    const { events } = this.props;
    const todos = events.filter(event => !event.calendarCheck);

    const todoIndex = todos.map(event => {
      return (
        <EventShow
          key={event._id}
          event={event}
          date={null}
          onDeleteClick={() => this.props.deleteEvent(event._id)}
          onEditClick={() =>
            this.props.history.push(`/events/${event._id}/edit`)}
        />
      );
    });

    return (
      <div>
        {todoIndex}
      </div>
    );
  }

  renderEvents() {
    const { events } = this.props;
    const scheduledEvents = events.filter(event => event.calendarCheck);

    const scheduledEventIndex = scheduledEvents.map(event => {
      const time = new Date(event.startTime);
      const date = (
        <div className="card-action">
          {time.toLocaleDateString()} at {time.toLocaleTimeString()}
        </div>
      );
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
    return (
      <div>
        {scheduledEventIndex}
      </div>
    );
  }

  handleTodoToggle = () => {
    this.setState({ todosCollapsed: !this.state.todosCollapsed });
  };

  handleEventToggle = () => {
    this.setState({ eventsCollapsed: !this.state.eventsCollapsed });
  };

  render() {
    const hiddenStyle = { height: 0, overflow: 'hidden' };
    let todoStyle, eventStyle;
    if (this.state.todosCollapsed) {
      todoStyle = hiddenStyle;
    }
    if (this.state.eventsCollapsed) {
      eventStyle = hiddenStyle;
    }
    return (
      <div>
        <div className="collapsibleHeader" onClick={this.handleTodoToggle}>
          <h3 className="valign-wrapper">
            <i className="medium material-icons">arrow_drop_down</i>To Do List
          </h3>
        </div>
        <div style={todoStyle}>
          {this.renderTodos()}
        </div>
        <div className="collapsibleHeader" onClick={this.handleEventToggle}>
          <h3 className="valign-wrapper">
            <i className="medium material-icons">arrow_drop_down</i>Schedule
          </h3>
        </div>
        <div style={eventStyle}>
          {this.renderEvents()}
        </div>
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
