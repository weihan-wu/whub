const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')

const errorHandler = require('./error-handle')
const { routes } = require('../router/auth.router')

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.on('error', errorHandler)

module.exports = app