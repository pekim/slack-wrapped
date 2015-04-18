'use strict';

const ipc = require('ipc');

proxyNotifications();
removeConflicts();

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

function removeConflicts() {
  // Slack uses a module loader that conflicts with Node's.

  delete window.require;
  delete window.module;
}
