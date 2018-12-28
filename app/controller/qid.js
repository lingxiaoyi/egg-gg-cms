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
      projectId: 'int',
      qid: 'string',
    };
    const query = { projectId: toInt(ctx.query.projectId), qid: ctx.query.qid };
    ctx.validate(createRule, query);
    ctx.body = await ctx.model.Qids.findAll(
      { where: query }
    );
  }
  async getQidList() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const createRule = {
      projectId: 'int',
    };
    const query = { projectId: toInt(ctx.query.projectId) };
    ctx.validate(createRule, query);
    ctx.body = await ctx.model.Qids.findAll(
      { where: query }
    );
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Qids.findByPk(toInt(ctx.params.id));
  }
  async create() {
    const ctx = this.ctx;
    const { projectId, qid, des } = ctx.request.body;
    const query = { projectId: toInt(projectId), qid, des };
    const createRule = {
      projectId: 'int',
      qid: 'string',
      des: 'string',
    };
    query.qid = query.qid.replace(/\s+/g, '');
    query.des = query.des.replace(/\s+/g, '');
    ctx.validate(createRule, query);
    let Qids = await ctx.model.Qids.findAll(
      { where: { projectId: toInt(projectId), qid } }
    );
    if (Qids.length) {
      ctx.throw(422, { code: 'qid already_exists', message: '此Qid已经存在了' });
    } else {
      Qids = await ctx.model.Qids.create(query);
      ctx.status = 201;
      ctx.body = Qids;
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const { projectId, qid, des } = ctx.request.body;
    const query = { projectId: toInt(projectId), qid, des };
    const createRule = {
      projectId: 'int',
      qid: 'string',
      des: {
        type: 'string',
        required: false,
      },
    };
    query.qid = query.qid.replace(/\s+/g, '');
    query.des = query.des.replace(/\s+/g, '');
    ctx.validate(createRule, query);
    const Qids = await ctx.model.Qids.findByPk(id);
    if (!Qids) {
      ctx.throw(422, { code: 'qid not_exists', message: '此Qid ID不存在' });
    }
    const Qids2 = await ctx.model.Qids.findAll(
      { where: { projectId: toInt(projectId), qid: query.qid } }
    );
    if (Qids2.length && toInt(Qids2[0].id) !== id) { // 当修改当前id和其他id的qid相同的时候做这个处理
      ctx.throw(422, { code: 'qid already_exists', message: '此Qid已经存在,请重新填写' });
    }
    await Qids.update(query);
    ctx.status = 204;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Qids = await ctx.model.Qids.findByPk(id);
    if (!Qids) {
      ctx.throw(422, { code: 'qid not_exists', message: '此Qid不存在' });
    }

    await Qids.destroy();
    ctx.status = 204;
  }
}

module.exports = QidController;
