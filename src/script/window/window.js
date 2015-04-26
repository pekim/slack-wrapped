'use strict';

require('babel/polyfill');
require('../app-require').init();

const React = require('react');
const Root = appRequire('component/root');

const globalKeyListeners = appRequire('window/global-key-listeners');
const contextMenu = appRequire('window/action/context-menu');
const windowState = appRequire('window/window-state');

windowState.restore();
windowState.saveRegularly();

globalKeyListeners.register();
contextMenu.initialise();
render();

function render() {
  React.render(
    <Root/>,
    document.body
  );
}
