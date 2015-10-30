import app from 'app';
import BrowserWindow from 'browser-window';
import bindDevtoolsToKeybindings from './devtools-keybindings';

// Keep a global reference of the window object, so it is not garbage collected.
let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

bindDevtoolsToKeybindings();

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.setMenu(null);
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
