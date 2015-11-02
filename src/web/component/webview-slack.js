import React from 'react';

import { get as getInitialUrl } from 'web/webview/initial-url';
import { initialise as initialiseWebview } from 'web/webview/host/slack-webview';
import style from './webview-slack.css';

export default React.createClass({
  componentDidMount: function() {
    const webviewDOMNode = this.refs.webview;
    initialiseWebview(webviewDOMNode);
    // webviewDOMNode.addEventListener('dom-ready', function() {
    //   webviewDOMNode.openDevTools();
    // });
  },

  render: function() {
    return (
      <webview
        ref="webview"
        className={style.webview}
        src={getInitialUrl()}
        nodeintegration
        preload="../webview/guest/preload.js"
      />
    );
  }
});
