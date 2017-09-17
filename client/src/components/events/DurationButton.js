import React from 'react';

const DurationButton = props => {
  const { value, active, onButtonPress, text } = props;
  const activeClass = active ? ' active' : '';
  return (
    <div
      className={'btn-flat durationButton' + activeClass}
      onClick={() => onButtonPress(value)}
    >
      {text}
    </div>
  );
};

export default DurationButton;
