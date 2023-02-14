const Router = require('koa-router')

const momentRouter = new Router({ prefix: '/moment' })

const { create, detail, list, update, destory, addLabels } = require('../controller/moment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { checkExist } = require('../middleware/moment.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.post('/', verifyAuth, create)
momentRouter.patch('/:momentId', verifyAuth, checkExist, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, checkExist, verifyPermission, destory)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

module.exports = momentRouter