'use strict';

const remote = require('remote');
const Promise = require('bluebird');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');
const popup = appRequire('window/action/popup');
const clipboard = remote.require('clipboard');
const shell = require('shell');
const slackWebview = appRequire('webview/slack-webview');
const getDictionaries = appRequire('spellcheck/hunspell-dictionaries').getDictionaries;
const getActiveDictionaryName = appRequire('spellcheck/hunspell-dictionaries').getActiveDictionaryName;
const setActiveDictionaryName = appRequire('spellcheck/hunspell-dictionaries').setActiveDictionaryName;

class ContextMenu {
  constructor() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });
  }

  open(options = {}) {
    this.options = options;

    Promise.all([
      getActiveDictionaryName(),
      getDictionaries()
    ]).then(results => {
        const [activeDictionaryName, dictionaries] = results;

        this.activeDictionaryName = activeDictionaryName;
        this.dictionaries = dictionaries;
        this.open2();
      })
    ;
  }

  open2() {
    this.menu = new Menu();

    this.addSuggestions();
    this.addAbout();
    this.addTheme();
    this.addSpellCheckSubmenu();
    this.addToolsSubmenu();
    this.addUrlRelatedItems();

    this.menu.popup(remote.getCurrentWindow());
  }

  addSuggestions() {
    if (!this.options.wordSuggestions || this.options.wordSuggestions.length === 0) {
      return;
    }

    for (const wordSuggestion of this.options.wordSuggestions) {
      this.addSuggestionItem(wordSuggestion);
    }

    this.menu.append(new MenuItem({ type: 'separator' }));
  }

  addSuggestionItem(wordSuggestion) {
    this.menu.append(new MenuItem({
      label: wordSuggestion,
      click: () => slackWebview.replaceMisspelling(wordSuggestion)
    }));
  }

  addAbout() {
    this.menu.append(new MenuItem({
      label: 'About',
      click: popup.toggleAbout
    }));
  }

  addTheme() {
    this.menu.append(new MenuItem({
      label: 'Theme',
      click: popup.toggleTheme
    }));
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

  addSpellCheckSubmenu() {
    this.menu.append(new MenuItem({
      label  : 'Spell checking',
      submenu: this.spellCheckMenu()
    }));
  }

  addToolsSubmenu() {
    this.menu.append(new MenuItem({
      label  : 'Tools',
      submenu: this.toolsMenu()
    }));
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

  spellCheckMenu() {
    const dictionaryNames = Object.keys(this.dictionaries).sort((name1, name2) => {
      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }
      return 0;
    });

    const menu = new Menu();

    for (const dictionaryName of dictionaryNames) {
      this.addDictionaryItem(menu, dictionaryName);
    }

    return menu;
  }

  addDictionaryItem(menu, dictionaryName) {
    menu.append(new MenuItem({
      label  : dictionaryName,
      type   : 'radio',
      checked: dictionaryName === this.activeDictionaryName,
      click  : () => {
        setActiveDictionaryName(dictionaryName);
      }
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
}

module.exports = ContextMenu;
