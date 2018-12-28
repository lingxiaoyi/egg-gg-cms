'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('pages', {
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
    }, {
      charset: 'utf8',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('pages');
  },
};
