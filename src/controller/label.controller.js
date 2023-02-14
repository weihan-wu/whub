const { create, getLabels } = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await create(name)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, limit } = ctx.query
    const result = await getLabels(offset, limit)
    ctx.body = result[0]
  }
}

module.exports = new LabelController()