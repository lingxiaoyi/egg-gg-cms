'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('projects', {
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
    }, {
      charset: 'utf8',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('projects');
  },
};
