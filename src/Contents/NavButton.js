import React from 'react';
import './NavButton.css';

class NavButton extends React.Component {
    render() {
      return (
        <button id="roundButton" onMouseDown={this.props.handleMouseDown}>&#9776; Open</button>
      );
    }
  }

  export default NavButton;