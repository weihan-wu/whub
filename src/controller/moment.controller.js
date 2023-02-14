const { create, detail, list, update, destory, hasLabel, addLabel } = require('../service/moment.service')

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

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    for (const label of labels) {
      const isExist = await hasLabel(momentId, label.id)
      if (!isExist) {
        await addLabel(momentId, label.id)
      }
    }
    ctx.body = "添加标签成功～"
  }
}

module.exports = new MomentController()