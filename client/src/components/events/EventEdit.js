import React, { Component } from 'react';
import EventForm from './EventForm';
import { fetchEvent, updateEvent } from '../../actions';
import { connect } from 'react-redux';

class EventEdit extends Component {
  constructor(props) {
    super(props);

    props.fetchEvent(props.match.params.id);
  }

  onEventUpdate = (values, dispatch) => {
    this.props.updateEvent(
      this.props.match.params.id,
      values,
      this.props.history
    );
  };

  render() {
    let values = {};
    if (this.props.values) {
      const {
        description,
        name,
        duration,
        calendarCheck,
        startTime
      } = this.props.values;
      let startTimeTime = new Date(startTime);
      let startTimeDate = new Date(startTime);
      const time =
        (startTimeDate.getHours() * 60 + startTimeDate.getMinutes()) *
        60 *
        1000;

      startTimeDate = new Date(startTimeDate - time);
      values = {
        description,
        name,
        duration,
        calendarCheck,
        startTimeTime,
        startTimeDate
      };
    }
    let todo = values.calendarCheck ? true : false;
    return (
      <div>
        <EventForm
          formTitle="Edit Task"
          initialValues={values}
          enableReinitialize
          todo={todo}
          submitButton="Update"
          handleEventSubmit={this.onEventUpdate}
        />
      </div>
    );
  }
}

function mapStateToProps({ events }) {
  return { values: events.eventInitialValues };
}

export default connect(mapStateToProps, { fetchEvent, updateEvent })(EventEdit);
