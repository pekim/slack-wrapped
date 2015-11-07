import { set as setInitialUrl } from 'web/webview/initial-url';

export default function listen(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'teamUrl') {
      setInitialUrl(event.args[0]);
    }
  });
}
