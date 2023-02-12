const { getCommentsByMomentId, create, reply, update, destory } = require('../service/comment.service')

class CommentController {
  async list(ctx, next) {
    const { momentId } = ctx.request.query
    const result = await getCommentsByMomentId(momentId)
    ctx.body = result[0]
  }

  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const userId = ctx.user.id
    const result = await create(momentId, content, userId)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.request.params
    const userId = ctx.user.id
    const result = await reply(momentId, content, userId, commentId)
    ctx.body = result
  }

  async update(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    const result = await update(commentId, content)
    ctx.body = result
  }

  async destory(ctx, next) {
    const { commentId } = ctx.params
    const result = await destory(commentId)
    ctx.body = result
  }
}

module.exports = new CommentController()