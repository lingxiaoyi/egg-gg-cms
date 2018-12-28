'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('qids', {
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
    }, {
      charset: 'utf8',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('qids');
  },
};
