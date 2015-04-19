'use strict';

const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');
const slackWebview = appRequire('webview/slack-webview');

let popupOpenEvent;

function initialise() {
  const menu = new Menu();

  menu.append(new MenuItem({
    label: 'Inspect element',
    click: inspectElement
  }));

  menu.append(new MenuItem({
    accelerator: 'F12',
    label      : 'Open devtools',
    click      : openDevTools
  }));

  menu.append(new MenuItem({ type: 'separator' }));

  menu.append(new MenuItem({
    accelerator: 'Ctrl+F12',
    label      : 'Open webview devtools',
    click      : slackWebview.openDevTools
  }));

  window.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    popupOpenEvent = event;
    menu.popup(remote.getCurrentWindow());
  }, false);
}

function inspectElement() {
  const browserWindow = remote.getCurrentWindow();
  browserWindow.inspectElement(popupOpenEvent.clientX, popupOpenEvent.clientY);
}

function openDevTools() {
  const browserWindow = remote.getCurrentWindow();
  browserWindow.openDevTools();
}

exports.initialise = initialise;
