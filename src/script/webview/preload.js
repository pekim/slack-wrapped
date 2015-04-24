'use strict';
/* global TS */

const ipc = require('ipc');

proxyNotifications();
unreadCountUpdate();
removeConflicts();

// intercept notifications and have them handled in the hosting window
// where an icon can be added.
function proxyNotifications() {
  const Notifier = function(title, options) {
    ipc.sendToHost('notify', title, options);
  };

  Notifier.permission = 'granted';

  window.Notification = Notifier;
}

function unreadCountUpdate() {
  window.unreadCountUpdate = function() {
    if (TS && TS.model) {
      ipc.sendToHost('unreadCount', TS.model.all_unread_cnt);
    }
  };
}

// Slack uses a module loader that conflicts with Node's.
function removeConflicts() {
  delete window.require;
  delete window.module;
}
