'use strict';

const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');
const slackWebview = appRequire('webview/slack-webview');

let popupOpenEvent;

function initialise() {
  const menu = new Menu();

  menu.append(new MenuItem({
    label: 'window - Inspect element',
    click: inspectElement
  }));

  menu.append(new MenuItem({
    label: 'window - Open devtools',
    click: openDevTools
  }));

  menu.append(new MenuItem({ type: 'separator' }));

  menu.append(new MenuItem({
    label: 'webview - Inspect element',
    click: () => slackWebview.inspectElement(popupOpenEvent.clientX, popupOpenEvent.clientY)
  }));

  menu.append(new MenuItem({
    label: 'webview - Open devtools',
    click: slackWebview.openDevTools
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
