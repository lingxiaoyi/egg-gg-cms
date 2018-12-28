'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('ads', {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: 'id',
      },
      projectId: {
        type: INTEGER,
        field: 'project_id',
        comment: '项目类型id',
      },
      pageId: {
        type: INTEGER,
        field: 'page_id',
        comment: '页面类型id',
      },
      qidId: {
        type: INTEGER,
        field: 'qid_id',
        comment: '渠道号id',
      },
      ggId: {
        type: STRING,
        allowNull: false,
        field: 'gg_id',
        defaultValue: '',
      },
      ggType: {
        type: STRING,
        allowNull: false,
        field: 'gg_type',
        defaultValue: '',
        comment: 'sougou 百度 环球 360',
      },
      hidden: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0,
        comment: '屏蔽此广告',
      },
      created_at: DATE,
      updated_at: DATE,
    }, {
      charset: 'utf8',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('ads');
  },
};
