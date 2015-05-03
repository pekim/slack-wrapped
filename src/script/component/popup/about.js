'use strict';

const React = require('react');
const popup = appRequire('window/action/popup');
const packageData = appRootRequire('package.json');
const slackBrand = appRequire('slack-brand');

const Help = React.createClass({
  onClick: function() {
    console.log('about click')
    popup.close();
  },

  render: function() {
    return (
      <div className="popup">
        <div className="overlay" onClick={this.onClick}/>
        <div className="popup-content about">
          {this.renderApp()}
          {this.renderVersions()}
          {this.renderSlack()}
        </div>
      </div>
    );
  },

  renderApp: function() {
    return (
      <div className="app-name">
        Slack Wrapped - Slack wrapped up as an application - {packageData.version}
      </div>
    );
  },

  renderVersions: function() {
    return [
      ['atom shell', 'atom-shell'],
      ['chrome', 'chrome'],
      ['node', 'node'],
      ['v8', 'v8']
    ].map((version, index) => {
      return (
        <div key={index} className="version">
          {version[0]} : {process.versions[version[1]]}
        </div>
      );
    });
  },

  renderSlack: function() {
    return ([
      <div key="1" className="slack-logo">
        <img src={slackBrand.stickerImagePath}/>
      </div>,
      <div key="2" className="slack-not-affiliated">
        {slackBrand.notAffiliatedText}
      </div>
    ]);
  }
});

module.exports = Help;
