import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import { submitEvent } from '../../actions';

class EventNew extends Component {
  onEventSubmit = (values, dispatch) => {
    this.props.submitEvent(values, this.props.history);
  };

  render() {
    return (
      <div>
        <EventForm
          initialValues={{
            durationUnit: 'minutes',
            duration: 30
          }}
          submitButton="Add Event"
          handleEventSubmit={this.onEventSubmit}
        />
      </div>
    );
  }
}

EventNew = reduxForm({
  form: 'surveyForm'
})(EventNew);

export default connect(null, { submitEvent })(EventNew);
