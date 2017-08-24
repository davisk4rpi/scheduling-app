import React, { Component } from 'react';

class Header extends Component {
  renderContent() {
    return [<li key="1">1</li>, <li key="2">1</li>, <li key="3">1</li>];
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
            {this.renderContent()}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
