'use strict';

const React = require('react');
const packageData = appRootRequire('package.json');
const Popup = appRequire('component/popup/popup');
const slackBrand = appRequire('slack-brand');

const About = React.createClass({
  render: function() {
    return (
      <Popup>
        <div className="about">
          {this.renderApp()}
          {this.renderVersions()}
          {this.renderSlack()}
        </div>
      </Popup>
    );
  },

  renderApp: function() {
    return (
      <div className="app-name">
        Slack wrapped up as an application
      </div>
    );
  },

  renderVersions: function() {
    const versions = Object.assign({
      slackWrapped: packageData.version
    }, process.versions);

    return [
      [packageData.name, 'slackWrapped'],
      ['chrome', 'chrome'],
      ['electron', 'electron'],
      ['io.js', 'node'],
      ['v8', 'v8']
    ].map((product, index) => {
      const [label, productName] = product;
      const version = versions[productName];

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
        <img src={slackBrand.getStickerImagePath(64)}/>
      </div>,
      <div key="2" className="slack-not-affiliated">
        {slackBrand.notAffiliatedText}
      </div>
    ]);
  }
});

module.exports = About;
