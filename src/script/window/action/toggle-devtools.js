'use strict';

const BrowserWindow = require('remote').require('browser-window');
const parseKeyCombination = appRequire('keys/parse-key-combination');

function onKeydown(event) {
  const keyCombination = '${keyCombination}';

  if (
    event.altKey === keyCombination.alt &&
    event.ctrlKey === keyCombination.ctrl &&
    event.shiftKey === keyCombination.shift &&
    event.keyCode === keyCombination.keyCode
  ) {
    window.close();
  }
}

function toggleDevTools(keyCombinationText) {
  const browserWindow = BrowserWindow.getFocusedWindow();

  const keyCombination = parseKeyCombination(keyCombinationText);
  const onKeydownFunction = onKeydown.toString().replace('\'${keyCombination}\'', JSON.stringify(keyCombination));

  if (browserWindow.devToolsWebContents) {
    browserWindow.closeDevTools();
  } else {
    browserWindow.openDevTools();
    const devToolsWindow = BrowserWindow.getFocusedWindow().devToolsWebContents;

    devToolsWindow.executeJavaScript(`document.addEventListener("keydown", ${onKeydownFunction});`);
  }
}

module.exports = toggleDevTools;
