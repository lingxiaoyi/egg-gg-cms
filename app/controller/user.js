'use strict';

const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const createRule = {
      limit: 'int',
      offset: 'int',
    };
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.validate(createRule, query);
    ctx.body = await ctx.model.Users.findAll(
      query
    );
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Users.findByPk(toInt(ctx.params.id));
  }
  async create() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const query = { username, password };
    const createRule = {
      username: 'string',
      password: 'string',
    };
    ctx.validate(createRule, query);
    let Qids = await ctx.model.Users.findAll(
      { where: { username } }
    );
    if (Qids.length) {
      ctx.throw(422, { code: 'username already_exists', message: '此用户名已经存在了' });
    } else {
      const salt = bcrypt.genSaltSync();
      query.password = bcrypt.hashSync(query.password, salt);
      Qids = await ctx.model.Users.create(query);
      ctx.status = 201;
      ctx.body = Qids;
    }
  }
  async logout() {
    const ctx = this.ctx;
    ctx.logout();
    ctx.status = 201;
    ctx.body = {
      message: 'success',
    };
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Users = await ctx.model.Users.findByPk(id);
    if (!Users) {
      ctx.throw(422, { code: 'Users not_exists', message: '此User不存在' });
      return;
    }

    await Users.destroy();
    ctx.status = 204;
  }
}

module.exports = HomeController;
