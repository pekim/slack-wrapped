'use strict';

const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');

class ContextMenu {
  constructor() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    this.menu = new Menu();

    this.menu.append(new MenuItem({
      label: 'window - Inspect element',
      click: () => this.inspectElement()
    }));

    this.menu.append(new MenuItem({
      label: 'window - Open devtools',
      click: () => this.openDevTools()
    }));

    this.menu.append(new MenuItem({ type: 'separator' }));

    this.menu.append(new MenuItem({
      label: 'webview - Inspect element',
      click: () => this.openOptions.webviewInspectElement()
    }));

    this.menu.append(new MenuItem({
      label: 'webview - Open devtools',
      click: () => this.openOptions.webviewOpenDevTools()
    }));
  }

  inspectElement() {
    this.currentWindow().inspectElement(this.mouseX, this.mouseY);
  }

  openDevTools() {
    this.currentWindow().openDevTools();
  }

  currentWindow() {
    return remote.getCurrentWindow();
  }

  open(openOptions) {
    this.openOptions = openOptions;
    this.menu.popup(remote.getCurrentWindow());
  }
}

module.exports = ContextMenu;
