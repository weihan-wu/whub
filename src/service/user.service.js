const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user
    // 将user存入数据库
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`
    return await connection.execute(statement, [name, password])
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    return await connection.execute(statement, [name])
  }

  async updateAvatarById(avatarUrl, id) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    return await connection.execute(statement, [avatarUrl, id])
  }
}

module.exports = new UserService()