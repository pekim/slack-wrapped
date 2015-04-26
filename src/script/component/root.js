'use strict';

const React = require('react');

const Webview = appRequire('component/webview');

const Root = React.createClass({
  render: function() {
    return (
      <Webview/>
    );
  }
});

module.exports = Root;
