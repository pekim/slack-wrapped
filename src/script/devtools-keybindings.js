import app from 'app';
import globalShortcut from 'global-shortcut';
import BrowserWindow from 'browser-window';

const isOSX = process.platform === 'darwin';

function devTools() {
	const win = BrowserWindow.getFocusedWindow();

	if (win) {
		win.toggleDevTools();
	}
}

function refresh() {
	const win = BrowserWindow.getFocusedWindow();

	if (win) {
		win.reloadIgnoringCache();
	}
}

function register() {
	registerOrUnregister(::globalShortcut.register);
}

function unregister() {
	registerOrUnregister(::globalShortcut.unregister);
}

function registerOrUnregister(globalShortcutRegisterOrUnregister) {
	globalShortcutRegisterOrUnregister(isOSX ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', devTools);
	globalShortcutRegisterOrUnregister('F12', devTools);

	globalShortcutRegisterOrUnregister('CmdOrCtrl+R', refresh);
	globalShortcutRegisterOrUnregister('F5', refresh);
}

export default () => {
	app.on('ready', () => {
		register();

		app.on('browser-window-focus', register);
		app.on('browser-window-blur', unregister);
	});
};
