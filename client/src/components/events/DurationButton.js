import React from 'react';

const DurationButton = props => {
  const { value, active, onButtonPress, text } = props;
  const activeClass = active ? ' active' : '';
  return (
    <button
      className={'btn-flat durationButton' + activeClass}
      onClick={() => onButtonPress(value)}
    >
      {text}
    </button>
  );
};

export default DurationButton;
