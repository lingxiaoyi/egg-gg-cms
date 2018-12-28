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
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const createRule = {
      project: 'string',
    };
    const query = { project: toInt(ctx.query.projectId) };
    ctx.validate(createRule, query);
    ctx.body = await ctx.model.Projects.findAll(
      { where: query }
    );
  }
  async getQidList() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const query = { projectId: toInt(ctx.query.projectId) };
    ctx.body = await ctx.model.Projects.findAll(
      { where: query }
    );
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Projects.findByPk(toInt(ctx.params.id));
  }
  async create() {
    const ctx = this.ctx;
    const createRule = {
      project: 'string',
    };
    ctx.validate(createRule, ctx.request.body);
    const { project } = ctx.request.body;
    try {
      const Projects = await ctx.model.Projects.create({ project });
      ctx.status = 201;
      ctx.body = Projects;
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        this.ctx.throw(422, 'Projects already_exists');
      } else {
        this.ctx.throw(500); // 服务器错误
      }
    }

  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Projects = await ctx.model.Projects.findByPk(id);
    if (!Projects) {
      ctx.status = 404;
      return;
    }

    const { qid } = ctx.request.body;
    await Projects.update({ qid, id });
    ctx.body = Projects;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Projects = await ctx.model.Projects.findByPk(id);
    if (!Projects) {
      ctx.status = 404;
      return;
    }

    await Projects.destroy();
    ctx.status = 200;
  }
}

module.exports = QidController;
