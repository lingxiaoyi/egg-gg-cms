'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.addColumn('ads', 'des', {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '渠道号描述',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('ads', 'des');
  },
};
