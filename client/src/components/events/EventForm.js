import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import {
  TextField,
  Checkbox,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui';
import DurationField from './DurationField';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: false
    };
    this.onTodoCheck = this.onTodoCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo && !this.state.todo) {
      this.onTodoCheck();
    }
  }

  onTodoCheck(event) {
    this.setState({ todo: !this.state.todo });
  }

  renderFields() {
    const fields = [
      <div key="name">
        <Field
          hintText="ex: Call Doctor's Office"
          floatingLabelText="Task Title"
          name="name"
          component={TextField}
          floatingLabelStyle={{ color: 'black' }}
        />
      </div>,
      <Field
        key="description"
        name="description"
        component={TextField}
        hintText="ex: Need to make appointment for..."
        floatingLabelText="Task Description"
        floatingLabelStyle={{ color: 'black' }}
        fullWidth
        multiLine
        rows={5}
      />,
      <Field
        key="duration"
        name="duration"
        component={DurationField}
        className="duration"
      />
    ];

    fields.push(
      <Field
        key="calendar"
        name="calendarCheck"
        label="Check this to add task to your calendar"
        component={Checkbox}
        onChange={this.onTodoCheck}
        className="calendarCheck"
      />
    );

    if (this.state.todo) {
      fields.push(
        <Field
          key="startTimeDate"
          name="startTimeDate"
          label="Date"
          hintText="What day does it start?"
          component={DatePicker}
          format={null}
          className="startTime"
        />
      );
      fields.push(
        <div className="startTime" key="startTimeTime">
          <Field
            name="startTimeTime"
            label="Time"
            hintText="What time does it start?"
            component={TimePicker}
            format={null}
          />
        </div>
      );
    }
    return fields;
  }

  render() {
    return (
      <div id="eventForm">
        <h2>New Task</h2>
        <form onSubmit={this.props.handleSubmit(this.props.handleEventSubmit)}>
          {this.renderFields()}
          <div className="form-controls">
            <Link className="btn-flat red white-text" to="/dashboard">
              Cancel
            </Link>
            <button type="submit" className="btn-flat right blue white-text">
              {this.props.submitButton}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.calendarCheck) {
    if (!values['startTimeTime']) {
      errors['startTimeTime'] = 'You must provide a Start Time';
    }
    if (!values['startTimeDate']) {
      errors['startTimeDate'] = 'You must provide a Start Date';
    }
  }

  if (!values['name']) {
    errors['name'] = 'You must provide a Title';
  }
  return errors;
}

EventForm = reduxForm({
  validate,
  form: 'eventForm'
})(EventForm);

export default EventForm;
