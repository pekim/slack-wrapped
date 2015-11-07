'use strict';

// Based on the example in https://github.com/wlaurance/slack-for-linux/blob/master/app/js/index.js
// (licensed under MIT)
(function() {
  if (!window.TS) {
    return;
  }

  addConversationListeners(window.TS.channels);
  addConversationListeners(window.TS.groups);
  addConversationListeners(window.TS.ims);

  if (window.TS.client) {
    addListener(window.TS.client.login_sig);
  }

  function addConversationListeners(conversations) {
    if (!conversations) {
      return;
    }

    addListener(conversations.unread_changed_sig);
    addListener(conversations.unread_highlight_changed_sig);
  }

  function addListener(sig) {
    if (sig) {
      sig.add(window.unreadCountUpdate);
    }
  }
})();
