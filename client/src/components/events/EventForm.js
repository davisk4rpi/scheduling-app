import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import {
  TextField,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField
} from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: false,
      durationUnit: 'minutes'
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onTodoCheck = this.onTodoCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo && !this.state.todo) {
      this.onTodoCheck();
    }
  }

  renderDuration(unit, inc) {
    let increment = 0;
    let list = [];
    while (increment < 120) {
      increment += inc;
      list.push(increment);
    }
    return _.map(list, num => {
      return <MenuItem value={num} key={num} primaryText={`${num} ${unit}`} />;
    });
  }

  onRadioChange(event) {
    this.setState({ durationUnit: event.target.value });
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
        key="durationUnit"
        name="durationUnit"
        component={RadioButtonGroup}
        defaultValue={this.state.durationUnit}
        onChange={this.onRadioChange}
        className="durationUnit"
        floatingLabelStyle={{ color: 'black' }}
      >
        <RadioButton value="minutes" label="Minutes" />
        <RadioButton value="hours" label="Hours" />
      </Field>
    ];
    if (this.state.durationUnit === 'minutes') {
      fields.push(
        <Field
          key="duration"
          name="duration"
          component={SelectField}
          hintText="ex: 15min, 30min,..."
          floatingLabelText="Estimated Duration"
          className="duration"
          floatingLabelStyle={{ color: 'black' }}
        >
          {this.renderDuration('minutes', 5)}
        </Field>
      );
    } else {
      fields.push(
        <Field
          key="duration"
          name="duration"
          component={SelectField}
          hintText="ex: 15hr, 30hr,..."
          floatingLabelText="Estimated Duration"
          floatingLabelStyle={{ color: 'black' }}
        >
          {this.renderDuration('hours', 1)}
        </Field>
      );
    }
    fields.push(
      <Field
        key="calendar"
        name="calendarCheck"
        label="Check this to add task to your calendar"
        component={Checkbox}
        onChange={this.onTodoCheck}
        className="calendarCheck"
        floatingLabelStyle={{ color: 'black' }}
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
          floatingLabelStyle={{ color: 'black' }}
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
            floatingLabelStyle={{ color: 'black' }}
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
