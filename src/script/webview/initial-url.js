'use strict';

const key = 'intialWebviewUrl';
const defaultInitialUrl = 'https://slack.com/signin';

function get() {
  return localStorage.getItem(key) || defaultInitialUrl;
}

function set(initialUrl) {
  localStorage.setItem(key, initialUrl);
}

exports.get = get;
exports.set = set;
