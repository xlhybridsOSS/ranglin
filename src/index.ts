import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions
} from 'typeorm';
import server from './server';

getConnectionOptions()
  .then((options: ConnectionOptions) => {
    Object.assign(options, {
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER
    });
    return createConnection(options);
  })
  .then(() => server.listen(3000))
  .then(() => console.log('server started'));
