const { getLabelByName, create } = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body

  const newLabels = []
  for (const name of labels) {
    const labelResult = await getLabelByName(name)
    const label = { name }
    if (!labelResult[0][0]) {
      const result = await create(name)
      label.id = result[0].insertId
    } else {
      label.id = labelResult[0][0].id
    }
    newLabels.push(label)
  }
  
  ctx.labels = newLabels
  await next()
}

module.exports = { verifyLabelExists }