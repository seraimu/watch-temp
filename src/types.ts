import { Timezone } from 'tz-offset';

export interface Config {
  /**
   * @description Number of the connected data pin
   */
  dataPin: number;

  /**
   * @description Sensor reading interval (cron expression)
   */
  schedule: string;

  /**
   * @description Time zone for cron
   */
  timezone: Timezone;

  /**
   * @description Don't output temperature and humidity logs
   */
  silent: boolean;
}
