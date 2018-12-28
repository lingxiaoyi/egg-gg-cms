'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: { // 邮箱
        type: STRING,
        allowNull: false,
        unique: true, // 唯一
        validate: {
          isEmail: true, // 检测邮箱格式 (foo@bar.com)
        },
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
      state: { // 状态 0未激活邮箱.1已激活邮箱.2拉黑用户
        type: INTEGER(2),
        defaultValue: 0, // 默认值
      },
      created_at: DATE,
      updated_at: DATE,
    }, {
      charset: 'utf8',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
