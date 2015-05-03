'use strict';
/*eslint-disable no-underscore-dangle*/

const EventEmitter = require('events').EventEmitter;
const Immutable = require('immutable');
const Cursor = require('immutable/contrib/cursor');
const initialData = require('./initial-data');

class Data extends EventEmitter {
  constructor() {
    super();

    this.data = Immutable.fromJS(initialData);
    this.setCursor();
  }

  setCursor() {
    this.cursor = Cursor.from(this.data, [], newData => {
      this.data = newData;
      this.setCursor();

      this.emit('change');
    });
  }

  get(key) {
    return this.cursor.get(key);
  }

  getIn(keyPath) {
    return this.cursor.getIn(keyPath);
  }

  getParentOf(cursor) {
    const keyPath = cursor._keyPath;

    if (keyPath && keyPath.length > 1) {
      return this.getIn(keyPath.slice(0, -1));
    } else {
      return null;
    }
  }
}

module.exports = new Data();
