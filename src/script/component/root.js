'use strict';

const React = require('react');

const data = appRequire('data/data');
const Webview = appRequire('component/webview');
const About = appRequire('component/popup/about');

const Root = React.createClass({
  render: function() {
    return (
      <div className="app">
        {this.renderAboutPopup()}
        <Webview/>
      </div>
    );
  },

  renderAboutPopup: function() {
    if (data.getIn(['popup', 'showAbout'])) {
      return <About/>;
    }
  }
});

module.exports = Root;
