import pino from 'pino';

import { NODE_ENV } from '../config/env';

const logger = pino(
  NODE_ENV !== 'production'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }
    : {},
);

export default logger;
