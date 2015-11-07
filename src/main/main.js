import app from 'app';
import BrowserWindow from 'browser-window';

import bindDebugActionsToKeybindings from './debug-actions-keybindings';
import { getStickerImagePath } from 'web/slack-brand';

// Keep a global reference of the window object, so it is not garbage collected.
let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    icon: getStickerImagePath(128)
  });

  mainWindow.setMenu(null);
  mainWindow.loadUrl('file://' + require.resolve('web/window/index.html'));

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  bindDebugActionsToKeybindings(mainWindow);
});
