const request = require('supertest');
const app = require('./index');
const db = require('./database/dbConfig');
const userDB = require('./auth/auth-model');

beforeEach(async () => {
  await db('users').truncate();
});

describe('index.js', () => {
  describe('auth-router', () => {
    it('should register a user', async () => {
      const user = { username: 'Kitsueki', password: '123456abc' };
      const expected = 1;
      let [res] = await userDB.insert(user);
      expect(res).toEqual(expected);
      let [found] = await userDB.findByName(user.username);
      expect(found).toEqual({ id: expected, ...user });
    });

    it('should log in', async () => {
      const user = { username: 'Kitsueki', password: '123456abc' };
      await userDB.insert(user);
      try {
        let res = await request(app).post('/api/auth/login').send(user);
        expect(res).toBe([]);
        expect(res.length).toBe(1);

      } catch(e) {
        console.log(e);
      }
    });
  });
});