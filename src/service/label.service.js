const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    return await connection.execute(statement, [name])
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    return await connection.execute(statement, [name])
  }

  async getLabels(offset, limit) {
    const statement = `SELECT * FROM label LIMIT ?,?;`;
    return await connection.execute(statement, [offset, limit])
  }
}

module.exports = new LabelService()