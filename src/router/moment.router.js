const Router = require('koa-router')

const momentRouter = new Router({ prefix: '/moment' })

const { create, detail, list, update, destory } = require('../controller/moment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { checkExist } = require('../middleware/moment.middleware')

momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.post('/', verifyAuth, create)
momentRouter.patch('/:momentId', verifyAuth, checkExist, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, checkExist, verifyPermission, destory)

module.exports = momentRouter