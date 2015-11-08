import React, { Component } from 'react';

import { get as getInitialUrl } from 'web/webview/initial-url';
import { initialise as initialiseWebview } from 'web/webview/host/slack-webview';
import style from './webview-slack.css';

export default class extends Component {
  componentDidMount() {
    initialiseWebview(this.refs.webview);
  }

  render() {
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
}
