'use strict';

const ipc = require('ipc');

proxyNotifications();
unreadCountUpdate();
removeConflicts();

// Electron's web Notification implementation is not pretty, and has a
// weird 'view' button (at least on Ubuntu). So intercept notifications
// and have them handled in the hosting window (which uses node-notifier).
function proxyNotifications() {
  const Notifier = function(title, options) {
    options = options || {};

    ipc.sendToHost('notify', {
      title  : title,
      message: options.body
    });
  };

  Notifier.permission = 'granted';

  window.Notification = Notifier;
}

function unreadCountUpdate() {
  window.unreadCountUpdate = function(unreadCount) {
    ipc.sendToHost('unreadCount', unreadCount);
  };
}

// Slack uses a module loader that conflicts with Node's.
function removeConflicts() {
  delete window.require;
  delete window.module;
}
