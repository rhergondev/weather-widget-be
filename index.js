import cors from 'cors';
import express from 'express';
import cron from 'node-cron';

import { getWeatherData } from './weatherData.js';

const app = express();
const PORT = process.env.PORT || 3000;

const location = {
  type: 'Point',
  coordinates: [-5.721958720234767, 40.99423250102507],
};

const timerDelay = Number.parseInt(process.env.FORCEDUPDATETIMER);
const cronTimer = process.env.CRONTIMER;

let dataToFrontEnd;
let forcedLimitedTimer = false;
let processEndTimer;

async function serverFirstCall() {
  try {
    dataToFrontEnd = await getWeatherData(location);
    console.log(
      `Server was inicialized @ ${Date()} and data from the API was correctly retrieved`,
    );
  } catch (error) {
    console.log('In server initialization: ' + error);
  }
}

function counterReset() {
  forcedLimitedTimer = false;
}

async function forcedUpdate() {
  try {
    const processStartTime = new Date();
    const currentTime = new Date();

    if (!forcedLimitedTimer) {
      dataToFrontEnd = await getWeatherData(location);
      forcedLimitedTimer = true;
      processEndTimer = processStartTime.getTime() + timerDelay;
      setInterval(counterReset, timerDelay);
      console.log('Forced update executed');
    } else {
      let remainingTime = processEndTimer - currentTime.getTime();
      let minutes = Math.floor(remainingTime / 60000);
      let seconds = Math.floor((remainingTime % 60000) / 1000);
      console.log(
        `There are ${minutes} minutes and ${seconds} seconds before next forced update is allowed`,
      );
    }
  } catch (error) {
    console.error('in forced update: ', error);
  }
}

app.use(cors());

serverFirstCall();

cron.schedule(cronTimer, async () => {
  try {
    dataToFrontEnd = await getWeatherData(location);
    console.log(`Weather data automatically updated @ ${Date()}`);
  } catch (error) {
    console.error('in cron task: ', error);
  }
});

app.get('/weather/data', (req, res) => {
  res.json(dataToFrontEnd);
});

app.get('/weather/data/forcedupdate', async (req, res) => {
  await forcedUpdate();
  res.json(dataToFrontEnd);
});

app.post('/', (req, res) => {
  res.send('Responding to a POST Request');
});

app.listen(PORT, () => {
  console.log(`Server is up at PORT = ${PORT}`);
});
