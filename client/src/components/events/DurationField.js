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
    this.setState({ value });
    this.props.handleDurationChange(value);
  };

  toggleCustom = () => {
    this.setState({
      custom: !this.state.custom
    });
    this.handleValueChange(5);
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
    const { input } = this.props;
    let content = (
      <div>
        {this.renderButtons()}
        <div className="btn-flat durationButton" onClick={this.toggleCustom}>
          other
        </div>
      </div>
    );

    if (this.state.custom) {
      content = (
        <div>
          <DurationCustom handleValueChange={this.handleValueChange} />
          <div className="btn-flat durationButton" onClick={this.toggleCustom}>
            back
          </div>
        </div>
      );
    }
    return (
      <div>
        <input {...input} type="hidden" value={this.state.value} />
        {content}
      </div>
    );
  }
}

export default DurationField;
