import { NODE_ENV, FRONT_WEB_LOCAL_URL, FRONT_WEB_URL } from './env';

export default {
  origin: NODE_ENV === 'production' ? FRONT_WEB_URL : FRONT_WEB_LOCAL_URL,
  credentials: true,
};
