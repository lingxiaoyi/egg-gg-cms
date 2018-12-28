'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.renameColumn('users', 'email', 'username');
    await queryInterface.changeColumn(
      'users',
      'username',
      {
        type: STRING,
        allowNull: false,
        unique: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.renameColumn('users', 'username', 'email');
    await queryInterface.changeColumn(
      'users',
      'email',
      {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // 检测邮箱格式 (foo@bar.com)
        },
      }
    );
  },
};
