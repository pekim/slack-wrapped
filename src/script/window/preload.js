'use strict';
/*eslint-disable no-var */

var ipc = require('ipc');

var Notifier = function(title, options) {
  options = options || {};

  ipc.sendToHost('notify', {
    title  : title,
    message: options.body
  });
};

Notifier.permission = 'granted';

window.Notification = Notifier;

delete window.require;
delete window.module;
