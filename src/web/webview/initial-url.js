const key = 'intialWebviewUrl';
const defaultInitialUrl = 'https://slack.com/signin';

export function get() {
  return localStorage.getItem(key) || defaultInitialUrl;
}

export function set(initialUrl) {
  localStorage.setItem(key, initialUrl);
}
