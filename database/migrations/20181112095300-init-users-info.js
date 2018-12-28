'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('user_info', {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: INTEGER,
        field: 'user_id',
        comment: '用户id',
      },
      nickname: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      headImg: {
        type: STRING(255),
        allowNull: false,
        field: 'head_img',
        defaultValue: '',
      },
      city: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      content: {
        type: STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      address: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      phone: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      created_at: DATE,
      updated_at: DATE,
    }, {
      charset: 'utf8',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user_info');
  },
};
