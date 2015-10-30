import path from 'path';
import hook from 'css-modules-require-hook';
import md5Hex from 'md5-hex';

import postcssImport from 'postcss-import';
import postcssModulesExtractImports from 'postcss-modules-extract-imports';
import postcssModulesLocalByDefault from 'postcss-modules-local-by-default';
import postcssModulesScope from 'postcss-modules-scope';
import postcssModulesValues from 'postcss-modules-values';

function generateScopedName(importName, filepath) {
  const basename = path.basename(filepath, '.css');
  const hash = md5Hex(importName + filepath).substr(0, 6);

  return `${basename}__${importName}__${hash}`;
}

function addStyleToHead(css) {
  const headElement = document.querySelector('head');
  const styleElement = document.createElement('style');

  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(css));
  headElement.appendChild(styleElement);

  return css;
}

hook({
  processCss: css => addStyleToHead(css),

  use: [
    postcssImport({
      path: [
        'node_modules',
        'src/web/window/css'
      ]
    }),
    postcssModulesValues,
    postcssModulesExtractImports,
    postcssModulesLocalByDefault,
    postcssModulesScope({
      generateScopedName: generateScopedName
    })
  ]
});
