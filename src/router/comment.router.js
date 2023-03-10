const Router = require('koa-router')

const commentRouter = new Router({ prefix: '/comment' })

const { list, create, reply, update, destory } = require('../controller/comment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

commentRouter.get('/', list)
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, destory)

module.exports = commentRouter