import _ from 'lodash';
import React, { Component } from 'react';
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
import formFields from './formFields';
import EventTextField from './EventTextField';
import EventDateField from './EventDateField';

const cformFields = [
  { label: 'Event Title', subLabel: 'required', name: 'name' },
  { label: 'Description', subLabel: 'required', name: 'description' },
  { label: 'Duration', subLabel: 'required', name: 'duration' },
  {
    label: 'Start Time',
    subLabel:
      'Events without a start time will just be added to your To Do List',
    name: 'startTime'
  }
];

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
      <Field
        key="name"
        hintText="ex: Call Doctor's Office"
        floatingLabelText="Task Title"
        name="name"
        component={TextField}
      />,
      <Field
        key="description"
        name="description"
        component={TextField}
        hintText="ex: Need to make appointment for..."
        floatingLabelText="Task Description"
        multiLine
        rows={3}
      />,
      <Field
        key="durationRadio"
        name="durationRadio"
        component={RadioButtonGroup}
        defaultValue={this.state.durationUnit}
        onChange={this.onRadioChange}
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
        >
          {this.renderDuration('hours', 1)}
        </Field>
      );
    }
    fields.push(
      <Field
        key="todo"
        name="todoCheckbox"
        label="Check this to add task to your calendar"
        component={Checkbox}
        onChange={this.onTodoCheck}
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
        />
      );
      fields.push(
        <Field
          key="startTimeTime"
          name="startTimeTime"
          label="Time"
          hintText="What time does it start?"
          component={TimePicker}
          format={null}
        />
      );
    }

    const xxx = [
      <Field
        key="name"
        type="text"
        name="name"
        component={EventTextField}
        label="Event Title"
        subLabel="required"
      />,
      <Field
        key="description"
        type="text"
        name="description"
        component={EventTextField}
        label="Description"
        subLabel="required"
      />,
      <Field
        key="duration"
        type="number"
        name="duration"
        component={EventTextField}
        label="Duration"
        subLabel="required, estimate"
      />,
      <Field
        key="startTimeDate"
        name="startTimeDate"
        label="Date"
        hintText="What day does it start?"
        component={DatePicker}
        format={null}
      />,
      <Field
        key="startTimeTime"
        name="startTimeTime"
        label="Time"
        hintText="What time does it start?"
        component={TimePicker}
        format={null}
      />
    ];
    return fields;
  }

  render() {
    return (
      <div>
        <h2>New Task</h2>
        <form onSubmit={this.props.handleSubmit}>
          {this.renderFields()}
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

export default reduxForm({
  validate,
  form: 'eventForm',
  initialValues: {
    durationRadio: 'minutes'
  }
})(EventForm);
