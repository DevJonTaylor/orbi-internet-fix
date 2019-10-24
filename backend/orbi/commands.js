/**
 * Commands to start, stop, and onKill event.
 */

const files = require('./files');
const START_COMMAND = '';
const KILL_COMMAND = 'stop';
const PATH_TO_FILE = `${__dirname}/direction.orders`;

module.exports = {
  start() {
    return files.write(PATH_TO_FILE, START_COMMAND);
  },
  stop() {
    return files.write(PATH_TO_FILE, KILL_COMMAND)
  },
  onKill(listener) {
    files.watch(PATH_TO_FILE, async () => {
      if(await files.read(PATH_TO_FILE) === KILL_COMMAND) listener();
    })
  }
};