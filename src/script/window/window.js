'use strict';

require('babel/polyfill');
require('../app-require').init();

const globalKeyListeners = appRequire('window/global-key-listeners');
const contextMenu = appRequire('window/action/context-menu');
const windowState = appRequire('window/window-state');
const slackWebview = appRequire('webview/slack-webview');

windowState.restore();
windowState.saveRegularly();

globalKeyListeners.register();
contextMenu.initialise();

slackWebview.initialise();
