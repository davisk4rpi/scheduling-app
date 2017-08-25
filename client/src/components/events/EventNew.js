import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import EventForm from './EventForm';

class EventNew extends Component {
  render() {
    return (
      <div>
        <EventForm />
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(EventNew);
