import React, { Component } from 'react';

class EventShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpansion = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { event, date } = this.props;
    let details, buttons;
    if (this.state.expanded) {
      details = [
        <p key={1}>
          {event.description}
        </p>,
        <p key={2} className="right">
          Estimated Time: {event.duration} min
        </p>
      ];
      buttons = [
        <button
          key={3}
          className="btn red right"
          onClick={this.props.onDeleteClick}
        >
          delete
        </button>,
        <button
          key={4}
          className="btn red blue right"
          onClick={this.props.onEditClick}
        >
          edit
        </button>
      ];
    }

    return (
      <div className="card darken-1 blue-grey" onClick={this.handleExpansion}>
        <div className="card-content white-text">
          {buttons}
          <span className="card-title">
            {event.name}
          </span>
          {details}
        </div>
        {date}
      </div>
    );
  }
}

export default EventShow;
