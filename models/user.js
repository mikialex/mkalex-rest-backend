class User {

  static async getUserAuthInfo(username) {
    return await global.db.q(
      `Select * From user Where username = :username`
      , { username })
  }

  static async setUserToken(username, token) {
     await global.db.query(
      `update user set token = :token Where username = :username`
      , { token,username })
  }

}

module.exports = User;