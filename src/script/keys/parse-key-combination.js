'use strict';

var keycodes = require('./keycode');

function parseKeyCombination(keyCombinationText) {
  var keyParts = keyCombinationText.replace(/\s/g, '').split('+');
  var modifierNames = keyParts.slice(0, -1);
  var keyName = keyParts.slice(-1)[0];
  var keyCombination = {
    alt    : false,
    ctrl   : false,
    shift  : false,
    keyCode: null
  };

  modifierNames.forEach(function(modifierName) {
    switch (modifierName) {
      case 'ALT':
        keyCombination.alt = true;
        break;
      case 'CTRL':
        keyCombination.ctrl = true;
        break;
      case 'SHIFT':
        keyCombination.shift = true;
        break;
      default:
        console.error('Unrecognised modifier "' + modifierName + '" in "' + keyCombinationText + '"');
    }
  });


  var keyCode = keycodes[keyName];
  if (keyCode) {
    keyCombination.keyCode = keyCode;
  } else {
    console.error('Unrecognised key "' + keyName + '" in "' + keyCombinationText + '"');
  }

  return keyCombination;
}

module.exports = parseKeyCombination;
