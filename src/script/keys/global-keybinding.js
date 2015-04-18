'use strict';

var matchKeyEvent = require('./match-keyevent').matchKeyEvent;
var parseKeyCombination = require('./parse-key-combination');

var listeners = {};

function addListener(keyCombinationText, handler) {
  if (listeners[keyCombinationText]) {
    console.error(`Listener already registered for "${keyCombinationText}"`);
    return;
  }

  var keyCombination = parseKeyCombination(keyCombinationText);

  document.addEventListener('keydown', function(event) {
    if (matchKeyEvent(event, keyCombination)) {
      handler();
      event.preventDefault();
    }
  });

  listeners[keyCombinationText] = handler;
}

function removeListener(keyCombinationText) {
  if (!listeners[keyCombinationText]) {
    console.error(`No listener registered for "${keyCombinationText}"`);
    return;
  }

  document.removeEventListener('keydown', listeners[keyCombinationText]);

  delete listeners[keyCombinationText];
}

exports.addListener = addListener;
exports.removeListener = removeListener;
