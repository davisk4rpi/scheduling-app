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
    let details;
    if (this.state.expanded) {
      details = [
        <p key={1}>
          {event.description}
        </p>,

        <p key={2} className="right-align">
          Estimated: {event.duration} min
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
          {details}
          {date}
        </div>
      </div>
    );
  }
}

export default EventShow;
