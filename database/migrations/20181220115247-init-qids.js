'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.addColumn('qids', 'des', {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '渠道号描述',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('qids', 'des');
  },
};
