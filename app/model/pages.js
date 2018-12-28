'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('pages', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'id',
    },
    pageType: {
      type: STRING,
      field: 'page_type',
      allowNull: false,
      defaultValue: '',
      comment: '页面类型',
    },
    name: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '页面类型英文',
    },
    projectId: {
      type: INTEGER,
      field: 'project_id',
      comment: '项目id',
    },
    created_at: DATE,
    updated_at: DATE,
  });
};
