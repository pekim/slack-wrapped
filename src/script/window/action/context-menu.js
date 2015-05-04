'use strict';

const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');
const popup = appRequire('window/action/popup');
const clipboard = remote.require('clipboard');
const shell = require('shell');

class ContextMenu {
  constructor() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });
  }

  open(options) {
    options = options || {};

    this.menu = new Menu();

    this.menu.append(new MenuItem({
      label: 'About',
      click: popup.toggleAbout
    }));

    this.menu.append(new MenuItem({
      label: 'Theme',
      click: popup.toggleTheme
    }));

    this.menu.append(new MenuItem({ type: 'separator' }));

    if (options.url) {
      this.menu.append(new MenuItem({
        label: 'Open link in browser',
        click: () => shell.openExternal(options.url)
      }));

      this.menu.append(new MenuItem({
        label: 'Copy link address',
        click: () => clipboard.writeText(options.url)
      }));

      this.menu.append(new MenuItem({ type: 'separator' }));
    }

    this.menu.append(new MenuItem({
      label: 'window - Inspect element',
      click: () => this.inspectElement()
    }));

    this.menu.append(new MenuItem({
      label: 'window - Open devtools',
      click: () => this.openDevTools()
    }));

    if (options.webviewInspectElement || options.webviewOpenDevTools) {
      this.menu.append(new MenuItem({ type: 'separator' }));
    }

    if (options.webviewInspectElement) {
      this.menu.append(new MenuItem({
        label: 'webview - Inspect element',
        click: () => options.webviewInspectElement()
      }));
    }

    if (options.webviewOpenDevTools) {
      this.menu.append(new MenuItem({
        label: 'webview - Open devtools',
        click: () => options.webviewOpenDevTools()
      }));
    }

    this.menu.popup(remote.getCurrentWindow());
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
}

module.exports = ContextMenu;
