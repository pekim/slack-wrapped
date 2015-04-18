'use strict';

var _ = require('lodash');

var code;
var keyCodes = {
TAB:              9,
ENTER:            13,
ESCAPE:           27,
UP:               38,
DOWN:             40,
0:                code = 48,
1:                ++code,
2:                ++code,
3:                ++code,
4:                ++code,
5:                ++code,
6:                ++code,
7:                ++code,
8:                ++code,
9:                ++code,
A:                code = 65,
B:                ++code,
C:                ++code,
D:                ++code,
E:                ++code,
F:                ++code,
G:                ++code,
H:                ++code,
I:                ++code,
J:                ++code,
K:                ++code,
L:                ++code,
M:                ++code,
N:                ++code,
O:                ++code,
P:                ++code,
Q:                ++code,
R:                ++code,
S:                ++code,
T:                ++code,
U:                ++code,
V:                ++code,
W:                ++code,
X:                ++code,
Y:                ++code,
Z:                ++code,
NUMPAD_0:         96,
NUMPAD_1:         ++code,
NUMPAD_2:         ++code,
NUMPAD_3:         ++code,
NUMPAD_4:         ++code,
NUMPAD_5:         ++code,
NUMPAD_6:         ++code,
NUMPAD_7:         ++code,
NUMPAD_8:         ++code,
NUMPAD_9:         ++code,
NUMPAD_PLUS:      107,
NUMPAD_MINUS:     109,
F1:               code = 112,
F2:               ++code,
F3:               ++code,
F4:               ++code,
F5:               ++code,
F6:               ++code,
F7:               ++code,
F8:               ++code,
F9:               ++code,
F10:              ++code,
F11:              ++code,
F12:              ++code,
SLASH:            191,

lookup:           lookup
};

var keyCodesMap = _.invert(keyCodes);

function lookup(keyCode) {
  return keyCodesMap[keyCode];
}

module.exports = keyCodes;
