const connection = require('../app/database')

class FileService {
  async createAvater(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES(?,?,?,?);`;
    return await connection.execute(statement, [filename, mimetype, size, userId])
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ? ORDER BY createAt DESC LIMIT 0,1;`;
    return await connection.execute(statement, [userId])
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES(?,?,?,?,?);`;
    return await connection.execute(statement, [filename, mimetype, size, userId, momentId])
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    return await connection.execute(statement, [filename])
  }
}

module.exports = new FileService()