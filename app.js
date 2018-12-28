'use strict';
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
module.exports = app => {
  // console.log(app.config.env);
  // app.config.coreMiddleware.unshift('response');
  // app.config.coreMiddleware.unshift('errorHandler');
  // app.once('server', server => {
  //   // websocke
  // });

  // app.on('error', (err, ctx) => {
  //   // report error
  // });

  // app.on('request', ctx => {

  // });

  // app.on('response', ctx => {
  //   // ctx.starttime is set by framework
  //   const used = Date.now() - ctx.starttime;
  //   // log total cost
  // });
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
  // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    const query = { username: user.username, password: user.password };
    const createRule = {
      username: 'string',
      password: 'string',
    };
    ctx.validate(createRule, query);
    const existsUser = await ctx.model.Users.findOne(
      { where: { username: query.username } }
    );
    if (existsUser) {
      if (bcrypt.compareSync(query.password, existsUser.password)) {
        return existsUser;
      }
      ctx.throw(422, { code: 'password Validation Failed', message: '密码错误' });

    } else {
      ctx.throw(422, { code: 'username no_exists', message: '此用户名不存在' });
    }
  });
  app.passport.serializeUser(async (ctx, user) => {
    ctx.status = 200;
    return user.id;
  });
  app.passport.deserializeUser(async (ctx, id) => {
    const existsUser = await ctx.model.Users.findByPk(id);
    return existsUser;
  });
};
