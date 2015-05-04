'use strict';

const fs = require('fs');
const appPath = appRequire('app-path');

const themePath = appPath('style/theme/dark.css');

function inject(slackWebview) {
  fs.readFile(themePath, (err, css) => {
    if (err) {
      console.error(`failed to load theme '${themePath}'`, err);
      return;
    }

    const cssString = css.toString().replace(/\n/g, '');

    slackWebview.executeJavaScript(`
      var css = "${cssString}";
      var styleElement = document.createElement("style");

      styleElement.classList.add('slack-wrapped-theme');
      styleElement.textContent = css;
      document.body.appendChild(styleElement);
    `);
  });
}

exports.inject = inject;
