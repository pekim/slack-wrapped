'use strict';

require('babel/polyfill');
require('../app-require').init();

const React = require('react');
const Root = appRequire('component/root');

const globalKeyListeners = appRequire('window/global-key-listeners');
const windowState = appRequire('window/window-state');
const preferenceTheme = appRequire('preference/theme');
const data = appRequire('data/data');

windowState.restore();
windowState.saveRegularly();

globalKeyListeners.register();
preferenceTheme.initialise();

render();
data.on('change', render);

function render() {
  React.render(
    <Root data={data.getIn()}/>,
    document.body
  );
}
