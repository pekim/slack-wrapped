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
      ['chrome', 'chrome'],
      ['electron', 'electron'],
      ['io.js', 'node'],
      ['v8', 'v8']
    ].map((product, index) => {
      const [label, productName] = product;
      const version = process.versions[productName];

      return (
        <div key={index} className="product-version">
          <span className="label">{label}</span>
          <span className="version">{version}</span>
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
