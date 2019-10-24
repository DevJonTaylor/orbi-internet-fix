<template>
  <div id="app">
    <h1>Orbi Speed Test</h1>
    <h2 v-show="cannotReset">Consult Admin:  Error Running Test</h2>
    <button @click="runTest" :disabled="runningTest">Run Speed Test</button>
    <br><progress-bar :options="options" :value="value"></progress-bar>
    <br>
    <h4>MegaBytes Per Second (Mbps)</h4>
    <h4>Milliseconds (ms)</h4>
    <br>
    <strong>Up:</strong> {{up}}
    <br>
    <strong>Down:</strong> {{down}}
    <br>
    <strong>Ping:</strong> {{ping}}
  </div>
</template>

<script>
import ProgressBar from 'vuejs-progress-bar';
import axios from 'axios';

const SERVER_RESET = 'http://192.168.1.21/orbi/start.php';
const SERVER_TEST = 'http://192.168.1.21:3000';

export default {
  name: 'app',
  components: { ProgressBar },
  data() {
    return {
      runningTest: false,
      cannotReset: false,
      error: false,
      up: 0,
      down: 0,
      ping: 0,
      options: {
        text: {
          color: '#FFFFFF',
          shadowEnable: true,
          shadowColor: '#000000',
          fontSize: 14,
          fontFamily: 'Helvetica',
          dynamicPosition: false,
          hideText: false
        },
        progress: {
          color: '#2dbd2d',
          backgroundColor: '#333333'
        },
        layout: {
          height: 35,
          width: 140,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: 'cylinder'
        }
      },
      value: 0
    }
  },
  methods: {
    cannotResetServer() {
      this.runningTest = false;
      this.cannotReset = true;
      this.error = true;
      this.value = 0;
    },
    reset() {
      console.log('reset');
      axios.get(SERVER_RESET)
        .then(resp => this.runTest())
        .catch(err => this.cannotResetServer());
    },
    runTest() {
      this.runningTest = true;
      this.error = false;
      this.cannotReset = false;
      this.value = 0;
      this.ping = 0;
      this.up = 0;
      this.down = 0;
      this.run();
      axios.get(SERVER_TEST)
        .then(resp => {
          this.ping = `${resp.data.averagePing}ms`;
          this.up = `${(resp.data.uplinkBandwidth / 8).toFixed(2)}Mbps`;
          this.down = `${(resp.data.downlinkBandwidth / 8).toFixed(2)}Mbps`;
        })
        .catch(err => this.error = true)
        .finally(() => {
          if(this.error) this.reset();
          else if(this.value <= 99) this.value = 100;
        });
    },
    run() {
      setTimeout(() => {
        if(this.error) return;
        if(this.value < 99) {
          this.value += 1;
          this.run();
        }
      }, 780);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2 {
  color: #f00;
}
</style>
