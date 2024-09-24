import { FRONT_WEB_LOCAL_URL, FRONT_WEB_URL, NODE_ENV } from './env';

export default {
  origin: NODE_ENV === 'production' ? FRONT_WEB_URL : FRONT_WEB_LOCAL_URL,
  credentials: true,
};
