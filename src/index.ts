import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions
} from 'typeorm';
import server from './server';

(async () => {
  try {
    const options = await getConnectionOptions();
    // FIXME: Need more flexible/secure credentials provider rather than env vars.
    Object.assign(options, {
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER
    });
    await createConnection(options);
    server.listen(process.env.SVC_PORT);
    console.log('server listening on port %s', process.env.SVC_PORT);
  } catch (err) {
    console.error('Server failed to start', err);
  }
})();
