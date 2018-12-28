'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('projects', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'id',
    },
    project: {
      type: STRING,
      allowNull: false,
      unique: true, // 唯一
      defaultValue: '',
      comment: '项目类型',
    },
    created_at: DATE,
    updated_at: DATE,
  });
};
