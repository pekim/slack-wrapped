'use strict';
/* global TS */
/* global unreadCountUpdate */
/* eslint-disable no-var */

// Based on the example in https://github.com/wlaurance/slack-for-linux/blob/master/app/js/index.js
// (licensed under MIT)
(function() {
  var sig;

  if (!window.TS) {
    return;
  }

  if (TS.channels) {
    sig = TS.channels.unread_changed_sig; if (sig) { sig.add(unreadCountUpdate); }
    sig = TS.channels.unread_highlight_changed_sig; if (sig) { sig.add(unreadCountUpdate); }
  }

  if (TS.groups) {
    sig = TS.groups.unread_changed_sig; if (sig) { sig.add(unreadCountUpdate); }
    sig = TS.groups.unread_highlight_changed_sig; if (sig) { sig.add(unreadCountUpdate); }
  }

  if (TS.ims) {
    sig = TS.ims.unread_changed_sig; if (sig) { sig.add(unreadCountUpdate); }
    sig = TS.ims.unread_highlight_changed_sig; if (sig) { sig.add(unreadCountUpdate); }
  }

  if (TS.client) {
    sig = TS.client.login_sig; if (sig) { sig.add(unreadCountUpdate); }
  }
})();
