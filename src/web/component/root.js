import React, { Component } from 'react';

import { connect } from 'react-redux';

import WebviewSlack from './webview-slack';
import About from './about';
import style from './root.css';

@connect(state => {
  return {
    showAbout: state.modals.showAbout
  };
})
export default class extends Component {
  render() {
    const showAbout = this.props.showAbout;

    return (
      <div className={style.root}>
        {showAbout ? <About/> : null}
        <WebviewSlack/>
      </div>
    );
  }
}
