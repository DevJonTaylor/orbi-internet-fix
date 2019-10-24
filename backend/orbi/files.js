/**
 * Shortcut methods to make writing, reading, and watching files.
 */

const fs = require('fs');

module.exports = {
  write(path, data) {
    return new Promise((res, rej) => {
      fs.writeFile(path, data, 'utf8', (err) => {
        if(err) return rej(err);
        return res();
      });
    });
  },
  read(path) {
    return new Promise((res, rej) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if(err) return rej(err);
        return res(data);
      });
    });
  },
  watch(path, callback) {
    fs.watch(path, 'utf8', callback);
  }
};