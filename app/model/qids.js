'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('qids', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'id',
    },
    qid: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '渠道号 qid02374等',
    },
    des: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '渠道号描述',
    },
    hidden: {
      type: INTEGER(2),
      allowNull: false,
      defaultValue: 0,
      comment: '关闭qid',
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
