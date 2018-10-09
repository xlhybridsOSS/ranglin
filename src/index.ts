import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions
} from 'typeorm';
import server from './server';

getConnectionOptions()
  .then((options: ConnectionOptions) => {
    // FIXME: Need more flexible/secure credentials provider rather than env vars.
    Object.assign(options, {
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER
    });
    return createConnection(options);
  })
  .then(() => server.listen(3000))
  // FIXME: Better logging solution.
  .then(() => console.log('server started'))
  .catch(err => console.error('Server failed to start', err));
