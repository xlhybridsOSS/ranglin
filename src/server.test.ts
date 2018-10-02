import request from 'supertest';
import app from './server';

it('should respond to a GET request at / with "Hello World"', async () => {
  const result = await request(app.listen()).get('/');
  expect(result.text).toEqual('Hello World!');
  expect(result.status).toEqual(200);
});
