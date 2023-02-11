

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const userId = ctx.user.id
    console.log(momentId, content, userId);
    ctx.body = '创建成功'
  }
}

module.exports = new CommentController()