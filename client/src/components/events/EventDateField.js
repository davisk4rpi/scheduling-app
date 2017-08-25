import React from 'react';
import { DatePicker, TimePicker } from 'redux-form-material-ui';

export default props => {
  console.log(props);
  const { type, input, label, subLabel, meta: { error, touched } } = props;
  return (
    <div>
      <label>
        {label}
        <br />
        {subLabel}
      </label>
      <div>
        <DatePicker
          {...input}
          onBlur={input.onBlur()}
          hintText="When does it start?"
          container="inline"
          mode="landscape"
        />
      </div>
      <input {...input} type={type} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
