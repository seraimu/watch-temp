/**
 * watch-temp
 * @description A program to measure the temperature and humidity of a room with DHT22
 * @version 1.0.0
 * @author Seraimu
 * @license WTFPL
 */

import fs from 'fs';
import { promises as sensor } from 'node-dht-sensor';
import { Config } from './types';
import cron from 'node-cron';

// If not exsist config.json, create config.json
try {
  fs.statSync('./config.json');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.info(`config.json is not found.`);
    fs.writeFileSync(
      './config.json',
      JSON.stringify(
        {
          dataPin: 'DATA PIN NUMBER HERE',
          schedule: '* * * ? * * *',
          timezone: 'Asia/Tokyo',
        },
        null,
        2,
      ),
    );
    console.log(
      'Created config.json. Please write configuration to config.json.',
    );
    process.exit(0);
  } else {
    console.error(`Unexcepted error: ${err}`);
    process.exit(1);
  }
}

// Get config
const config: Config = JSON.parse(
  fs.readFileSync('./config.json', { encoding: 'utf-8' }),
);

// Scheduling to get sensor data
cron.schedule(
  config.schedule,
  async () => {
    // Read sensor
    const data = await sensor.read(22, config.dataPin);

    if (typeof data !== 'undefined') {
      // Logging
      console.log(
        `${new Date().toString()}
        Temp: ${data.temperature}℃ Humdity: ${data.humidity}%`,
      );
    }
  },
  { timezone: config.timezone },
);
