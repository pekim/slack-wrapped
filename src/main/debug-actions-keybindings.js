import { register } from 'electron-localshortcut';

export default (window) => {
	register(window, 'F12', () => window.toggleDevTools());
	register(window, 'Shift+F12', () => window.webContents.send('toggleWebviewDevtools'));

	register(window, 'CmdOrCtrl+R', () => window.reloadIgnoringCache());
	register(window, 'F5', () => window.reloadIgnoringCache());
};
