import ipc from 'ipc';

import { toggleDevTools as toggleWebviewDevtools} from 'web/webview/host/slack-webview';
import { toggleAbout, hideAll } from 'web/ducks/modals';

export default (dispatch) => {
  ipc.on('toggleWebviewDevtools', toggleWebviewDevtools);

  ipc.on('cancel', () => dispatch(hideAll()));
  ipc.on('toggleAbout', () => dispatch(toggleAbout()));
};
