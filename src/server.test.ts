import { Server } from 'http';
import request from 'supertest';
import app from './server';

let server: Server;

beforeEach(() => {
  server = app.listen();
});

afterEach(done => {
  server.close(done);
});

// This test is just a POC to make sure that yarn test does something.
// FIXME: Write proper tests.
it('should respond to a GET request at / with "Hello World"', async () => {
  const result = await request(server).get('/');
  expect(result).toHaveProperty('text', 'Hello World!');
  expect(result).toHaveProperty('status', 200);
});
