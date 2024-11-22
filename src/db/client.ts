import { createClient } from '@libsql/client';

const url = import.meta.env.TURSO_DB_URL;
const authToken = import.meta.env.TURSO_DB_AUTH_TOKEN;

if (!url) {
  throw new Error('TURSO_DB_URL is not defined');
}

export const db = createClient({
  url,
  authToken
});