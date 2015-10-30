require('babel-core/register');
require('./css-modules-hook');

// suppress annoying console message "Download the React DevTools..."
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};

require('./window');
