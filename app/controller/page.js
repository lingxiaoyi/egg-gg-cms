'use strict';

const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class QidController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { projectId: toInt(ctx.query.projectId) };
    ctx.body = await ctx.model.Pages.findAll(
      { where: query }
    );
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Pages.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { projectId, pageType } = ctx.request.body;
    const Pages = await ctx.model.Pages.create({ projectId, pageType });
    ctx.status = 201;
    ctx.body = Pages;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Pages = await ctx.model.Pages.findByPk(id);
    if (!Pages) {
      ctx.status = 404;
      return;
    }

    const { pageType } = ctx.request.body;
    await Pages.update({ pageType, id });
    ctx.body = Pages;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Pages = await ctx.model.Pages.findByPk(id);
    if (!Pages) {
      ctx.status = 404;
      return;
    }

    await Pages.destroy();
    ctx.status = 200;
  }
}

module.exports = QidController;
