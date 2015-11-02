import remote from 'remote';
const BrowserWindow = remote.require('browser-window');

export default function manageFocus(webview) {
  const browserWindow = BrowserWindow.getAllWindows()[0];

  browserWindow.on('focus', () => {
    webview.focus();
  });


  webview.addEventListener('did-finish-load', () => {
    webview.focus();
  });
}
