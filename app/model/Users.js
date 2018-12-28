'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('users', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true, // 唯一
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
  });
};
