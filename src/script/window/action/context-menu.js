'use strict';

const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');

let popupOpenEvent;

function initialise() {
  const menu = new Menu();

  menu.append(new MenuItem({
    label: 'Inspect element',
    click: inspectElement
  }));
  // menu.append(new MenuItem({ type: 'separator' }));
  // menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));

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

exports.initialise = initialise;
