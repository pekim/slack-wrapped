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

  open(options = {}) {
    this.options = options;

    this.menu = new Menu();

    this.addSuggestions();

    this.menu.append(new MenuItem({
      label: 'About',
      click: popup.toggleAbout
    }));

    this.menu.append(new MenuItem({
      label: 'Theme',
      click: popup.toggleTheme
    }));

    this.menu.append(new MenuItem({
      label  : 'Tools',
      submenu: this.toolsMenu()
    }));

    this.addUrlRelatedItems();

    this.menu.popup(remote.getCurrentWindow());
  }

  addSuggestions() {
    if (!this.options.wordSuggestions || this.options.wordSuggestions.length ===0) {
      return;
    }

    for (const wordSuggestion of this.options.wordSuggestions) {
      this.menu.append(new MenuItem({
        label: wordSuggestion,
        click: popup.toggleTheme
      }));
    }

    this.menu.append(new MenuItem({ type: 'separator' }));
  }

  addUrlRelatedItems() {
    if (this.options.url) {
      this.menu.append(new MenuItem({ type: 'separator' }));

      this.menu.append(new MenuItem({
        label: 'Open link in browser',
        click: () => shell.openExternal(this.options.url)
      }));

      this.menu.append(new MenuItem({
        label: 'Copy link address',
        click: () => clipboard.writeText(this.options.url)
      }));
    }
  }

  toolsMenu() {
    const menu = new Menu();

    menu.append(new MenuItem({
      label: 'window - Inspect element',
      click: () => this.inspectElement()
    }));

    menu.append(new MenuItem({
      label: 'window - Open devtools',
      click: () => this.openDevTools()
    }));

    if (this.options.webviewInspectElement || this.options.webviewOpenDevTools) {
      menu.append(new MenuItem({ type: 'separator' }));
    }

    if (this.options.webviewInspectElement) {
      menu.append(new MenuItem({
        label: 'webview - Inspect element',
        click: () => this.options.webviewInspectElement()
      }));
    }

    if (this.options.webviewOpenDevTools) {
      menu.append(new MenuItem({
        label: 'webview - Open devtools',
        click: () => this.options.webviewOpenDevTools()
      }));
    }

    return menu;
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
