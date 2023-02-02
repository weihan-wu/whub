const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user
    // 将user存入数据库
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`
    return await connection.execute(statement, [name, password])
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    return await connection.execute(statement, [name])
  }
}

module.exports = new UserService()