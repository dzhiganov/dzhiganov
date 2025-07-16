import { auth } from '../../lib/auth';

export default defineEventHandler(async (event) => {
  console.log('event', event);
  return auth.handler(toWebRequest(event));
});
