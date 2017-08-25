import React from 'react';

export default ({ type, input, label, subLabel, meta: { error, touched } }) => {
  return (
    <div>
      <label>
        {label}
        <br />
        {subLabel}
      </label>
      <input {...input} type={type} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
