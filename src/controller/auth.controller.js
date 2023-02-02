class AuthController {
  async login(ctx, next) {
    const { name } = ctx.request.body
    
    ctx.body = '登陆成功'
    await next()
  }
}

module.exports = new AuthController()