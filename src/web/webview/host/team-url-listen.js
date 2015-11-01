const initialUrl = require('web/webview/initial-url');

export default function listen(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'teamUrl') {
      initialUrl.set(event.args[0]);
    }
  });
}
