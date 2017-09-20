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
    let { duration } = event;
    let unit = 'min';
    if (duration >= 60 && [0, 30].includes(duration % 60)) {
      duration /= 60;
      unit = 'hr';
    }
    let details;
    if (this.state.expanded) {
      details = [
        <p key={1}>
          {event.description}
        </p>
      ];
    }

    return (
      <div
        className="event-card darken-1 blue-grey white-text"
        onClick={this.handleExpansion}
      >
        <div className="event-card-action">
          <icon
            key={3}
            className="material-icons"
            onClick={this.props.onEditClick}
          >
            edit
          </icon>
        </div>
        <div className="event-card-content">
          <icon
            className="material-icons right"
            onClick={this.props.onDeleteClick}
          >
            delete_forever
          </icon>
          <span className="title">
            {event.name}
          </span>
          <span className="duration">
            ({duration} {unit})
          </span>
          {details}
          {date}
        </div>
      </div>
    );
  }
}

export default EventShow;
