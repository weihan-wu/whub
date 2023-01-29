class UserService {
  async create(user) {
    // 将user存入数据库
    return JSON.stringify(user)
  }
}

module.exports = new UserService()