'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  let ctx;
  before(() => {
    // 先mock一个用户,过passport,才能执行接口请求
    app.mockUser({
      id: 1,
      username: 'zhijun1',
      password: '$2a$10$u/D.il9iyczeQmrJXmfb1.wl3udPKi91nD3BiYVbdDudSvmElPkRa',
      state: 0,
    });

    app.mockSession({ passport: { user: 1 } });

  });
  describe('GET /api/v1/users/:id', () => {
    it('should assert', function* () {
      const pkg = require('../../../package.json');
      assert(app.config.keys.startsWith(pkg.name));

      // const ctx = app.mockContext({});
      // yield ctx.service.xx();
    });

    it('should GET /', async () => {
      /* app.mockUser({
                id: 1,
                username: 'zhijun1',
                password: '$2a$10$u/D.il9iyczeQmrJXmfb1.wl3udPKi91nD3BiYVbdDudSvmElPkRa',
                state: 0,
            });*/
      await app.httpRequest().get('/')
        .expect('hi, egg')
        .expect(200);
    });
  });
});
