'use strict';

const data = appRequire('data/data');

const localStorageKey = 'conversation-emoji-show';
const showValues = ['image', 'text', 'image text'];

const preferenceKey = 'emojiShow';

function load() {
  return localStorage.getItem(localStorageKey) || 'image';
}

function save(value) {
  localStorage.setItem(localStorageKey, value);
}

function getPreferences() {
  return data.getIn(['preferences', 'conversation']);
}

function cycle() {
  getPreferences().update(preferenceKey, oldValue => {
    const oldIndex = showValues.indexOf(oldValue);
    const newIndex = ((oldIndex + 1) % showValues.length);
    const newValue = showValues[newIndex];

    save(newValue);

    return newValue;
  });
}

getPreferences().set(preferenceKey, load());

exports.load = load;
exports.save = save;
exports.cycle = cycle;
