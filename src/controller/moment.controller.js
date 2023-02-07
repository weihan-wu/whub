const { create, detail, list, update,destory } = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const { content } = ctx.request.body;
    const result = await create(userId, content)
    ctx.body = result
  }

  async detail(ctx, next) {
    const { momentId } = ctx.request.params
    const result = await detail(momentId)
    ctx.body = result[0][0]
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await list(offset, size)
    ctx.body = result[0]
  }

  async update(ctx, next) {
    const { momentId } = ctx.request.params
    const { content } = ctx.request.body
    const result = await update(content, momentId)
    ctx.body = result
  }

  async destory(ctx, next) {
    const { momentId } = ctx.request.params
    const result = await destory(momentId)
    ctx.body = result
  }
}

module.exports = new MomentController()