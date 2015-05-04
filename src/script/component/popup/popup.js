'use strict';

const React = require('react');
const ContextMenu = appRequire('window/action/context-menu');
const popup = appRequire('window/action/popup');
const keycode = appRequire('keys/keycode');

const contextMenu = new ContextMenu();

const Popup = React.createClass({
  onClick: function() {
    popup.close();
  },

  onKeyDown: function(event) {
    if (event.keyCode === keycode.ESCAPE) {
      popup.close();
    }
  },

  onContextMenu: function() {
    contextMenu.open();
  },

  componentDidMount: function() {
    React.findDOMNode(this).focus();
  },

  render: function() {
    return (
      <div className="popup" tabIndex="1"
          onKeyDown={this.onKeyDown}
          onContextMenu={this.onContextMenu}
      >
        <div className="overlay" onClick={this.onClick}/>
        <div className="popup-content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Popup;
