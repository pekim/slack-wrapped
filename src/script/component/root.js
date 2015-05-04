'use strict';

const React = require('react');

const Webview = appRequire('component/webview');
const About = appRequire('component/popup/about');
const Theme = appRequire('component/popup/theme');

const Root = React.createClass({
  render: function() {
    const theme = this.props.data.get('theme');

    return (
      <div className="app">
        {this.renderPopup('About', <About/>)}
        {this.renderPopup('Theme', <Theme theme={theme}/>)}

        <Webview/>
      </div>
    );
  },

  renderPopup: function(name, component) {
    if (this.props.data.getIn(['popup', 'show' + name])) {
      return component;
    }
  }
});

module.exports = Root;
