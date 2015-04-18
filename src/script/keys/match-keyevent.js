'use strict';

function matchKeyEventToHandlers(event, handlers) {
  for (var h = 0; h < handlers.length; h += 2) {
    var keyCombination = handlers[h];
    var handler = handlers[h + 1];

    if (matchKeyEvent(event, keyCombination)) {
      handler();
    }
  }
}

function matchKeyEvent(event, keyCombination) {
  return (
    event.altKey === keyCombination.alt &&
    event.ctrlKey === keyCombination.ctrl &&
    event.shiftKey === keyCombination.shift &&
    event.keyCode === keyCombination.keyCode
  );
}

exports.matchKeyEventToHandlers = matchKeyEventToHandlers;
exports.matchKeyEvent = matchKeyEvent;
