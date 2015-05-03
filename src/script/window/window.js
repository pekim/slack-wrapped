'use strict';

require('babel/polyfill');
require('../app-require').init();

const React = require('react');
const Root = appRequire('component/root');

const globalKeyListeners = appRequire('window/global-key-listeners');
const windowState = appRequire('window/window-state');

windowState.restore();
windowState.saveRegularly();

globalKeyListeners.register();
render();

function render() {
  React.render(
    <Root/>,
    document.body
  );
}
