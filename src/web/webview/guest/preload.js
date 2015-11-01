import monitorTeamUrl from './monitor-team-url';

// const webFrame = require('web-frame');
// const spellcheck = appRequire('spellcheck/spellcheck');
// const getMispelledWord = appRequire('spellcheck/find-mispelled-word');

// proxyNotifications();
// unreadCountUpdate();
monitorTeamUrl();
// contextMenuListener();
// zoomFactorListener();
// removeConflicts();
// spellcheck.initialise(navigator.language.replace('-', '_'));

// intercept notifications and have them handled in the hosting window
// where an icon can be added.
// function proxyNotifications() {
//   const Notifier = function(title, options) {
//     ipc.sendToHost('notify', title, options);
//   };
//
//   Notifier.permission = 'granted';
//
//   window.Notification = Notifier;
// }

// function unreadCountUpdate() {
//   window.unreadCountUpdate = function() {
//     if (window.TS && window.TS.model) {
//       ipc.sendToHost('unreadCount', window.TS.model.all_unread_cnt);
//     }
//   };
// }

// function contextMenuListener() {
//   document.addEventListener('contextmenu', (event) => {
//     const node = event.target;
//     const targetUrl = node.nodeName === 'A' ? node.href : null;
//
//     if (node.nodeName === 'TEXTAREA' ||
//       (node.nodeName === 'INPUT' && node.getAttribute('type') === 'text')
//     ) {
//       getMispelledWord(node, sendToHost);
//     } else {
//       sendToHost();
//     }
//
//     function sendToHost(wordSuggestions) {
//       ipc.sendToHost('contextmenu', {
//         wordSuggestions: wordSuggestions,
//         targetUrl      : targetUrl,
//         x              : event.pageX,
//         y              : event.pageY
//       });
//     }
//   });
// }

// Slack uses a module loader that conflicts with Node's.
// function removeConflicts() {
//   window.nodeRequire = window.require;
//
//   delete window.require;
//   delete window.module;
// }

// function zoomFactorListener() {
//   ipc.on('setZoomFactor', function(zoomFactor) {
//     webFrame.setZoomFactor(zoomFactor);
//   });
// }
