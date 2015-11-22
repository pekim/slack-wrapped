import { register, unregister } from 'electron-localshortcut';

export function registerKeybindings(window) {
	register(window, 'F2', () => window.send('toggleAbout'));

	register(window, 'F12', () => window.toggleDevTools());
	register(window, 'Shift+F12', () => window.send('toggleWebviewDevtools'));

	register(window, 'CmdOrCtrl+R', () => window.reloadIgnoringCache());
	register(window, 'F5', () => window.reloadIgnoringCache());
}

export function registerCancel(window) {
	register(window, 'Escape', () => window.send('cancel'));
}

export function unregisterCancel(window) {
	unregister(window, 'Escape');
}
