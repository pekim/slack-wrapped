'use strict';
/* global TS */

const ipc = require('ipc');

proxyNotifications();
unreadCountUpdate();
monitorTeamUrl();
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
    if (window.TS && TS.model) {
      ipc.sendToHost('unreadCount', TS.model.all_unread_cnt);
    }
  };
}

function monitorTeamUrl() {
  let teamUrl;

  setInterval(() => {
    if (window.TS && TS.boot_data && TS.boot_data.team_url) {
      if (TS.boot_data.team_url !== teamUrl) {
        console.log(TS.boot_data.team_url);
        ipc.sendToHost('teamUrl', TS.boot_data.team_url);
        teamUrl = TS.boot_data.team_url;
      }
    }
  }, 2000);
}

// Slack uses a module loader that conflicts with Node's.
function removeConflicts() {
  window.nodeRequire = window.require;

  delete window.require;
  delete window.module;
}
