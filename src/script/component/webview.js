'use strict';

const React = require('react');
const slackWebview = appRequire('webview/slack-webview');
const initialUrl = appRequire('webview/initial-url');

const Webview = React.createClass({
  componentDidMount: function() {
    const webviewDOMNode = React.findDOMNode(this).querySelector('webview');
    slackWebview.initialise(webviewDOMNode);
  },

  render: function() {
    const markup = {__html: `
      <webview
        id="slack"
        src="${initialUrl.get()}"
        nodeintegration
        preload="./script/webview/preload.js"
      ></webview>
    `};

    return (
      <div className="webview-container" dangerouslySetInnerHTML={markup} />
    );
  }
});

module.exports = Webview;
