'use strict';

const data = appRequire('data/data');

function inject(webview) {
  const themes = data.getIn(['theme']);
  const themeName = themes.get('active');

  removeTheme(webview);

  if (themeName && themeName !== 'null') {
    const themeType = themeName.split('-')[0];
    const theme = themes.getIn([themeType]).find((theme) => {
      return theme.get('id') === themeName;
    });

    injectTheme(webview, theme.get('css'));
  }
}

function removeTheme(webview) {
  webview.executeJavaScript(`
    var themeElement = document.querySelector('.slack-wrapped-theme');

    if (themeElement) {
      themeElement.remove();
    }
  `);
}

function injectTheme(webview, css) {
  const cssWithNewlinesRemoved = css.replace(/\n/g, '');

  webview.executeJavaScript(`
    var css = "${cssWithNewlinesRemoved}";
    var styleElement = document.createElement("style");

    styleElement.classList.add('slack-wrapped-theme');
    styleElement.textContent = css;
    document.body.appendChild(styleElement);
  `);
}

exports.inject = inject;
