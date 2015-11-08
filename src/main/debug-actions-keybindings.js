import { register } from 'electron-localshortcut';

export default (window) => {
	function send(channel, ...args) {
		window.send(channel, ...args);
	}

	register(window, 'Escape', () => send('cancel'));
	register(window, 'F2', () => send('toggleAbout'));

	register(window, 'F12', () => window.toggleDevTools());
	register(window, 'Shift+F12', () => send('toggleWebviewDevtools'));

	register(window, 'CmdOrCtrl+R', () => window.reloadIgnoringCache());
	register(window, 'F5', () => window.reloadIgnoringCache());
};
