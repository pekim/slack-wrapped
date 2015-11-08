import ipc from 'ipc';

import { toggleDevTools as toggleWebviewDevtools} from 'web/webview/host/slack-webview';

export default () => {
  ipc.on('toggleWebviewDevtools', () => {
    toggleWebviewDevtools();
  });
};
