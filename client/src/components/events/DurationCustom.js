import React, { Component } from 'react';
import DurationButton from './DurationButton';

class DurationCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5,
      unit: 1
    };
  }

  changeUnit = (callback, unit) => {
    this.setState({ unit });
    const value = this.state.value * unit;
    callback(value);
  };

  changeValue = (callback, value) => {
    console.log(value);
    this.setState({ value });
    value *= this.state.unit;
    callback(value);
  };

  renderButtons() {
    // the values are the multipliers used to convert into minutes
    const multipliers = [[1, 'minutes'], [60, 'hours'], [1440, 'days']];
    return multipliers.map(multiplier => {
      const active = multiplier[0] === this.state.unit ? 'active' : '';
      return (
        <DurationButton
          key={multiplier[0]}
          value={multiplier[0]}
          text={`${multiplier[1]}`}
          active={active}
          onButtonPress={() =>
            this.changeUnit(this.props.handleValueChange, multiplier[0])}
        />
      );
    });
  }

  render() {
    const numberStyle = {
      fontSize: '4rem',
      height: '5rem',
      marginTop: '10px',
      textAlign: 'center'
    };
    return (
      <div className="row">
        <div className="col s6">
          <input
            id="durationValue"
            style={numberStyle}
            type="number"
            value={this.state.value}
            onChange={e =>
              this.changeValue(this.props.handleValueChange, e.target.value)}
          />
        </div>
        <div className="durationUnitGroup col s6">
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

export default DurationCustom;
