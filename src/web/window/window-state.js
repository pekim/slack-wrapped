const BrowserWindow = require('remote').require('browser-window');

const KEY = 'windowState';

export function restore() {
  const browserWindow = BrowserWindow.getAllWindows()[0];
  const windowSize = JSON.parse(localStorage.getItem(KEY));

  browserWindow.show();

  if (windowSize) {
    console.log(windowSize.position, windowSize.size);
    browserWindow.setPosition(...windowSize.position);
    browserWindow.setSize(...windowSize.size);

    if (windowSize.isMaximized) {
      browserWindow.maximize();
    }
  } else {
    browserWindow.setSize(800, 600);
    browserWindow.center();
  }
}

export function saveRegularly() {
  setInterval(save, 5 * 1000);
}

function save() {
  const browserWindow = BrowserWindow.getAllWindows()[0];

  localStorage.setItem(KEY, JSON.stringify({
    position   : browserWindow.getPosition(),
    size       : browserWindow.getSize(),
    isMaximized: browserWindow.isMaximized()
  }));
}
