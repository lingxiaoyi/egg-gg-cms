'use strict'

const {factory} = require('factory-girl')
const bcrypt = require('bcryptjs')
module.exports = app => {
    // 可以通过 app.factory 访问 factory 实例
    app.factory = factory

    // 定义 user 和默认数据
    const salt = bcrypt.genSaltSync()
    let password = bcrypt.hashSync('2121212', salt)
    factory.define('users', app.model.Users, {
        username: factory.sequence('Users.username', n => `zhijun${n}`),
        password: password
    })
}
