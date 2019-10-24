const ROUTER_ADMIN_PASSWORD = require('./package.json').password;
const PORT_NUMBER = require('./package.json').port;
const { start, onKill } = require('./commands');
const Netgear = require('netgear');
const Express = require('express');
const app = Express();
const router = new Netgear();
const cors = require('cors');
const data = {
  // This is triggered once we are logged in to the router.
  // This will ensure we are only logging in once.
  isLoggedIn: false
};

// Sets the command.orders to the starting command
// Then it watches the file for changes.
// Performs onKill once the kill command is found.
start()
  .then(() => onKill(process.exit))
  .catch(err => console.log(err));

// Applies the proper CORS rules.
app.use(cors());

// Gets the router object.
async function getRouter() {
  if(data.isLoggedIn === false) {
    const options = { password: ROUTER_ADMIN_PASSWORD };
    await router.login(options);
    data.isLoggedIn = true;
  }

  return router;
}

// Performs a fake speed test
function fakeSpeedTest() {
  return new Promise(res => {
    setTimeout(() => res({
      averagePing: 18,
      downlinkBandwidth: 116.47,
      uplinkBandwidth: 12.18
    }), 1000);
  })
}

// Perform a real speed test
async function speedTest() {
  try {
    const router = await getRouter();
    return await router.speedTest();
  } catch (error) {
    console.log(error);
  }
}

async function speedTestRequest(req, res) {
  const results = await speedTest();
  return res.json(results);
}

app.get('*', speedTestRequest);

app.listen(PORT_NUMBER, () => console.log(`Listening on port ${PORT_NUMBER}`));
