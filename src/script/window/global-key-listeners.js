'use strict';

const addGlobalKeyListener = appRequire('keys/global-keybinding').addListener;

const toggleDevTools = appRequire('window/action/toggle-devtools');
const toggleFullScreen = appRequire('window/action/toggle-fullscreen');
// const help = appRequire('window/action/help');
const zoom = appRequire('window/action/zoom');

const toggleDevToolsKeyCombination = 'F12';
const toggleDevToolsBound = toggleDevTools.bind(null, toggleDevToolsKeyCombination);

const combinations = [
  // {
  //   keys       : 'CTRL + K',
  //   handler    : help.open,
  //   description: 'Help for keystrokes (this dialog)'
  // },
  {
    keys       : 'F11',
    handler    : toggleFullScreen,
    description: 'Toggle Fullscreen'
  },
  {
    keys       : 'F12',
    handler    : toggleDevToolsBound,
    description: 'Toggle (Open/Close) Dev Tools'
  },
  {
    keys       : 'CTRL + R',
    handler    : window.location.reload.bind(window.location, true),
    description: 'Reload; soft restart of app (typically for development use)'
  },

  {
    keys       : 'CTRL + 0',
    handler    : zoom.default,
    description: 'Zoom default; reset zoom level to default'
  },
  {
    keys       : 'CTRL + NUMPAD_PLUS',
    handler    : zoom.in,
    description: 'Zoom in; make everything larger'
  },
  {
    keys       : 'CTRL + NUMPAD_MINUS',
    handler    : zoom.out,
    description: 'Zoom out; make everything smaller'
  }
];

function register() {
  combinations.forEach(function(combination) {
    addGlobalKeyListener(combination.keys, combination.handler);
  });
}

exports.combinations = combinations;
exports.register = register;
