'use strict';
// test/app/controller/users.test.js
require('../../.setup.js');
const { assert, app } = require('egg-mock/bootstrap');
describe('test/app/controller/users.test.js', () => {
  before(() => {
    // 先mock一个用户,过passport,才能执行接口请求
    app.mockUser({
      id: 1,
      username: 'zhijun1',
      password: '$2a$10$u/D.il9iyczeQmrJXmfb1.wl3udPKi91nD3BiYVbdDudSvmElPkRa',
      state: 0,
    });
    app.mockContext();
    app.mockSession({ passport: { user: 1 } });
  });
  describe('GET /api/v1/user', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 user 对象到数据库中
      await app.factory.createMany('users', 3);
      await app.httpRequest().post('/api/v1/user/sign_in').send({
        username: 'zhijun1',
        password: '2121212',
      })
        .expect(200)
        .expect('OK');
      const res = await app.httpRequest().get('/api/v1/user?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].username);
      assert(res.body[0].password);
    });
  });
  describe('GET /api/v1/users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('users');
      const res = await app.httpRequest().get(`/api/v1/user/${user.id}`);
      assert(res.status === 200);
      assert(res.body.username === user.username);
    });
  });

  describe('POST /api/v1/users', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/v1/user').send({
        username: 'sadad',
        password: '2121212',
      });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/api/v1/user/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.username === 'sadad');
    });
  });

  describe('DELETE /api/v1/user/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('users');
      const res = await app.httpRequest().delete(`/api/v1/user/${user.id}`);
      assert(res.status === 204);
    });
  });
});
