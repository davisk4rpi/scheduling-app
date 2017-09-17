import React, { Component } from 'react';

import DurationButton from './DurationButton';
import DurationCustom from './DurationCustom';

class DurationField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5,
      custom: false
    };
  }

  handleValueChange = value => {
    console.log(value);
    this.setState({ value });
  };

  toggleCustom = () => {
    this.setState({ custom: !this.state.custom });
  };

  renderButtons() {
    const values = [5, 15, 30, 60];
    return values.map(value => {
      const active = value === this.state.value ? 'active' : '';
      return (
        <DurationButton
          key={value}
          value={value}
          text={`${value} min`}
          active={active}
          onButtonPress={this.handleValueChange}
        />
      );
    });
  }

  render() {
    let content = (
      <div>
        {this.renderButtons()}
        <button className="btn-flat durationButton" onClick={this.toggleCustom}>
          other
        </button>
      </div>
    );

    if (this.state.custom) {
      content = (
        <div>
          <DurationCustom handleValueChange={this.handleValueChange} />
          <button
            className="btn-flat durationButton"
            onClick={this.toggleCustom}
          >
            back
          </button>
        </div>
      );
    }
    return (
      <div>
        <input type="hidden" value={this.state.value} />
        {content}
      </div>
    );
  }
}

export default DurationField;
