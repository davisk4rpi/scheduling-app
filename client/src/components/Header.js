import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <Link to="/login">Log In</Link>
          </li>,
          <li key="2">
            <Link to="/signup">Sign Up</Link>
          </li>
        ];
      default:
        return [
          <li key="1">
            <a href="/api/logout">Logout</a>
          </li>,
          <li key="2">
            <Link>Settings</Link>
          </li>,
          <li key="3">
            <Link>Dashboard</Link>
          </li>
        ];
    }
  }

  render() {
    return (
      <header id="header">
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? '/dashboard' : '/'}
              className="left brand-logo"
            >
              Schedulizer
            </Link>
            <ul className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
